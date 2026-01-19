"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Mail, Phone, ArrowLeft, Save, AtSign } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserService } from "@/services/user";

export default function EditProfilePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    username: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone_number: "",
    username: "",
  });

  // Load profile data on mount
  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        setIsLoadingProfile(true);
        const profile = await UserService.getProfile();
        
        // Only update state if component is still mounted
        if (isMounted) {
          setFormData({
            name: profile.user.name || "",
            email: profile.user.email || "",
            phone_number: profile.user.phone_number || "",
            username: profile.user.username || ""
          });
          setIsLoadingProfile(false);
        }
      } catch (error: any) {
        // Only show error if component is still mounted
        if (isMounted) {
          toast({
            title: "Error",
            description: "Gagal memuat data profil. Silakan refresh halaman.",
            variant: "destructive",
          });
          setIsLoadingProfile(false);
        }
      }
    };

    loadProfile();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once on mount
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Reset errors
    setErrors({
      name: "",
      email: "",
      phone_number: "",
      username: "",
    });

    let hasError = false;

    // Validate inputs
    if (!formData.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Nama harus diisi" }));
      hasError = true;
    } else if (formData.name.length > 100) {
      setErrors((prev) => ({ ...prev, name: "Nama maksimal 100 karakter" }));
      hasError = true;
    }

    if (!formData.email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email harus diisi" }));
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Email tidak valid" }));
      hasError = true;
    }

    if (hasError) {
      setIsLoading(false);
      return;
    }

    try {
      // Call API to update profile
      await UserService.updateProfile({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone_number.trim() || null,
        username: formData.username.trim() || null,
      });

      toast({
        title: "Profil Diperbarui",
        description: "Data profil Anda berhasil disimpan."
      });
    } catch (error: any) {
      // Handle API error response
      const responseData = error?.response?.data;
      
      // Handle field-specific errors from API
      if (responseData?.errors) {
        const apiErrors = responseData.errors;
        setErrors({
          name: apiErrors.name?.[0] || "",
          email: apiErrors.email?.[0] || "",
          phone_number: apiErrors.phone_number?.[0] || "",
          username: apiErrors.username?.[0] || "",
        });
      } else {
        // Handle general error message
        const errorMessage = 
          responseData?.message || 
          responseData?.error ||
          error?.message ||
          "Terjadi kesalahan saat mengubah profil. Silakan coba lagi.";
        
        // Show general error on name field
        setErrors((prev) => ({ ...prev, name: errorMessage }));
      }
    } finally {
      setIsLoading(false);
    }
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
          {isLoadingProfile ? (
            <div className="text-center py-8 text-muted-foreground">Memuat data profil...</div>
          ) : (
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
                    className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                    placeholder="Masukkan nama lengkap" 
                    maxLength={100} 
                    disabled={isLoading}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
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
                    className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                    placeholder="Masukkan email" 
                    maxLength={255}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">Nomor Telepon</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="phone_number" 
                    name="phone_number" 
                    value={formData.phone_number} 
                    onChange={handleChange} 
                    className={`pl-10 ${errors.phone_number ? "border-destructive" : ""}`}
                    placeholder="Masukkan nomor telepon" 
                    maxLength={20}
                    disabled={isLoading}
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-sm text-destructive">{errors.phone_number}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    className={`pl-10 ${errors.username ? "border-destructive" : ""}`}
                    placeholder="Masukkan username" 
                    maxLength={50}
                    disabled={isLoading}
                  />
                </div>
                {errors.username && (
                  <p className="text-sm text-destructive">{errors.username}</p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isLoading || isLoadingProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/settings/password">Ubah Password</Link>
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
