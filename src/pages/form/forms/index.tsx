import { PencilIcon, Trash2Icon, XSquareIcon } from "lucide-react";
import { useState } from "react";

import { deleteForm } from "@/api/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useForms } from "@/hooks/server-state/use-forms";
import { useFormModalStore } from "@/hooks/store/use-form-modal-store";

import AlertModal from "@/components/common/modals/alert-modal";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow
} from "@/components/ui/table";

const FormsPage = () => {
  const queryClient = useQueryClient();
  const { data: res, isLoading } = useForms();
  const { mutate, isPending } = useMutation({
    mutationFn: (formId: number) => deleteForm(formId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["forms"] })
  });
  const { onOpen, setForm } = useFormModalStore();
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
        onConfirm={async () => {
          mutate(selectedForDelete!);
          setIsDeleteModalOpen(false);
        }}
        title="آیا از حذف فرم اطمینان دارید؟"
        description="این عملیات قابل برگشت نخواهد بود و فرم بصورت دائمی حذف خواهد شد"
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
            <TableHead>طول</TableHead>
            <TableHead>عرض</TableHead>
            <TableHead>رنگ پس زمینه</TableHead>
            <TableHead>عکس پس زمینه</TableHead>
            <TableHead>ویرایش</TableHead>
            <TableHead>حذف</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!res?.data?.length &&
            res?.data?.map((form) => (
              <TableRow
                key={form.id}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(form.id.toString());
                }}
                className="cursor-pointer"
              >
                <TableCell>{form?.id}</TableCell>
                <TableCell>{form?.name}</TableCell>
                <TableCell>{form?.description}</TableCell>
                <TableCell>{form?.sizeWidth}</TableCell>
                <TableCell>{form?.sizeHeight}</TableCell>
                <TableCell>{form?.backgroundColor}</TableCell>
                <TableCell>{form?.backgroundImgPath}</TableCell>
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
                      setSelectedForDelete(form.id);
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
