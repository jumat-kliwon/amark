"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SubCategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  hasSubmenu?: boolean;
  children?: SubCategory[];
}

const categories: Category[] = [
  { id: "fast-track", name: "Fast Track" },
  { 
    id: "content-creator", 
    name: "Content Creator", 
    hasSubmenu: true,
    children: [
      { id: "cc-tiktok", name: "TikTok Creator" },
      { id: "cc-youtube", name: "YouTube Creator" },
      { id: "cc-podcast", name: "Podcasting" },
    ]
  },
  { id: "monetization", name: "Monetization" },
  { 
    id: "digital-product", 
    name: "Digital Product", 
    hasSubmenu: true,
    children: [
      { id: "dp-ebook", name: "E-Book & Guide" },
      { id: "dp-course", name: "Online Course" },
      { id: "dp-template", name: "Templates" },
    ]
  },
  { id: "kumpulan-live", name: "Kumpulan Live" },
  { id: "ig-hack", name: "IG Hack" },
  { id: "bonus", name: "Bonus" },
];

interface CategorySidebarProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

const SidebarContent = ({ 
  selectedCategory, 
  onSelectCategory, 
  expandedCategories, 
  toggleExpand,
  onItemClick 
}: {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  expandedCategories: string[];
  toggleExpand: (id: string) => void;
  onItemClick?: () => void;
}) => (
  <>
    {/* Discord Button */}
    <button className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg bg-discord px-4 py-3 font-medium text-discord-foreground transition-all hover:opacity-90">
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
      asditaprasetya#0
      <ChevronDown className="ml-auto h-4 w-4" />
    </button>

    {/* Categories */}
    <div>
      <h3 className="mb-4 text-lg font-semibold">Courses:</h3>
      <nav className="space-y-1">
        {/* Semua Kursus / Reset Filter */}
        <button
          onClick={() => {
            onSelectCategory("");
            onItemClick?.();
          }}
          className={cn(
            "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
            selectedCategory === ""
              ? "bg-sidebar-accent text-foreground"
              : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
          )}
        >
          <LayoutGrid className="h-4 w-4" />
          Semua Kursus
        </button>

        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => {
                if (category.hasSubmenu) {
                  toggleExpand(category.id);
                } else {
                  onSelectCategory(category.id);
                  onItemClick?.();
                }
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                selectedCategory === category.id
                  ? "bg-sidebar-accent text-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              )}
            >
              {category.name}
              {category.hasSubmenu && (
                expandedCategories.includes(category.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )
              )}
            </button>
            
            {/* Child Menu */}
            {category.hasSubmenu && category.children && expandedCategories.includes(category.id) && (
              <div className="ml-3 mt-1 space-y-1 border-l border-border pl-3">
                {category.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => {
                      onSelectCategory(child.id);
                      onItemClick?.();
                    }}
                    className={cn(
                      "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      selectedCategory === child.id
                        ? "bg-sidebar-accent text-foreground font-medium"
                        : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                    )}
                  >
                    {child.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  </>
);

const CategorySidebar = ({ selectedCategory, onSelectCategory }: CategorySidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Mobile Trigger Button */}
      <div className="lg:hidden mb-4">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Menu className="h-4 w-4" />
              Kategori Kursus
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <SheetHeader className="border-b border-border p-4">
              <SheetTitle>Kategori</SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <SidebarContent
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
                expandedCategories={expandedCategories}
                toggleExpand={toggleExpand}
                onItemClick={() => setMobileOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 rounded-xl bg-card p-5">
        <SidebarContent
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          expandedCategories={expandedCategories}
          toggleExpand={toggleExpand}
        />
      </aside>
    </>
  );
};

export default CategorySidebar;
