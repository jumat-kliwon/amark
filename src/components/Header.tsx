import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Courses", href: "/" },
  { label: "Subscription", href: "/subscription" },
  { label: "Certificate", href: "/certificate" },
  { label: "Affiliate", href: "/affiliate" },
];

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

      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
        <span className="text-sm font-medium">asditap</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
    </header>
  );
};

export default Header;
