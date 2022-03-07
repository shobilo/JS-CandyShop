import React from 'react'
import { useSelector } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress';


const LinearProgressBar = () => {
  const isLoading = useSelector((state) => state.user.isLoading)
  
  if ( isLoading ) {
    return (
        <LinearProgress color="secondary"/>
    )
  }

  return (
    null
  )
}

export default LinearProgressBar