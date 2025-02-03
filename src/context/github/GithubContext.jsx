import { createContext, useReducer } from 'react'
import { githubUrl, githubToken } from '../../config/github.config'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get initial users (testing purposes)
  const fetchUsers = async () => {
    setLoading()

    const response = await fetch(`${githubUrl}/users`, {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    })

    const data = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }

  // Set Loading
  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
