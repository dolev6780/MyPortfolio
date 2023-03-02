import React from 'react'
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
export default function Sidebar() {
  return (
    <div className='flex ml-3 mt-10 fixed'>
        <ul>
            <Link to={'/'}>
            <motion.li whileHover={{scale:1.2}} className='mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2'><HomeIcon fontSize='large'/></motion.li>
            </Link>
            <Link to={'/contact'}>
            <motion.li whileHover={{scale:1.2}} className='mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2'><MailIcon fontSize='large'/></motion.li>
            </Link>
            <Link to={'https://www.linkedin.com/in/dolev-cohen-736763190/'} target="_blank">
            <motion.li whileHover={{scale:1.2}} className='mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2'><LinkedInIcon fontSize='large'/></motion.li>
            </Link>
            <Link to={'https://github.com/dolev6780?tab=repositories'} target="_blank">
            <motion.li whileHover={{scale:1.2}} className='mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2'><GitHubIcon fontSize='large'/></motion.li>
            </Link>
        </ul>
    </div>
  )
}
