"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import useAuth from "@/hooks/authHooks/useAuth";
import { setUser, setAccessToken, clearAuth } from "@/store/auth-slice";
import { useToast } from "@/hooks/useToast";

const roleRedirectMap: Record<string, string> = {
  SuperAdmin: "/super-admin/dashboard",
  Admin: "/admin/dashboard",
  TenantAdmin: "/tenant/dashboard",
  Instructor: "/instructor/dashboard",
  Student: "/student/dashboard",
};

const CheckAuthComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { showError } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { authUserQuery, checkAuthQuery, refreshTokenMutation } = useAuth();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Wait until queries are fetched
        if (checkAuthQuery.isFetching || authUserQuery.isFetching) return;

        // 1️⃣ Check if user is already authenticated
        if (checkAuthQuery.data?.authenticated && authUserQuery.data) {
          const user = authUserQuery.data;
          dispatch(setUser(user));
          dispatch(setAccessToken(user.accessToken || null));

          const role = user.roles?.[0];
          if (role && roleRedirectMap[role]) {
            router.replace(roleRedirectMap[role]);
          }
        } else {
          // 2️⃣ Try refreshing token
          const refreshed = await refreshTokenMutation.mutateAsync();
          if (refreshed) {
            dispatch(setUser(refreshed));
            dispatch(setAccessToken(refreshed.accessToken || null));

            const role = refreshed.roles?.[0];
            if (role && roleRedirectMap[role]) {
              router.replace(roleRedirectMap[role]);
            }
          } else {
            // 3️⃣ Not authenticated
            dispatch(clearAuth());
            router.replace("/auth/login");
          }
        }
      } catch (err: any) {
        dispatch(clearAuth());
        showError("Session expired. Please login again.");
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
    // ✅ Run only once on mount
  }, []);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
};

export default CheckAuthComponent;
