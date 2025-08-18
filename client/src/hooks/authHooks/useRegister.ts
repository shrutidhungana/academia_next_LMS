import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { apiEndpoints } from "@/utils/authAPI";
import { RegisterPayload } from "@/types";

const { register } = apiEndpoints;

const registerUser = async (data: RegisterPayload) => {
    const res = await axios.post(register, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
}
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};