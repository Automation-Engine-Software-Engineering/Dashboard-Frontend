import { useParams } from "react-router-dom";

import { cn } from "@/lib/utils";

import DeleteForm from "@/components/widget/editor/delete-form";
import SaveForm from "@/components/widget/editor/save-form";
import Copy from "@/components/widget/editor/toolbar-buttons/copy";
import Paste from "@/components/widget/editor/toolbar-buttons/paste";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import HomeTab from "./tabs/home";
import InsertTab from "./tabs/insert";
import ViewTab from "./tabs/view";

interface Props extends React.ComponentProps<"div"> {
  editorRef: React.RefObject<HTMLDivElement>;
}

const ToolbarTabs: React.FC<Props> = ({ editorRef, className }) => {
  const { formId } = useParams<{ formId: string }>();
  return (
    <Tabs defaultValue="home" className="sticky top-0 z-50">
      <div
        className={cn("flex h-12 items-center bg-[#D8E7F4] px-5", className)}
      >
        <TabsList>
          <TabsTrigger
            value="home"
            className="border-b border-b-transparent data-[state=active]:border-b-black"
          >
            Home
          </TabsTrigger>
          <TabsTrigger
            value="insert"
            className="border-b border-b-transparent data-[state=active]:border-b-black"
          >
            Insert
          </TabsTrigger>
          <TabsTrigger
            value="design"
            className="border-b border-b-transparent data-[state=active]:border-b-black"
          >
            Design
          </TabsTrigger>
          <TabsTrigger
            value="layout"
            className="border-b border-b-transparent data-[state=active]:border-b-black"
          >
            Layout
          </TabsTrigger>
          <TabsTrigger
            value="view"
            className="border-b border-b-transparent data-[state=active]:border-b-black"
          >
            View
          </TabsTrigger>
          <TabsTrigger
            value="help"
            className="border-b border-b-transparent data-[state=active]:border-b-black"
          >
            Help
          </TabsTrigger>
        </TabsList>
        <h3 className="ms-auto font-semibold">فرم شماره {formId}</h3>
      </div>
      <div className="flex h-16 items-center border-b border-b-slate-200 bg-white px-8">
        <TabsContent value="home">
          <HomeTab editorRef={editorRef} />
        </TabsContent>
        <TabsContent value="insert">
          <InsertTab editorRef={editorRef} />
        </TabsContent>
        <TabsContent value="view">
          <ViewTab editorRef={editorRef} />
        </TabsContent>
        <div className="ms-auto flex items-center gap-x-2">
          <Paste editorRef={editorRef} />
          <Copy editorRef={editorRef} />
          <DeleteForm />
          <SaveForm editorRef={editorRef} />
        </div>
      </div>
    </Tabs>
  );
};
export default ToolbarTabs;
