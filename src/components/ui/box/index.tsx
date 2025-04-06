import { cn } from "@/lib/utils";

const Box: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-md p-10 shadow-md shadow-black/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
export default Box;
