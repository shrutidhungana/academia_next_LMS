// utils/mapUserResponse.ts
import { UserResponse, UserData } from "@/types";

export const mapUserResponseToUserData = (res: UserResponse): UserData =>
  Object.assign(
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
    res.data
  );
