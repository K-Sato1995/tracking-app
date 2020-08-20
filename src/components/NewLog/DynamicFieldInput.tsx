import React from 'react'
import { TextField } from '@material-ui/core'

interface Props {
  fieldId: number
  field: LogFieldType
  updateField: (
    fieldId: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void
}
const DynamicFieldInput = ({ fieldId, field, updateField }: Props) => {
  const { type, name, value } = field
  if (type === 'string') {
    return (
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        value={value[name]}
        name={name}
        placeholder={name}
        onChange={(e) => {
          updateField(fieldId, e)
        }}
      />
    )
  }
  if (type === 'number') {
    return (
      <TextField
        variant="outlined"
        margin="normal"
        type="number"
        required
        fullWidth
        name={name}
        onChange={(e) => {
          updateField(fieldId, e)
        }}
        value={value[name]}
        placeholder={name}
      />
    )
  }
  return <div>There was something wrong with the data.</div>
}

export default DynamicFieldInput
