import { Shield, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
              VERIFY
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Sources
            </a>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </nav>

          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
