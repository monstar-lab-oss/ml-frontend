import { A } from "@solidjs/router";

export function NavLink() {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <A href="/">Home</A>
      <A href="/about">About</A>
    </div>
  );
}
