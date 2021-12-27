<<<<<<< HEAD
import React, {useRef} from 'react'
import { getMousePos, getMouseDegrees } from './utils/getmouse'
import state from './utils/store'
import { Controller, Scene } from 'react-scrollmagic';
//import './Sticky2.scss'

const ScrollMagicArea = (props) => {
	return (
		<>
	{/*	<div className="section" /> */}
    <Controller>
      <Scene
        triggerHook="onLeave"
        duration={2000}
        pin
      >
			{(progress) => (
				<div className="sticky">
		


				</div>
        )}
      </Scene>
    </Controller>
    {/*<div className="section" /> */}
		</>
	)
}

export default ScrollMagicArea
=======
import React, { useRef } from "react";
import { getMousePos, getMouseDegrees } from "./utils/getmouse";
import state from "./utils/store";
import { Controller, Scene } from "react-scrollmagic";
//import './Sticky2.scss'

const ScrollMagicArea = (props) => {
  return (
    <>
      {/*	<div className="section" /> */}
      <Controller>
        <Scene triggerHook="onLeave" duration={2000} pin>
          {(progress) => <div className="sticky"></div>}
        </Scene>
      </Controller>
      {/*<div className="section" /> */}
    </>
  );
};

export default ScrollMagicArea;
>>>>>>> f1a551d83002c42096e45ae0122f71daa13570e7
