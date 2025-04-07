import { Home } from "lucide-react";
import { useEffect, useState } from "react";

import { getWorkflowsByRole } from "@/api/workflow";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";

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
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getWorkflowsByRole();
        setItems(response);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div
      className={cn(
        "flex h-screen w-64 flex-col overflow-auto bg-[#2A3042]",
        className
      )}
      {...props}
    >
      <h3 className="py-5 text-center text-xl font-bold text-white">لوگو</h3>
      <div className="mt-10 flex-1 text-[#a6b0cf]">
        {isLoading ? (
          <Loading />
        ) : (
          <Accordion type="single" collapsible>
            <AccordionItem value="1">
              <AccordionTrigger className="px-5 text-sm transition-colors hover:text-white">
                <div className="flex items-center gap-x-3">
                  <Home size={20} />
                  ورک فلو
                </div>
              </AccordionTrigger>
              {items?.map((item) => (
                <AccordionContent
                  key={item.id}
                  className="px-[54px] py-0 text-xs transition-colors hover:text-white"
                >
                  <Link to="#" className="block py-3">
                    {item?.name}
                  </Link>
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </div>
  );
};
export default Navbar;

const Loading = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <MoonLoader color="white" size={50} />
    </div>
  );
};
