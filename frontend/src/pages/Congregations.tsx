import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, Users } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import CrudDialog from "@/components/CrudDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAll, create, update, remove, type Congregant } from "@/lib/store";
import { toast } from "sonner";
import {
  useCongregants,
  useCreateCongregant,
  useUpdateCongregant,
  useDeleteCongregant,
} from "@/hooks/use-congregant";

const STORE_KEY = "congregants";

const emptyForm: Omit<Congregant, "id"> = {
  fullName: "",
  gender: "Male",
  dateOfBirth: "",
  phone: "",
  email: "",
  address: "",
  maritalStatus: "Single",
  familyCardNumber: "",
  classSector: "",
  rayon: "",
  joinDate: "",
};

export default function Congregations() {
  // const [data, setData] = useState<Congregant[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Congregant | null>(null);
  const [form, setForm] = useState(emptyForm);

  // ← LOAD DATA DARI BACKEND
  const { data = [], isLoading, error } = useCongregants();
  const createMutation = useCreateCongregant();
  const updateMutation = useUpdateCongregant();
  const deleteMutation = useDeleteCongregant();

  // const load = () => setData(getAll<Congregant>(STORE_KEY));
  // useEffect(load, []);

  // Filter data dari backend
  const filtered = data.filter((c) =>
    c.fullName.toLowerCase().includes(search.toLowerCase()) ||
    c.classSector.toLowerCase().includes(search.toLowerCase()) ||
    c.rayon.toLowerCase().includes(search.toLowerCase())
  );

  // Tampilkan loading state
  if (isLoading) {
    return <PageLayout><div className="text-center py-12">Loading...</div></PageLayout>;
  }

  // Tampilkan error state
  if (error) {
    return <PageLayout><div className="text-center py-12 text-red-500">Failed to load data</div></PageLayout>;
  }

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };
  const openEdit = (c: Congregant) => {
    setEditing(c);
    setForm(c);
    setDialogOpen(true);
  };

  // const handleSave = () => {
  //   if (!form.fullName.trim()) {
  //     toast.error("Name is required");
  //     return;
  //   }
  //   if (editing) {
  //     update<Congregant>(STORE_KEY, editing.id, form);
  //     toast.success("Updated successfully");
  //   } else {
  //     create<Congregant>(STORE_KEY, form);
  //     toast.success("Created successfully");
  //   }
  //   setDialogOpen(false);
  //   load();
  // };

  // const handleDelete = (id: string) => {
  //   if (confirm("Are you sure?")) {
  //     remove(STORE_KEY, id);
  //     toast.success("Deleted");
  //     load();
  //   }
  // };

  const handleSave = () => {
    if (!form.fullName.trim()) {
      toast.error("Name is required");
      return;
    }
    
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: form });
    } else {
      createMutation.mutate(form);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const setField = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
              <Users className="h-8 w-8 text-gold" />
              Congregations
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage church member profiles, family cards, and sectors
            </p>
          </div>
          <Button
            onClick={openCreate}
            className="bg-gold text-primary hover:bg-gold/90"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Member
          </Button>
        </div>

        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, sector, or rayon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="bg-card border border-border rounded-lg p-5 hover:border-gold/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground">
                    {c.fullName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {c.gender} · {c.maritalStatus}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(c)}
                    className="p-2 rounded-md hover:bg-secondary transition-colors"
                  >
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-2 rounded-md hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Family Card:
                  </span>{" "}
                  {c.familyCardNumber}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Sector:</span>{" "}
                  {c.classSector}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Rayon:</span>{" "}
                  {c.rayon}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Phone:</span>{" "}
                  {c.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No congregants found.
          </p>
        )}
      </div>

      <CrudDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editing ? "Edit Member" : "Add Member"}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="sm:col-span-2">
            <Label>Full Name</Label>
            <Input
              value={form.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Select
              value={form.gender}
              onValueChange={(v) => setField("gender", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              value={form.dateOfBirth}
              onChange={(e) => setField("dateOfBirth", e.target.value)}
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Address</Label>
            <Input
              value={form.address}
              onChange={(e) => setField("address", e.target.value)}
            />
          </div>
          <div>
            <Label>Marital Status</Label>
            <Select
              value={form.maritalStatus}
              onValueChange={(v) => setField("maritalStatus", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Married">Married</SelectItem>
                <SelectItem value="Widowed">Widowed</SelectItem>
                <SelectItem value="Divorced">Divorced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Family Card No.</Label>
            <Input
              value={form.familyCardNumber}
              onChange={(e) => setField("familyCardNumber", e.target.value)}
            />
          </div>
          <div>
            <Label>Class/Sector</Label>
            <Input
              value={form.classSector}
              onChange={(e) => setField("classSector", e.target.value)}
            />
          </div>
          <div>
            <Label>Rayon</Label>
            <Input
              value={form.rayon}
              onChange={(e) => setField("rayon", e.target.value)}
            />
          </div>
          <div>
            <Label>Join Date</Label>
            <Input
              type="date"
              value={form.joinDate}
              onChange={(e) => setField("joinDate", e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gold text-primary hover:bg-gold/90"
          >
            Save
          </Button>
        </div>
      </CrudDialog>
    </PageLayout>
  );
}
