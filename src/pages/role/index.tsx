import { PencilIcon, Trash2Icon, XSquareIcon } from "lucide-react";
import { useReducer } from "react";

import toast from "react-hot-toast";

import AlertModal from "@/components/common/modals/alert-modal";
import RoleModal from "@/components/common/modals/role-modal";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

enum ActionTypes {
  SET_ROLE = "SET_ROLE",
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
  role: null
};

const roleReducer = (state: typeof initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_ROLE:
      return { ...state, role: action.payload };
    case ActionTypes.SET_IS_MODAL_OPEN:
      return { ...state, isModalOpen: action.payload };
    case ActionTypes.SET_IS_DELETE_MODAL_OPEN:
      return { ...state, isDeleteModalOpen: action.payload };
    default:
      return state;
  }
};

const RolesPage = () => {
  // const queryClient = useQueryClient();
  // const { data: res, isLoading } = useRoles();

  // const { mutate, isPending } = useMutation({
  //   mutationFn: (formId: number) => deleteRole(formId),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roles"] })
  // });

  const [role, dispatch] = useReducer(roleReducer, initialState);

  // if (isLoading) return <Loading />;

  return (
    <>
      <AlertModal
        isOpen={role.isDeleteModalOpen}
        onClose={() =>
          dispatch({
            type: ActionTypes.SET_IS_DELETE_MODAL_OPEN,
            payload: false
          })
        }
        isLoading={false}
        onConfirm={async () => {
          // mutate(selectedForDelete!);
          toast("بزودی وصل میشه", {
            icon: "🚧"
          });
          dispatch({
            type: ActionTypes.SET_IS_DELETE_MODAL_OPEN,
            payload: false
          });
        }}
        title="آیا از حذف نقش اطمینان دارید؟"
        description="این عملیات قابل برگشت نخواهد بود و نقش بصورت دائمی حذف خواهد شد"
      />

      <RoleModal
        isOpen={role.isModalOpen}
        onClose={() =>
          dispatch({ type: ActionTypes.SET_IS_MODAL_OPEN, payload: false })
        }
        role={role.role}
      />

      <div className="flex items-center px-5 py-2">
        <button
          className="flex items-center gap-x-1 text-sm hover:text-primary"
          onClick={() => {
            dispatch({ type: ActionTypes.SET_ROLE, payload: null });
            dispatch({ type: ActionTypes.SET_IS_MODAL_OPEN, payload: true });
          }}
        >
          <XSquareIcon size={14} className="text-primary" />
          ساخت نقش جدید
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ردیف</TableHead>
            <TableHead>نام</TableHead>
            <TableHead>توضیحات</TableHead>
            <TableHead>ویرایش</TableHead>
            <TableHead>حذف</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="cursor-pointer"
          >
            <TableCell>1</TableCell>
            <TableCell>کارشناس</TableCell>
            <TableCell>متن تستی</TableCell>
            <TableCell className="text-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: ActionTypes.SET_ROLE,
                    payload: { name: "کارشناس", description: "متن تستی" }
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
            <TableCell className="text-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: ActionTypes.SET_IS_DELETE_MODAL_OPEN,
                    payload: true
                  });
                }}
              >
                <Trash2Icon className="text-red-500" />
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* {!res?.data?.length && <EmptyState />} */}
      {/* <TablePagination totalItems={res?.totalCount ?? 0} /> */}
    </>
  );
};

// const Loading = () => (
//   <div className="flex h-[calc(100vh/2)] w-full items-center justify-center">
//     <MoonLoader color="#0099A5" size={50} />
//   </div>
// );

// const EmptyState = () => (
//   <div className="flex h-32 w-full items-center justify-center bg-white shadow-md">
//     <p className="text-slate-500">نقشی پیدا نشد</p>
//   </div>
// );

export default RolesPage;
