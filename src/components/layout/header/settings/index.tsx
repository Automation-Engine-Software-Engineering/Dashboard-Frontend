import { Settings as SettingIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const Settings: React.FC<React.ComponentProps<"button">> = ({
  className,
  ...props
}) => {
  return (
    <button className={cn("group relative", className)} {...props}>
      <SettingIcon
        size={25}
        className="text-white transition-colors group-hover:text-slate-300"
      />
    </button>
  );
};
export default Settings;
