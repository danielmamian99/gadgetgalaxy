import { expect } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { RightText } from './RightText'

describe('RightText Component', () => {
  afterEach(cleanup)

  it('should render right text when provided', () => {
    const rightText = 'Test Text'
    const { getByText } = render(<RightText rightText={rightText} />)
    expect(getByText(rightText)).toBeInTheDocument()
  })

  it('should have default right position without right icon', () => {
    const rightText = 'No Icon Text'
    const { getByText } = render(<RightText rightText={rightText} />)
    const textElement = getByText(rightText)
    expect(textElement).toHaveClass('right-4')
  })

  it('should have adjusted right position with right icon', () => {
    const rightText = 'With Icon Text'
    const rightIcon = 'icon'
    const { getByText } = render(
      <RightText rightText={rightText} rightIcon={rightIcon} />
    )
    const textElement = getByText(rightText)
    expect(textElement).toHaveClass('right-12')
  })
})
