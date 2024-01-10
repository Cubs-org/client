import { 
  useState,
  createContext, 
  useContext
} from 'react'

const ModalContext = createContext({})

const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({ 
    visible: false, 
    content:<></> 
  })

  const openModal = (payload) => setModalState({ ...payload, visible: true })
  const closeModal = () => setModalState({ visible: false, content:<></> })

  return <ModalContext.Provider value={{ modalState, openModal, closeModal }}>{children}</ModalContext.Provider>
}

const useModal = () => {
  const context = useContext(ModalContext);
  return context;
}

export { ModalProvider, useModal }