import { expect } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { LeftIcon } from './LeftIcon'

describe('LeftIcon Component', () => {
  afterEach(cleanup)

  it('should render with an icon', () => {
    const { getByText } = render(<LeftIcon leftIcon="phone" type="text" />)
    expect(getByText('phone')).toBeInTheDocument()
  })

  it('should apply custom leftIconClass', () => {
    const customClass = 'text-red-500'
    const { getByText } = render(
      <LeftIcon leftIcon="phone" leftIconClass={customClass} type="text" />
    )
    const icon = getByText('phone')
    expect(icon.className).toContain(customClass)
  })

  it('should position differently for phone-number type', () => {
    const { getByText } = render(
      <LeftIcon leftIcon="phone" type="phone-number" />
    )
    const icon = getByText('phone')
    expect(icon.className).toContain('left-[70px]')
  })

  it('should have default position for other types', () => {
    const { getByText } = render(
      <LeftIcon leftIcon="password" type="password" />
    )
    const icon = getByText('password')
    expect(icon.className).toContain('left-4')
  })

  it('should apply disabled style', () => {
    const { getByText } = render(
      <LeftIcon type="text" leftIcon="phone" disabled />
    )
    const icon = getByText('phone')
    expect(icon.className).toContain('!text-button-primary-disabled')
  })
})
