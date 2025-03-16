import { XSquareIcon } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useForms } from "@/hooks/server-state/use-forms";
import { useFormModalStore } from "@/hooks/store/use-form-modal-store";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const FormsPage = () => {
  const { data, isLoading } = useForms();
  const { onOpen, setForm } = useFormModalStore();
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  if (!data) return <EmptyState />;

  return (
    <>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((form) => (
            <TableRow
              key={form.id}
              onClick={() => {
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

const Loading = () => (
  <div className="flex h-[calc(100vh/2)] w-full items-center justify-center">
    <MoonLoader color="#0099A5" size={50} />
  </div>
);

const EmptyState = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <p className="text-slate-500">فرم پیدا نشد</p>
  </div>
);

export default FormsPage;
