import AddNodeComponent from "@/pages/workflow/_components/add-node";

import Workflow from "@/components/widget/workflow";

const WorkflowPage = () => {
  return (
    <div className="relative h-[calc(100vh-120px)] w-full">
      <Workflow />
      <AddNodeComponent />
    </div>
  );
};
export default WorkflowPage;
