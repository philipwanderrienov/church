import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Search,
  Plus,
  Users as UsersIcon,
  Edit,
  Trash2,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { deleteUser, getUsers, createUser, updateUser } from "@/api/users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { CongregationSummary, User, UserFormValues } from "@/types/api";

const emptyForm: UserFormValues = {
  CongregationId: null,
  FirstName: "",
  LastName: "",
  Email: "",
  PhoneNumber: "",
  Role: "jemaat",
  Gender: "Laki-laki",
  BirthDate: "",
  Status: "Aktif",
};

function formatDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : format(date, "dd MMM yyyy");
}

function buildDisplayName(user: User) {
  return (
    [user.FirstName, user.LastName].filter(Boolean).join(" ").trim() || "-"
  );
}

function normalizeCongregations(data: unknown): CongregationSummary[] {
  if (!Array.isArray(data)) return [];
  return data
    .filter(
      (item): item is CongregationSummary =>
        !!item && typeof item === "object" && "Id" in item && "Name" in item,
    )
    .map((item) => ({
      Id: String(item.Id),
      Name: String(item.Name),
      PastorName: item.PastorName ? String(item.PastorName) : null,
      Location: String(item.Location ?? ""),
      PhoneNumber: String(item.PhoneNumber ?? ""),
      Email: String(item.Email ?? ""),
      ActiveMembersCount: Number(item.ActiveMembersCount ?? 0),
      CreatedAt: String(item.CreatedAt ?? ""),
      UpdatedAt: String(item.UpdatedAt ?? ""),
    }));
}

export default function Users() {
  const [data, setData] = useState<User[]>([]);
  const [congregations, setCongregations] = useState<CongregationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<UserFormValues>(emptyForm);

  const loadData = async () => {
    setLoading(true);
    try {
      const users = await getUsers();
      setData(users);
      setCongregations([]);
    } catch (error) {
      console.error(error);
      toast.error("Gagal memuat data jemaat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.filter((user) => {
      const matchesSearch =
        !query ||
        buildDisplayName(user).toLowerCase().includes(query) ||
        user.Email.toLowerCase().includes(query) ||
        (user.PhoneNumber || "").toLowerCase().includes(query) ||
        (user.Role || "").toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "all" ||
        (user.Status || "").toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  const summary = useMemo(() => {
    return {
      total: data.length,
      active: data.filter(
        (item) => (item.Status || "").toLowerCase() === "aktif",
      ).length,
      inactive: data.filter(
        (item) => (item.Status || "").toLowerCase() === "nonaktif",
      ).length,
    };
  }, [data]);

  const openCreate = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setIsOpen(true);
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    setForm({
      CongregationId: user.CongregationId || null,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber || "",
      Role: user.Role || "jemaat",
      Gender: user.Gender || "Laki-laki",
      BirthDate: user.BirthDate ? user.BirthDate.slice(0, 10) : "",
      Status: user.Status || "Aktif",
    });
    setIsOpen(true);
  };

  const setField = <K extends keyof UserFormValues>(
    key: K,
    value: UserFormValues[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!form.FirstName.trim()) {
      toast.error("Nama depan wajib diisi");
      return;
    }
    if (!form.LastName.trim()) {
      toast.error("Nama belakang wajib diisi");
      return;
    }
    if (!form.Email.trim()) {
      toast.error("Email wajib diisi");
      return;
    }

    try {
      const payload: UserFormValues = {
        ...form,
        CongregationId: form.CongregationId || null,
        PhoneNumber: form.PhoneNumber || null,
        Role: form.Role || "jemaat",
        Gender: form.Gender || null,
        BirthDate: form.BirthDate || null,
        Status: form.Status || "Aktif",
      };

      if (editingUser) {
        await updateUser(editingUser.Id, payload);
        toast.success("Data jemaat berhasil diperbarui");
      } else {
        await createUser(payload);
        toast.success("Data jemaat berhasil ditambahkan");
      }

      setIsOpen(false);
      await loadData();
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  const handleDelete = async (user: User) => {
    const confirmed = window.confirm(`Hapus jemaat ${buildDisplayName(user)}?`);
    if (!confirmed) return;

    try {
      await deleteUser(user.Id);
      toast.success("Data jemaat berhasil dihapus");
      await loadData();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus jemaat");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Data Jemaat</h1>
              <p className="text-muted-foreground">
                Kelola data pengguna dan jemaat gereja
              </p>
            </div>
            <Button onClick={openCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Tambah Jemaat
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Jemaat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Aktif
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.active}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Nonaktif
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.inactive}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, email, telepon, atau role..."
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="nonaktif">Nonaktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-muted-foreground">Memuat data jemaat...</div>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredData.map((user) => (
              <Card key={user.Id}>
                <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <UsersIcon className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {buildDisplayName(user)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {user.Email}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
                      <p>
                        <span className="font-medium text-foreground">
                          Telepon:
                        </span>{" "}
                        {user.PhoneNumber || "-"}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Role:
                        </span>{" "}
                        {user.Role || "-"}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Gender:
                        </span>{" "}
                        {user.Gender || "-"}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Tanggal Lahir:
                        </span>{" "}
                        {formatDate(user.BirthDate)}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Jemaat:
                        </span>{" "}
                        {user.Congregation?.Name ||
                          (user.CongregationId
                            ? `ID ${user.CongregationId}`
                            : "-")}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Dibuat:
                        </span>{" "}
                        {formatDate(user.CreatedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        user.Status === "Aktif" ? "default" : "secondary"
                      }
                    >
                      {user.Status || "-"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEdit(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(user)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredData.length === 0 && (
              <div className="rounded-lg border border-dashed p-10 text-center text-muted-foreground">
                Tidak ada data jemaat
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Edit Jemaat" : "Tambah Jemaat"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nama Depan</Label>
              <Input
                id="firstName"
                value={form.FirstName}
                onChange={(e) => setField("FirstName", e.target.value)}
                placeholder="Nama depan"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nama Belakang</Label>
              <Input
                id="lastName"
                value={form.LastName}
                onChange={(e) => setField("LastName", e.target.value)}
                placeholder="Nama belakang"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.Email}
                onChange={(e) => setField("Email", e.target.value)}
                placeholder="nama@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telepon</Label>
              <Input
                id="phone"
                value={form.PhoneNumber}
                onChange={(e) => setField("PhoneNumber", e.target.value)}
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">Tanggal Lahir</Label>
              <Input
                id="birthDate"
                type="date"
                value={form.BirthDate}
                onChange={(e) => setField("BirthDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={form.Role}
                onChange={(e) => setField("Role", e.target.value)}
                placeholder="jemaat"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={form.Gender || "Laki-laki"}
                onValueChange={(value) => setField("Gender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={form.Status || "Aktif"}
                onValueChange={(value) => setField("Status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="congregation">Jemaat / Congregation</Label>
              <Select
                value={form.CongregationId || "none"}
                onValueChange={(value) =>
                  setField("CongregationId", value === "none" ? null : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih congregasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Tanpa congregasi</SelectItem>
                  {congregations.map((cong) => (
                    <SelectItem key={cong.Id} value={cong.Id}>
                      {cong.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>
              {editingUser ? "Simpan Perubahan" : "Simpan Jemaat"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
