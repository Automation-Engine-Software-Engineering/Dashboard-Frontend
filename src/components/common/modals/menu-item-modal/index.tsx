import { memo } from "react";

import { createMenuItem, editMenuItem } from "@/api/menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MenuItemType } from "@/types/menu-item";

import { useMenuItems } from "@/hooks/server-state/use-menu-items";
import { useRoles } from "@/hooks/server-state/use-roles";
import { useWorkflows } from "@/hooks/server-state/use-workflows";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface Props {
  menuItem: MenuItemType | null;
  isOpen: boolean;
  onClose: () => void;
}

const MenuItemModal: React.FC<Props> = ({ isOpen, onClose, menuItem }) => {
  const title = menuItem ? `ویرایش آیتم ${menuItem.name}` : "ساخت آیتم جدید";
  const description = menuItem ? "ویرایش آیتم" : "ساخت آیتم جدید برای سیستم";

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
        <Content menuItem={menuItem} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

const Content = memo(
  ({
    menuItem,
    onClose
  }: {
    menuItem: MenuItemType | null;
    onClose: () => void;
  }) => {
    const queryClient = useQueryClient();

    const { data: workflows } = useWorkflows();
    const { data: roles } = useRoles();
    const { data: menuItems } = useMenuItems();

    const { mutate, isPending } = useMutation({
      mutationFn: (data: any) =>
        menuItem ? editMenuItem(data) : createMenuItem(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menu-items"] });
        onClose();
      }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: Record<any, any> = Object.fromEntries(formData);
      if (data.workflowId === "none") {
        data.workflowId = 0;
        data.menuType = 1;
      } else {
        data.menuType = 2;
      }
      data.id = menuItem?.id;
      mutate(data);
    };

    return (
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label htmlFor="">نام آیتم</label>
          <Input
            type="text"
            name="name"
            placeholder="نام آیتم"
            defaultValue={menuItem?.name ?? ""}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="">گردش کار</label>
          <Select
            dir="rtl"
            name="workflowId"
            defaultValue={String(menuItem?.workflowId ?? "")}
          >
            <SelectTrigger>
              <SelectValue placeholder="انتخاب گردش کار" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">بدون گردش کار</SelectItem>
              {workflows?.data.map((workflow) => (
                <SelectItem key={workflow.id} value={String(workflow.id)}>
                  {workflow.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label htmlFor="">نقش</label>
          <Select
            dir="rtl"
            name="roleId"
            defaultValue={String(menuItem?.roleId ?? "")}
          >
            <SelectTrigger>
              <SelectValue placeholder="انتخاب نقش" />
            </SelectTrigger>
            <SelectContent>
              {roles?.data.map((role) => (
                <SelectItem key={role.id} value={String(role.id)}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label htmlFor="">انتخاب مجموعه</label>
          <Select
            dir="rtl"
            name="parentMenuElemntId"
            defaultValue={String(menuItem?.roleId ?? "")}
          >
            <SelectTrigger>
              <SelectValue placeholder="انتخاب مجموعه" />
            </SelectTrigger>
            <SelectContent>
              {menuItems?.data.map((item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          ذخیره
        </Button>
      </form>
    );
  }
);

export default MenuItemModal;
