import React from "react";

import { nanoid } from "nanoid";

import { useFlowStore } from "@/hooks/store/use-workflow-store";

import { Button } from "@/components/ui/button";

const AddNodeComponent: React.FC = () => {
  const { setNodes } = useFlowStore();

  const addNewNodeWithEdge = () => {
    const newNode = {
      id: nanoid(),
      type: "custom",
      data: { name: `فرم شماره ${Math.floor(Math.random() * 100)}` },
      position: { x: Math.random() * 500, y: Math.random() * 200 }
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  return (
    <Button onClick={addNewNodeWithEdge} className="absolute bottom-5 right-5">
      اضافه کردن
    </Button>
  );
};

export default AddNodeComponent;
