import { expect, vi } from 'vitest'
import { cleanup, render, fireEvent } from '@testing-library/react'
import { RightIcon } from './RightIcon'

describe('RightIcon Component', () => {
  afterEach(cleanup)

  it('should render with an icon', () => {
    const { getByTestId } = render(<RightIcon rightIcon="settings" />)
    expect(getByTestId('right-icon')).toHaveTextContent('settings')
  })

  it('should apply custom rightIconClass', () => {
    const customClass = 'text-red-500'
    const { getByTestId } = render(
      <RightIcon rightIcon="settings" rightIconClass={customClass} />
    )
    const icon = getByTestId('right-icon')
    expect(icon.className).toContain(customClass)
  })

  it('should be hidden when no icon is provided', () => {
    const { queryByTestId } = render(<RightIcon />)
    expect(queryByTestId('right-icon')).toHaveClass('!hidden')
  })

  it('should apply disabled style', () => {
    const { getByTestId } = render(<RightIcon rightIcon="settings" disabled />)
    const icon = getByTestId('right-icon')
    expect(icon.className).toContain('!text-button-primary-disabled')
  })

  it('should apply error style', () => {
    const { getByTestId } = render(<RightIcon rightIcon="error" error />)
    const icon = getByTestId('right-icon')
    expect(icon.className).toContain('!text-destructive')
  })

  it('should handle onRightIconClick event', async () => {
    const onRightIconClick = vi.fn()
    const { getByTestId } = render(
      <RightIcon rightIcon="settings" onRightIconClick={onRightIconClick} />
    )
    fireEvent.click(getByTestId('right-icon'))
    expect(onRightIconClick).toHaveBeenCalledTimes(1)
  })
})
