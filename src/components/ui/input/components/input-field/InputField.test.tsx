import { expect, vi } from 'vitest'
import { cleanup, render, fireEvent } from '@testing-library/react'
import { InputField } from './InputField'

const mockHandleActivation = vi.fn()
const mockHandleInputChange = vi.fn()
const mockOnChange = vi.fn()
const mockOnBlur = vi.fn()

describe('InputField Component', () => {
  afterEach(cleanup)

  it('should render input with provided value and placeholder', () => {
    const { getByTestId } = render(
      <InputField
        props={{}}
        name="test-input"
        value="Test"
        inputRef={{ current: null }}
        type="text"
        placeholder="Enter text"
        handleActivation={mockHandleActivation}
        handleInputChange={mockHandleInputChange}
      />
    )
    const inputElement = getByTestId('input-text-field') as HTMLInputElement
    expect(inputElement.value).toBe('Test')
    expect(inputElement.placeholder).toBe('Enter text')
  })

  it('should call onChange, handleActivation, and handleInputChange on user input', () => {
    const { getByTestId } = render(
      <InputField
        props={{}}
        name="phone-number"
        value=""
        inputRef={{ current: null }}
        type="phone-number"
        handleActivation={mockHandleActivation}
        handleInputChange={mockHandleInputChange}
        onChange={mockOnChange}
      />
    )
    const inputElement = getByTestId('input-text-field')
    fireEvent.change(inputElement, { target: { value: '123' } })
    expect(mockHandleActivation).toHaveBeenCalled()
    expect(mockHandleInputChange).toHaveBeenCalled()
    expect(mockOnChange).toHaveBeenCalled()
  })

  it('should apply disabled style if disabled is true', () => {
    const { getByTestId } = render(
      <InputField
        props={{}}
        name="disabled-input"
        value=""
        inputRef={{ current: null }}
        type="text"
        disabled={true}
        handleActivation={mockHandleActivation}
        handleInputChange={mockHandleInputChange}
      />
    )
    const inputElement = getByTestId('input-text-field')
    expect(inputElement).toBeDisabled()
  })

  it('should display error styles if error is present', () => {
    const { getByTestId } = render(
      <InputField
        props={{}}
        name="error-input"
        value=""
        inputRef={{ current: null }}
        type="text"
        error="Error message"
        handleActivation={mockHandleActivation}
        handleInputChange={mockHandleInputChange}
      />
    )
    const inputElement = getByTestId('input-text-field')
    expect(inputElement).toHaveClass('!border-destructive')
  })

  it('should call onBlur when input loses focus', () => {
    const { getByTestId } = render(
      <InputField
        props={{}}
        name="blur-input"
        value=""
        inputRef={{ current: null }}
        type="text"
        onBlur={mockOnBlur}
        handleActivation={mockHandleActivation}
        handleInputChange={mockHandleInputChange}
      />
    )
    const inputElement = getByTestId('input-text-field')
    fireEvent.blur(inputElement)
    expect(mockOnBlur).toHaveBeenCalled()
  })
})
