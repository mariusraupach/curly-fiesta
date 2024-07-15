"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";

import { onSubmit } from "./actions";
import { userSchema } from "./schema";

export default function Home() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: userSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="email"
        children={(field) => {
          console.log(field.state.meta.errors);
          console.log(field.form.state.errors);

          return (
            <>
              <label htmlFor={field.name}>{field.name}</label>
              <input
                onChange={(event) => field.handleChange(event.target.value)}
                type="email"
              />
              <>
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(",")}</em>
                ) : null}
                {field.state.meta.isValidating ? "Validating..." : null}
              </>
            </>
          );
        }}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => {
          return (
            <button disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </button>
          );
        }}
      />
    </form>
  );
}
