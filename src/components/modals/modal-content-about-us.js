import React from "react";
import MadeInUsLogo from "../../images/made-in-us.svg";
import EnvelopeIcon from "../../images/icons/envelope.svg";
import globeIcon from "../../images/icons/globe.svg";
import phoneIcon from "../../images/icons/call.svg";

export default function AboutUsModalContent() {
  return (
    <div className={"custom-modal-content about-us-modal"}>
      <div className="container-fluid">
        
        <div className="row flex-column-reverse flex-md-row align-content-center align-items-center">
          <div className="col-12 col-md-10">
            <h2 className={"modal-title"}>ABOUT AMERICAN AQUAFARMS</h2>
            <div className={"mt-2"}>
              American Aquafarms is an American company that is in the process of establishing a hatchery, fish farm facilities and a state-of-the art processing plant in coastal Maine.
            </div>
          </div>
          
          <div className="col-12 col-md-2 mb-3 mb-md-0">
            <img src={MadeInUsLogo} alt="made in us logo" width={125} height={125}/>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="col">
            <h3 className={"modal-subtitle"}>Contact</h3>
            <div className="icon-box d-inline-flex">
              <span className="icon">
                <img src={EnvelopeIcon} alt="email us" width={18} height={18}/>
              </span>
              <span className={"ml-2"}><a href="mailto:post@americanaquafarms.com">Mail: post@americanaquafarms.com</a></span>
            </div>
          </div>

          <div className="col mt-3 mt-md-0">
            <h3 className={"modal-subtitle"}>Press contact</h3>
            <div className={"font-weight-bold"}>David Farmer</div>
            <div className={"text py-1 mb-2"}>Bernstein Shur</div>
            
            <div className="icon-box d-inline-flex">
              <span className="icon">
                <img src={phoneIcon} alt="email us" width={18} height={18}/>
              </span>
              <span className={"ml-2"}><a href="tel:207 228 7275" target={"_blank"}>207 228 7275</a></span>
            </div>
            
            <div className="icon-box d-inline-flex">
              <span className="icon">
                <img src={EnvelopeIcon} alt="email us" width={18} height={18}/>
              </span>
              <span className={"ml-2"}><a href="mailto:dfarmer@bernsteinshur.com">Mail: dfarmer@bernsteinshur.com</a></span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
