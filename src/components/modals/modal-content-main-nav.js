import React from "react";
import Logo from "../../images/american-logo-white.png";

export default function MainMenuPopup() {
  return (
    <div className={"custom-modal-content main-nav-modal"}>
      <div className="container text-center">
        <a className="brand" href="https://americanaquafarms.com/">
          <img src={Logo} width={150} alt="American aqua farm logo"/>
        </a>
        <ul className="list-unstyled m-0 p-0">
          <li className={"main-nav-link-wrap"}>
            <a href="https://americanaquafarms.com/us/" className="main-nav-link">Our Vision</a>
          </li>
          <li className={"main-nav-link-wrap"}>
            <a href="https://americanaquafarms.com/us/about-us/" className="main-nav-link">About Us</a>
          </li>
          <li className={"main-nav-link-wrap"}>
            <a href="https://americanaquafarms.com/us/products/" className="main-nav-link">OUR PRODUCT</a>
          </li>
          <li className={"main-nav-link-wrap"}>
            <a href="https://americanaquafarms.com/us/closed-pens/" className="main-nav-link">CLOSED PENS</a>
          </li>
          <li className={"main-nav-link-wrap"}>
            <a href="https://americanaquafarms.com/us/sustainability/" className="main-nav-link">SUSTAINABILITY</a>
          </li>
          <li className={"main-nav-link-wrap"}>
            <a href="https://americanaquafarms.com/us/the-blue-future/" className="main-nav-link">Blue Future</a>
          </li>
          <li className={"main-nav-link-wrap"}>
            <a href="https://americanaquafarms.com/us/investor-relations/" className="main-nav-link">INVESTOR RELATIONS</a>
          </li>
          <li className={"main-nav-link-wrap"}>
            <a href="https://americanaquafarms.com/us/contact/" className="main-nav-link">CONTACT</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
