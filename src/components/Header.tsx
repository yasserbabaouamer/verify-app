import { Shield, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">BAYANN</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              to="/sources"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Sources
            </Link>
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
