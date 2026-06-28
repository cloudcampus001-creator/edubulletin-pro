import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "./dashboard";

export const Route = createFileRoute("/_authenticated/students")({
  head: () => ({ meta: [{ title: "Students · Bulletin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <PageShell title="Students" eyebrow="Coming next">
      <p className="text-muted-foreground">Student roster, manual entry and CSV import will live here in the next iteration.</p>
    </PageShell>
  ),
});
