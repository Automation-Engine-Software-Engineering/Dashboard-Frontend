import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useFormEntities } from "@/hooks/server-state/use-form-entities";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const EntitiesPage = () => {
  const { data, isLoading } = useFormEntities();
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  if (!data) return <EmptyState />;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ردیف</TableHead>
            <TableHead>نام نمایشی</TableHead>
            <TableHead>نام جدول</TableHead>
            <TableHead>توضیحات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((entity) => (
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
    <p className="text-slate-500">جدول پیدا نشد</p>
  </div>
);

export default EntitiesPage;
