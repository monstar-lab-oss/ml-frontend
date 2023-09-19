import { Link } from "wouter";

export function NavLink() {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </div>
  );
}
