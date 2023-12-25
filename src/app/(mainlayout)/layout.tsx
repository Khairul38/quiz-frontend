"use client";

import Loader from "@/components/common/Loader";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import useAuth from "@/hooks/useAuth";
import useAuthCheck from "@/hooks/useAuthCheck";
import { userLoggedIn } from "@/redux/features/auth/authSlice";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathName = usePathname();
  const authChecked = useAuthCheck();
  const isLoggedIn = useAuth();
  const auth = useAppSelector((state) => state.auth);

  // console.log(auth, isLoggedIn);

  useEffect(() => {
    const localAuth = localStorage.getItem("auth");

    if (!isLoggedIn) {
      if (localAuth != null) {
        const auth = JSON.parse(localAuth);
        dispatch(userLoggedIn(auth.accessToken));
        setLoading(false);
      } else {
        router.replace("/login");
        setLoading(false);
      }
    }
    setLoading(false);
  }, [isLoggedIn, dispatch, router]);

  if (loading)
    return <Loader className="h-[50vh] flex items-end justify-center" />;

  // useEffect(() => {
  //   if (authChecked && !isLoggedIn) {
  //     router.push("/login");
  //   }
  // }, [router, pathName, authChecked, isLoggedIn]);

  // if (!authChecked) return <Loader className="h-screen" />;;

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-181px)]">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
