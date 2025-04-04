import { Edge, Node, useEdgesState, useNodesState } from "@xyflow/react";
import { useEffect, useState } from "react";

import { saveWorkflowNodes } from "@/api/workflow";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useWorkflow } from "@/hooks/server-state/use-workflow";
import useBreadcrumbStore from "@/hooks/store/use-breadcrumb";

import Workflow from "@/components/widget/workflow";

import { Button } from "@/components/ui/button";

import AddNodeModal from "../_components/add-node-modal";

const WorkflowPage: React.FC = () => {
  const { workflowId } = useParams<Record<string, string>>();
  const { updateLastBreadcrumb } = useBreadcrumbStore();
  const { data: workflow, isLoading } = useWorkflow(+workflowId!);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { nodes: Node[]; edges: Edge[] }) =>
      saveWorkflowNodes(Number(workflowId), data)
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [nodes, setNodes] = useNodesState<Node>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);

  const handleSave = async () => {
    mutate({ nodes, edges });
  };

  useEffect(() => {
    setNodes(workflow?.data.nodes ?? []);
    setEdges(workflow?.data.edges ?? []);

    updateLastBreadcrumb(workflow?.data.name ?? "");
  }, [workflow]);

  if (isLoading) return <Loading />;

  return (
    <div className="relative h-[calc(100vh-120px)] w-full">
      <Workflow
        nodes={nodes}
        edges={edges}
        setEdges={setEdges}
        setNodes={setNodes}
      />
      <AddNodeModal
        setNodes={setNodes}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Button
        variant="secondary"
        className="absolute bottom-5 right-5"
        onClick={handleSave}
        disabled={isPending}
      >
        ذخیره
      </Button>
      <Button
        className="absolute bottom-5 right-24"
        onClick={() => setIsModalOpen(true)}
      >
        اضافه کردن
      </Button>
    </div>
  );
};

const Loading = () => (
  <div className="flex h-[calc(100vh/2)] w-full items-center justify-center">
    <MoonLoader color="#0099A5" size={50} />
  </div>
);

export default WorkflowPage;
