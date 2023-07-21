import { act, waitFor } from '@testing-library/react'
import Employee from './Employee'
import { renderWithQueryClient } from '@/tests/utils'

describe('Employee', () => {
  test('renders employee list', () => {
    const { getByTestId } = renderWithQueryClient(<Employee />)

    expect(getByTestId('employee-list-title')).toBeInTheDocument()
  })

  test('renders employee create page when path is /employees/new', () => {
    const { getByTestId } = renderWithQueryClient(<Employee />)

    act(() => history.replaceState(null, "", "/employees/new"));

    expect(getByTestId('employee-create-title')).toBeInTheDocument()
  })

  test('renders employee update page when path is /employees/:id', async () => {
    const { getByTestId } = renderWithQueryClient(<Employee />)

    act(() => history.replaceState(null, "", "/employees/1"));

    await waitFor(() => {
      expect(getByTestId('employee-update-title')).toBeInTheDocument()
    })
  })
})
