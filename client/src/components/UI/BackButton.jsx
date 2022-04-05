import {IconButton} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import {useCallback} from "react";

const BackButton = (props) => {
  const { path } = props
  const navigate = useNavigate()
  const handleClick = useCallback(() => {
    navigate(path)
  }, [navigate, path])
  
  return (
    <IconButton
      onClick={handleClick}
      sx={{border: "0.1rem solid black", borderColor: "lightgrey", width: "3rem", height: "3rem", backgroundColor: "white"}}
    >
      <ArrowBackIcon />
    </IconButton>
  )
}

export default BackButton