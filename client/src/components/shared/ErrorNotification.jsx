import {Alert, Slide, Snackbar, Typography, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const ErrorNotification = (props) => {

  
  const {error: candyError} = useSelector((state) => state.candies)
  const {error: basketError} = useSelector((state) => state.basket)
  const {error: filterError} = useSelector((state) => state.filtersData)
  const {error: userError} = useSelector((state) => state.user)
  
  const [actualError, setActualError] = useState("")
  
  useEffect(() => {
    const error = candyError || basketError || filterError || userError
    
    setActualError(error)
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
            onClick={() => {
              setActualError("");
            }}
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