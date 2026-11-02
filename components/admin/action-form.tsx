"use client";

import { startTransition, useActionState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { FormState } from "@/app/admin/actions";

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

/**
 * Posts through a server action without React's automatic form reset, so what you typed stays
 * on screen after saving. Shows the result in a sticky bar at the bottom.
 */
export function ActionForm({
  action,
  label = "Save changes",
  children,
}: {
  action: Action;
  label?: string;
  children: ReactNode;
}) {
  const [state, dispatch, pending] = useActionState(action, {} as FormState);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => dispatch(data));
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {children}
      <div className="panel sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 !py-3">
        <p
          role="status"
          aria-live="polite"
          className={`min-h-6 font-semibold ${state.error ? "text-red-800" : "text-ink"}`}
        >
          {state.error ?? state.message ?? ""}
        </p>
        <button type="submit" className="btn btn-solid" disabled={pending}>
          {pending ? "Saving…" : label}
        </button>
      </div>
    </form>
  );
}
