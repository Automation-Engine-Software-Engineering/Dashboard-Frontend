import { memo, useState } from "react";

import { createMenuItem, editMenuItem } from "@/api/menu";
import { icons } from "@/constants/editor/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";

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
import { ScrollArea } from "@/components/ui/scroll-area";
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

    const [iconSearch, setIconSearch] = useState("");
    const [iconCount, setIconCount] = useState(20);
    const [selectedIcon, setSelectedIcon] = useState<string>(
      () => menuItem?.icon ?? ""
    );

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
      data.icon = selectedIcon;
      data.parentMenuElemntId =
        data.parentMenuElemntId === "none" ? null : data.parentMenuElemntId;
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
            defaultValue={String(menuItem?.parentMenuElemntId ?? "")}
          >
            <SelectTrigger>
              <SelectValue placeholder="انتخاب مجموعه" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">بدون مجموعه</SelectItem>
              {menuItems?.data.map((item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <Input
            type="text"
            placeholder="جستوجو"
            className="mb-2"
            onChange={(e) => setIconSearch(e.target.value)}
          />
          <ScrollArea className="mb-2 h-20 w-full rounded-lg bg-slate-100">
            <div className="grid grid-cols-12 justify-items-center gap-1 p-1">
              {icons
                .filter((icon) =>
                  icon
                    .toLocaleLowerCase()
                    .split("-")
                    .join(" ")
                    .includes(iconSearch.toLocaleLowerCase())
                )
                .slice(0, iconCount)
                .map((icon) => (
                  <Button
                    key={icon}
                    type="button"
                    variant="ghost"
                    className={cn(
                      "size-full px-0 py-2 [&_svg]:size-7",
                      selectedIcon === icon && "bg-primary/20"
                    )}
                    onClick={() => setSelectedIcon(icon)}
                  >
                    <i className={icon}></i>
                  </Button>
                ))}
            </div>
          </ScrollArea>
          <Button
            type="button"
            className="w-full"
            variant="outline"
            onClick={() => {
              setIconCount((prev) => prev + 20);
            }}
          >
            بیشتر ...
          </Button>
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          ذخیره
        </Button>
      </form>
    );
  }
);

export default MenuItemModal;
