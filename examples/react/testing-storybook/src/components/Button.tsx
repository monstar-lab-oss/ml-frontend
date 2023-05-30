import React, { FunctionComponent, PropsWithChildren } from "react";
import classes from "./button.module.css";

export const Button: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <button role="button" className={classes.button}>
      {props.children}
    </button>
  );
};
