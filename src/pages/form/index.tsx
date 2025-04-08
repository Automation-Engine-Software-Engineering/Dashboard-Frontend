import { useEffect, useState } from "react";

import { getForm } from "@/api/form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import Box from "@/components/ui/box";

const FormPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formHTML, setFormHTML] = useState("");

  const { formId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const formData = await getForm(formId as string);
        setFormHTML(formData.htmlFormBody);
      } catch {
        toast.error("خطایی رخ داده است");
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <Box
      className="mx-auto"
      style={{
        width: "210mm",
        height: "297mm",
        transform: "scale(calc(min(100vw / 210mm, 100vh / 297mm)))",
        transformOrigin: "top left"
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: formHTML }} />
      )}
    </Box>
  );
};
export default FormPage;

const Loading = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <MoonLoader color="#2A3042" size={50} />
    </div>
  );
};
