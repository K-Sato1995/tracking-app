import React from 'react'
import {
  TextField,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'

interface Props {
  fieldId: number
  field: FieldInput
  updateFieldValue: (id: number, name: string, value: string) => void
}

const FieldFormInput = ({ fieldId, field, updateFieldValue }: Props) => {
  return (
    <>
      <Grid item xs={6} sm={6}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          placeholder={`Field${fieldId + 1}`}
          value={field.name}
          name="name"
          onChange={(e) => {
            updateFieldValue(fieldId, e.target.name, e.target.value)
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <InputLabel>Value Type</InputLabel>
        <Select
          fullWidth
          variant="outlined"
          name="type"
          labelWidth={2}
          onChange={(e) => {
            updateFieldValue(
              fieldId,
              e.target.name as string,
              e.target.value as string,
            )
          }}
        >
          <MenuItem value={'string'}>string</MenuItem>
          <MenuItem value={'number'}>number</MenuItem>
          <MenuItem value={'boolean'}>boolean</MenuItem>
        </Select>
      </Grid>
    </>
  )
}

export default FieldFormInput
