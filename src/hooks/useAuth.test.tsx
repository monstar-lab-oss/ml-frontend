import { waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/hooks/useAuth'
import { renderWithQueryClient } from '@/tests/utils'
import { LOCAL_STORAGE_TOKEN_KEY } from "@/constants/localStorage";
import { useLocation } from 'wouter'

jest.mock('wouter', () => {
  const wouter = jest.requireActual('wouter')

  return {
    ...wouter,
    useLocation: jest.fn(() => {
      return ['', () => {}]
    }) 
  };
});

const ChildComponent = () => {
  const { login, logout, isLoggedIn } = useAuth()

  return (
    <>
      {isLoggedIn && <div>Logged in</div>}
      <button onClick={async () => {
        try {
          await login({
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
          })
        } catch (e) {
          console.log(e)
        }
      }}>Login</button>
      <button onClick={logout}>Logout</button>
    </>
  )
}

describe('AuthProvider', () => {
  afterEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
  })

  test('provides isLoggedIn=false to child elements flag when local storage does not have token', () => {
    const { queryByText } = renderWithQueryClient(<AuthProvider><ChildComponent /></AuthProvider>)

    expect(queryByText('Logged in')).not.toBeInTheDocument()
  })

  test('provides isLoggedIn=true to child elements when local storage has token', () => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, 'token_example')

    const { getByText } = renderWithQueryClient(<AuthProvider><ChildComponent /></AuthProvider>)

    expect(getByText('Logged in')).toBeInTheDocument()
  })

  test('does logging in and redirect to home when login is called', async () => {
    const mockSetLocation = jest.fn();
    (useLocation as jest.MockedFunction<typeof useLocation>).mockReturnValue(['', mockSetLocation])

    const { getByText, queryByText, user } = renderWithQueryClient(<AuthProvider><ChildComponent /></AuthProvider>)

    expect(queryByText('Logged in')).not.toBeInTheDocument()

    await user.click(getByText('Login'))

    await waitFor(() => {
      expect(queryByText('Logged in')).toBeInTheDocument()
      expect(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)).toBe('QpwL5tke4Pnpja7X4')
      expect(mockSetLocation).toBeCalledWith('/home')
    }, {
      // Set timeout because the login API mock is delayed 1000ms
      timeout: 2000
    })
  })

  test('does logging in and redirect to a url when login is called and it\'s has redirect param', async () => {
    Object.defineProperty(window, "location", {
      value: {
        href: 'http://localhost/login?redirect=http://localhost/profile'
      },
      writable: true
    });

    const mockSetLocation = jest.fn();
    (useLocation as jest.MockedFunction<typeof useLocation>).mockReturnValue(['', mockSetLocation])

    const { getByText, queryByText, user } = renderWithQueryClient(<AuthProvider><ChildComponent /></AuthProvider>)

    expect(queryByText('Logged in')).not.toBeInTheDocument()

    await user.click(getByText('Login'))

    await waitFor(() => {
      expect(queryByText('Logged in')).toBeInTheDocument()
      expect(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)).toBe('QpwL5tke4Pnpja7X4')
      expect(mockSetLocation).toBeCalledWith('http://localhost/profile?')
    }, {
      // Set timeout because the login API mock is delayed 1000ms
      timeout: 2000
    })
  })

  test('does logging out when logout is called', async () => {
    const mockSetLocation = jest.fn();
    (useLocation as jest.MockedFunction<typeof useLocation>).mockReturnValue(['', mockSetLocation])
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, 'token_example')

    const { getByText, queryByText, user } = renderWithQueryClient(<AuthProvider><ChildComponent /></AuthProvider>)

    expect(getByText('Logged in')).toBeInTheDocument()

    await user.click(getByText('Logout'))
    expect(queryByText('Logged in')).not.toBeInTheDocument()
    expect(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)).toBe(null)
    expect(mockSetLocation).toBeCalledWith('/login')
  })
})