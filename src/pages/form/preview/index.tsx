import { getFormPreview } from "@/api/form";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

const FormPreviewPage = () => {
  const { formId } = useParams<{ formId: string }>();

  const { data, isLoading } = useQuery({
    queryFn: () => getFormPreview(+formId!),
    queryKey: ["form-preview"]
  });

  if (isLoading) return <Loading />;

  if (!data) <EmptyState />;

  return (
    <div className="flex justify-center py-10">
      <div>
        <div className="w-full rounded-t-md bg-secondary py-4 text-center text-white">
          {/* <h2 className="text-xl font-bold">فرم: {data?.name}</h2> */}
        </div>
        <div
          className="prose-preview rounded-b-md bg-white px-5"
          dangerouslySetInnerHTML={{
            __html: data?.data ?? ""
          }}
        />
      </div>
    </div>
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
export default FormPreviewPage;
