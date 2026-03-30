import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";

import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthUser } from "@/lib/auth";
import { toast } from "sonner";

export default function AccountCreate() {
  const navigate = useNavigate();
  const currentUser = getAuthUser();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jemaat");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const canSubmit = useMemo(
    () =>
      id.trim().length > 0 &&
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      username.trim().length > 0 &&
      password.trim().length > 0 &&
      !loading,
    [id, name, email, username, password, loading],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      setErrorMessage("Lengkapi semua field terlebih dahulu.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api"}/accounts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            name,
            email,
            username,
            password,
            role,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || data.error || "Gagal membuat akun.");
        return;
      }

      toast.success("Akun berhasil dibuat");
      navigate("/dashboard", { replace: true });
    } catch {
      setErrorMessage("Terjadi kesalahan saat membuat akun.");
    } finally {
      setLoading(false);
    }
  };

  const isPmj = currentUser?.role === "pmj";

  return (
    <PageLayout
      title="Tambah Jemaat"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tambah Jemaat" }]}
    >
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Tambah akun jemaat
            </CardTitle>
            <CardDescription>
              Hanya PMJ/Admin yang dapat menambahkan akun jemaat baru.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isPmj ? (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                Anda tidak memiliki akses untuk halaman ini.
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="id">ID</Label>
                    <Input
                      id="id"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="jemaat">jemaat</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nama</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {errorMessage ? (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    {errorMessage}
                  </div>
                ) : null}

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali
                  </Button>
                  <Button type="submit" disabled={!canSubmit}>
                    {loading ? "Menyimpan..." : "Simpan Akun"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
