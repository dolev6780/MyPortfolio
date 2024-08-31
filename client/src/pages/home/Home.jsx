import React from "react";
import Sec1 from "./sections/Sec1";
import Sec4 from "./sections/Sec4";
import Sec3Wrapper from "./sections/Sec3Wrapper";
export default function Home() {
  return (
    <div id="sec1" className="w-full">
      <Sec1 />
      <Sec3Wrapper/>
      <Sec4 />
      
    </div>
  );
}
