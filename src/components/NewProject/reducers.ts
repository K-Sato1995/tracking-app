const initialProjectValue: Project = {
  title: '',
  description: '',
}

function projectReducer(state: any, action: ProjectReducerAction) {
  switch (action.type) {
    case 'RESET_STATE': {
      return initialProjectValue
    }
    case 'UPDATE_VALUE': {
      return {
        ...state,
        [action.name]: action.value,
      }
    }
    default:
      return state
  }
}

export { initialProjectValue, projectReducer }
