"use client";

import { useActionState } from "react";
import { adminLoginAction } from "@/lib/actions";
import { Button, Field, FormError, Input } from "@/components/ui";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminLoginAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <FormError message={state?.error} />

      <Field label="Username" htmlFor="username">
        <Input
          id="username"
          name="username"
          required
          autoComplete="username"
          defaultValue={state?.values?.username}
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
