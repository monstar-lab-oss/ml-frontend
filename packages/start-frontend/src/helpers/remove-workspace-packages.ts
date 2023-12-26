export function removeWorkspacePackages(deps: Record<string, string>) {
  const filteredEntries = Object.entries(deps).filter(
    ([, value]) => !value.startsWith("workspace:")
  );

  return Object.fromEntries(filteredEntries);
}
