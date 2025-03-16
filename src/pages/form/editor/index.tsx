import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useForm } from "@/hooks/server-state/use-form";

import Editor from "@/components/widget/editor";

import FormEditorSidebar from "../_components/sidebar";

const FormEditorPage = () => {
  const { formId } = useParams<{ formId: string }>();
  const { data, isLoading } = useForm(formId ?? "");
  const [editorData, setEditorData] = useState<string>("");
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.htmlFormBody) {
      setEditorData(data.htmlFormBody);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (!data) return <EmptyState />;

  return (
    <div>
      <div className="flex h-12 items-center bg-secondary px-5">
        <h2 className="text-white">فرم شماره {data.id}</h2>
      </div>
      <div className="relative flex py-10">
        <div className="flex flex-1 justify-center">
          <Editor
            ref={editorRef}
            value={editorData}
            onEditorChange={setEditorData}
            className="h-[1400px] w-[900px] shadow-[20px_10px_15px_0px_rgba(0,0,0,0.1)] [&_div]:align-middle [&_input]:rounded-md [&_input]:border [&_input]:border-slate-300"
          />
        </div>

        <FormEditorSidebar
          editorRef={editorRef}
          setEditorData={setEditorData}
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
  <div className="flex h-screen w-full items-center justify-center">
    <p className="text-slate-500">فرم پیدا نشد</p>
  </div>
);

export default FormEditorPage;
