import { forwardRef, memo, useImperativeHandle, useRef, useState } from "react";

import Align from "@/components/widget/editor/toolbar-buttons/aligns";
import Bold from "@/components/widget/editor/toolbar-buttons/bold";
import FontSizePicker from "@/components/widget/editor/toolbar-buttons/font-size";
import InsertHorizonLine from "@/components/widget/editor/toolbar-buttons/insert-horizon-line";
import InsertImage from "@/components/widget/editor/toolbar-buttons/insert-image";
import Italic from "@/components/widget/editor/toolbar-buttons/italic";
import ListOrder from "@/components/widget/editor/toolbar-buttons/list-order";
import Strikethrough from "@/components/widget/editor/toolbar-buttons/strikethrough";
import TextColorPicker from "@/components/widget/editor/toolbar-buttons/text-color";
import TextHighlight from "@/components/widget/editor/toolbar-buttons/text-highlight";
import Underline from "@/components/widget/editor/toolbar-buttons/underline";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Textarea } from "@/components/ui/textarea";

interface Props {
  notification: any | null;
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  notification
}) => {
  const title = notification
    ? `ویرایش اعلان ${notification.name}`
    : "ساخت اعلان جدید";
  const description = notification
    ? "ویرایش اعلان"
    : "ساخت اعلان جدید برای سیستم";

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Content notification={notification} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

const Content = memo(
  ({
    notification
    // onClose
  }: {
    notification: any | null;
    onClose: () => void;
  }) => {
    const [notificationType, setNotificationType] = useState("manual");

    // const queryClient = useQueryClient();

    // const { mutate, isPending } = useMutation({
    //   mutationFn: (data: any) =>
    //     notification ? editNotification(data) : createNotification(data),
    //   onSuccess: () => {
    //     queryClient.invalidateQueries({ queryKey: ["notifications"] });
    //     onClose();
    //   }
    // });

    const handleSubmit = () => {
      // e.preventDefault();
      // const formData = new FormData(e.currentTarget);
      // const data: Record<any, any> = Object.fromEntries(formData);
      // data.id = notification!.id;
      // mutate(data);
    };

    return (
      <form className="space-y-5 overflow-x-hidden" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label htmlFor="">نام اعلان</label>
          <Input
            type="text"
            name="name"
            placeholder="نام نفش"
            defaultValue={notification?.name ?? ""}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="">توضیحات</label>
          <Input
            type="text"
            name="description"
            placeholder="توضیحات"
            defaultValue={notification?.description ?? ""}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="">نوع اعلان</label>
          <Select
            onValueChange={(val) => {
              setNotificationType(val);
            }}
            defaultValue="manual"
            dir="rtl"
          >
            <SelectTrigger>
              <SelectValue placeholder="انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">ایمیل</SelectItem>
              <SelectItem value="manual">اعلان عادی</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label htmlFor="">محتوا</label>
          {notificationType === "email" ? (
            <Editor />
          ) : (
            <Textarea
              name="content"
              placeholder="توضیحات"
              defaultValue={notification?.content ?? ""}
            />
          )}
        </div>

        <Button type="submit" className="w-full" disabled={false}>
          ذخیره
        </Button>
      </form>
    );
  }
);

const Editor = forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  (_props, ref) => {
    const innerRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

    return (
      <div className="flex h-64 flex-col border p-2">
        <div className="mb-2 flex items-center gap-x-2 overflow-x-scroll border-b pb-2">
          <FontSizePicker type="button" editorRef={innerRef} />
          <Bold type="button" editorRef={innerRef} />
          <Italic type="button" editorRef={innerRef} />
          <Underline type="button" editorRef={innerRef} />
          <Strikethrough type="button" editorRef={innerRef} />
          <TextColorPicker type="button" editorRef={innerRef} />
          <TextHighlight type="button" editorRef={innerRef} />
          <Align type="button" editorRef={innerRef} />
          <ListOrder type="button" editorRef={innerRef} />
          <InsertHorizonLine type="button" editorRef={innerRef} />
          <InsertImage type="button" editorRef={innerRef} />
        </div>
        <div
          ref={innerRef}
          contentEditable
          className="flex-1 overflow-auto outline-none"
        ></div>
      </div>
    );
  }
);

export default NotificationModal;
