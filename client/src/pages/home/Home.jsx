import React from "react";
import Sec1 from "./sections/Sec1";
import Sec4 from "./sections/Sec4";
import Sec3Wrapper from "./sections/Sec3Wrapper";
import Sec2Alt from "./sections/Sec2Alt";
export default function Home() {
  return (
    <div id="sec1" className="w-full">
      <Sec1 />
      {/* <Sec2 /> */}
      {/* <Sec3 /> */}
      {/* <Sec3Alt/> */}
      <Sec2Alt/>
      <Sec3Wrapper/>
      <Sec4 />
      
    </div>
  );
}
