//footer to be displayed at all times
import React from "react";
import "../css/footer.css"

function Footer(){
  const dateBuilder = (d)=>{
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  let days = ["Sunday","Monday", "Tuesday", "Wednesday","Thursday","Friday", "Saturday"]
  
  let day = days[d.getDay()]
  let date = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear()
  return `The current Date: ${day} ${date} ${month} ${year}`
  }
    return (
      <>
      <div className="Spacer"></div>
      <footer className='Main-footer'>
      <div className='currentDate'>{dateBuilder(new Date())}</div>
      <span class='students'>Created By:</span>
        <span class='students'>Dylan Conradie | De Raven Stoltz | Jonathan Theron | Jandre Kruger | Marlou Froneman</span>
     </footer>
  </>)
}
export default Footer;
