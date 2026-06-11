import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    heading: "Programs",
    links: [
      { href: "/mission#research", label: "Policy Research" },
      { href: "/mission#media", label: "Civic Media Center" },
      { href: "/formats", label: "Competition Formats" },
      { href: "/featured-project", label: "NextBridge Advisory" },
    ],
  },
  {
    heading: "Organization",
    links: [
      { href: "/about", label: "About" },
      { href: "/team", label: "Team" },
      { href: "/blog", label: "Journal" },
      { href: "/events", label: "Events" },
    ],
  },
  {
    heading: "Members",
    links: [
      { href: "/register", label: "Apply" },
      { href: "/login", label: "Log in" },
      { href: "/chapters", label: "Chapter Directory" },
      { href: "/admin-login", label: "Administrators" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="band-navy bg-navy text-on-navy">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <Image
                src="/images/nytt-seal.png"
                alt="NYTT seal: a lightbulb, gavel, and leaf, est. 2025"
                width={56}
                height={56}
                className="rounded-full"
              />
              <p className="font-display text-2xl font-bold tracking-tight">
                National Youth Think Tank
              </p>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-on-navy-faint">
              An intentionally small cohort of students producing nonpartisan
              policy research and civic media that reach real legislative
              conversations.
            </p>
            <a
              href="mailto:a.kulshrestha.research@gmail.com"
              className="mt-5 inline-block text-sm font-semibold text-gold hover:underline underline-offset-4"
            >
              a.kulshrestha.research@gmail.com
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <p className="text-sm font-bold text-on-navy">{col.heading}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-on-navy-faint hover:text-gold transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line-navy pt-6 text-[13px] text-on-navy-faint sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} National Youth Think Tank. Established 2025.</p>
          <p>
            Nonpartisan and student-led. Capitol photography:{" "}
            <a
              href="https://commons.wikimedia.org/wiki/Category:Pennsylvania_State_Capitol"
              className="underline underline-offset-4 hover:text-gold"
            >
              Wikimedia Commons
            </a>{" "}
            (CC BY-SA).
          </p>
        </div>
      </div>
    </footer>
  );
}
