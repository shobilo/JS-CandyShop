import * as React from 'react'
import { useSelector } from 'react-redux'
import Logo from '../../static/images/CandyShopLogo.svg'

import MUIHeader from '../UI/MUIHeader'

const Header = () => {
  const isAuth = useSelector((state) => state.user.isAuth)
  const isAdmin = useSelector((state) => state.user.isAdmin)
  const userName = useSelector((state) => state.user.userData?.name)

  const logo = {
    src: Logo,
    alt: "CandyShop"
  }
  const title = "CandyShop"

  const pages = [
    {name: "Main", link: "/"},
    {name: "About", link: "/about"}
  ]

  isAdmin && pages.push(
    {name: "Admin panel", link: "/admin"}
)

const settings = isAuth 
  ? 
    [
      {name: "Basket", link: "/basket"},
      {name: "Logout", link: "/logout"}
    ]
  :
    [
      {name: "Login", link: "/auth"},
      {name: "Register", link: "/registration"}
    ]

const userSettings = { userName }

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