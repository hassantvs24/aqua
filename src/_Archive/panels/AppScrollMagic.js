import React, {useState, Suspense, useRef, useEffect, createContext, useContext, useMemo } from 'react'
import Loading from './Loading'
import PanelHeader from './PanelHeader'
import PanelEgg from './PanelEgg'
import PanelSmolt from './PanelSmolt'
import PanelGrow from './PanelGrow'
import PanelFish from './PanelFish'
import PanelSteak from './PanelSteak'
import { Controlller, Scene } from 'react-scrollmagic'
import { Tween, Timeline } from 'gsap/all'
import styled from 'styled-components'



export default function App() {

  return (
    <>     
        <Suspense fallback={null}>
          <PanelHeader/>
          <PanelEgg/>
          <PanelSmolt/>  
          <PanelGrow/>    
          <PanelFish/> 
          <PanelSteak/>     
        <div className="layer" /> 
          <a href="https://github.com/drcmda/learnwithjason" className="top-left" children="Github" />
          <a href="https://twitter.com/0xca0a" className="top-right" children="Twitter" />
          <a href="https://github.com/drcmda/react-three-fiber" className="bottom-left" children="+ react-three-fiber" />
        </Suspense>
        <Loading/>
    </>
  )
}

