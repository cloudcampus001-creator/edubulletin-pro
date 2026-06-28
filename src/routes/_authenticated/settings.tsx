import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "./dashboard";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings · Bulletin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <PageShell title="Settings" eyebrow="School & branding">
      <p className="text-muted-foreground">School identity, grading bands, logo upload and staff invitations will live here.</p>
    </PageShell>
  ),
});
