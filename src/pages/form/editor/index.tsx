import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useForm } from "@/hooks/server-state/use-form";
import useBreadcrumbStore from "@/hooks/store/use-breadcrumb";

import Editor from "@/components/widget/editor";

import FormEditorSidebar from "../_components/editor/sidebar";
import ToolbarTabs from "../_components/editor/toolbar-tabs";

const FormEditorPage = () => {
  const { updateLastBreadcrumb } = useBreadcrumbStore();
  const { formId } = useParams<{ formId: string }>();
  const { data, isLoading } = useForm(formId ?? "");
  const [editorData, setEditorData] = useState<string>("");
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.htmlFormBody) {
      const formParent = document.createElement("div");
      formParent.innerHTML = data.htmlFormBody;

      const firstElementChild = formParent.firstElementChild as HTMLElement;

      if (firstElementChild && editorRef.current) {
        editorRef.current.style.cssText = firstElementChild.style.cssText;
        setEditorData(firstElementChild.innerHTML);
      }
    }

    updateLastBreadcrumb(data?.name ?? "");
  }, [data]);

  if (isLoading) return <Loading />;
  if (!data) return <EmptyState />;

  return (
    <>
      <ToolbarTabs editorRef={editorRef} />
      <div className="relative flex">
        <div className="flex h-fit w-full justify-center">
          <Editor
            ref={editorRef}
            value={editorData}
            onEditorChange={setEditorData}
            className="prose-editor h-fit shrink-0 -translate-y-[32%] scale-[0.3] shadow-[20px_10px_15px_0px_rgba(0,0,0,0.1)] sm:-translate-y-[20%] sm:scale-50 md:-translate-y-[10%] md:scale-75 lg:translate-y-[5%] lg:scale-100 2xl:translate-y-[15%] 2xl:scale-[1.2]"
          />
        </div>
        <FormEditorSidebar
          editorRef={editorRef}
          setEditorData={setEditorData}
        />
      </div>
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

export default FormEditorPage;
