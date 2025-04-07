import { Fragment, memo, useEffect, useState } from "react";

import { createMenuItem, editMenuItem, getAllMenuItems } from "@/api/menu";
import { getAllRole } from "@/api/role";
import { getAllWorkflows } from "@/api/workflow";
import { icons } from "@/constants/editor/icons";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { HashLoader } from "react-spinners";

import { cn } from "@/lib/utils";

import { MenuItemType } from "@/types/menu-item";

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
      <DialogContent className="max-h-[90vh] overflow-y-auto">
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
    const [iconSearch, setIconSearch] = useState("");
    const [iconCount, setIconCount] = useState(20);
    const [selectedIcon, setSelectedIcon] = useState<string>(
      () => menuItem?.icon ?? ""
    );

    const queryClient = useQueryClient();

    const {
      isFetchingNextPage: isFetchingNextPageWorkflows,
      hasNextPage: hasNextPageWorkflows,
      data: workflows,
      fetchNextPage: fetchNextPageWorkflows
    } = useInfiniteQuery({
      queryKey: ["workflows"],
      queryFn: async ({ pageParam }) => {
        return await getAllWorkflows({ page: pageParam, size: 10 });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage?.data?.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      }
    });

    const {
      isFetchingNextPage: isFetchingNextPageRoles,
      hasNextPage: hasNextPageRoles,
      data: roles,
      fetchNextPage: fetchNextPageRoles
    } = useInfiniteQuery({
      queryKey: ["roles"],
      queryFn: async ({ pageParam }) => {
        return await getAllRole({ page: pageParam, size: 10 });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage?.data?.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      }
    });

    const {
      isFetchingNextPage: isFetchingNextPageMenus,
      hasNextPage: hasNextPageMenus,
      data: menus,
      fetchNextPage: fetchNextPageMenus
    } = useInfiniteQuery({
      queryKey: ["menu-items"],
      queryFn: async ({ pageParam }) => {
        return await getAllMenuItems({ page: pageParam, size: 10 });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage?.data?.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      }
    });

    const { mutate, isPending } = useMutation({
      mutationFn: (data: any) =>
        menuItem ? editMenuItem(data) : createMenuItem(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menu-items"] });
        onClose();
      }
    });

    const { ref: workflowRef, inView: workflowInView } = useInView();
    const { ref: roleRef, inView: roleInView } = useInView();
    const { ref: menuRef, inView: menuInView } = useInView();

    useEffect(() => {
      if (workflowInView) {
        fetchNextPageWorkflows();
      }
    }, [fetchNextPageWorkflows, workflowInView]);

    useEffect(() => {
      if (roleInView) {
        fetchNextPageRoles();
      }
    }, [fetchNextPageRoles, roleInView]);

    useEffect(() => {
      if (menuInView) {
        fetchNextPageMenus();
      }
    }, [fetchNextPageMenus, menuInView]);

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
        data.parentMenuElemntId === "none"
          ? undefined
          : data.parentMenuElemntId;

      data.link = data.link ? data.link : undefined;
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
              {workflows?.pages.map((workflow, index) => (
                <Fragment key={index}>
                  {workflow?.data.map((workflow) => (
                    <SelectItem key={workflow.id} value={String(workflow.id)}>
                      {workflow.name}
                    </SelectItem>
                  ))}
                </Fragment>
              ))}

              {hasNextPageWorkflows && (
                <div
                  ref={workflowRef}
                  className="flex w-full justify-center py-1 text-center"
                >
                  {isFetchingNextPageWorkflows ? (
                    <HashLoader size={30} color="#0099A5" />
                  ) : (
                    "بیشتر"
                  )}
                </div>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label htmlFor="">لینک</label>
          <Input
            dir="ltr"
            placeholder="لینک"
            name="link"
            defaultValue={menuItem?.link}
          />
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
              {roles?.pages.map((role, index) => (
                <Fragment key={index + 1}>
                  {role?.data.map((role) => (
                    <SelectItem key={role.id} value={String(role.id)}>
                      {role.name}
                    </SelectItem>
                  ))}
                </Fragment>
              ))}
              {hasNextPageRoles && (
                <div
                  ref={roleRef}
                  className="flex w-full justify-center py-1 text-center"
                >
                  {isFetchingNextPageRoles ? (
                    <HashLoader size={30} color="#0099A5" />
                  ) : (
                    "بیشتر"
                  )}
                </div>
              )}
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
              {menus?.pages.map((menu, index) => (
                <Fragment key={index + 1}>
                  {menu?.data.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))}
                </Fragment>
              ))}
              {hasNextPageMenus && (
                <div
                  ref={menuRef}
                  className="flex w-full justify-center py-1 text-center"
                >
                  {isFetchingNextPageMenus ? (
                    <HashLoader size={30} color="#0099A5" />
                  ) : (
                    "بیشتر"
                  )}
                </div>
              )}
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
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  "size-full px-0 py-2 [&_svg]:size-7",
                  selectedIcon === menuItem?.icon && "bg-primary/20"
                )}
              >
                <i className={selectedIcon}></i>
              </Button>
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
