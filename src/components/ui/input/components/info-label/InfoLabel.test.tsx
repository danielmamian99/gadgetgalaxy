import { expect } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { InfoLabel } from './InfoLabel'

describe('InfoLabel Component', () => {
  afterEach(cleanup)

  it('should render information text when provided', () => {
    const information = 'Test Information'
    const { getByText } = render(<InfoLabel information={information} />)
    expect(getByText(information)).toBeInTheDocument()
  })

  it('should render error text when error is provided', () => {
    const error = 'Test Error'
    const { getByText } = render(<InfoLabel error={error} />)
    expect(getByText(error)).toBeInTheDocument()
  })

  it('should not render information when error is present', () => {
    const information = 'Test Information'
    const error = 'Test Error'
    const { queryByText } = render(
      <InfoLabel information={information} error={error} />
    )
    expect(queryByText(information)).not.toBeInTheDocument()
    expect(queryByText(error)).toBeInTheDocument()
  })

  it('should apply disabled style', () => {
    const information = 'Disabled Information'
    const { getByText } = render(
      <InfoLabel information={information} disabled={true} />
    )
    // Adjust the expectation based on your disabled styling
    expect(getByText(information)).toHaveClass('!text-button-primary-disabled')
  })

  it('should display information icon if provided', () => {
    const information = 'Information with Icon'
    const informationIcon = 'info'
    const { getByText } = render(
      <InfoLabel information={information} informationIcon={informationIcon} />
    )
    expect(getByText(informationIcon)).toBeInTheDocument()
  })

  it('should apply custom class to the information icon', () => {
    const error = 'Error with Custom Icon'
    const informationIcon = 'error'
    const informationIconClass = 'custom-icon-class'
    const { getByText } = render(
      <InfoLabel
        error={error}
        informationIcon={informationIcon}
        informationIconClass={informationIconClass}
      />
    )
    const iconSpan = getByText(informationIcon).closest('span')
    expect(iconSpan).toHaveClass(informationIconClass)
  })
})
