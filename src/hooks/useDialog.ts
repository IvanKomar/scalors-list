import { useState, useCallback } from "react";

type UseDialog = {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
};

const useDialog = (): UseDialog => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return { isModalOpen, handleOpenModal, handleCloseModal };
};

export default useDialog;
