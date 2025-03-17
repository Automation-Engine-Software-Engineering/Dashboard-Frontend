import { TriangleAlertIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  title?: string;
  description?: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertModal: React.FC<Props> = ({
  title = "آیا مطمئن به انجام این عملیات هستید؟",
  description = "این عملیات قابل برگشت نخواهد بود",
  isLoading,
  isOpen,
  onClose,
  onConfirm
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <div className="mb-10 flex w-full justify-center">
          <div className="relative flex size-20 items-center justify-center rounded-full bg-red-500 text-white">
            <TriangleAlertIcon size={40} />
            <span className="absolute -z-10 inline-flex h-4/5 w-4/5 animate-ping rounded-full bg-red-300 opacity-75 duration-1000"></span>
          </div>
        </div>
        <div className="space-y-2 border-b border-b-slate-300 pb-5 text-center">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        <div className="flex w-full gap-x-2">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
            disabled={isLoading}
          >
            تایید عملیات
          </Button>
          <Button variant="outline" className="flex-1" onClick={onClose}>
            لغو عملیات
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AlertModal;
