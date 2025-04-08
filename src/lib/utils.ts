import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getInitialName = (name: string): string => {
  const nameParts = name.split(" ").filter(Boolean);
  const initials = nameParts.slice(0, 2).map((part) => part[0].toUpperCase());
  return initials.join("");
};
