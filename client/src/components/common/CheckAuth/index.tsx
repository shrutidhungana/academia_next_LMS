"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAuth from "@/hooks/authHooks/useAuth";
import { setUser, setAccessToken, clearAuth } from "@/store/auth-slice";
import { useToast } from "@/hooks/useToast";
import { UserData } from "@/types";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ROLE_REDIRECT_MAP } from "@/config/role.config";

const CheckAuthComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { showError } = useToast();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const userRole = useSelector(
    (state: RootState) => state.auth.user?.data?.roles?.[0]
  );

  const { authUserQuery, checkAuthQuery, refreshTokenMutation } = useAuth();

  useEffect(() => {
    if (!userRole) {
      if (router.pathname.startsWith("/guest")) {
        setLoading(false);
      } else {
        router.replace("/"); // redirect to login
      }
    } else {
      // User is logged in, check role-based redirect
      const allowedPath = ROLE_REDIRECT_MAP[userRole];
      if (!router.pathname.startsWith(allowedPath)) {
        router.replace(allowedPath); // redirect to role-based default page
      } else {
        setLoading(false);
      }
    }
  }, [userRole]);

  // Hydrate Redux from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser)
      dispatch(setUser({ data: JSON.parse(storedUser) as UserData }));
    if (storedToken) dispatch(setAccessToken(storedToken));
  }, [dispatch]);

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
        const userResponse = authUserResult.data;

        if (authCheck && userResponse?.data) {
          // Map UserResponse.data to UserData with defaults
          const mappedUserData: UserData = Object.assign(
            {
              id: "",
              firstName: "",
              middleName: "",
              lastName: "",
              username: "",
              phone: "",
              email: "",
              gender: "",
              maritalStatus: "",
              dateOfBirth: "",
              profilePicture: null,
              country: "",
              state: "",
              city: "",
              zip: "",
              address1: "",
              address2: "",
              roles: [],
              organization: "",
              department: "",
              jobTitle: "",
              howDidYouHear: "",
              accessToken: "",
              message: "",
            },
            userResponse.data
          );

          dispatch(setUser({ data: mappedUserData }));
          dispatch(setAccessToken(token));
          localStorage.setItem("user", JSON.stringify(mappedUserData));
          localStorage.setItem("accessToken", token);
        } else {
          // Clear Redux if no user exists
          if (!localStorage.getItem("user")) dispatch(clearAuth());
        }
      } catch (err: any) {
        dispatch(clearAuth());
        showError(err?.message ?? "Session expired. Please login again.");
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
