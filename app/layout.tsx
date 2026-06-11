import type { Metadata } from "next";
import { Besley, Public_Sans } from "next/font/google";
import "./globals.css";

const besley = Besley({
  variable: "--font-besley",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nationalyouththinktank.org"),
  title: {
    default: "National Youth Think Tank",
    template: "%s | National Youth Think Tank",
  },
  description:
    "A selective high-school think tank whose policy research is reviewed at the Pennsylvania Senate level. Roughly twenty students, real legislative work.",
  openGraph: {
    siteName: "National Youth Think Tank",
    type: "website",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("nytt-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${besley.variable} ${publicSans.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
