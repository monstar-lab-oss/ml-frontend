type Options = {
  key?: string;
  value?: string;
};

export function omit(
  dependencies: Record<string, string>,
  { key, value }: Options
) {
  const filteredEntries = Object.entries(dependencies)
    .filter(([k]) => (key ? ![key].includes(k) : true))
    .filter(([, v]) => (value ? ![value].includes(v) : true));

  return Object.fromEntries(filteredEntries);
}
