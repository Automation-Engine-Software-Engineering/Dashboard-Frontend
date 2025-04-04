import { PencilIcon, Trash2Icon, XSquareIcon } from "lucide-react";
import { useState } from "react";

import { deleteProperty } from "@/api/property";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useEntityProperties } from "@/hooks/server-state/use-entity-property";
import { usePropertyModalStore } from "@/hooks/store/use-property-modal-store";

import AlertModal from "@/components/common/modals/alert-modal";
import { formInputType } from "@/components/common/modals/property-modal";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow
} from "@/components/ui/table";

const PropertiesPage = () => {
  const queryClient = useQueryClient();

  const { entityId } = useParams<{ entityId: string }>();
  const { data, isLoading } = useEntityProperties(entityId ?? "");
  console.log(data?.data);
  const { mutate, isPending } = useMutation({
    mutationFn: (formId: number) => deleteProperty(formId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["forms", selectedForDelete] })
  });
  const { onOpen, setProperty, setEntityId } = usePropertyModalStore();

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
        }}
        title="آیا از حذف عنصر اطمینان دارید؟"
        description="این عملیات قابل برگشت نخواهد بود و عنصر بصورت دائمی حذف خواهد شد"
      />

      <div className="flex items-center px-5 py-2">
        <button
          className="flex items-center gap-x-1 text-sm hover:text-primary"
          onClick={() => {
            onOpen();
            setProperty(null);
            setEntityId(+entityId!);
          }}
        >
          <XSquareIcon size={14} className="text-primary" />
          ساخت عنصر جدید
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ردیف</TableHead>
            <TableHead>نام نمایشی</TableHead>
            <TableHead>نام عنصر</TableHead>
            <TableHead>توضیحات</TableHead>
            <TableHead>نوع</TableHead>
            <TableHead>مقدار پیش فرض</TableHead>
            <TableHead>ویرایش</TableHead>
            <TableHead>حذف</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!data?.data?.length &&
            data?.data?.map((property, index) => (
              <TableRow key={property.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{property?.previewName}</TableCell>
                <TableCell>{property?.propertyName}</TableCell>
                <TableCell>
                  <p className="line-clamp-1">{property?.description}</p>
                </TableCell>
                <TableCell>
                  {formInputType[property?.type as keyof typeof formInputType]
                    ?.type ?? ""}
                </TableCell>
                <TableCell>{property?.defaultValue}</TableCell>
                <TableCell>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProperty(property);
                      onOpen();
                    }}
                  >
                    <PencilIcon />
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedForDelete(property.id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2Icon className="text-red-600" />
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
    <p className="text-slate-500">عنصری پیدا نشد</p>
  </div>
);

export default PropertiesPage;
