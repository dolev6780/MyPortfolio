import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import './SideNav.css'
export default function SideNav() {
  return (
    <div className="sidenav">
        <a href="https://github.com/dolev6780"><GitHubIcon fontSize='large'/></a>
        <a href="https://www.linkedin.com/in/dolev-cohen-736763190/"><LinkedInIcon fontSize='large'/></a>
        <a href="#contact"><EmailIcon fontSize='large'/></a>
       
    </div>
  )
}
