import { create } from "zustand";

import { FormType } from "@/types/form/form";

interface StoreType {
  isOpen: boolean;
  form: FormType | null;
  onOpen: (form: FormType) => void;
  onClose: () => void;
}

export const useEntitiesListModalStore = create<StoreType>((set) => ({
  isOpen: false,
  form: null,
  onOpen: (form) => set({ isOpen: true, form }),
  onClose: () => set({ isOpen: false })
}));
