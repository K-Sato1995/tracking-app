const initialProjectValue: Project = {
  title: '',
  description: '',
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
    case 'CHANGE_PROJECT_VALUE': {
      return {
        ...state,
        [action.field]: action.value,
      }
    }
    case 'CHANGE_CHARTS_VALUE': {
      return {
        ...state,
        charts: { ...state.charts, [action.field]: action.value },
      }
    }
    default:
      return state
  }
}

export { initialProjectValue, projectReducer }
