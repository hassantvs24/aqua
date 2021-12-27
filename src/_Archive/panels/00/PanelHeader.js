import React, {Suspense, useState, useEffect } from 'react'
import headerVid from './videos/1033935392-preview.mp4'

const PanelHeader = () => {

  return (
      <div id="panel-header" style={{padding:'56.25% 0 0 0',position:'relative'}}>
        <video preload='true' id="header-vid" autoPlay={true} muted={true} loop={true} src={headerVid} ></video>
        <h1>
          American
          <br />
          <span>Salmon</span>
        </h1>
        
    </div>
  )
}

export default PanelHeader;
