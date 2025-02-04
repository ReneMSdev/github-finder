import { githubUrl, githubToken } from '../../config/github.config'

// Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const response = await fetch(`${githubUrl}/search/users?${params}`, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  })

  const { items } = await response.json()
  return items
}

// Get single user
export const getUser = async (login) => {
  const response = await fetch(`${githubUrl}/users/${login}`, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  })

  if (response.status === 404) {
    window.location = '/notfound'
  } else {
    const data = await response.json()
    return data
  }
}

// Get user repos
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })

  const response = await fetch(`${githubUrl}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  })

  if (!response.ok) {
    console.error('Error fetching user repos: ')
    return []
  }

  const data = await response.json()
  return Array.isArray(data) ? data : []
}
