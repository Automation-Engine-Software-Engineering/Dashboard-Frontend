import { create } from "zustand";

interface StoreType {
  isOpen: boolean;
  formId: number | null;
  onOpen: (formId: number) => void;
  onClose: () => void;
}

export const useEntitiesListModalStore = create<StoreType>((set) => ({
  isOpen: false,
  formId: null,
  onOpen: (formId) => set({ isOpen: true, formId }),
  onClose: () => set({ isOpen: false })
}));
