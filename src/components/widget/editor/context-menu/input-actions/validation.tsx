import {
  ContextMenuContent,
  ContextMenuSub,
  ContextMenuSubTrigger
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";

const InputValidation = ({
  rightClickedElement
}: {
  rightClickedElement: HTMLElement;
}) => {
  const regex = rightClickedElement.getAttribute("data-regex") ?? "";
  const errorMessage =
    rightClickedElement.getAttribute("data-regex-message") ?? "";
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger>اعتبار سنجی</ContextMenuSubTrigger>
      <ContextMenuContent className="space-y-2">
        <div dir="ltr">
          <label className="text-xs text-slate-500" htmlFor="">
            Regex
          </label>
          <Input
            defaultValue={regex}
            placeholder="regex"
            onChange={(e) =>
              rightClickedElement.setAttribute("data-regex", e.target.value)
            }
          />
        </div>
        <div>
          <label className="text-xs text-slate-500" htmlFor="">
            متن خطا
          </label>
          <Input
            defaultValue={errorMessage}
            placeholder="متن خطا"
            onChange={(e) =>
              rightClickedElement.setAttribute(
                "data-regex-message",
                e.target.value
              )
            }
          />
        </div>
      </ContextMenuContent>
    </ContextMenuSub>
  );
};
export default InputValidation;
