import React from "react";
import socialResImg from '../../images/modal/smolt/popup-1.jpg'

export default function SmoltModalContent() {
  return (
    <div className={"custom-modal-content smolt-modal"}>
      <div className="container">
        <div className="row align-items-center align-content-center">
          
          <div className="col-12 col-md-6 pr-md-4 text-center text-md-left">
            <img src={socialResImg} className="img-fluid shadow-img" alt="social responsibility of american aqua farm"/>
          </div>
          
          <div className="col-12 col-md-6 pl-md-5 mt-4 mt-md-0 text-center text-md-left">
            <div className="modal-title">PROCESSING AND HATCHERY</div>
            <div className="text">
              American Aquafarms intend to develop a State of the art hatchery and processing facility at the MTFL property in Gouldsboro. We are currently studying the operations of Maine Fair Trade Lobster and capacity for additional jobs for the region. We want to grow our operations in a smart and reasonable way.
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
