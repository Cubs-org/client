export interface ModalProps {
    visible?: boolean
    content: JSX.Element
}

export interface IModal {
    modalState: ModalProps
    openModal?: (payload: ModalProps) => void
    closeModal?: () => void
}
