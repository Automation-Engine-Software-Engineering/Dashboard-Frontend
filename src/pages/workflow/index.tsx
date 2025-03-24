import { useState } from "react";

import { useFlowStore } from "@/hooks/store/use-workflow-store";

import Workflow from "@/components/widget/workflow";

import { Button } from "@/components/ui/button";

import AddNodeModal from "./_components/add-node-modal";

const WorkflowPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const setNodes = useFlowStore((state) => state.setNodes);
  const setEdges = useFlowStore((state) => state.setEdges);

  return (
    <div className="relative h-[calc(100vh-120px)] w-full">
      <Workflow
        nodes={nodes}
        edges={edges}
        setEdges={setEdges}
        setNodes={setNodes}
      />
      <AddNodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Button
        className="absolute bottom-5 right-5"
        onClick={() => setIsModalOpen(true)}
      >
        اضافه کردن
      </Button>
    </div>
  );
};

export default WorkflowPage;
