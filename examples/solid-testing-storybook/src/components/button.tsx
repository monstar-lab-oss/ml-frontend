import { Component, JSXElement } from "solid-js";
import classes from "./button.module.css";

export interface Props {
  children?: JSXElement;
}

export const Button: Component<Props> = (props) => {
  return (
    <button role="button" class={classes.button}>
      {props.children}
    </button>
  );
};
