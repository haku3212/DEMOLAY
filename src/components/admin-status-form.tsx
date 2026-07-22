import { updateSubmissionStatus } from "@/app/admin/actions";

export function AdminStatusForm({
  id,
  status,
  label,
  variant = "primary"
}: {
  id: string;
  status: "approved" | "rejected" | "suspended";
  label: string;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const className =
    variant === "primary"
      ? "bg-[#b11226] text-white hover:bg-[#8f0d1e]"
      : variant === "secondary"
        ? "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800";

  return (
    <form action={updateSubmissionStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className={`${className} inline-flex min-h-10 items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold transition`}
      >
        {label}
      </button>
    </form>
  );
}
