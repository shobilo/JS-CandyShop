import * as React from 'react'
import { useSelector } from 'react-redux'

import MUIHeader from '../UI/MUIHeader'

const Header = () => {
  const isAuth = useSelector((state) => state.user.isAuth)
  const isAdmin = useSelector((state) => state.user.isAdmin)

  const title = "CandyShop"
  const userName = "Admin"

  const pages = [
    {name: "Main", link: "/"},
    {name: "About", link: "/about"}
  ]

  isAdmin && pages.push(
    {name: "Admin panel", link: "/admin"}
)
  
  const settings = [
    {name: "Basket", link: "/basket"},
    {name: "Logout", link: "/logout"}
  ]

  const userSettings = { isAuth, userName }

  return (
    <MUIHeader 
      title={title}
      pages={pages} 
      settings={settings} 
      userSettings={userSettings}
    />
  );
};
export default Header;