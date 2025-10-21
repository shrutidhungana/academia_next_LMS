"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAuth from "@/hooks/authHooks/useAuth";
import { setUser, setAccessToken, clearAuth } from "@/store/auth-slice";
import { useToast } from "@/hooks/useToast";

const CheckAuthComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { showError } = useToast();
  const [loading, setLoading] = useState(true);

  const { authUserQuery, checkAuthQuery, refreshTokenMutation } = useAuth();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        let token = localStorage.getItem("accessToken");
        if (!token) {
          dispatch(clearAuth());
          setLoading(false);
          return;
        }

        let authCheckResult;
        let authUserResult;

        try {
          authCheckResult = await checkAuthQuery.refetch();
          authUserResult = await authUserQuery.refetch();
        } catch {
          const refreshRes = await refreshTokenMutation.mutateAsync();
          if (!refreshRes?.accessToken)
            throw new Error("Unable to refresh token");

          token = refreshRes.accessToken;
          dispatch(setAccessToken(token));
          localStorage.setItem("accessToken", token);

          authCheckResult = await checkAuthQuery.refetch();
          authUserResult = await authUserQuery.refetch();
        }

        const authCheck = authCheckResult.data?.authenticated;
        const user = authUserResult.data;

        if (authCheck && user) {
          dispatch(setUser(user));
          dispatch(setAccessToken(token));
        } else {
          dispatch(clearAuth());
        }
      } catch (err: any) {
        dispatch(clearAuth());
        showError(err?.message??"Session expired. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
};

export default CheckAuthComponent;
