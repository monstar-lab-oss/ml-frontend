import { onMount, onCleanup, JSXElement, children } from "solid-js";
import { NavLink } from "@/ui/nav-link";

type Props = {
  children: JSXElement;
};
export function Layout(props: Props) {
  onMount(() => console.log("mount"));
  onCleanup(() => console.log("unmount"));

  return (
    <>
      <NavLink />
      {children(() => props.children)}
    </>
  );
}
