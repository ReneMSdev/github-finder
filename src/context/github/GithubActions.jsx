import axios from 'axios' // simplifies HTTP requests
import { githubUrl, githubToken } from '../../config/github.config'

const github = axios.create({
  baseURL: githubUrl,
  headers: { Authorization: `token ${githubToken}` },
})

// Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const response = await github.get(`/search/users?${params}`)
  return response.data.items
}

// Get user and repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`users/${login}/repos`),
  ])

  return { user: user.data, repos: repos.data }
}
