import React from 'react'
import Sec1 from './sections/Sec1'
import Sec2 from './sections/Sec2'
import Sec3 from './sections/Sec3'
import Sec4 from './sections/Sec4'
export default function Home() {
  return (
    <div id='sec1' className='w-full'>
      <Sec1/>
       <Sec2/>
      <Sec3/>
     {/* <Sec4/> */}
    </div>
  )
}
