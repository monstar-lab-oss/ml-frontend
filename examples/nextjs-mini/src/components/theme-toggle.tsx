import { useEffect, useState } from "react";
import classes from "./theme-toggle.module.css";

type Props = {
  name: string;
};
export function ThemeToggle(props: Props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    isDarkMode
      ? document.body.classList.add("dark-scheme")
      : document.body.classList.remove("dark-scheme");
  }, [isDarkMode]);

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, []);

  const toggle = () => setIsDarkMode((s) => !s);

  return (
    <>
      <div className={classes.wrapper}>
        <h1 aria-label={props.name}>Getting started with {props.name}</h1>
        <button className={classes.button} role="button" onClick={toggle}>
          Click to switch {isDarkMode ? "light" : "dark"} mode
        </button>
      </div>
      <style global jsx>{`
        /* Dark theme CSS */
        :root {
          --light-color: #fcfbfb;
          --light-shadow-color: hsl(70deg 0% 85%);
          --dark-color: #24292f;
          --dark-shadow-color: hsl(0deg 10% 5%);

          color-scheme: light dark;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --color: var(--light-color);
            --background-color: var(--dark-color);
            --shadow-color: var(--dark-shadow-color);
          }
        }

        body.dark-scheme {
          --color: var(--light-color);
          --background-color: var(--dark-color);
          --shadow-color: var(--dark-shadow-color);
        }

        body {
          --color: var(--dark-color);
          --background-color: var(--light-color);
          --shadow-color: var(--light-shadow-color);

          color: var(--color);
          background-color: var(--background-color);
        }
      `}</style>
    </>
  );
}
