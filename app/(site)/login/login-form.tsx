"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions";
import { Button, Field, FormError, Input } from "@/components/ui";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <FormError message={state?.error} />

      <Field label="Email" htmlFor="email">
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@school.edu"
          defaultValue={state?.values?.email}
        />
      </Field>

      <Field label="Password" htmlFor="password">
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </Field>

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Logging in…" : "Log in"}
      </Button>
    </form>
  );
}
