import { render } from '@/tests/utils'
import { App } from '@/App'
import { waitFor } from '@testing-library/react'

describe('App', () => {
  test('renders home page correctly', async () => {
    const { getByText } = render(<App />)

    await waitFor(() => {
      expect(getByText('title')).toBeInTheDocument()
    })
  })
})