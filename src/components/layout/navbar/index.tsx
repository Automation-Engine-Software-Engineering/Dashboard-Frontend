import { Link } from "react-router-dom";
import { Home } from "lucide-react";


import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const Navbar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn("h-full w-64 bg-[#2A3042]", className)} {...props}>
      <h3 className="py-5 text-center text-xl font-bold text-white">لوگو</h3>
      <div className="mt-10 text-[#a6b0cf]">
        <Accordion type="single" collapsible>
          <AccordionItem value="1">
            <AccordionTrigger className="px-5 text-sm transition-colors hover:text-white">
              <div className="flex items-center gap-x-3">
                <Home size={20} />
                داشبورد
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-[54px] py-0 text-xs transition-colors hover:text-white">
              <Link to="/dashboard" className="block py-3">
                پیش فرض
              </Link>
            </AccordionContent>
            <AccordionContent className="px-[54px] py-0 text-xs transition-colors hover:text-white">
              <Link to="/dashboard/table" className="block py-3">
                جدول
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
export default Navbar;
