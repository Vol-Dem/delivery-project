import { createContext, useState } from "react";

const ModalContext = createContext({
  modalIsopen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const AuthContextProvider = (props) => {
  const [modalIsopen, setModalIsOpen] = useState(false);

  const openAuthForm = () => {
    setModalIsOpen(true);
  };
  const closeAuthForm = () => {
    setModalIsOpen(false);
  };

  const context = {
    modalIsopen,
  };

  return <ModalContext value={context}>{props.children}</ModalContext>;
};

export default ModalContext;
