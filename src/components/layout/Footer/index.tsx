// index.tsx
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

export const Footer: React.FC<React.ComponentProps<"footer">> = ({
  className,
  ...props
}) => {
  return (
    <footer className={cn(className)} {...props}>
      <div className="flex h-[70px] items-center gap-x-3 border border-slate-300 pr-12 text-xs">
        <Link to="#" className="hover:text-primary">
          ارتباط <span className="text-[#E4EBF3]">/</span>
        </Link>
        <Link to="#" className="hover:text-primary">
          حریم‌خصوصی <span className="text-[#E4EBF3]">/</span>
        </Link>
        <Link to="#" className="hover:text-primary">
          اخبار <span className="text-[#E4EBF3]">/</span>
        </Link>
        <Link to="#" className="hover:text-primary">
          پشتیبانی <span className="text-[#E4EBF3]">/</span>
        </Link>
        <Link to="#" className="hover:text-primary">
          درباره ما <span className="text-[#E4EBF3]">/</span>
        </Link>
      </div>
      <div className="bg-secondary h-[44px]"></div>
    </footer>
  );
};
