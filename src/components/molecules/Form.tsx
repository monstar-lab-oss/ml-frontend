import { FormHTMLAttributes } from "react";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import styles from "./Form.module.scss";
import { Button } from "@/components/atoms/Button";

const cx = classNames.bind(styles);

type Values = { email: string; password: string };

type Props = {
  onSubmit: (values: Values) => Promise<void>;
};

const defaultValues = {
  email: "",
  password: "",
};

export const Form = ({
  onSubmit: onSubmit,
}: Props & FormHTMLAttributes<HTMLFormElement>) => {
  const className = cx(["form"]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Values>({
    defaultValues,
  });

  return (
    <div className={className}>
      {!isSubmitting && isSubmitSuccessful && (
        <p data-testid="submit-success">Submit success</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            data-testid="email"
            type="email"
            disabled={isSubmitting}
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && <span>Email is required</span>}
          <label htmlFor="password">password</label>
        </div>
        <div>
          <input
            id="password"
            data-testid="password"
            type="password"
            disabled={isSubmitting}
            {...register("password", { required: true })}
          />
          {errors.password && <span>Password is required</span>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  );
};
