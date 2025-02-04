import { createContext, useReducer } from 'react'
import { githubUrl, githubToken } from '../../config/github.config'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get search results
  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text,
    })

    const response = await fetch(`${githubUrl}/search/users?${params}`, {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    })

    const { items } = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  // Get single user
  const getUser = async (login) => {
    setLoading()

    const response = await fetch(`${githubUrl}/users/${login}`, {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    })

    if (response.status === 404) {
      window.location = '/notfound'
    } else {
      const data = await response.json()

      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
  }

  // Get user repos
  const getUserRepos = async (login) => {
    setLoading()

    const response = await fetch(`${githubUrl}/search/users/${login}/repos`, {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    })

    const data = await response.json()

    dispatch({
      type: 'GET_REPOS',
      payload: data,
    })
  }

  // Clear users from state
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })

  // Set Loading
  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
