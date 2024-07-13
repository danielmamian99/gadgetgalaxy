import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import Input from './Input'

describe('Input', () => {
  it('should render the input field with the correct label', () => {
    const { getByLabelText } = render(
      <Input name="test" labelText="Username" />
    )
    const input = getByLabelText('Username')
    expect(input).toBeDefined()
  })

  it('should call the onChange callback when the input value changes', () => {
    const onChange = vi.fn()
    const { getByLabelText } = render(
      <Input name="Username" onChange={onChange} />
    )
    const input = getByLabelText('Username')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(onChange).toBeCalled()
  })

  it('should render an error message if the input value is invalid', () => {
    const { getByText } = render(
      <Input name="test" error="This is an invalid value" />
    )
    expect(getByText('This is an invalid value')).toBeTruthy()
  })

  it('should render an informative message under input', () => {
    const { getByText } = render(
      <Input name="test" information="information text" />
    )
    expect(getByText('information text')).toBeTruthy()
  })

  it('should render an placeholder message into input', () => {
    render(<Input name="test" placeholder="placeholder text" />)
    expect(screen.queryByPlaceholderText('placeholder text')).toBeTruthy()
  })

  it('should render a righticon into input', () => {
    const { getByText } = render(
      <Input name="test" information="information text" rightIcon="cancel" />
    )
    expect(getByText('cancel')).toBeTruthy()
  })

  it('should render a right text into input', () => {
    const { getByText } = render(
      <Input name="test" information="information text" rightText="USD" />
    )
    expect(getByText('USD')).toBeTruthy()
  })

  it('should render a right text and icon into input', () => {
    const { getByText } = render(
      <Input
        name="test"
        information="information text"
        rightText="USD"
        rightIcon="cancel"
      />
    )
    expect(getByText('USD')).toBeTruthy()
    expect(getByText('cancel')).toBeTruthy()
  })

  it('should render a left icon into input', () => {
    const { getByText } = render(
      <Input name="test" information="information text" leftIcon="search" />
    )
    expect(getByText('search')).toBeTruthy()
  })

  it('should render a left icon, right icon and right text into input', () => {
    const { getByText } = render(
      <Input
        name="test"
        information="information text"
        rightIcon="cancel"
        leftIcon="search"
        rightText="USD"
      />
    )
    expect(getByText('search')).toBeTruthy()
    expect(getByText('USD')).toBeTruthy()
    expect(getByText('cancel')).toBeTruthy()
  })

  it('should render a disabled input', () => {
    const { getByLabelText } = render(<Input name="test" disabled />)
    const input = getByLabelText('test') as HTMLInputElement
    expect(input.disabled).toBeTruthy()
  })

  it('should call the onRightIconClick callback when the input handle click in right icon', () => {
    const onRightIconClick = vi.fn()
    const { getByText } = render(
      <Input
        name="Username"
        onRightIconClick={onRightIconClick}
        rightIcon="cancel"
      />
    )
    const icon = getByText('cancel')

    fireEvent.click(icon)
    expect(onRightIconClick).toBeCalled()
  })

  it('should call the getRef callback when the input was mounted', () => {
    const getRef = vi.fn()
    render(<Input name="Username" getRef={getRef} rightIcon="cancel" />)

    expect(getRef).toBeCalled()
  })

  it('should call the getRef callback when the input was mounted', () => {
    const { getByText, getByLabelText } = render(
      <Input name="Username" labelText="labelText" />
    )
    const label = getByText('labelText')

    fireEvent.click(label)
    expect(getByLabelText('Username').matches(':focus')).toBeTruthy()
  })
})
