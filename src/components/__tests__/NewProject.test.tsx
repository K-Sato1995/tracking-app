import React from 'react'
import { render, screen, waitFor, fireEvent } from 'test-utils'
import NewProject from 'components/NewProject'
import firebaseUtilities from 'utilities/Firebase'

const setup = () => {
  render(<NewProject />)
  const titleInput = screen.getByPlaceholderText('Title')
  const descriptionInput = screen.getByPlaceholderText('description')
  return {
    titleInput,
    descriptionInput,
  }
}

test('Title should be inputed', () => {
  const { titleInput } = setup()
  fireEvent.change(titleInput, { target: { value: 'title test' } })
  expect(titleInput.value).toBe('title test')
})

test('Description should be inputed', () => {
  const { descriptionInput } = setup()
  fireEvent.change(descriptionInput, {
    target: { value: 'descriptionInput test' },
  })
  expect(descriptionInput.value).toBe('descriptionInput test')
})

test('Creating a project', async () => {
  firebaseUtilities.addProject = jest
    .fn()
    .mockResolvedValue('created a project')

  const { titleInput, descriptionInput } = setup()

  fireEvent.change(titleInput, {
    target: { value: 'title test' },
  })

  fireEvent.change(descriptionInput, {
    target: { value: 'descriptionInput test' },
  })

  fireEvent.click(screen.getByRole('button', { name: /SUBMIT/i }))

  await waitFor(() => {
    expect(firebaseUtilities.addProject).toHaveBeenCalledWith('2', {
      title: 'title test',
      description: 'descriptionInput test',
    })
  })
})
