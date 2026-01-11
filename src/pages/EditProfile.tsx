import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, ArrowLeft, Save } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const EditProfile = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "Asditap",
    email: "asditap@example.com",
    phone: "+62 812 3456 7890",
    bio: "Content creator dan digital marketer yang sedang belajar personal branding.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate inputs
    if (!formData.name.trim() || formData.name.length > 100) {
      toast({
        title: "Error",
        description: "Nama harus diisi dan maksimal 100 karakter",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Error",
        description: "Email tidak valid",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Profil Diperbarui",
      description: "Data profil Anda berhasil disimpan.",
    });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-2xl px-6 py-12">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Edit Profil</h1>
          <p className="text-muted-foreground">
            Perbarui informasi profil Anda
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8">
          {/* Avatar */}
          <div className="mb-8 flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <span className="text-3xl font-bold text-primary-foreground">A</span>
            </div>
            <div>
              <Button variant="outline" size="sm">
                Ganti Foto
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                JPG, PNG atau GIF. Maksimal 2MB.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Masukkan nama lengkap"
                  maxLength={100}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Masukkan email"
                  maxLength={255}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Masukkan nomor telepon"
                  maxLength={20}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Ceritakan tentang diri Anda"
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground">
                {formData.bio.length}/500 karakter
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link to="/settings/password">Ubah Password</Link>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
