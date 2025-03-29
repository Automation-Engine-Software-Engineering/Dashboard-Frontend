import { PencilIcon, Trash2Icon, XSquareIcon } from "lucide-react";
import { useReducer } from "react";

import { deleteMenuItem } from "@/api/menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";

import { useMenuItems } from "@/hooks/server-state/use-menu-items";

import AlertModal from "@/components/common/modals/alert-modal";
import MenuItemModal from "@/components/common/modals/menu-item-modal";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow
} from "@/components/ui/table";

enum ActionTypes {
  SET_MENU = "SET_MENU",
  SET_IS_MODAL_OPEN = "SET_IS_MODAL_OPEN",
  SET_IS_DELETE_MODAL_OPEN = "SET_IS_DELETE_MODAL_OPEN"
}

type Actions = {
  type: ActionTypes;
  payload?: any;
};

const initialState = {
  isDeleteModalOpen: false,
  isModalOpen: false,
  isWorkflowListModalOpen: false,
  isRoleUsersListModalOpen: false,
  item: null
};

const menuReducer = (state: typeof initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_MENU:
      return { ...state, item: action.payload };
    case ActionTypes.SET_IS_MODAL_OPEN:
      return { ...state, isModalOpen: action.payload };
    case ActionTypes.SET_IS_DELETE_MODAL_OPEN:
      return { ...state, isDeleteModalOpen: action.payload };
    default:
      return state;
  }
};

const MenuItemsPage = () => {
  const queryClient = useQueryClient();
  const { data: menuItems, isLoading } = useMenuItems();

  const { mutate, isPending } = useMutation({
    mutationFn: (itemId: number) => deleteMenuItem(itemId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      dispatch({
        type: ActionTypes.SET_IS_DELETE_MODAL_OPEN,
        payload: false
      });
    }
  });

  const [menu, dispatch] = useReducer(menuReducer, initialState);

  if (isLoading) return <Loading />;

  return (
    <>
      <AlertModal
        isOpen={menu.isDeleteModalOpen}
        onClose={() =>
          dispatch({
            type: ActionTypes.SET_IS_DELETE_MODAL_OPEN,
            payload: false
          })
        }
        isLoading={isPending}
        onConfirm={async () => {
          mutate(menu?.item?.id);
        }}
        title="آیا از حذف نقش اطمینان دارید؟"
        description="این عملیات قابل برگشت نخواهد بود و نقش بصورت دائمی حذف خواهد شد"
      />

      <MenuItemModal
        isOpen={menu.isModalOpen}
        onClose={() =>
          dispatch({ type: ActionTypes.SET_IS_MODAL_OPEN, payload: false })
        }
        menuItem={menu.item}
      />

      <div className="flex items-center px-5 py-2">
        <button
          className="flex items-center gap-x-1 text-sm hover:text-primary"
          onClick={() => {
            dispatch({ type: ActionTypes.SET_MENU, payload: null });
            dispatch({ type: ActionTypes.SET_IS_MODAL_OPEN, payload: true });
          }}
        >
          <XSquareIcon size={14} className="text-primary" />
          ساخت آیتم جدید
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ردیف</TableHead>
            <TableHead>نام</TableHead>
            <TableHead>ویرایش</TableHead>
            <TableHead>حذف</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems?.data.map(({ name, id, workflowId, roleId }, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({
                      type: ActionTypes.SET_MENU,
                      payload: { name, id, workflowId, roleId }
                    });
                    dispatch({
                      type: ActionTypes.SET_IS_MODAL_OPEN,
                      payload: true
                    });
                  }}
                >
                  <PencilIcon className="text-slate-700" />
                </button>
              </TableCell>
              <TableCell>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({
                      type: ActionTypes.SET_IS_DELETE_MODAL_OPEN,
                      payload: true
                    });
                    dispatch({
                      type: ActionTypes.SET_MENU,
                      payload: { name, id }
                    });
                  }}
                >
                  <Trash2Icon className="text-red-500" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!menuItems?.data?.length && <EmptyState />}
      <TablePagination totalItems={menuItems?.totalCount ?? 0} />
    </>
  );
};

const Loading = () => (
  <div className="flex h-[calc(100vh/2)] w-full items-center justify-center">
    <MoonLoader color="#0099A5" size={50} />
  </div>
);

const EmptyState = () => (
  <div className="flex h-32 w-full items-center justify-center bg-white shadow-md">
    <p className="text-slate-500">نقشی پیدا نشد</p>
  </div>
);

export default MenuItemsPage;
