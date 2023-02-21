import { waitFor } from '@testing-library/react'
import EmployeeUpdate from './EmployeeUpdate'
import { useLocation } from 'wouter'
import { renderWithQueryClient } from '@/tests/utils'

jest.mock('wouter', () => {
  const wouter = jest.requireActual('wouter')

  return {
    ...wouter,
    useLocation: jest.fn(() => {
      return ['', () => {}]
    }) 
  };
});

describe('EmployeeUpdate', () => {
  beforeEach(() => {
    window.alert = jest.fn()
    jest.spyOn(console, "log").mockImplementation(() => {})

    // Mock console.error to prevent from printing error when running test
    jest.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders employee form', async () => {
    const { getByText } = renderWithQueryClient(<EmployeeUpdate id="1" />)

    await waitFor(() => {
      expect(getByText('foo')).toBeInTheDocument()
    })
  })

  test('updates employee after changing', async () => {
    const { findByTestId, getByTestId, user } = renderWithQueryClient(<EmployeeUpdate id="1" />)

    const inputName = await findByTestId('input-name')
    await user.type(inputName, ' bar')
    expect((inputName as HTMLInputElement).value).toBe('foo bar')

    await user.click(getByTestId('button-update'))
    await waitFor(() => {
      expect(window.alert).toBeCalled()
    })
  })

  test('removes employee when the remove button is clicked', async () => {
    const mockSetLocation = jest.fn();
    (useLocation as jest.MockedFunction<typeof useLocation>).mockReturnValue(['', mockSetLocation])

    const { findByTestId, user } = renderWithQueryClient(<EmployeeUpdate id="1" />)

    const buttonRemove = await findByTestId('button-remove')
    await user.click(buttonRemove)

    await waitFor(() => {
      expect(mockSetLocation).toBeCalledWith('/')
    })
  })

  test('renders error when id does not exist', async () => {
    const { getByText } = renderWithQueryClient(<EmployeeUpdate id="999000" />)

    await waitFor(() => {
      expect(getByText('Failed to fetch')).toBeInTheDocument()
    })
  })

  test('shows error when updating fails', async () => {
    const { findByTestId, user } = renderWithQueryClient(<EmployeeUpdate id="4" />)

    const buttonUpdate = await findByTestId('button-update')
    await user.click(buttonUpdate);

    await waitFor(() => {
      expect((window.alert as jest.Mock).mock.calls[0].toString()).toBe('Error: Server error')
      expect((console.log as jest.Mock).mock.calls[0].toString()).toBe('Error: Server error')
    })
  })

  test('shows error when removing fails', async () => {
    const { findByTestId, user } = renderWithQueryClient(<EmployeeUpdate id="4" />)

    const buttonRemove = await findByTestId('button-remove')
    await user.click(buttonRemove);

    await waitFor(() => {
      expect((window.alert as jest.Mock).mock.calls[0].toString()).toBe('Error: Server error')
    })
  })
})