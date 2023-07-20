import { act, waitFor } from '@testing-library/react'
import Employee from './Employee'
import { renderWithQueryClient } from '@/tests/utils'

describe('Employee', () => {
  test('renders employee list', () => {
    const { getByTestId } = renderWithQueryClient(<Employee />)

    expect(getByTestId('employee-list-title')).toBeInTheDocument()
  })

  test('renders employee create page when path is /ml-frontend/employees/new', () => {
    const { getByTestId } = renderWithQueryClient(<Employee />)

    act(() => history.replaceState(null, "", "/ml-frontend/employees/new"));

    expect(getByTestId('employee-create-title')).toBeInTheDocument()
  })

  test('renders employee update page when path is /ml-frontend/employees/:id', async () => {
    const { getByTestId } = renderWithQueryClient(<Employee />)

    act(() => history.replaceState(null, "", "/ml-frontend/employees/1"));

    await waitFor(() => {
      expect(getByTestId('employee-update-title')).toBeInTheDocument()
    })
  })
})