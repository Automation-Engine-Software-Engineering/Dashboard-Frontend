import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn("w-64 h-full bg-[#2A3042]", className)} {...props}>
      <h3 className="text-center font-bold text-xl text-white py-5">لوگو</h3>
      <div className="mt-10 text-[#a6b0cf]">
        <Accordion type="single" collapsible>
          <AccordionItem value="1">
            <AccordionTrigger className="px-5 text-sm hover:text-white transition-colors">
              <div className="flex items-center gap-x-3">
                <Home size={20} />
                داشبورد
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-[54px] py-0  text-xs hover:text-white transition-colors">
              <Link to="/dashboard" className="block py-3">
                پیش فرض
              </Link>
            </AccordionContent>
            <AccordionContent className="px-[54px] py-0  text-xs hover:text-white transition-colors">
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
