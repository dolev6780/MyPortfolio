import React, {useState} from 'react'
import ArticleIcon from '@mui/icons-material/Article';
import CvDialog from '../CvDialog/CvDialog';
import './CvButton.css'
export default function CvButton() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div>
    <div onClick={togglePopup} className='cvbutton'>
            <p><ArticleIcon fontSize='large'/></p>
            <p className='btntxt'> My Resume</p>
    </div>
    {isOpen && <CvDialog
      handleClose={togglePopup}
    />}
    
    </div>
  )
}
