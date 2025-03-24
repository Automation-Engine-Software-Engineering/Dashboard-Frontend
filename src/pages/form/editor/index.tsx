import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useForm } from "@/hooks/server-state/use-form";

import Editor from "@/components/widget/editor";

import FormEditorSidebar from "../_components/editor/sidebar";
import ToolbarTabs from "../_components/editor/toolbar-tabs";

const FormEditorPage = () => {
  const { formId } = useParams<{ formId: string }>();
  const { data, isLoading } = useForm(formId ?? "");
  const [editorData, setEditorData] = useState<string>("");
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    editorRef.current?.focus();
    if (data?.htmlFormBody) {
      setEditorData(data.htmlFormBody);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (!data) return <EmptyState />;

  return (
    <div>
      <ToolbarTabs editorRef={editorRef} />
      <div className="relative flex">
        <div className="flex flex-1 justify-center py-10">
          <Editor
            ref={editorRef}
            value={editorData}
            onEditorChange={setEditorData}
            width={data.sizeWidth}
            height={data.sizeHeight}
            backgroundColor={data.backgroundColor}
            className="prose-editor h-fit shrink-0 shadow-[20px_10px_15px_0px_rgba(0,0,0,0.1)]"
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
