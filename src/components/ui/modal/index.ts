import { Modal as ModalComponent } from './Modal'
import { _ModalFooter } from './components/modal-footer'
import { _ModalHeader } from './components/modal-header'
import { _ModalBody } from './components/modal-body'

export const Modal = Object.assign(ModalComponent, {
  Footer: _ModalFooter,
  Header: _ModalHeader,
  Body: _ModalBody
})

export default Modal
