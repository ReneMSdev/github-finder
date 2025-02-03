const githubReducer = (state, action) => {
  const actions = {
    GET_USERS: () => ({
      ...state,
      users: action.payload,
      loading: false,
    }),
    SET_LOADING: () => ({
      ...state,
      loading: true,
    }),
    DEFAULT: () => state,
  }

  return (actions[action.type] || actions.DEFAULT)()
}

export default githubReducer
