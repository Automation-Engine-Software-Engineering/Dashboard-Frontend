import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"textarea"> {
  label?: React.JSX.Element;
}

export const gradientStyle = {
  background:
    "linear-gradient(0deg, rgba(255,255,255,1) 50%, rgba(248,248,251,1) 50%)"
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
      <textarea
        className={cn(
          "!resize-none rounded-lg border border-slate-300 p-5 ring-2 ring-transparent transition-colors focus:border-primary focus:outline-none focus:ring-primary/30",
          className
        )}
        {...props}
      />
    </div>
  );
};
export default Textarea;
