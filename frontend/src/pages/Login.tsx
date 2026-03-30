import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Church, Mail, LockKeyhole, User } from "lucide-react";

import churchHero from "@/assets/church-hero.jpg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth";
import { setPersistedAppRole } from "@/hooks/use-app-role";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(
    () => identifier.trim().length > 0 && password.length > 0 && !loading,
    [identifier, password, loading],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      setErrorMessage(
        "Silakan isi email/username dan password terlebih dahulu.",
      );
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const result = await login(identifier.trim(), password);

      if (!result.success) {
        setErrorMessage(
          result.message || "Login gagal. Periksa kembali data Anda.",
        );
        return;
      }

      setPersistedAppRole(result.user?.role ?? "pmj");
      toast.success("Login berhasil");
      navigate("/dashboard", { replace: true });
    } catch {
      setErrorMessage("Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden min-h-[280px] items-end overflow-hidden bg-slate-900 lg:flex lg:min-h-screen">
          <img
            src={churchHero}
            alt="GKPS Tangerang church interior"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />

          <div className="relative z-10 max-w-xl px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <Church className="h-4 w-4" />
              GKPS Tangerang
            </div>

            <h1 className="max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Selamat datang kembali di ruang pelayanan digital gereja.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              Masuk untuk mengakses dashboard pelayanan, pemantauan data,
              statistik pelayanan, dan informasi organisasi gereja dalam satu
              tempat.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 text-sm text-white/75 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="font-semibold text-white">Aman</p>
                <p className="mt-1">
                  Akses dilindungi untuk pengguna terdaftar.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="font-semibold text-white">Cepat</p>
                <p className="mt-1">Masuk dan lanjutkan aktivitas pelayanan.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="font-semibold text-white">Terpadu</p>
                <p className="mt-1">Semua data penting dalam satu dashboard.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="order-1 relative flex items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-12 lg:order-2 lg:px-8">
          <div className="absolute inset-0 lg:hidden">
            <img
              src={churchHero}
              alt="GKPS Tangerang church interior"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-slate-950/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/35 to-slate-950/70" />
          </div>

          <div className="relative z-10 w-full max-w-[28rem]">
            <div className="mb-4 flex items-center gap-3 px-1 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white shadow-sm backdrop-blur">
                <Church className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  GKPS Tangerang
                </p>
                <p className="text-xs text-white/75">
                  Login ke portal pelayanan
                </p>
              </div>
            </div>

            <Card className="border-border/60 bg-white/95 shadow-2xl shadow-slate-200/70 backdrop-blur supports-[backdrop-filter]:bg-white/85 lg:bg-white/95">
              <CardHeader className="space-y-4 px-5 pt-6 sm:px-6 sm:pt-7">
                <div className="hidden items-center gap-3 lg:flex">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                    <Church className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      Masuk ke akun Anda
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Gunakan email atau username Anda untuk melanjutkan.
                    </CardDescription>
                  </div>
                </div>

                <div className="lg:hidden">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Masuk ke akun Anda
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    Gunakan email atau username Anda untuk melanjutkan.
                  </p>
                </div>
              </CardHeader>

              <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6 lg:bg-white lg:text-foreground">
                <form
                  className="space-y-4 sm:space-y-5"
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-2">
                    <Label htmlFor="identifier">Email / Username</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="identifier"
                        type="text"
                        autoComplete="username"
                        placeholder="contoh: johnsihotang"
                        className="h-12 rounded-xl pl-10 text-base"
                        value={identifier}
                        onChange={(event) => setIdentifier(event.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Masukkan password"
                        className="h-12 rounded-xl pl-10 text-base"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {errorMessage ? (
                    <div
                      className="rounded-2xl border border-white/20 bg-black/35 px-4 py-3 text-sm leading-6 text-white shadow-md backdrop-blur-md lg:border-destructive/20 lg:bg-destructive/10 lg:text-destructive"
                      role="alert"
                    >
                      {errorMessage}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-white/20 bg-black/30 px-4 py-3 text-sm leading-6 text-white shadow-md backdrop-blur-md lg:border-primary/10 lg:bg-primary/5 lg:text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <User className="mt-0.5 h-4 w-4 shrink-0 text-white lg:text-primary" />
                        <p>
                          Gunakan email atau username yang terdaftar beserta
                          password yang benar untuk masuk.
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl border border-white/20 bg-white text-slate-900 text-base font-semibold shadow-lg shadow-black/25 hover:bg-white/95 hover:text-primary lg:border-transparent lg:bg-primary lg:text-primary-foreground"
                    disabled={!canSubmit}
                  >
                    {loading ? "Memproses..." : "Masuk"}
                    {!loading ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="px-5 pb-6 pt-0 text-xs leading-5 text-muted-foreground sm:px-6">
                Jika Anda mengalami kendala, pastikan email/username dan
                password sudah benar.
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
