import { create } from "zustand";

import { WorkflowType } from "@/types/workflow/workflow";

interface StoreType {
  isOpen: boolean;
  workflow: WorkflowType | null;
  setWorkflow: (workflow: WorkflowType | null) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useWorkflowModalStore = create<StoreType>((set) => ({
  isOpen: false,
  workflow: null,
  setWorkflow: (workflow) => set({ workflow }),
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true })
}));
