import classNames from "classnames/bind";
import styles from "./button.module.scss";
import { Link } from "wouter";
import { ButtonHTMLAttributes } from "react";

const cx = classNames.bind(styles);

type Props = {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional click handler
   */
  to?: string;
};

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  to,
  ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const className = cx([
    "storybook-button",
    `storybook-button--${size}`,
    primary ? "storybook-button--primary" : "storybook-button--secondary",
  ]);

  return (
    <button
      type="button"
      className={className}
      style={{ backgroundColor }}
      {...props}
    >
      {to ? <Link to={to}>{label}</Link> : label}
    </button>
  );
};
