import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useEntityProperties } from "@/hooks/use-entity-property";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const PropertiesPage = () => {
  const { entityId } = useParams<{ entityId: string }>();
  const { data, isLoading } = useEntityProperties(entityId ?? "");

  if (isLoading) return <Loading />;
  if (!data) return <EmptyState />;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ردیف</TableHead>
            <TableHead>نام نمایشی</TableHead>
            <TableHead>نام عنصر</TableHead>
            <TableHead>نوع</TableHead>
            <TableHead>انتخاب</TableHead>
            <TableHead>مقدار پیش فرض</TableHead>
            <TableHead>عرض</TableHead>
            <TableHead>ارتفاع</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((property) => (
            <TableRow
              key={property.id}
              onClick={() => {
                // TODO: handle on property click
              }}
            >
              <TableCell>{property?.id}</TableCell>
              <TableCell>{property?.previewName}</TableCell>
              <TableCell>{property?.propertyName}</TableCell>
              <TableCell>{property?.type}</TableCell>
              <TableCell>{property?.allowNull}</TableCell>
              <TableCell>{property?.defaultValue}</TableCell>
              <TableCell>{property?.sizeWidth}</TableCell>
              <TableCell>{property?.sizeHeight}</TableCell>
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
    <p className="text-slate-500">عنصری پیدا نشد</p>
  </div>
);

export default PropertiesPage;
