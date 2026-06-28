
# Cameroon Bulletin / Report Card Generator — MVP Plan

A multi-tenant SaaS where Cameroonian secondary schools (Francophone *or* Anglophone) configure their school, enter marks, and print official-looking bulletins. One shared data model + calculation engine; subsystem differs only in labels, grading scale, and PDF template.

---

## 1. Foundation

- **Backend:** Lovable Cloud (Postgres + Auth + Storage for logos).
- **Stack:** TanStack Start (already scaffolded) + Tailwind v4 + shadcn.
- **Theme — "Academic Navy":** primary `#0B2545` (deep navy), secondary `#13315C`, accent `#8DA9C4` (slate-blue), surface `#EEF4ED` (warm off-white), ink `#1B1B1B`. Headings: **Fraunces** (serif, institutional). Body: **Inter**. Tokens defined in `src/styles.css` via oklch; no hardcoded colors in components.
- **Visual language:** ministry-document feel — generous whitespace, hairline borders, small caps section labels, no rounded-pill UI, no gradients.

## 2. Data Model (Postgres via Cloud)

```
schools(id, name, subsystem[FR|EN], logo_url, address, motto, language_default, created_by)
academic_years(id, school_id, label, is_current)
terms(id, year_id, index[1..3], name)         -- "Trimestre 1" or "First Term"
classes(id, school_id, level, stream, name)   -- "3e A", "Form 4 Science"
subjects(id, class_id, name, coefficient, weight, order)
students(id, class_id, matricule, last_name, first_name, sex, dob)
staff(id, school_id, user_id, role)           -- admin|principal|class_teacher|subject_teacher
staff_assignments(staff_id, class_id, subject_id?)
grades(id, student_id, subject_id, term_id, mark, remark)
conduct_attendance(student_id, term_id, conduct, absences_justified, absences_unjustified, days_present, days_absent)
remarks(student_id, term_id, class_teacher, principal, council_decision)
report_templates(school_id, layout, branding_json)
user_roles(user_id, school_id, role)          -- separate table; has_role() security definer fn
```

RLS scoped to `school_id` on every table; subject teachers further scoped to their assignments. Public schema GRANTs included with each table.

## 3. MVP Features (build complete before Phase 2)

1. **Auth & onboarding** — email/password + Google. Signup → Setup Wizard (subsystem, logo upload, school identity, seed classes, seed subjects with coefficients editable from defaults).
2. **Staff management** — invite by email, assign role + classes/subjects.
3. **Students** — manual add + CSV import (preview → commit).
4. **Grade entry grid** — spreadsheet-style per class × subject × term; autosave; keyboard nav; mobile-friendly column-stacked view.
5. **Calculation engine** (pure TS in `src/lib/grading/`): weighted average, class average per subject, rank per subject and overall, appréciation band (FR) or letter grade (EN). Recomputed on demand, cached per term.
6. **PDF generation — server-side** via a `createServerFn` that renders a print-styled HTML template with Puppeteer-equivalent (we'll use `@react-pdf/renderer` since Workers can't run Chromium). Two templates: `BulletinFR.tsx`, `ReportCardEN.tsx`. Bilingual header on both. Pulls school logo from Storage.
7. **Batch export** — generate all PDFs for a class/term, zip via JSZip, stream as download.
8. **Dashboard** — classes list, per-term entry completion %, quick actions.

## 4. Subsystem Configuration

Single `subsystem` enum drives:
- Term labels (`Trimestre 1/2/3` vs `First/Second/Third Term`)
- Mark scale (`/20` vs `/100`)
- Grade bands (configurable JSON per school, seeded with the defaults from the spec)
- Field labels in UI + PDF
- Which PDF template is used

## 5. Seed Data

- **Lycée Bilingue de Yaoundé** — Francophone, 3 classes (6e A, 3e B, 1ère D), ~10 students each, subjects with realistic coefficients (Maths 4, Français 4, Anglais 2, Physique-Chimie 3, SVT 2, Histoire-Géo 2, EPS 1, etc.).
- **Government Bilingual High School Buea** — Anglophone, 3 classes (Form 1, Form 4 Science, Lower Sixth Arts), ~10 students each, GCE-style subject lists.
- Sample marks pre-entered for Term/Trimestre 1 so the PDF and ranking work immediately.

## 6. Routes

```
/                          → marketing landing
/auth                      → sign in / sign up
/_authenticated/setup      → wizard (first-run)
/_authenticated/dashboard
/_authenticated/classes
/_authenticated/classes/$classId
/_authenticated/classes/$classId/grades        → entry grid
/_authenticated/students
/_authenticated/staff
/_authenticated/bulletins                      → generate / batch export
/_authenticated/settings
```

Server fns under `src/lib/*.functions.ts`. PDF render is a server fn returning a base64 PDF or a `/api/public` route for download streams.

## 7. Phase 2 (deferred — NOT built in this pass)

Mobile Money billing (Campay / Notch Pay), parent portal + SMS, multi-year history, remark bank, analytics, full FR/EN UI toggle independent of subsystem.

---

## Build order for this turn

1. Enable Lovable Cloud.
2. Install fonts + set up Academic Navy design tokens.
3. Migration: full schema + RLS + GRANTs + seed data.
4. Auth + role middleware.
5. Setup wizard + dashboard shell.
6. Classes / students / subjects CRUD + CSV import.
7. Grade entry grid + calculation engine.
8. PDF templates (FR + EN) + single + batch export.
9. Polish landing page + sitemap/robots.

This is multi-turn work. After you approve the plan I'll start with steps 1–3 (Cloud, design system, schema + seed) so the foundation is solid before UI.
