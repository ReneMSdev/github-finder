import { useContext } from 'react'
import AlertContext from '../../context/alert/AlertContext'

const Alert = () => {
  const { alert } = useContext(AlertContext)

  return (
    alert !== null && (
      <div className="flex justify-center items-center mb-4">
        <div className="flex items-center space-x-2 text-neutral-content px-4 py-2 rounded-lg">
          {alert.type === 'error' && (
            <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current text-error">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              ></path>
            </svg>
          )}
          <p className="text-base font-semibold leading-7">
            <strong>{alert.msg}</strong>
          </p>
        </div>
      </div>
    )
  )
}
export default Alert
