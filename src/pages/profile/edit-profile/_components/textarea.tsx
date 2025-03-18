import { cn } from "@/lib/utils";

import { Textarea as TextareaUi } from "@/components/ui/textarea/index";

interface Props extends React.ComponentProps<"textarea"> {
  label?: React.JSX.Element;
}

export const gradientStyle = {
  background:
    "linear-gradient(0deg, rgba(255,255,255,1) 25%, rgba(248,248,251,1) 25%)"
};

const Textarea: React.FC<Props> = ({ label, className, ...props }) => {
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
      <TextareaUi className={cn("resize-none pt-5", className)} {...props} />
    </div>
  );
};
export default Textarea;
