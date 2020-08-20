const initialProjectValue: Project = {
  title: '',
  description: '',
  fields: [{ name: 'title', type: 'string' }],
  charts: {
    calendar: false,
    bar: false,
  },
}

function projectReducer(state: any, action: ProjectReducerAction) {
  switch (action.type) {
    case 'RESET_STATE': {
      return initialProjectValue
    }
    case 'UPDATE_VALUE': {
      if (action.path === 'project') {
        return {
          ...state,
          [action.name]: action.value,
        }
      }
      return {
        ...state,
        [action.path]: { ...state.charts, [action.name]: action.value },
      }
    }
    case 'ADD_FIELD_INPUT': {
      return {
        ...state,
        fields: [...state.fields, { name: '', type: 'string' }],
      }
    }
    case 'REMOVE_FIELD_INPUT': {
      let fields = [...state.fields]
      fields.pop()
      return {
        ...state,
        fields: [...fields],
      }
    }
    case 'UPDATE_FIELD_VALUE': {
      const fields: FieldInput[] | any = [...state.fields]
      fields[action.id][action.name] = action.value
      return {
        ...state,
        fields: [...fields],
      }
    }
    default:
      return state
  }
}

export { initialProjectValue, projectReducer }
