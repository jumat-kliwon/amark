import { ChevronDown, User, Lock, LogOut, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Courses", href: "/" },
  { label: "Subscription", href: "/subscription" },
  { label: "Certificate", href: "/certificate" },
  { label: "Affiliate", href: "/affiliate" },
];

const unreadNotifications = 3;

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground">
            <span className="text-lg font-bold text-background">A</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">
            AKADEMI<br />
            <span className="text-sm font-medium text-muted-foreground">CREATOR</span>
          </span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      location.pathname === item.href && "bg-accent"
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="relative" asChild>
          <Link to="/notifications">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </span>
            )}
          </Link>
        </Button>

        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-accent transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <span className="text-sm font-bold text-primary-foreground">A</span>
            </div>
            <span className="text-sm font-medium">asditap</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link to="/settings/profile" className="flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              Edit Profil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings/password" className="flex items-center gap-2 cursor-pointer">
              <Lock className="h-4 w-4" />
              Ubah Password
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 text-destructive cursor-pointer">
            <LogOut className="h-4 w-4" />
            Keluar
          </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
