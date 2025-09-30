// config/site.ts

export const siteConfig = {
  name: "Akrom",
  title: "Akrom.Dev – Portfolio & Projects",
  description:
    "Akrom's personal portfolio showcasing projects, skills, and experience in web development.",
  deployed_url: "https://akrom-omega.vercel.app/",
  
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Portfolio", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Blog ->", href: "https://akromblogdev.vercel.app" },
    { label: "Contact", href: "/contact" },
  ],

  footerLinks: [
    { label: "About", href: "/about" },
    {
      label: "Privacy Policy",
      href: "https://rustamovakrom.github.io/NextJS-Portfolio/docs/privacy_policy.html",
    },
    {
      label: "Licensing",
      href: "https://rustamovakrom.github.io/NextJS-Portfolio/docs/licencing.html",
    },
    { label: "Contact", href: "/contact" },
  ],
};
