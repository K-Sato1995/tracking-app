import React, { useState } from 'react'
import { addLog } from 'utilities/Firebase'

interface Props {
  userId: FirestoreUserId
  projectId: FirestoreProjectId
}

const LogForm = ({ userId, projectId }: Props) => {
  const [log, setLog] = useState<Log>({
    title: '',
    description: '',
    category: '',
    time: 0,
    date: new Date(),
  })

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLog({
      ...log,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        addLog(userId, projectId, {
          ...log,
        })
        console.log(log)
      }}
    >
      <input required placeholder="title" name="title" onChange={updateField} />
      <input placeholder="category" name="category" onChange={updateField} />
      <textarea
        required
        placeholder="description"
        name="description"
        onChange={updateField}
      />
      <input
        required
        placeholder="time (hour)"
        type="number"
        name="time"
        onChange={updateField}
      />
      <input required type="date" name="date" onChange={updateField} />
      <button>Submit</button>
    </form>
  )
}

export default LogForm
