import { create } from "zustand";

import { EntityType } from "@/types/form/entity";

interface StoreType {
  isOpen: boolean;
  entity: EntityType | null;
  setEntity: (entity: EntityType | null) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useEntityModalStore = create<StoreType>((set) => ({
  isOpen: false,
  entity: null,
  setEntity: (entity) => set({ entity }),
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true })
}));
