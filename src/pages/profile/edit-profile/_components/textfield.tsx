import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input/index";

import { gradientStyle } from "./textarea";

interface Props extends React.ComponentProps<"input"> {
  label?: React.JSX.Element;
}

const Textfield: React.FC<Props> = ({ label, className, ...props }) => {
  return (
    <div className="relative w-full">
      {!!label && (
        <label
          style={gradientStyle}
          className="absolute -top-1 start-6 -translate-y-1/2 select-none px-3 text-sm"
        >
          {label}
        </label>
      )}
      <Input className={cn(className)} {...props} />
    </div>
  );
};
export default Textfield;
