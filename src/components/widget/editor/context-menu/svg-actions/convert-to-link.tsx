import { ContextMenuItem } from "@/components/ui/context-menu";

const ConvertToLink: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  return (
    <ContextMenuItem
      onClick={() => {
        const href = prompt("link") ?? "";
        const linkElem = document.createElement("a");

        linkElem.href = href;
        linkElem.target = "_blank";
        linkElem.appendChild(rightClickedElement.cloneNode(true));

        rightClickedElement.replaceWith(linkElem);
      }}
    >
      لینک
    </ContextMenuItem>
  );
};
export default ConvertToLink;
