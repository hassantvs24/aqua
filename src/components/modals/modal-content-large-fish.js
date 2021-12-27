import React, { useState } from "react";
import Lottie from "react-lottie";
import generalLottieSettings from "../../lotties/general-settings";
import ConventionalPenIssuesFile from "../../lotties/NEXT-GENERATION.json";
import ClosedPenFile from "../../lotties/TRADITIONAL.json";

const ClosedPenOptions = generalLottieSettings(ClosedPenFile)
const ConventionalPenIssuesOptions = generalLottieSettings(ConventionalPenIssuesFile)

const ClosedPen = () => (
  <div className={"lottie-animation"}>
    <Lottie
      options={ClosedPenOptions}
      isClickToPauseDisabled={true}
    />
  </div>
)

const ConventionalPen = () => (
  <div className={"lottie-animation"}>
    <Lottie
      options={ConventionalPenIssuesOptions}
      isClickToPauseDisabled={true}
    />
  </div>
)

export default function LargeFishModalContent() {
  const [checked, updateChecked] = useState(false)
  
  return (
    <div className={"custom-modal-content large-fish-modal"}>
      <div className="container">
        <div className="row">
          
          <div className="col-12 text-center">
            <div className="modal-title">CONVENTIONAL INDUSTRY CHALLENGES</div>
            
            <div className="text-content mt-3 text-light">
              <div className="modal-text text-light">Switch Between Traditional and Next Generation Pens</div>
              
              <div className="switch-wrap mt-3">
                <label htmlFor={"toggle-input"} className="mw-switch">
                  <input type="checkbox" id={"toggle-input"} onChange={() => updateChecked(!checked)} />
                  <span className="slider round" />
                </label>
              </div>
            </div>
            
            <div className="graphic-content mt-3">
              { checked ? <ConventionalPen />: <ClosedPen /> }
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
