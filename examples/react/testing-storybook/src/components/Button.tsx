import classes from "./button.module.css";

export const Button: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <button role="button" className={classes.button}>
      {props.children}
    </button>
  );
};
