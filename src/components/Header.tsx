import { ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground">
          <span className="text-lg font-bold text-background">A</span>
        </div>
        <span className="text-lg font-semibold tracking-tight">
          AKADEMI<br />
          <span className="text-sm font-medium text-muted-foreground">CREATOR</span>
        </span>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          Affiliate
        </span>
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-sm font-medium">asditap</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default Header;
