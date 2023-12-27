"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Loader from "@/components/common/Loader";
import Textarea from "@/components/common/Textarea";
import { notify } from "@/components/common/Toastify";
// import { useRefreshTokenMutation } from "@/redux/features/auth/authApi";
import { IAuthState, userUpdate } from "@/redux/features/auth/authSlice";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ProfileUpdateFormInputs {
  name: string;
  email: string;
  contactNo: string;
  address: string;
  profileImg: string;
}

const UpdateProfilePage = () => {
  const { user } = useAppSelector((state: { auth: IAuthState }) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [updateUser, { data, isLoading, isSuccess, error }] =
    useUpdateUserMutation();

  // const [refreshToken, {}] = useRefreshTokenMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUpdateFormInputs>();

  const onSubmit = (data: ProfileUpdateFormInputs) => {
    // console.log(data);
    updateUser({ id: user?.id, data });
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((key) => {
        notify("error", (errors as any)[key].message);
      });
    }
    if (error) {
      notify("error", (error as any)?.data?.message);
    }
    if (isSuccess) {
      notify("success", "Profile updated successfully");
      dispatch(
        userUpdate({
          name: data?.data?.name,
          email: data?.data?.email,
          contactNo: data?.data?.contactNo,
          profileImg: data?.data?.profileImg,
          address: data?.data?.address,
        })
      );
      // refreshToken({});
      router.push("/profile");
    }
  }, [data, isSuccess, error, errors]);

  if (!user)
    return <Loader className="h-[50vh] flex items-end justify-center" />;
  return (
    <div className="pt-28 pb-10 px-8 mx-auto max-w-screen-2xl">
      <div className="flex items-start flex-wrap mb-5">
        <h1 className="text-2xl md:text-3xl text-gray-900 dark:text-white font-bold flex-1 whitespace-nowrap">
          Update Profile ✨
        </h1>
      </div>
      <div className="dark:text-gray-300 bg-white border border-blue-200 rounded-lg dark:bg-gray-800 dark:border-blue-700 shadow-md shadow-blue-200 dark:shadow-blue-500 p-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end mb-5">
            <Input
              type="name"
              label="Your name"
              placeholder="Insert your name here."
              mandatory
              defaultValue={user.name}
              hookForm={{
                ...register("name", { required: "name is required" }),
              }}
            />
            <Input
              type="email"
              label="Your email"
              placeholder="Insert your email here."
              mandatory
              defaultValue={user.email}
              hookForm={{
                ...register("email", { required: "email is required" }),
              }}
            />
            <Input
              type="tel"
              label="Your phone number"
              placeholder="Insert your phone number here."
              defaultValue={user.contactNo}
              hookForm={{
                ...register("contactNo"),
              }}
            />
            <Input
              type="url"
              label="Your profile image URL"
              placeholder="Insert your profile image URL here."
              defaultValue={user.profileImg}
              hookForm={{
                ...register("profileImg"),
              }}
            />
            <div className="col-span-2">
              <Textarea
                type="text"
                label="Your address"
                placeholder="Insert your address here."
                defaultValue={user.address}
                hookForm={{
                  ...register("address"),
                }}
              />
            </div>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <Button
              onClick={() => {
                router.push("/profile");
              }}
              type="button"
              color="danger"
            >
              Cancel
            </Button>
            <Button type="submit">
              {isLoading ? (
                <Loader className="px-[35.5px]" color="text-white" />
              ) : (
                "Update profile"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
