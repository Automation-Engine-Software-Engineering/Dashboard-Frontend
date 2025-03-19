import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useForm } from "@/hooks/server-state/use-form";

const FormPreviewPage = () => {
  const { formId } = useParams<{ formId: string }>();

  const { data, isLoading } = useForm(formId!);

  if (isLoading) return <Loading />;

  if (!data) <EmptyState />;

  return (
    <div className="flex justify-center py-10">
      <div>
        <div className="w-full rounded-t-md bg-secondary py-4 text-center text-white">
          <h2 className="text-xl font-bold">فرم: {data?.name}</h2>
        </div>
        <div
          style={{
            width: data?.sizeWidth,
            minHeight: data?.sizeHeight,
            backgroundColor: data?.backgroundColor
          }}
          className="rounded-b-md px-5 [&_input]:rounded-md [&_input]:border [&_input]:border-slate-300"
          dangerouslySetInnerHTML={{
            __html:
              data?.htmlFormBody.replace(/resize: both|disabled/g, "") ?? ""
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
