import React from 'react'
import { useSelector } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress';


const LinearProgressBar = () => {
  const isUserLoading = useSelector((state) => state.user.isLoading)
  const isCandiesLoading = useSelector((state) => state.candies.isLoading)
  
  const styles = {
    visibility: ( isUserLoading || isCandiesLoading ) ? 'visible' : 'hidden'
  }
  
  return (
    <LinearProgress
      color="secondary"
      style={styles}
    />
  )
}

export default LinearProgressBar