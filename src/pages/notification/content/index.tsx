import { useRef, useState } from "react";

// import { useParams } from "react-router-dom";
// import { MoonLoader } from "react-spinners";
// import useBreadcrumbStore from "@/hooks/store/use-breadcrumb";
import Editor from "@/components/widget/editor";

import ToolbarTabs from "../_components/tabs";

const NotificationContent = () => {
  // const { updateLastBreadcrumb } = useBreadcrumbStore();
  // const { formId } = useParams<{ formId: string }>();
  // const { data, isLoading } = useForm(formId ?? "");
  const [editorData, setEditorData] = useState<string>("");
  const editorRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   // if (data?.htmlFormBody) {
  //   //   const formParent = document.createElement("div");
  //   //   formParent.innerHTML = data.htmlFormBody;

  //   //   const firstElementChild = formParent.firstElementChild as HTMLElement;

  //   //   if (firstElementChild && editorRef.current) {
  //   //     editorRef.current.style.cssText = firstElementChild.style.cssText;
  //   //     setEditorData(firstElementChild.innerHTML);
  //   //   }
  //   // }

  //   // updateLastBreadcrumb(data?.name ?? "");
  // }, [data]);

  // if (isLoading) return <Loading />;
  // if (!data) return <EmptyState />;

  return (
    <>
      <ToolbarTabs editorRef={editorRef} />
      <div className="relative flex">
        <div className="flex h-fit w-full justify-center">
          <Editor
            ref={editorRef}
            value={editorData}
            onEditorChange={setEditorData}
            className="prose-editor h-screen w-full shadow-[20px_10px_15px_0px_rgba(0,0,0,0.1)]"
          />
        </div>
      </div>
    </>
  );
};

// const Loading = () => (
//   <div className="flex h-[calc(100vh/2)] w-full items-center justify-center">
//     <MoonLoader color="#0099A5" size={50} />
//   </div>
// );

// const EmptyState = () => (
//   <div className="flex h-screen w-full items-center justify-center">
//     <p className="text-slate-500">فرم پیدا نشد</p>
//   </div>
// );

export default NotificationContent;
