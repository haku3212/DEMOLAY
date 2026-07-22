import { updateReportStatus } from "@/app/admin/actions";

export function AdminReportStatusForm({
  id,
  status,
  label
}: {
  id: string;
  status: "reviewed" | "dismissed";
  label: string;
}) {
  return (
    <form action={updateReportStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
      >
        {label}
      </button>
    </form>
  );
}
