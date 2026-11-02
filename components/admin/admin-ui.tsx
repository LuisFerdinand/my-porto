import type { ReactNode } from "react";

export function PageHeader({
  title,
  intro,
  viewHref,
  actions,
}: {
  title: string;
  intro: string;
  viewHref?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-[40rem]">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none tracking-[-0.035em]">{title}</h1>
        <p className="muted mt-3">{intro}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {actions}
        {viewHref && (
          <a href={viewHref} target="_blank" rel="noopener noreferrer" className="btn btn-quiet btn-sm">
            View on site
          </a>
        )}
      </div>
    </div>
  );
}

export function Field({
  label,
  htmlFor,
  help,
  children,
}: {
  label: string;
  htmlFor: string;
  help?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="field-label">
        {label}
      </label>
      {children}
      {help && (
        <p id={`${htmlFor}-help`} className="help">
          {help}
        </p>
      )}
    </div>
  );
}

export function TextField({
  name,
  label,
  defaultValue,
  help,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string | number;
  help?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <Field label={label} htmlFor={name} help={help}>
      <input
        id={name}
        name={name}
        type={type}
        className="field"
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        aria-describedby={help ? `${name}-help` : undefined}
      />
    </Field>
  );
}

export function AreaField({
  name,
  label,
  defaultValue,
  help,
  rows = 4,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  help?: string;
  rows?: number;
}) {
  return (
    <Field label={label} htmlFor={name} help={help}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className="field"
        defaultValue={defaultValue}
        aria-describedby={help ? `${name}-help` : undefined}
      />
    </Field>
  );
}

/**
 * One text, two languages: an English input named `name` and an Indonesian one named `name__id`.
 * Leave the Indonesian one empty and the site shows the English text on the Indonesian pages.
 */
export function BiField({
  name,
  label,
  en,
  id,
  help,
  area = false,
  rows = 3,
  required,
}: {
  name: string;
  label: string;
  en?: string;
  id?: string;
  help?: string;
  area?: boolean;
  rows?: number;
  required?: boolean;
}) {
  const props = { className: "field" } as const;
  return (
    <fieldset className="min-w-0">
      <legend className="field-label">{label}</legend>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label htmlFor={name} className="small muted mb-1 block font-bold">
            English
          </label>
          {area ? (
            <textarea id={name} name={name} rows={rows} defaultValue={en} {...props} />
          ) : (
            <input id={name} name={name} defaultValue={en} required={required} {...props} />
          )}
        </div>
        <div>
          <label htmlFor={`${name}__id`} className="small muted mb-1 block font-bold">
            Bahasa Indonesia
          </label>
          {area ? (
            <textarea id={`${name}__id`} name={`${name}__id`} rows={rows} defaultValue={id} {...props} />
          ) : (
            <input id={`${name}__id`} name={`${name}__id`} defaultValue={id} {...props} />
          )}
        </div>
      </div>
      {help && <p className="help">{help}</p>}
    </fieldset>
  );
}

/** Reads the stored Indonesian text for a field out of id_content. */
export function idText(map: Record<string, unknown>, key: string): string {
  const v = map[key];
  return typeof v === "string" ? v : "";
}
