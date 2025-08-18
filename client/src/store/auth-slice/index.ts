import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterPayload } from "@/types";

interface AuthState {
  registerData: RegisterPayload | null;
  isSubmitting: boolean;
}

const initialState: AuthState = {
  registerData: null,
  isSubmitting: false,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<RegisterPayload>) => {
      state.registerData = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    resetRegister: (state) => {
      state.registerData = null;
      state.isSubmitting = false;
    },
  },
});

export const { setRegisterData, setSubmitting, resetRegister } =
  authSlice.actions;
export default authSlice.reducer;