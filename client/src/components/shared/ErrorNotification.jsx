import {Alert, Slide, Snackbar, Typography, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const ErrorNotification = () => {
  const {error: candyError} = useSelector((state) => state.candies)
  const {error: basketError} = useSelector((state) => state.basket)
  const {error: filterError} = useSelector((state) => state.filtersData)
  const {error: userError} = useSelector((state) => state.user)
  
  const [actualError, setActualError] = useState("")
  
  const handleClick = useCallback(() => {
    setActualError("");
  }, [])
  
  useEffect(() => {
    const error = candyError || basketError || filterError || userError
    
    setActualError(error)
    
    const timeout = setTimeout(() => {
      setActualError("")
    }, 5000)
    
    return (() => {
      clearTimeout(timeout)
    })
    
    
  }, [candyError, basketError, filterError, userError])
  
  return (
    <Snackbar
      open={Boolean(actualError)}
      TransitionComponent={SlideTransition}
    >
      <Alert
        variant="filled"
        color="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClick}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <Typography>
          {actualError}
        </Typography>
      </Alert>
    </Snackbar>
    
  )
}

export default ErrorNotification