import { render } from '@/tests/utils'
import { Button } from './Button'

describe('Button', () => {
  const defaultButtonText = 'button'

  test('renders correct text', () => {
    const { getByRole } = render(<Button>{ defaultButtonText }</Button>)
    expect(getByRole('button')).toBeTruthy(); 
  })

  test('renders correct link', () => {
    const { getByRole } = render(<Button to="/example">{ defaultButtonText }</Button>)
    expect(getByRole('link')).toHaveAttribute('href', '/example')
  })

  test('renders correct size', () => {
    const { getByRole } = render(<Button size="large">{ defaultButtonText }</Button>)
    expect(getByRole('button')).toHaveClass('size--large')
  })

  test('renders correct background color', () => {
    const { getByRole } = render(<Button backgroundColor='green'>{ defaultButtonText }</Button>)
    expect(getByRole('button')).toHaveStyle({backgroundColor: 'green'})
  })
})
