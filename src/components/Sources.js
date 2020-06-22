import React from "react";
import Headlines from "./Headlines";
import Topnews from "./Topnews";

export default function Sources(props){


  
 return (
   props ? (
      <>
        <div className="hero-section">
          <Topnews news={ props.customFeed} />
          <Headlines headlines={props.headlines} />
        </div>
      </>
   ):''
    
 )
}
