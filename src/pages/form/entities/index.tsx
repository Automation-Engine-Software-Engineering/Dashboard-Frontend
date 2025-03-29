import {
  PencilIcon,
  TablePropertiesIcon,
  Trash2Icon,
  XSquareIcon
} from "lucide-react";
import { useReducer } from "react";

import { deleteEntity } from "@/api/entity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useFormEntities } from "@/hooks/server-state/use-form-entities";
import { useEntityModalStore } from "@/hooks/store/use-entity-modal-store";

import AlertModal from "@/components/common/modals/alert-modal";
import EntitiesRelationListModal from "@/components/common/modals/entities-relation-list-modal";

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
  SET_IS_ENTITIES_RELATION_LIST_MODAL_OPEN = "SET_IS_ENTITIES_RELATION_LIST_MODAL_OPEN"
}

type Actions = {
  type: ActionTypes;
  payload?: any;
};

const initialState = {
  isDeleteModalOpen: false,
  isModalOpen: false,
  isEntitiesRelationListModalOpen: false,
  entity: null
};

const entityReducer = (state: typeof initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_FORM:
      return { ...state, entity: action.payload };
    case ActionTypes.SET_IS_MODAL_OPEN:
      return { ...state, isModalOpen: action.payload };
    case ActionTypes.SET_IS_DELETE_MODAL_OPEN:
      return { ...state, isDeleteModalOpen: action.payload };
    case ActionTypes.SET_IS_ENTITIES_RELATION_LIST_MODAL_OPEN:
      return { ...state, isEntitiesRelationListModalOpen: action.payload };

    default:
      return state;
  }
};

const EntitiesPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useFormEntities();
  const { mutate, isPending } = useMutation({
    mutationFn: (entityId: number) => deleteEntity(entityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entities"] });
    }
  });

  const { onOpen, setEntity } = useEntityModalStore();
  const navigate = useNavigate();

  const [entity, dispatch] = useReducer(entityReducer, initialState);

  if (isLoading) return <Loading />;

  return (
    <>
      <AlertModal
        isOpen={entity.isDeleteModalOpen}
        onClose={() =>
          dispatch({
            type: ActionTypes.SET_IS_DELETE_MODAL_OPEN,
            payload: false
          })
        }
        isLoading={isPending}
        onConfirm={async () => {
          mutate(entity?.entity?.id);
          dispatch({
            type: ActionTypes.SET_IS_DELETE_MODAL_OPEN,
            payload: false
          });
        }}
        title="آیا از حذف فرم اطمینان دارید؟"
        description="این عملیات قابل برگشت نخواهد بود و فرم بصورت دائمی حذف خواهد شد"
      />

      <EntitiesRelationListModal
        isOpen={entity.isEntitiesRelationListModalOpen}
        entityId={entity.entity?.id}
        onClose={() => {
          dispatch({
            type: ActionTypes.SET_IS_ENTITIES_RELATION_LIST_MODAL_OPEN,
            payload: false
          });
        }}
      />

      <div className="flex items-center px-5 py-2">
        <button
          className="flex items-center gap-x-1 text-sm hover:text-primary"
          onClick={() => {
            onOpen();
            setEntity(null);
          }}
        >
          <XSquareIcon size={14} className="text-primary" />
          ساخت جدول جدید
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ردیف</TableHead>
            <TableHead>نام نمایشی</TableHead>
            <TableHead>نام جدول</TableHead>
            <TableHead>توضیحات</TableHead>
            <TableHead>ارتباطات</TableHead>
            <TableHead>ویرایش</TableHead>
            <TableHead>حذف</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!data?.data?.length &&
            data?.data?.map((entity, index) => (
              <TableRow
                key={entity.id}
                onClick={() => {
                  navigate(entity.id.toString());
                }}
                className="cursor-pointer"
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{entity?.previewName}</TableCell>
                <TableCell>{entity?.tableName}</TableCell>
                <TableCell>{entity?.description}</TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({
                        type: ActionTypes.SET_IS_ENTITIES_RELATION_LIST_MODAL_OPEN,
                        payload: true
                      });
                      dispatch({
                        type: ActionTypes.SET_FORM,
                        payload: entity
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
                      setEntity(entity);
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
                        payload: entity
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
      {!data?.data?.length && <EmptyState />}
      <TablePagination totalItems={data?.totalCount ?? 0} />
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
    <p className="text-slate-500">جدولی پیدا نشد</p>
  </div>
);
export default EntitiesPage;
