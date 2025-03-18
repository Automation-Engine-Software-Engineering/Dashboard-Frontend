import { PencilIcon, Trash2Icon, XSquareIcon } from "lucide-react";
import { useState } from "react";

import { deleteEntity } from "@/api/entity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useFormEntities } from "@/hooks/server-state/use-form-entities";
import { useEntityModalStore } from "@/hooks/store/use-entity-modal-store";

import AlertModal from "@/components/common/modals/alert-modal";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedForDelete, setSelectedForDelete] = useState<number | null>(
    null
  );

  if (isLoading) return <Loading />;

  return (
    <>
      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        isLoading={isPending}
        onConfirm={() => {
          mutate(selectedForDelete!);
          setIsDeleteModalOpen(false);
        }}
        title="آیا از حذف جدول اطمینان دارید؟"
        description="این عملیات قابل برگشت نخواهد بود و جدول بصورت دائمی حذف خواهد شد"
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
            <TableHead>ویرایش</TableHead>
            <TableHead>حذف</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!data?.data?.length &&
            data?.data?.map((entity) => (
              <TableRow
                key={entity.id}
                onClick={() => {
                  navigate(entity.id.toString());
                }}
                className="cursor-pointer"
              >
                <TableCell>{entity?.id}</TableCell>
                <TableCell>{entity?.previewName}</TableCell>
                <TableCell>{entity?.tableName}</TableCell>
                <TableCell>{entity?.description}</TableCell>
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
                      setSelectedForDelete(entity?.id);
                      setIsDeleteModalOpen(true);
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
