import { memo } from "react";

import toast from "react-hot-toast";

import { RoleType } from "@/types/role";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Props {
  role: RoleType | null;
  isOpen: boolean;
  onClose: () => void;
}

const RoleModal: React.FC<Props> = ({ isOpen, onClose, role }) => {
  const title = role ? `ویرایش نقش ${role.name}` : "ساخت نقش جدید";
  const description = role ? "ویرایش نقش" : "ساخت نقش جدید برای سیستم";

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Content role={role} />
      </DialogContent>
    </Dialog>
  );
};

const Content = memo(({ role }: { role: RoleType | null }) => {
  console.log("hi");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    // const data = Object.fromEntries(formData);
    toast("بزودی وصل میشه", {
      icon: "🚧"
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label htmlFor="">نام نقش</label>
        <Input
          type="text"
          name="name"
          placeholder="نام نفش"
          defaultValue={role?.name ?? ""}
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="">توضیحات</label>
        <Input
          type="text"
          name="description"
          placeholder="توضیحات"
          defaultValue={role?.description ?? ""}
        />
      </div>

      <Button className="w-full">ذخیره</Button>
    </form>
  );
});

export default RoleModal;
