import { useCallback, useState } from "react";

const useModal = () => {
  const [modals, setModals] = useState<any>({});
  const [row, setRow] = useState();

  const handleOpen = useCallback((type: string, row?: any) => {
    setRow(row);
    setModals((prev: any) => {
      return {
        ...prev,
        [type]: true,
      };
    });
  }, []);

  const handleClose = useCallback((type: string) => {
    setModals((prev: any) => {
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
