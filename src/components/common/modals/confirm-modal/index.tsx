import { CheckIcon } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  onCancel?: () => Promise<void>;
}

const ConfirmModal: React.FC<Props> = ({
  title = "آیا مطمئن به انجام این عملیات هستید؟",
  isOpen,
  onClose,
  onConfirm,
  onCancel
}) => {
  const [isPending, setIsPending] = useState(false);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleOnCancel = async () => {
    if (onCancel) {
      setIsPending(true);
      try {
        await onCancel();
        onClose();
      } finally {
        setIsPending(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <div className="mb-10 flex w-full justify-center">
          <div className="relative flex size-20 items-center justify-center rounded-full bg-green-500 text-white">
            <CheckIcon size={40} />
            <span className="absolute -z-10 inline-flex h-4/5 w-4/5 animate-ping rounded-full bg-green-300 opacity-75 duration-1000"></span>
          </div>
        </div>
        <div className="border-b border-b-slate-300 pb-5 text-center">
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <div className="flex w-full gap-x-2">
          <Button
            variant="default"
            className="flex-1"
            onClick={async () => {
              setIsPending(true);
              try {
                await onConfirm();
              } finally {
                setIsPending(false);
              }
            }}
            disabled={isPending}
          >
            بله
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleOnCancel}>
            خیر
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmModal;
