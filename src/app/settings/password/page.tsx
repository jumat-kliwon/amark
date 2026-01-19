"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Lock, Save } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserService } from "@/services/user";

export default function UpdatePasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    let hasError = false;

    // Validate inputs
    if (!formData.currentPassword) {
      setErrors((prev) => ({ ...prev, currentPassword: "Password saat ini harus diisi" }));
      hasError = true;
    }

    if (formData.newPassword.length < 8) {
      setErrors((prev) => ({ ...prev, newPassword: "Password baru minimal 8 karakter" }));
      hasError = true;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Konfirmasi password tidak cocok" }));
      hasError = true;
    }

    if (hasError) {
      setIsLoading(false);
      return;
    }

    try {
      // Call API to update password
      await UserService.updatePassword({
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
        new_password_confirmation: formData.confirmPassword,
      });

      toast({
        title: "Password Diperbarui",
        description: "Password Anda berhasil diubah.",
      });
      
      // Reset form and errors
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      // Handle API error response
      const responseData = error?.response?.data;
      
      // Handle field-specific errors from API
      if (responseData?.errors) {
        const apiErrors = responseData.errors;
        setErrors({
          currentPassword: apiErrors.current_password?.[0] || "",
          newPassword: apiErrors.new_password?.[0] || "",
          confirmPassword: apiErrors.new_password_confirmation?.[0] || "",
        });
      } else {
        // Handle general error message
        const errorMessage = 
          responseData?.message || 
          responseData?.error ||
          error?.message ||
          "Terjadi kesalahan saat mengubah password. Silakan coba lagi.";
        
        // Show general error on currentPassword field
        setErrors((prev) => ({ ...prev, currentPassword: errorMessage }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href="/settings/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Edit Profil
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Ubah Password</h1>
          <p className="text-muted-foreground">
            Pastikan password baru Anda kuat dan unik
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Password Saat Ini</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className={`pl-10 pr-10 ${errors.currentPassword ? "border-destructive" : ""}`}
                  placeholder="Masukkan password saat ini"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-destructive">{errors.currentPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Password Baru</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`pl-10 pr-10 ${errors.newPassword ? "border-destructive" : ""}`}
                  placeholder="Masukkan password baru"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.newPassword ? (
                <p className="text-sm text-destructive">{errors.newPassword}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Minimal 8 karakter dengan kombinasi huruf dan angka
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`pl-10 pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                  placeholder="Konfirmasi password baru"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Menyimpan..." : "Simpan Password Baru"}
              </Button>
            </div>
          </form>
        </div>

        {/* Security Tips */}
        <div className="mt-8 rounded-xl border border-border bg-muted/30 p-6">
          <h3 className="mb-4 font-semibold">Tips Keamanan Password</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol</li>
            <li>• Hindari menggunakan informasi pribadi seperti tanggal lahir</li>
            <li>• Jangan gunakan password yang sama dengan akun lain</li>
            <li>• Ganti password secara berkala (setiap 3-6 bulan)</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
