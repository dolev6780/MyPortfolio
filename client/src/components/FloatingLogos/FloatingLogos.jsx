import React from 'react'
import './FloatingLogos.css'
import JSlogo from '../../assets/logos/JSlogo.png'
function FloatingLogos() {
  return (
    <div className='floatinglogos'>
         <div class="bubble x1"><img src={JSlogo} /></div>
    <div class="bubble x2"><img src={JSlogo} /></div>
    <div class="bubble x3"><img src={JSlogo} /></div>
    <div class="bubble x4"><img src={JSlogo} /></div>
    <div class="bubble x5"><img src={JSlogo} /></div>
    <div class="bubble x6"><img src={JSlogo} /></div>
    {/* <div class="bubble x7"><img src={JSlogo} /></div> */}
    {/* <div class="bubble x8"><img src={JSlogo} /></div>
    <div class="bubble x9"><img src={JSlogo} /></div>
    <div class="bubble x10"><img src={JSlogo} /></div> */}
    </div>
  )
}

export default FloatingLogos