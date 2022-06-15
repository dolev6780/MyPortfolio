import React, {useState, useEffect} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import './NavBar.css'
export default function NavBar() {
    const navLinks =['Home','Contact','About'];
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  
  
    const toggleNav = () => {
      setToggleMenu(!toggleMenu)
    }
  
    useEffect(() => {
      const changeWidth = () => {
        setScreenWidth(window.innerWidth);
      }
      window.addEventListener('resize', changeWidth)
      return () => {
          window.removeEventListener('resize', changeWidth)
      }
    }, [])

  return (
    <nav>
    {(toggleMenu || screenWidth > 500) && (
      <ul>
        {navLinks.map((link,i)=>{
          return <button key={i} href={`/${link}`}>{link}</button>
        })}
      </ul>
    )}

    <button onClick={toggleNav} className="menu"><MenuIcon/></button>
  </nav>
  )
}
