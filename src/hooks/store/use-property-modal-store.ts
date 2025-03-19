import { create } from "zustand";

import { PropertyType } from "@/types/form/property";

interface StoreType {
  isOpen: boolean;
  entityId: number | null;
  property: PropertyType | null;
  setProperty: (property: PropertyType | null) => void;
  setEntityId: (entityId: number) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const usePropertyModalStore = create<StoreType>((set) => ({
  isOpen: false,
  entityId: null,
  property: null,
  setProperty: (property) => set({ property }),
  setEntityId: (entityId) => set({ entityId }),
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true })
}));
