import React from 'react'
import scroll3Dpos from './utils/scroll3Dpos'
import hatcheryImg from './images/bg-0005.jpg'
// import * as THREE from 'three'
// import Steak3DCanvas from './Steak3DCanvas'

// Imported scroll positions which could also be used with the Ui3d componant
const {
  scroll3dStart,
  scrollEgg,
  scrollPreHatch,
  scrollEggSmolt,
  scrollSmolt,

  scrollPenIn,
  scrollPenState,
  scrollPenOut,
  smoltPenRate,

  scrollGrowAdult,
  scrollAdult,
  scrollHatchery,
  scrollSteak,
  scrollLast,
} = scroll3Dpos

const PanelHatchery = (props) => {
  return (
    <>
      <div
        className={
          props.scroll3D > scrollHatchery
            ? 'panel-hatchery panel-on'
            : 'panel-steak panel-off'
        }>
        <div
          className="section section-hatchery"
          style={{backgroundImage: `url(${hatcheryImg})`}}>
          <div className="container">
            <div className="row align-items-center align-content-center">
              <div className="content-col col-12 col-lg-5 text-center text-md-left">
                <div className="section-number">05.</div>
                <h2 className="section-title">PROCESSING AND HATCHERY</h2>
                <div className="section-text text mt-3">
                  American Aquafarms intend to develop a State of the art hatchery and processing facility at the MTFL property in Gouldsboro. We are currently studying the operations of Maine Fair Trade Lobster and capacity for additional jobs for the region. We want to grow our operations in a smart and reasonable way.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PanelHatchery
