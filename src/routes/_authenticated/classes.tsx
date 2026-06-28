import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "./dashboard";

export const Route = createFileRoute("/_authenticated/classes")({
  head: () => ({ meta: [{ title: "Classes · Bulletin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <PageShell title="Classes" eyebrow="Coming next">
      <p className="text-muted-foreground">Class management UI is being built. From the dashboard you can already click into any class to start entering marks (next iteration).</p>
    </PageShell>
  ),
});
