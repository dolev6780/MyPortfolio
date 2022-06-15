import React, {useState,useRef} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';
import { useReactToPrint } from "react-to-print";
import './CvDialog.css'
export default function CvDialog(props) {
    const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
        <div className="popup-box">
      <div className="box">
        <div className='popup-header'>
        <span className="icons" onClick={props.handleClose}><CloseIcon/></span>
        <span className="icons" onClick={handlePrint}><PrintIcon/></span>
        <span className="icons" ><FileDownloadIcon/></span>
        </div>
          <Document ref={componentRef} file="/Dolev cv.pdf" >
                <Page scale={0.8} 
                  pageNumber={1}
                />
          </Document>
      </div>
    </div>
    </div>
  )
}
