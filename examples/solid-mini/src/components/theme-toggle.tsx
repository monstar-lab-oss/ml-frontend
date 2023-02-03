import { createEffect, createSignal, onCleanup } from "solid-js";
import classes from "./theme-toggle.module.css";

type Props = {
  name: string;
};
export default function ThemeToggle(props: Props) {
  const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

  const [isDarkMode, setIsDarkMode] = createSignal(matchMedia.matches);

  createEffect(() => {
    isDarkMode()
      ? document.body.classList.add("dark-scheme")
      : document.body.classList.remove("dark-scheme");
  });

  createEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

    matchMedia.addEventListener("change", handleChange);
    onCleanup(() => matchMedia.removeEventListener("change", handleChange));
  });

  const toggle = () => setIsDarkMode((s) => !s);

  return (
    <div class={classes.wrapper}>
      <h1 aria-label={props.name}>Getting started with {props.name}</h1>
      <button class={classes.button} role="button" onClick={toggle}>
        Click to switch {isDarkMode() ? "light" : "dark"} mode
      </button>
    </div>
  );
}
