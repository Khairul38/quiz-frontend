"use client";
import React, { useState } from "react";
import Profile from "../../../assets/avatar-04.jpg";
import ProfileBg from "../../../assets/profile-bg.jpg";
import Image from "next/image";
import { HiPencil } from "react-icons/hi";
import { useRouter } from "next/navigation";
import {
  MdOutlineLocationOn,
  MdOutlineAlternateEmail,
  MdOutlineLocalPhone,
} from "react-icons/md";
import { useAppSelector } from "@/redux/reduxHooks";
import { IAuthState } from "@/redux/features/auth/authSlice";
import Loader from "@/components/common/Loader";


const ProfilePage = () => {
  const { user } = useAppSelector((state: { auth: IAuthState }) => state.auth);
  const router = useRouter();

  // console.log(user)

  if (!user)
    return <Loader className="h-[50vh] flex items-end justify-center" />;
  return (
    <div>
      <div>
        {/* Profile background */}
        <div className="relative h-56 bg-slate-200">
          <Image
            className="object-cover h-full w-full"
            src={ProfileBg.src}
            width="979"
            height="220"
            alt="Profile background"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative px-4 sm:px-6 pb-8">
          {/* Pre-header */}
          <div className="-mt-16 mb-6 sm:mb-3">
            <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-end">
              {/* Avatar */}
              <div className="inline-flex -ml-1 -mt-1 mb-4 sm:mb-0">
                <Image
                  className="rounded-full border-4 border-white dark:border-gray-900"
                  src={user.profileImg ? user.profileImg : Profile}
                  width="128"
                  height="128"
                  alt="Avatar"
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-2 sm:mb-2">
                <button
                  onClick={() => {
                    router.push(`/update-profile`);
                  }}
                  className="p-1.5 shrink-0 rounded border border-slate-200 hover:border-slate-300 dark:border-slate-600 dark:hover:border-slate-500 dark:bg-slate-700 shadow-sm"
                >
                  <HiPencil
                    size={20}
                    className="text-slate-500 cursor-pointer dark:text-gray-300"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Header */}
          <header className="text-center sm:text-left mb-6">
            {/* Name */}
            <div className="inline-flex items-start mb-2">
              <h1 className="text-2xl text-slate-800 dark:text-white font-bold">
                {user.name}
              </h1>
              <svg
                className="w-4 h-4 fill-current shrink-0 text-amber-500 ml-2"
                viewBox="0 0 16 16"
              >
                <path d="M13 6a.75.75 0 0 1-.75-.75 1.5 1.5 0 0 0-1.5-1.5.75.75 0 1 1 0-1.5 1.5 1.5 0 0 0 1.5-1.5.75.75 0 1 1 1.5 0 1.5 1.5 0 0 0 1.5 1.5.75.75 0 1 1 0 1.5 1.5 1.5 0 0 0-1.5 1.5A.75.75 0 0 1 13 6ZM6 16a1 1 0 0 1-1-1 4 4 0 0 0-4-4 1 1 0 0 1 0-2 4 4 0 0 0 4-4 1 1 0 1 1 2 0 4 4 0 0 0 4 4 1 1 0 0 1 0 2 4 4 0 0 0-4 4 1 1 0 0 1-1 1Z" />
              </svg>
            </div>
            {/* Bio */}
            <div className="text-sm mb-3 text-slate-500">
              {user.role === "super_admin"
                ? "Super Admin"
                : user.role === "admin"
                ? "Admin"
                : "Performer"}
            </div>
            {/* Meta */}
            <div className="flex flex-wrap justify-center sm:justify-start space-x-4">
              {user.address && (
                <div className="flex items-center">
                  <MdOutlineLocationOn size={21} className="text-slate-400" />
                  <span className="text-sm font-medium whitespace-nowrap text-slate-500 ml-2">
                    {user.address}
                  </span>
                </div>
              )}
              {user.email && (
                <div className="flex items-center">
                  <MdOutlineAlternateEmail
                    size={21}
                    className="text-slate-400"
                  />
                  <span className="text-sm font-medium whitespace-nowrap text-slate-500 ml-2">
                    {user.email}
                  </span>
                </div>
              )}
              {user.contactNo && (
                <div className="flex items-center">
                  <MdOutlineLocalPhone size={21} className="text-slate-400" />
                  <span className="text-sm font-medium whitespace-nowrap text-slate-500 ml-2">
                    {user.contactNo}
                  </span>
                </div>
              )}
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
