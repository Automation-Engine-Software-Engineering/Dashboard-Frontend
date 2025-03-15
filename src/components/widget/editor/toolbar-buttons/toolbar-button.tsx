import { cn } from "@/lib/utils";

const ToolbarButton: React.FC<
  React.PropsWithChildren<React.ComponentProps<"button">>
> = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "flex size-8 items-center justify-center rounded-md p-1 text-slate-900 transition-colors hover:bg-primary/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ToolbarButton;
