import { useEffect, useState } from 'react'
import { githubUrl, githubToken } from '../../api/api'
import Spinner from '../layout/Spinner'

const UserResults = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await fetch(`${githubUrl}/users`, {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    })

    const data = await response.json()

    setUsers(data)
    setLoading(false)
  }

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-col-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <h3>{user.login}</h3>
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }
}
export default UserResults
