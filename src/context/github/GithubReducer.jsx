const githubReducer = (state, action) => {
  const actions = {
    GET_USERS: () => ({
      ...state,
      users: action.payload,
      loading: false,
    }),
    DEFAULT: () => state,
  }

  return (actions[action.type] || actions.DEFAULT)()
}

export default githubReducer
