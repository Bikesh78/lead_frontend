import { useCallback, useState } from "react";

const useModal = () => {
  const [modals, setModals] = useState({});
  const [row, setRow] = useState();

  const handleOpen = useCallback((type: any, row: any) => {
    setRow(row);
    setModals((prev) => {
      return {
        ...prev,
        [type]: true,
      };
    });
  }, []);

  const handleClose = useCallback((type: any) => {
    setModals((prev) => {
      return {
        ...prev,
        [type]: false,
      };
    });
  }, []);

  const closeAllModal = useCallback(() => {
    setModals({});
  }, []);

  return { modals, row, handleOpen, handleClose, closeAllModal };
};

export default useModal;
