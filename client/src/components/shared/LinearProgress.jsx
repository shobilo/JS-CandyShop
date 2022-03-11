import React from 'react'
import { useSelector } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress';


const LinearProgressBar = () => {
  const isUserLoading = useSelector((state) => state.user.isLoading)
  const isCandiesLoading = useSelector((state) => state.candies.isLoading)
  
  if ( isUserLoading || isCandiesLoading ) {
    return (
        <LinearProgress color="secondary"/>
    )
  }

  return (
    null
  )
}

export default LinearProgressBar