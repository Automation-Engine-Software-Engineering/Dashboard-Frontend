import React, { useState } from "react";

import ReceiveDatabaseModal from "@/components/common/modals/receive-database-modal";

import { ContextMenuItem } from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Relation: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsModalOpen(false);
          }
        }}
      >
        <DialogTrigger asChild>
          <ContextMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            واکشی دیتا
          </ContextMenuItem>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <ReceiveDatabaseModal
            onClose={() => {
              setIsModalOpen(false);
            }}
            rightClickedElement={rightClickedElement}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Relation;
