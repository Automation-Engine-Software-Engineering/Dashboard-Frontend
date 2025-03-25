import EntitiesListModal from "@/components/common/modals/entities-list-modal";
import EntityModal from "@/components/common/modals/entity-modal";
import FormModal from "@/components/common/modals/form-modal";
import PropertyModal from "@/components/common/modals/property-modal";
import WorkflowModal from "@/components/common/modals/workflow-modal";

const ModalProvider = () => {
  return (
    <>
      <FormModal />
      <EntityModal />
      <PropertyModal />
      <EntitiesListModal />
      <WorkflowModal />
    </>
  );
};
export default ModalProvider;
