<<<<<<< HEAD
// @flow
import React from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import './Sticky2.scss'

const Sticky2 = () => (
  <>
    <div className="section" />
    <Controller>
      <Scene
        triggerHook="onLeave"
        duration={1000}
        pin
      >
        {(progress) => (
          <div className="sticky">




          
          </div>
        )}
      </Scene>
    </Controller>
    <div className="section" />
  </>
);

export default Sticky2;
=======
// @flow
import React from "react";
import { Controller, Scene } from "react-scrollmagic";
import "./Sticky2.scss";

const Sticky2 = () => (
  <>
    <div className="section" />
    <Controller>
      <Scene triggerHook="onLeave" duration={1000} pin>
        {(progress) => <div className="sticky"></div>}
      </Scene>
    </Controller>
    <div className="section" />
  </>
);

export default Sticky2;
>>>>>>> f1a551d83002c42096e45ae0122f71daa13570e7
