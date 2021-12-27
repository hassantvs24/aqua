import React, {Suspense, useState, useEffect} from 'react'
import headerVid from './videos/1033935392-preview.mp4'
import headerVidPoster from './images/hero-bg-new.jpg'
import scroll3Dpos from './utils/scroll3Dpos'
import Particles from "react-particles-js";

// These imported variables below have the same 3D scroll positions used in the Panel3D switch statements, they determine when 3D elements will change during scrolling in the 3D panel.
// If similar conditions are made here for changing the interface's appearance from comparing these variables with the current 3d scroll position, they should be in sync with the scrolled 3D events, even if the positions in utils/scroll3Dpos.js are updated later
// Eg 'props.scroll3D > scrollGrowAdult' here will be the same as 'curTop > scrollGrowAdult in Panel3D.js

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
  scrollSteak,
  scrollLast,
} = scroll3Dpos

const PanelHeader = (props) => {
  return (
    <div
      id="panel-header"
      className={
        props.scroll3D <= scroll3dStart
          ? 'panel-header panel-on'
          : 'panel-header panel-off'
      }>
      
      <div id="header-background"  style={{ backgroundImage: `url(${headerVidPoster})` }} />

      <div className="content">
        <h1 className="title--big text-light">AMERICAN AQUAFARMS</h1>
        {/*<div className="title--md text-light mb-3">Providing sustainable American Seafood for the American market.</div>*/}
        <div className="title--md text-light mb-3">American Salmon</div>
        {/*<div className="para text-light"><span className={"highlight"}>Eco friendly</span> and sustainable food production through modern technology.</div>*/}
        <div className="para text-light">– Pure quality from Maine –</div>
      </div>

      <div className="go-next">
        <div className="scroll-downs">
          <div className="mousey">
            <div className="scroller" />
          </div>
        </div>

        <div className="para para--highlight text-light">
          SCROLL TO DIVE UNDER
        </div>
      </div>
      
      <div className="header-particles">
        <Particles params={{"particles":{"number":{"value":100,"density":{"enable":true,"value_area":800}},"color":{"value":"#fff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img\/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1000000000000000055511151231257827021181583404541015625,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1000000000000000055511151231257827021181583404541015625,"sync":false}},"line_linked":{"enable":false,"distance":500,"color":"#ffffff","opacity":0.40000000000000002220446049250313080847263336181640625,"width":2},"move":{"enable":true,"speed":1.5,"direction":"top","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"bubble"},"onclick":{"enable":false,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":0.5}},"bubble":{"distance":400,"size":4,"duration":0.299999999999999988897769753748434595763683319091796875,"opacity":1,"speed":3},"repulse":{"distance":200,"duration":0.40000000000000002220446049250313080847263336181640625},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true}} />
      </div>
    </div>
  )
}

export default PanelHeader

/*
className = {
  props.scroll3D > scrollEgg && props.scroll3D < scrollEggSmolt - 100
    ? "panel-header on"
    : "panel-header off"
}
*/
