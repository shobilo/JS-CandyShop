import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/features/user/userActionCreators'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logout())
    .unwrap()
    .then(() => {
      navigate("/")
    })
    .catch((error) => {
      alert(error)
    })
  }, [dispatch, navigate])

  return (
    null
  )
}

export default Logout