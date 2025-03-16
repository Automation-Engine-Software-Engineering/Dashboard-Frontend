import { create } from "zustand";

import { FormType } from "@/types/form/form";

interface StoreType {
  isOpen: boolean;
  form: FormType | null;
  setForm: (form: FormType | null) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useFormModalStore = create<StoreType>((set) => ({
  isOpen: false,
  form: null,
  setForm: (form) => set({ form }),
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true })
}));
