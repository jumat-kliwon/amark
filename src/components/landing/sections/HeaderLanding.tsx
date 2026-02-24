'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDown, User, Lock, LogOut, Bell, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useLogout } from '@/hooks/use-auth';
import { useNotifications } from '@/hooks/use-notification';

const memberNavItems = [
  { label: 'Courses', href: '/course' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Subscription', href: '/subscription' },
  { label: 'Riwayat Pesanan', href: '/orders' },
  { label: 'Certificate', href: '/certificate' },
];

/** Hanya di-render saat user login, sehingga useNotifications hanya dipanggil saat login */
function LoggedInActions({ user }: { user: { name?: string } }) {
  const logout = useLogout();
  const { notifications } = useNotifications({ page: 1, limit: 100 });
  const userInitial =
    (user?.name && user.name.trim().charAt(0).toUpperCase()) || 'A';
  const unreadNotifications = notifications.filter((n) => !n.read_at).length;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 sm:h-10 sm:w-10"
        asChild
      >
        <Link href="/notifications">
          <Bell className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-destructive text-[9px] sm:text-[10px] font-bold text-destructive-foreground">
              {unreadNotifications > 9 ? '9+' : unreadNotifications}
            </span>
          )}
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1 sm:gap-2 rounded-xl border border-border px-2 sm:px-3 py-2 hover:bg-accent transition-colors">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary">
              <span className="text-xs sm:text-sm font-bold text-primary-foreground">
                {userInitial}
              </span>
            </div>
            <span className="text-sm font-medium hidden sm:block">
              {user?.name}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link
              href="/settings/profile"
              className="flex items-center gap-2 cursor-pointer"
            >
              <User className="h-4 w-4" />
              Edit Profil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/settings/password"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Lock className="h-4 w-4" />
              Ubah Password
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2 text-destructive cursor-pointer"
            onClick={() => logout.mutate()}
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function HeaderLanding() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const stored =
        typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch {
      // ignore parse errors
    } finally {
      setLoadingUser(false);
    }
  }, []);

  const isLoggedIn = !!user;

  return (
    <header className="w-full fixed z-[99] bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          {/* Mobile Menu (hanya saat login) */}
          {isLoggedIn && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <SheetHeader className="border-b border-border p-4">
                  <SheetTitle className="flex items-center gap-3">
                    <Image
                      src="/images/logo.webp"
                      alt="ACRE Logo"
                      width={140}
                      height={32}
                      className="object-contain"
                      priority
                      unoptimized
                    />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col p-4 gap-1">
                  {memberNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                        pathname === item.href
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}

          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/logo.webp"
              alt="ACRE Logo"
              width={140}
              height={32}
              className="object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Nav: member area menu (saat login) */}
          {isLoggedIn && (
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {memberNavItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname === item.href && 'bg-accent',
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          )}

          {/* Desktop Nav: menu landing (saat belum login) */}
          {!isLoggedIn && (
            <Link
              href="/products"
              className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Product
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {loadingUser ? (
            <div className="flex items-center gap-3">
              <div className="h-10 w-20 bg-zinc-800 rounded-xl animate-pulse" />
            </div>
          ) : isLoggedIn ? (
            <LoggedInActions user={user} />
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="h-10 rounded-xl text-base border-border hover:bg-accent"
                onClick={() => router.push('/auth/login')}
              >
                Login
              </Button>
              <Button
                className="h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-base"
                onClick={() => router.push('/#join-now')}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
