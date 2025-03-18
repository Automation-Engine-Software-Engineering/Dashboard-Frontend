import { create } from "zustand";

import { PropertyType } from "@/types/form/property";

interface StoreType {
  isOpen: boolean;
  property: PropertyType | null;
  setProperty: (property: PropertyType | null) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const usePropertyModalStore = create<StoreType>((set) => ({
  isOpen: false,
  property: null,
  setProperty: (property) => set({ property }),
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true })
}));
