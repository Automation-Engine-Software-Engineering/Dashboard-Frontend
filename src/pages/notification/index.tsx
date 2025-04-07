import { XSquareIcon } from "lucide-react";
import { useReducer } from "react";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { MoonLoader } from "react-spinners";
import AlertModal from "@/components/common/modals/alert-modal";
import NotificationModal from "@/components/common/modals/notification-modal";

import TableSearch, {
  Table,
  TableBody, // TableCell,
  TableHead,
  TableHeader, // TablePagination,
  TableRow
} from "@/components/ui/table";

enum ActionTypes {
  SET_NOTIFICATION = "SET_NOTIFICATION",
  SET_IS_MODAL_OPEN = "SET_IS_MODAL_OPEN",
  SET_IS_DELETE_MODAL_OPEN = "SET_IS_DELETE_MODAL_OPEN",
  SET_IS_WORKFLOW_LIST_MODAL_OPEN = "SET_IS_WORKFLOW_LIST_MODAL_OPEN",
  SET_IS_NOTIFICATION_USERS_LIST_MODAL_OPEN = "SET_IS_NOTIFICATION_USERS_LIST_MODAL_OPEN"
}

type Actions = {
  type: ActionTypes;
  payload?: any;
};

const initialState = {
  isDeleteModalOpen: false,
  isModalOpen: false,
  notification: null
};

const notificationReducer = (state: typeof initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_NOTIFICATION:
      return { ...state, notification: action.payload };
    case ActionTypes.SET_IS_MODAL_OPEN:
      return { ...state, isModalOpen: action.payload };
    case ActionTypes.SET_IS_DELETE_MODAL_OPEN:
      return { ...state, isDeleteModalOpen: action.payload };
    case ActionTypes.SET_IS_WORKFLOW_LIST_MODAL_OPEN:
      return { ...state, isWorkflowListModalOpen: action.payload };
    case ActionTypes.SET_IS_NOTIFICATION_USERS_LIST_MODAL_OPEN:
      return { ...state, isNOTIFICATIONUsersListModalOpen: action.payload };
    default:
      return state;
  }
};

const NotificationsPage = () => {
  // const queryClient = useQueryClient();

  // const { data: roles, isLoading } = useRoles();

  // const { mutate, isPending } = useMutation({
  //   mutationFn: (roleId: number) => deleteRole(roleId),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["roles"] });
  //     dispatch({
  //       type: ActionTypes.SET_IS_DELETE_MODAL_OPEN,
  //       payload: false
  //     });
  //   }
  // });

  const [notification, dispatch] = useReducer(
    notificationReducer,
    initialState
  );

  // if (isLoading) return <Loading />;

  return (
    <>
      <AlertModal
        isOpen={notification.isDeleteModalOpen}
        onClose={() =>
          dispatch({
            type: ActionTypes.SET_IS_DELETE_MODAL_OPEN,
            payload: false
          })
        }
        isLoading={false}
        onConfirm={async () => {
          // mutate(notification?.role?.id);
        }}
        title="آیا از حذف اعلان اطمینان دارید؟"
        description="این عملیات قابل برگشت نخواهد بود و اعلان بصورت دائمی حذف خواهد شد"
      />

      <NotificationModal
        isOpen={notification.isModalOpen}
        onClose={() =>
          dispatch({ type: ActionTypes.SET_IS_MODAL_OPEN, payload: false })
        }
        notification={notification.notification}
      />

      <div className="flex items-center px-5 py-2">
        <button
          className="flex items-center gap-x-1 text-sm hover:text-primary"
          onClick={() => {
            dispatch({ type: ActionTypes.SET_NOTIFICATION, payload: null });
            dispatch({ type: ActionTypes.SET_IS_MODAL_OPEN, payload: true });
          }}
        >
          <XSquareIcon size={14} className="text-primary" />
          ساخت اعلان جدید
        </button>

        <TableSearch className="ms-auto h-8" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ردیف</TableHead>
            <TableHead>نام</TableHead>
            <TableHead>توضیحات</TableHead>
            <TableHead>محتوای اعلان</TableHead>
            <TableHead>ویرایش</TableHead>
            <TableHead>حذف</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {roles?.data.map(({ description, name, id }, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{description}</TableCell>
              <TableCell>محتوا...</TableCell>
              <TableCell>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({
                      type: ActionTypes.SET_ROLE,
                      payload: { name, description, id }
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
                      type: ActionTypes.SET_ROLE,
                      payload: { name, description, id }
                    });
                  }}
                >
                  <Trash2Icon className="text-red-500" />
                </button>
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
      {/* {!roles?.data?.length && <EmptyState />} */}
      {/* <TablePagination totalItems={roles?.totalCount ?? 0} /> */}
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

export default NotificationsPage;
