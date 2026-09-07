/**
 * Studio uses its own <html>/<body> — bypass the site Navbar/Footer/globals.
 * We keep the root layout for everything except /studio which has this shell.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
