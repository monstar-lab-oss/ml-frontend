import { useEffect, useState } from "react";
import classes from "./theme-toggle.module.css";

type Props = {
  name: string;
};
export function ThemeToggle(props: Props) {
  const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

  const [isDarkMode, setIsDarkMode] = useState(matchMedia.matches);

  useEffect(() => {
    isDarkMode
      ? document.body.classList.add("dark-scheme")
      : document.body.classList.remove("dark-scheme");
  }, [isDarkMode]);

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, []);

  const toggle = () => setIsDarkMode((s) => !s);

  return (
    <div className={classes.wrapper}>
      <h1 aria-label={props.name}>Getting started with {props.name}</h1>
      <button className={classes.button} role="button" onClick={toggle}>
        Click to switch {isDarkMode ? "light" : "dark"} mode
      </button>
    </div>
  );
}
