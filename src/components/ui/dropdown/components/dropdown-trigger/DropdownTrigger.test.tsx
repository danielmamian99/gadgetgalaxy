import { ReactElement } from 'react'
import { describe, it, expect, vi } from 'vitest'
import {
  render,
  screen,
  fireEvent,
  RenderOptions,
} from '@testing-library/react'
import { _DropdownTrigger } from './DropdownTrigger'
import { DropdownProvider, ContextDropdownProps } from '../../context'

const renderWithTriggerContext = (
  ui: ReactElement,
  {
    providerProps,
    ...renderOptions
  }: { providerProps: ContextDropdownProps } & Omit<RenderOptions, 'queries'>
) => {
  return render(
    <DropdownProvider value={providerProps}>{ui}</DropdownProvider>,
    renderOptions
  )
}

const onCloseMock = vi.fn()
const setIsOpenMock = vi.fn()

let providerProps = {
  isOpen: true,
  closeOnOutsideClick: true,
  onClose: onCloseMock,
  setIsOpen: setIsOpenMock,
  isDisabled: false,
}

describe('DropdownTrigger', () => {
  beforeEach(() => {
    onCloseMock.mockClear()
    providerProps = {
      isOpen: true,
      closeOnOutsideClick: true,
      onClose: onCloseMock,
      setIsOpen: setIsOpenMock,
      isDisabled: false,
    }
  })
  it('toggles dropdown open state on click', () => {
    providerProps = {
      ...providerProps,
      isOpen: false,
    }

    renderWithTriggerContext(<_DropdownTrigger contentButton='Click me' />, {
      providerProps,
    })
    fireEvent.click(screen.getByText('Click me'))
    expect(setIsOpenMock).toHaveBeenCalledWith(true)
  })

  it('does not toggle if dropdown is disabled', () => {
    providerProps = {
      ...providerProps,
      isDisabled: true,
    }

    renderWithTriggerContext(<_DropdownTrigger contentButton='Click me' />, {
      providerProps,
    })
    fireEvent.click(screen.getByText('Click me'))
    expect(onCloseMock).not.toHaveBeenCalled()
  })

  it('renders children instead of default button when provided', () => {
    const customText = 'Custom Trigger'

    renderWithTriggerContext(
      <_DropdownTrigger>{customText}</_DropdownTrigger>,
      {
        providerProps,
      }
    )
    expect(screen.getByText(customText)).toBeInTheDocument()
    expect(screen.queryByText('Click me')).not.toBeInTheDocument()
  })
})
