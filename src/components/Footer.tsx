import { Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-hero text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center font-heading font-bold text-navy-deep text-xl">
                <img src="/apple-touch-icon.png" alt="ITIC Logo" />
              </div>
              <div>
                <div className="font-heading font-bold text-xl">ITIC</div>
                <div className="text-sm text-white/70">ISCTE Trading Club</div>
              </div>
            </div>      
            <p className="text-white/80 text-sm leading-relaxed">
              Empowering the next generation of finance professionals through education, networking, and practical experience.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="/about" className="text-white/80 hover:text-accent transition-smooth text-sm">
                About Us
              </a>
              <a href="/departments/trading" className="text-white/80 hover:text-accent transition-smooth text-sm">
                Trading
              </a>
              <a href="/departments/asset-management" className="text-white/80 hover:text-accent transition-smooth text-sm">
                Asset Management
              </a>
              <a href="/departments/research" className="text-white/80 hover:text-accent transition-smooth text-sm">
                Research 
              </a>
              <a href="/departments/human-resources" className="text-white/80 hover:text-accent transition-smooth text-sm">
                Operations
              </a>
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/itic_ibs/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent/20 transition-smooth group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white group-hover:text-accent transition-smooth" />
              </a>
              <a
                href="https://www.linkedin.com/company/iticiscte/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent/20 transition-smooth group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white group-hover:text-accent transition-smooth" />
              </a>
              <a
                href=""
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent/20 transition-smooth group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-white group-hover:text-accent transition-smooth" />
              </a>
            </div>
            <div className="text-sm text-white/80 space-y-1">
              <p>ISCTE Business School</p>
              <p>Lisbon, Portugal</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} ITIC - ISCTE Trading & Investment Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
