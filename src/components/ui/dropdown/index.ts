import { Dropdown as DropdownContainer } from './Dropdown'
import { _DropdownTrigger } from './components/dropdown-trigger'
import { _DropdownMenu } from './components/dropdown-menu'
import { _DropdownFooter } from './components/dropdown-footer'
import { _DropdownHeader } from './components/dropdown-header'
import { _DropdownBody } from './components/dropdown-body'

export const Dropdown = Object.assign(DropdownContainer, {
  Footer: _DropdownFooter,
  Header: _DropdownHeader,
  Menu: _DropdownMenu,
  Trigger: _DropdownTrigger,
  Body: _DropdownBody,
})

export default Dropdown
