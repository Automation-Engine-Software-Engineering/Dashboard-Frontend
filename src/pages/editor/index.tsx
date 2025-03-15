import { useRef, useState } from "react";

import Editor from "@/components/widget/editor";

import FormEditorSidebar from "./_components/sidebar";

const EditorPage = () => {
  const [editorData, setEditorData] = useState<string>("");
  const editorRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="flex h-12 items-center bg-secondary px-5">
        <h2 className="text-white">فرم شماره یک</h2>
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
export default EditorPage;
