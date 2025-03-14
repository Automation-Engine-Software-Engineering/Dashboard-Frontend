import { cn } from "@/lib/utils";

const ToolbarButton: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<"button"> & {
      editorRef: React.RefObject<HTMLDivElement>;
      command: string;
    }
  >
> = ({ command, editorRef, children, ...props }) => {
  const handleCommand = (command: string) => {
    document.execCommand(command, true, null!);
    editorRef?.current?.focus();
  };

  return (
    <button
      className={cn(
        "flex size-8 items-center justify-center rounded-md p-1 text-slate-900 transition-colors hover:bg-primary/10",
        props.className
      )}
      onClick={() => handleCommand(command)}
      {...props}
    >
      {children}
    </button>
  );
};

export default ToolbarButton;
