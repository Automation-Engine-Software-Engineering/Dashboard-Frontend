import { EyeIcon } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import ToolbarButton from "./toolbar-buttons/toolbar-button";

const PreviewForm = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  return (
    <ToolbarButton
      onClick={() => {
        navigate(`/form/preview/${formId}`);
      }}
      className="flex size-fit items-center gap-x-2 font-sans"
    >
      <EyeIcon />
      Preview
    </ToolbarButton>
  );
};
export default PreviewForm;
