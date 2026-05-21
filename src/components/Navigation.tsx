import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import solisLogo from "@/assets/solis-logo.jpg";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/60">
      <div className="container mx-auto px-8 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <img src={solisLogo} alt="Solis Institute" className="h-11 w-11 object-contain mix-blend-multiply dark:mix-blend-screen dark:invert" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-[0.2em] text-foreground">SOLIS</span>
            <span className="text-[9px] tracking-[0.18em] uppercase text-muted-foreground mt-1 hidden sm:inline">Institute of Technology &amp; Software</span>
          </span>
        </a>
        
        <div className="hidden md:flex items-center space-x-12">
          <a href="/work" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
            WORK
          </a>
          <a href="/services" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
            SERVICES
          </a>
          <a href="/about" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
            ABOUT
          </a>
          <a href="/blog" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
            BLOG
          </a>
          <a href="/contact" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
            CONTACT
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-6 py-6 space-y-4">
            <a href="/work" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              WORK
            </a>
            <a href="/services" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              SERVICES
            </a>
            <a href="/about" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              ABOUT
            </a>
            <a href="/blog" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              BLOG
            </a>
            <a href="/contact" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              CONTACT
            </a>
            
            {/* Mobile Theme Toggle */}
            <div className="pt-4 border-t border-border">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;