const initialProjectValue: Project = {
  title: '',
  description: '',
  fields: {},
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
    default:
      return state
  }
}

export { initialProjectValue, projectReducer }
