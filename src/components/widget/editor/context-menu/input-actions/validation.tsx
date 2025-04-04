import { InfoIcon } from "lucide-react";

import { Link } from "react-router-dom";

import {
  ContextMenuContent,
  ContextMenuSub,
  ContextMenuSubTrigger
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

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
          <div className="flex items-center gap-x-2 pb-2">
            <label className="text-xs text-slate-500" htmlFor="">
              Regex
            </label>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon size={16} className="text-slate-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <Link
                    to="https://blog.faradars.org/regex-tutorial-with-examples"
                    target="_blank"
                    className="text-black underline"
                  >
                    راهنمای
                  </Link>{" "}
                  نوشتاری الگو
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
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
