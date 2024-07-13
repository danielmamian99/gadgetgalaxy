import { expect, vi } from 'vitest'
import { cleanup, render, fireEvent } from '@testing-library/react'
import { Label } from './Label'

/* const labelPosition = useMemo(() => {
  let newTop = top
  let newLeft = left

  if (!leftIcon && type === 'phone-number') {
    newLeft = 70
  }

  if (leftIcon && type !== 'phone-number') {
    newLeft = 44
  }

  if (leftIcon && type === 'phone-number') {
    newLeft = 110
  }

  if (!!placeholder || active || !!value) {
    newTop = 4
  }

  return {
    left: newLeft,
    top: newTop
  }
}, [left, top, leftIcon, placeholder, type, active, value]) */

describe('Label Component', () => {
  afterEach(cleanup)

  const handleLabelClick = vi.fn()

  it('should render with labelText', () => {
    const labelText = 'Test Label'
    const { getByLabelText } = render(
      <Label
        labelText={labelText}
        handleLabelClick={handleLabelClick}
        name="test"
      />
    )
    expect(getByLabelText(labelText)).toBeInTheDocument()
  })

  it('should be in active state', () => {
    const { getByLabelText } = render(
      <Label
        active={true}
        labelText="Active Label"
        handleLabelClick={handleLabelClick}
        name="test"
      />
    )
    const label = getByLabelText('Active Label')
    expect(label).toHaveClass('text-body-s')
  })

  it('should adjust position based on props', () => {
    const { getByLabelText } = render(
      <Label
        leftIcon="phone"
        type="phone-number"
        labelText="Positioned Label"
        handleLabelClick={handleLabelClick}
        name="test"
      />
    )
    const label = getByLabelText('Positioned Label')
    // Adjust the expectation based on your styling and logic
    expect(label.style.left).toBe('110px')
  })

  it('should handle click event', () => {
    const { getByText } = render(
      <Label
        labelText="Clickable Label"
        handleLabelClick={handleLabelClick}
        name="test"
      />
    )
    fireEvent.click(getByText('Clickable Label'))
    expect(handleLabelClick).toHaveBeenCalledTimes(1)
  })

  it('should display error state', () => {
    const { getByLabelText } = render(
      <Label
        error="Error message"
        labelText="Error Label"
        handleLabelClick={handleLabelClick}
        name="test"
      />
    )
    const label = getByLabelText('Error Label')
    expect(label).toHaveClass('peer-focus:!text-destructive')
  })

  it('should be disabled', () => {
    const { getByLabelText } = render(
      <Label
        disabled={true}
        labelText="Disabled Label"
        handleLabelClick={handleLabelClick}
        name="test"
      />
    )
    const label = getByLabelText('Disabled Label')
    expect(label).toHaveClass('!text-button-primary-disabled')
  })

  it('should adjust for placeholder presence', () => {
    const { getByLabelText } = render(
      <Label
        placeholder="Placeholder"
        labelText="Placeholder Label"
        handleLabelClick={handleLabelClick}
        name="test"
      />
    )
    const label = getByLabelText('Placeholder Label')
    expect(label.style.top).toBe('4px')
  })
})
