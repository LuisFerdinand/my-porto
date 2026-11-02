"use client";

import { useActionState } from "react";
import { login } from "./actions";
import type { LoginState } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="mt-8 grid gap-5">
      <div>
        <label htmlFor="username" className="field-label">
          Username
        </label>
        <input
          id="username"
          name="username"
          className="field"
          autoComplete="username"
          defaultValue={state.username}
          required
          autoFocus
        />
      </div>
      <div>
        <label htmlFor="password" className="field-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="field"
          autoComplete="current-password"
          required
        />
      </div>
      <p role="alert" className="min-h-6 font-semibold text-red-800">
        {state.error}
      </p>
      <button type="submit" className="btn btn-solid" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
