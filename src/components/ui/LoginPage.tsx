"use client";

import { useLoginMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Loader from "../common/Loader";
import { useEffect } from "react";
import { notify } from "../common/Toastify";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import Input from "../common/Input";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [login, { data, isLoading, error }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    login({ email: data.email, password: data.password });
  };

  useEffect(() => {
    // if (isLoggedIn) {
    //   navigate(from, { replace: true });
    // }
    if (error) {
      notify("error", (error as any)?.data?.message);
    }
    if (data?.data?.accessToken) {
      notify("success", "User login successfully");
      router.push("/");
      // navigate(from, { replace: true });
    }
  }, [data, error]);

  return (
    <div className="flex justify-center align-middle items-center px-8 min-h-screen">
      <div className="p-5 sm:p-12 my-16 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-9/12 lg:w-6/12 xl:w-4/12">
        <div>
          <div className="flex flex-col space-y-2 text-center mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Login to your account
            </h1>
            <p className="text-sm text-muted-foreground text-gray-900 dark:text-white">
              Enter your email & password below
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-gray-900 dark:text-white"
          >
            <div>
              <Input
                label="Your email"
                mandatory
                type="email"
                id="email"
                placeholder="Inter your email here"
                required
                hookForm={{
                  ...register("email", { required: "Email is required" }),
                }}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Input
                label="Your password"
                placeholder="Inter your password here"
                mandatory
                type="password"
                id="password"
                required
                hookForm={{
                  ...register("password", { required: "Password is required" }),
                }}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-start">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                New user?{" "}
                <Link
                  className="text-blue-500 hover:text-blue-600"
                  href={"/register"}
                >
                  Create an account
                </Link>
              </p>
            </div>
            <Button type="submit" className="w-full px-5 py-2.5">
              {isLoading ? <Loader color="text-white" /> : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
