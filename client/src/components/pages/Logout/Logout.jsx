import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../redux/features/user/userActionCreators'
import {CircularProgress, Paper, Typography} from "@mui/material";

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/")
      })
      .catch(() => {})
  }, [dispatch, navigate])
  
  return (
    <Paper>
      <CircularProgress />
      <Typography>Log out in process...</Typography>
    </Paper>
  )
}

export default Logout