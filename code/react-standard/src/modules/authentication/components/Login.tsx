import { Button } from "@/components/atoms/Button";
import { useAuth } from "../context/use-auth";
import { Redirect } from "wouter";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type Values = { email: string; password: string };

const defaultValues = {
  email: "eve.holt@reqres.in",
  password: "cityslicka",
};

export const Login = () => {
  const { isLoggedIn, login } = useAuth();

  if (isLoggedIn) return <Redirect to="/home" />;

  const {
    reset,
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    reValidateMode: "onChange",
    defaultValues,
  });

  const onSubmit = ({ email, password }: Values) => login({ email, password });

  const onReset = () => reset(defaultValues);

  useEffect(() => {
    if (!login.isError) return;

    const message = "incorrect login user";
    setError("email", { type: "server", message });
    setError("password", { type: "server", message });
  }, [login.isError]);

  return (
    <>
      <p>Log into React boilerplate</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          placeholder="email"
          id="email"
          aria-errormessage="erroremail"
          aria-invalid={!!errors.email}
          {...register("email", { required: true })}
        />
        <span id="erroremail" className="errormessage">
          {errors.email?.message || "email is required"}
        </span>
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          aria-errormessage="errorpassword"
          aria-invalid={!!errors.password}
          {...register("password", { required: true })}
        />
        <span id="errorpassword" className="errormessage">
          {errors.password?.message || "password is required"}
        </span>
        <div
          style={{
            marginTop: "0.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "10px",
          }}
        >
          <Button backgroundColor="#D9D9D9" onClick={onReset}>
            Reset login user
          </Button>
          <Button type="submit">{isSubmitting ? "Loading..." : "Login"}</Button>
        </div>
      </form>
    </>
  );
};
