import { create } from "zustand";

type BreadcrumbItem = {
  path: string;
  label: string;
};

type BreadcrumbState = {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
  updateLastBreadcrumb: (label: string) => void;
};

const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
  updateLastBreadcrumb: (label) =>
    set((state) => {
      const updatedBreadcrumbs = [...state.breadcrumbs];
      updatedBreadcrumbs[updatedBreadcrumbs.length - 1] = {
        ...updatedBreadcrumbs[updatedBreadcrumbs.length - 1],
        label
      };
      return { breadcrumbs: updatedBreadcrumbs };
    })
}));

export default useBreadcrumbStore;
