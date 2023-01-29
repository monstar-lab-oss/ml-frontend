import { useEffect, useState } from "react";
import classes from "./theme-toggle-logo.module.css";

type Props = {
  name: string;
};
export function ThemeToggleLogo(props: Props) {
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
      <h1 aria-label={props.name}>
        <img src="logo.svg" role="button" onClick={toggle} alt={props.name} />
        <span>{props.name}</span>
      </h1>
      <p>Click the icon to switch between light and dark mode</p>
    </div>
  );
}
