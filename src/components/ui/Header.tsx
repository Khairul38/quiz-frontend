"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, Dropdown } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { IAuthState, userLoggedOut } from "@/redux/features/auth/authSlice";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppSelector((state: { auth: IAuthState }) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    router.push("/login");
    dispatch(userLoggedOut());
    localStorage.clear();
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto py-4 px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="QUIZ Logo"
            width={32}
            height={32}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            QUIZ
          </span>
        </Link>
        <div className="flex items-center md:order-2">
          <DarkModeSwitcher />

          {!user ? (
            <>
              <button
                onClick={() => {
                  router.push("/login");
                }}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mx- dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3"
              >
                Login
              </button>
              <button
                onClick={() => {
                  router.push("/register");
                }}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mx- dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  router.push(
                    user.role === "super_admin" || "admin"
                      ? "/create-quiz"
                      : "/leader-board"
                  );
                }}
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 mx-4 text-center"
              >
                {user.role === "super_admin" || "admin"
                  ? "Create Quiz"
                  : "Leader Board"}
              </button>
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar
                    alt="User settings"
                    img="./avatar-04.jpg"
                    rounded={true}
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user?.name}</span>
                  <span className="block truncate text-sm font-medium">
                    {user?.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleLogout()}>
                  Logout
                </Dropdown.Item>
              </Dropdown>
            </>
          )}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 ml-4 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={`block py-2 pl-3 pr-4 md:bg-transparent rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
                  pathname === "/"
                    ? "bg-blue-700 text-white md:text-blue-700 md:dark:text-blue-500"
                    : "text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700 "
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
