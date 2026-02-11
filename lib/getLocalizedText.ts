export function getLocalizedText(
  value: string | Record<string, string> | undefined,
  locale: string
) {
  if (!value) return "";
  return typeof value === "object" ? value[locale] ?? "" : value;
}
