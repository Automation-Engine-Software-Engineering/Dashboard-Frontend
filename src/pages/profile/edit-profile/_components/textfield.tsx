import { cn } from "@/lib/utils";

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
          className="absolute start-6 top-0 -translate-y-1/2 select-none px-3 py-1 text-sm"
        >
          {label}
        </label>
      )}
      <input
        className={cn(
          "focus: h-10 w-full !resize-none rounded-lg border border-slate-300 p-5 ring-2 ring-transparent transition-colors focus-within:border-slate-400 focus-within:outline-none focus:border-primary focus:ring-primary/30",
          className
        )}
        {...props}
      />
    </div>
  );
};
export default Textfield;
