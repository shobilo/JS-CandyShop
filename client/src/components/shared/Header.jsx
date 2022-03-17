import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Logo from '../../static/images/CandyShopLogo.svg'

import MUIHeader from '../UI/MUIHeader'

const logo = {
  src: Logo,
  alt: "CandyShop"
}
const title = "CandyShop"

const Header = () => {
  const {isAuth, isAdmin } = useSelector((state) => state.user)
  const userName = useSelector((state) => state.user.userData?.name)
  const userSettings = { userName }
  
  const pages = useMemo(() => {
    const pages = [
      // {name: "Main", link: "/"},
      // {name: "About", link: "/about"}
    ]

    isAdmin && pages.push(
      {name: "Admin panel", link: "/admin"}
    )

    return pages
  }, [isAdmin])

  const settings = useMemo(() => {
    return isAuth 
    ? 
      [
        {name: "Basket", link: "/basket"},
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