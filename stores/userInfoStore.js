import { create } from "zustand";

export const userInfoStore = create((set) => {
  return {
    fullName: "",
    setFullName: (name) => set({ fullName: name }),
  };
});
