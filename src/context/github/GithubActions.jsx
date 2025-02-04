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
