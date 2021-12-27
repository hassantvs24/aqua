import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style/global.scss";

// redirect if user is on mobile device
if (window.innerWidth <= 800) {
  window.location = "https://m.americanaquafarms.com/";
} else if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
  // i-phone
  window.location.replace("https://m.americanaquafarms.com/");
} else {
  ReactDOM.render(<App />, document.getElementById("root"));
}

window.addEventListener('resize', function () {
  if (window.innerWidth <= 800) {
    window.location = "https://m.americanaquafarms.com/";
  } else if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    // i-phone
    window.location.replace("https://m.americanaquafarms.com/");
  }
})