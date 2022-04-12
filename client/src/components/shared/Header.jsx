import {useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Logo from '../../static/images/CandyShopLogo.svg'

import MUIHeader from '../UI/MUIHeader'
import {readBasketCandies} from "../../redux/features/basket/basketActionCreators";
import {resetBasketCandies} from "../../redux/features/basket/basketSlice";

const logo = {
  src: Logo,
  alt: "CandyShop"
}
const title = "CandyShop"

const Header = () => {
  const dispatch = useDispatch()
  const {isAuth, isAdmin} = useSelector((state) => state.user)
  const userName = useSelector((state) => state.user.userData?.name)
  const userSettings = { userName }
  
  useEffect(() => {
    if (isAuth) {
      dispatch(readBasketCandies())
        .unwrap()
        .catch(() => {
          
        })
    } else {
      dispatch(resetBasketCandies())
    }
  }, [dispatch, isAuth])
  
  const pages = useMemo(() => {
    const pages = [
      // {name: "Main", link: "/"},
      // {name: "About", link: "/about"}
    ]
  
    isAuth && pages.push(
      {name: "Basket", link: "/basket"},
    )

    isAdmin && pages.push(
      {name: "Admin panel", link: "/admin"}
    )
    
    return pages
  }, [isAdmin, isAuth])

  const settings = useMemo(() => {
    return isAuth 
    ? 
      [
        {name: "Basket", link: "/basket"},
        {name: "My orders", link: "/orders"},
        {name: "Logout", link: "/logout"}
      ]
    :
      [
        {name: "Login", link: "/login"},
        {name: "Register", link: "/registration"}
      ]
  }, [isAuth]) 

  return (
    <MUIHeader
      title={title} 
      logo={logo}
      pages={pages} 
      settings={settings} 
      userSettings={userSettings}
    />
  );
};
export default Header;