import React from "react";
// import checkMarkIcon from '../../images/icons/checkmark.svg'
// import containerModalVid from "../../videos/american-film-box_3.mp4";
import containerModalVid from "../../videos/american-film-box-small.mp4";

export default function PenModalContent() {
  return (
    <div className={"custom-modal-content pen-modal"}>
      <div className="container">
        <div className="row align-items-center align-content-center">
          
          <div className="col-12 col-md-5 text-md-left p-4">
            <div className="modal-title">HOW DOES IT WORK</div>
            <div className="row mt-2">
              <div className="col-12 col-lg-6">
                <div className="text">The Ecocpen is a floating, closed containment aquaculture production system. The floating collar, is made from aluminium, and holds a fabric sack made from an ultra strong polymer membrane.</div>
                <div className="text">Inside the fabric sack is an ordinary net pen for extra security and easy handling of the fish. Water is collected at depth through six separate pipes and pumped into the pen creating a circular current. Oxygen is continuously added to the inflowing water creating optimal and stable environment for fish health,zero lice, high survival, low FCR and high growth.</div>
                <div className="text">The water outlet is at the bottom of the fabric sack where the outflowing water is separated in a primary and a secondary flow.</div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="text">The waste is collected from the secondary flow where it is treated and driedtopside, before being transferred to a floating reservoir which is periodically emptied.</div>
                <div className="text">The outflow of treated water is adjustable and will be discharged at the optimal depth. The dry waste material may then be used to produce biogas. The water temperature inside the Ecopen can be optimised by collecting water from varying depths according to hydrographic conditions.</div>
                <div className="text">Electricity and oxygen supply is secured through a three level backup system.. Our long experience and know-how have resulted in simple andefficient operational routines with high security.</div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-7 pr-md-4 text-center text-md-left">
            <video
              preload="true"
              autoPlay={true}
              muted={true}
              loop={true}
              src={containerModalVid}
            />
          </div>
          
        </div>
      </div>
    </div>
  )
}
