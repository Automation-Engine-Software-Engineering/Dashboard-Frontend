import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"textarea"> {
  label?: React.JSX.Element;
}

const Textarea: React.FC<Props> = ({ label, className, ...props }) => {
  return (
    <div className="relative w-full">
      {!!label && (
        <label className="absolute start-6 top-0 -translate-y-1/2 select-none bg-white px-3 py-1 text-sm">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "!resize-none rounded-lg border border-slate-300 p-5 transition-colors focus-within:border-slate-400 focus-within:outline-none",
          className
        )}
        {...props}
      />
    </div>
  );
};
export default Textarea;
