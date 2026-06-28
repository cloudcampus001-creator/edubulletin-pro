import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "./dashboard";

export const Route = createFileRoute("/_authenticated/bulletins")({
  head: () => ({ meta: [{ title: "Bulletins · Bulletin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <PageShell title="Bulletins" eyebrow="Coming next">
      <p className="text-muted-foreground">Single-student and batch PDF export will live here. The print-ready FR / EN templates are next on the build list.</p>
    </PageShell>
  ),
});
