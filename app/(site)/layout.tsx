import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { getSessionAdmin, getSessionChapter } from "@/lib/auth";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chapter = await getSessionChapter();
  const admin = chapter ? null : await getSessionAdmin();
  const session = chapter ? "chapter" : admin ? "admin" : null;

  return (
    <>
      <SiteNav session={session} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
