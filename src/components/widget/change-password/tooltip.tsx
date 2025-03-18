import * as Tooltip from "@radix-ui/react-tooltip";
import { FaInfoCircle } from "react-icons/fa";

const PassTooltip = () => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger asChild>
          <div className="inline-block">
            <FaInfoCircle className="cursor-pointer text-gray-500 hover:text-gray-700" />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent rounded-md bg-black px-3 py-1 text-sm text-white shadow-md"
            side="top"
            align="center"
            sideOffset={5}
          >
            اگر برای اولین بار پسورد خود را تغییر می دهید این قسمت را خالی
            بگذارید
            <Tooltip.Arrow className="fill-black" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default PassTooltip;
