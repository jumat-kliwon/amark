"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Phone, ArrowLeft, Save, AtSign } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function EditProfilePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "Budi",
    email: "asditap@gmail.com",
    phone_number: "082243629916",
    username: "asditap"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate inputs
    if (!formData.name.trim() || formData.name.length > 100) {
      toast({
        title: "Error",
        description: "Nama harus diisi dan maksimal 100 karakter",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Error",
        description: "Email tidak valid",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Profil Diperbarui",
      description: "Data profil Anda berhasil disimpan."
    });
    setIsLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-2xl px-6 py-12">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="name" name="name" value={formData.name} onChange={handleChange} className="pl-10" placeholder="Masukkan nama lengkap" maxLength={100} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="pl-10" placeholder="Masukkan email" maxLength={255} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_number">Nomor Telepon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} className="pl-10" placeholder="Masukkan nomor telepon" maxLength={20} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="username" name="username" value={formData.username} onChange={handleChange} className="pl-10" placeholder="Masukkan username" maxLength={50} />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/settings/password">Ubah Password</Link>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
