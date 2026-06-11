"use client";

import { useActionState } from "react";
import { registerChapterAction } from "@/lib/actions";
import { Button, Field, FormError, Input, Textarea } from "@/components/ui";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerChapterAction,
    null,
  );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <FormError message={state?.error} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="School name" htmlFor="schoolName">
          <Input
            id="schoolName"
            name="schoolName"
            defaultValue={state?.values?.schoolName}
            required
            autoComplete="organization"
            placeholder="Council Rock High School North"
          />
        </Field>
        <Field label="City" htmlFor="city">
          <Input id="city" name="city"
            defaultValue={state?.values?.city} required placeholder="Newtown" />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label="State or country"
          htmlFor="state"
          hint="For schools outside the U.S., the country."
        >
          <Input id="state" name="state"
            defaultValue={state?.values?.state} placeholder="PA" />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <Input
            id="phone"
            name="phone"
            defaultValue={state?.values?.phone}
            type="tel"
            autoComplete="tel"
            placeholder="(215) 555-0184"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Contact name" htmlFor="contactName">
          <Input
            id="contactName"
            name="contactName"
            defaultValue={state?.values?.contactName}
            required
            autoComplete="name"
            placeholder="Your full name"
          />
        </Field>
        <Field
          label="Contact role"
          htmlFor="contactTitle"
          hint="Student, advisor, coach, teacher."
        >
          <Input id="contactTitle" name="contactTitle"
            defaultValue={state?.values?.contactTitle} placeholder="Student" />
        </Field>
      </div>

      <Field label="Email" htmlFor="email" hint="This becomes your chapter login.">
        <Input
          id="email"
          name="email"
            defaultValue={state?.values?.email}
          type="email"
          required
          autoComplete="email"
          placeholder="you@school.edu"
        />
      </Field>

      <Field
        label="Password"
        htmlFor="password"
        hint="At least 8 characters. You will use this to track your application."
      >
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </Field>

      <Field
        label="Why do you want to start a chapter?"
        htmlFor="motivation"
        hint="A few sentences. This is the heart of the application."
      >
        <Textarea
          id="motivation"
          name="motivation"
          defaultValue={state?.values?.motivation}
          required
          minLength={40}
          rows={5}
          placeholder="What would your chapter work on, and why does it matter to your community?"
        />
      </Field>

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Submitting application…" : "Submit application"}
      </Button>
    </form>
  );
}
