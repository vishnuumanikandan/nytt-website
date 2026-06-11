"use client";

import { useActionState } from "react";
import { createEventAction, createPostAction } from "@/lib/actions";
import { Button, Field, FormError, Input, Textarea } from "@/components/ui";

export function PostForm() {
  const [state, formAction, pending] = useActionState(createPostAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FormError message={state?.error} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Title" htmlFor="post-title">
          <Input id="post-title" name="title" defaultValue={state?.values?.title} required />
        </Field>
        <Field label="Author" htmlFor="post-author">
          <Input id="post-author" name="author" defaultValue={state?.values?.author} required placeholder="Full name" />
        </Field>
      </div>
      <Field
        label="Excerpt"
        htmlFor="post-excerpt"
        hint="One or two sentences shown on the Journal index."
      >
        <Textarea id="post-excerpt" name="excerpt" defaultValue={state?.values?.excerpt} required rows={2} />
      </Field>
      <Field
        label="Body"
        htmlFor="post-body"
        hint="Plain text. Separate paragraphs with a blank line."
      >
        <Textarea id="post-body" name="body" defaultValue={state?.values?.body} required rows={10} />
      </Field>
      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Publishing…" : "Publish post"}
        </Button>
      </div>
    </form>
  );
}

export function EventForm() {
  const [state, formAction, pending] = useActionState(createEventAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FormError message={state?.error} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Title" htmlFor="event-title">
          <Input id="event-title" name="title" defaultValue={state?.values?.title} required />
        </Field>
        <Field
          label="Format"
          htmlFor="event-format"
          hint="Competition, workshop, briefing."
        >
          <Input id="event-format" name="format" defaultValue={state?.values?.format} placeholder="Workshop" />
        </Field>
      </div>
      <Field label="Description" htmlFor="event-description">
        <Textarea id="event-description" name="description" defaultValue={state?.values?.description} required rows={3} />
      </Field>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Date and time" htmlFor="event-starts">
          <Input
            id="event-starts"
            name="startsAt" defaultValue={state?.values?.startsAt}
            type="datetime-local"
            required
          />
        </Field>
        <Field label="Location" htmlFor="event-location">
          <Input
            id="event-location"
            name="location" defaultValue={state?.values?.location}
            placeholder="Virtual, or a venue"
          />
        </Field>
      </div>
      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create event"}
        </Button>
      </div>
    </form>
  );
}
