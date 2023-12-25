"use client";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Loader from "../common/Loader";
import { useEffect } from "react";
import { notify } from "../common/Toastify";
import { useRouter } from "next/navigation";
import Button from "../common/Button";

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const [signup, { data, isLoading, error }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  console.log(data)

  const onSubmit = (data: SignupFormInputs) => {
    if (data.password !== data.confirmPassword) {
      notify("error", "Password do not match");
    } else {
      signup({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    }
  };

  useEffect(() => {
    // if (isLoggedIn) {
    //   navigate(from, { replace: true });
    // }
    if (error) {
      notify("error", (error as any)?.data?.message);
    }
    if (data?.data?.accessToken) {
      notify("success", "User register successfully");
      router.push("/");
      // navigate(from, { replace: true });
    }
  }, [data, error]);

  return (
    <div className="flex justify-center align-middle items-center px-8 min-h-screen">
      <div className="p-5 sm:p-12 bg-white border my-16 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-9/12 lg:w-6/12 xl:w-4/12">
        <div>
          <div className="flex flex-col space-y-2 text-center mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground text-gray-900 dark:text-white">
              Enter your info to create your account
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@gmail.com"
                required
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="flex items-start">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Already have an account?{" "}
                <Link
                  className="text-blue-500 hover:text-blue-600"
                  href={"/login"}
                >
                  Login
                </Link>
              </p>
            </div>
            <Button
              type="submit"
              className="w-full px-5 py-2.5"
            >
              {isLoading ? (
                <Loader color="text-white" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
