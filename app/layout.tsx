import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono, Vend_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import { FloatingDock } from "@/components/layout/FloatingDock";
import "./globals.css";

const recoleta = localFont({
  src: "../fonts/Recoleta-RegularDEMO.otf",
  variable: "--font-recoleta",
  display: "swap",
});

const vendSans = Vend_Sans({
  subsets: ["latin"],
  variable: "--font-vend",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Irfan — Product Designer",
    template: "%s — Irfan",
  },
  description:
    "Product designer working on AI, enterprise, and 0→1 SaaS. I design products that make complex things feel simple.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${recoleta.variable} ${vendSans.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas font-sans text-ink antialiased">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Providers>
          <div id="main" className="pb-28">
            {children}
          </div>
          <FloatingDock />
        </Providers>
      </body>
    </html>
  );
}
