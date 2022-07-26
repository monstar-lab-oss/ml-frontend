import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "wouter";
import { ButtonHTMLAttributes } from "react";
import type { PropsWithChildren } from "react";

const cx = classNames.bind(styles);

type Props = {
  /**
   * How large should the button be?
   */
  size?: "medium" | "large";
  /**
   * Optional link handler
   */
  to?: string;
  /**
   * What background color to use
   */
  backgroundColor?: string;
};

export const Button = ({
  size = "medium",
  to,
  backgroundColor,
  children,
  ...props
}: PropsWithChildren<Props> & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const className = cx(["button", size && `size--${size}`]);

  return (
    <button
      type="button"
      className={className}
      style={{
        backgroundColor,
      }}
      {...props}
    >
      {to ? <Link to={to}>{children}</Link> : children}
    </button>
  );
};
