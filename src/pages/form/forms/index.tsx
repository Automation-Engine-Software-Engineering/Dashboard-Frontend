import {
  PencilIcon,
  TablePropertiesIcon,
  Trash2Icon,
  XSquareIcon
} from "lucide-react";
import { useReducer } from "react";

import { deleteForm } from "@/api/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useForms } from "@/hooks/server-state/use-forms";
import { useFormModalStore } from "@/hooks/store/use-form-modal-store";

import AlertModal from "@/components/common/modals/alert-modal";
import EntitiesListModal from "@/components/common/modals/entities-list-modal";

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
  SET_FORM = "SET_FORM",
  SET_IS_MODAL_OPEN = "SET_IS_MODAL_OPEN",
  SET_IS_DELETE_MODAL_OPEN = "SET_IS_DELETE_MODAL_OPEN",
  SET_IS_ENTITIES_LIST_MODAL_OPEN = "SET_IS_ENTITIES_LIST_MODAL_OPEN"
}

type Actions = {
  type: ActionTypes;
  payload?: any;
};

const initialState = {
  isDeleteModalOpen: false,
  isModalOpen: false,
  isEntitiesListModalOpen: false,
  form: null
};

const formReducer = (state: typeof initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_FORM:
      return { ...state, form: action.payload };
    case ActionTypes.SET_IS_MODAL_OPEN:
      return { ...state, isModalOpen: action.payload };
    case ActionTypes.SET_IS_DELETE_MODAL_OPEN:
      return { ...state, isDeleteModalOpen: action.payload };
    case ActionTypes.SET_IS_ENTITIES_LIST_MODAL_OPEN:
      return { ...state, isEntitiesListModalOpen: action.payload };

    default:
      return state;
  }
};

const FormsPage = () => {
  const queryClient = useQueryClient();
  const { data: res, isLoading } = useForms();
  const { mutate, isPending } = useMutation({
    mutationFn: (formId: number) => deleteForm(formId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["forms"] })
  });
  const { onOpen, setForm } = useFormModalStore();
  const navigate = useNavigate();

  const [form, dispatch] = useReducer(formReducer, initialState);

  if (isLoading) return <Loading />;

  return (
    <>
      <AlertModal
        isOpen={form.isDeleteModalOpen}
        onClose={() =>
          dispatch({
            type: ActionTypes.SET_IS_DELETE_MODAL_OPEN,
            payload: false
          })
        }
        isLoading={isPending}
        onConfirm={async () => {
          mutate(form?.form?.id);
        }}
        title="آیا از حذف فرم اطمینان دارید؟"
        description="این عملیات قابل برگشت نخواهد بود و فرم بصورت دائمی حذف خواهد شد"
      />

      <EntitiesListModal
        isOpen={form.isEntitiesListModalOpen}
        formId={form.form?.id}
        onClose={() => {
          dispatch({
            type: ActionTypes.SET_IS_ENTITIES_LIST_MODAL_OPEN,
            payload: false
          });
        }}
      />
      <div className="flex items-center px-5 py-2">
        <button
          className="flex items-center gap-x-1 text-sm hover:text-primary"
          onClick={() => {
            onOpen();
            setForm(null);
          }}
        >
          <XSquareIcon size={14} className="text-primary" />
          ساخت فرم جدید
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ردیف</TableHead>
            <TableHead>نام</TableHead>
            <TableHead>توضیحات</TableHead>
            <TableHead>جداول</TableHead>
            <TableHead>ویرایش</TableHead>
            <TableHead>حذف</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!res?.data?.length &&
            res?.data?.map((form, index) => (
              <TableRow
                key={form.id}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("editor/" + form.id.toString());
                }}
                className="cursor-pointer"
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{form?.name}</TableCell>
                <TableCell>{form?.description}</TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({
                        type: ActionTypes.SET_IS_ENTITIES_LIST_MODAL_OPEN,
                        payload: true
                      });
                      dispatch({
                        type: ActionTypes.SET_FORM,
                        payload: form
                      });
                    }}
                  >
                    <TablePropertiesIcon className="text-slate-700" />
                  </button>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setForm(form);
                      onOpen();
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
                      dispatch({
                        type: ActionTypes.SET_FORM,
                        payload: form
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
      {!res?.data?.length && <EmptyState />}
      <TablePagination totalItems={res?.totalCount ?? 0} />
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
    <p className="text-slate-500">فرمی پیدا نشد</p>
  </div>
);

export default FormsPage;
