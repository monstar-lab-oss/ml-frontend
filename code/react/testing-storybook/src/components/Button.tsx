import classes from "./button.module.css";

export const Button = ({ children }: React.PropsWithChildren) => {
  return (
    <button role="button" className={classes.button}>
      {children}
    </button>
  );
};
