import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa'
import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Spinner from '../components/layout/Spinner'
import GithubContext from '../context/github/GithubContext'

const User = () => {
  const { getUser, user, loading } = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    getUser(params.login)
  }, [])

  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user

  if (loading) return <Spinner />

  return (
    <>
      <div className="w-full mx-auto lg:w-10/12">
        <div className="mb-4">
          <Link to="/" className="btn btn-ghost">
            Back To Search
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
          <div className="mb-6 md:mb-0">
            <div className="relative rounded-2xl shadow-xl overflow-hidden">
              {/* Image */}
              <img src={avatar_url} alt="" className="w-full h-full object-cover" />

              {/* Tint overlay */}
              <div className="absolute inset-0 bg-slate-800/50"></div>

              {/* Overlay with text at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-slate-100">
                <h2 className="text-xl font-bold">{login}</h2>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl card-title">
                {name}
                <div className="ml-2 mr-1 badge badge-success">{type}</div>
              </h1>
              {hireable && <div className="mt-2 badge badge-info">Hireable</div>}
              <p className="mt-3">{bio}</p>
              <div className="mt-4 card-actions">
                <a href={html_url} target="_blank" rel="noreferrer" className="btn btn-outline">
                  Visit Github Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default User
