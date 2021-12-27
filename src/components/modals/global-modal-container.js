import React from "react";
import loadingBgVid from "../../videos/water-beams_1.mp4";
import {useSelector} from "react-redux";

export default function GlobalModalContainer() {
  const modalState = useSelector(state => state.modalState)
  
    return (
      <div id="global-modal-container" className={modalState.open ? " " : " hidden"}>
        <div className="video-bg-wrap">
          <video
            preload="true"
            id="loading-video-bg"
            autoPlay={true}
            muted={true}
            loop={true}
            src={loadingBgVid}
          />
        </div>
      </div>
    )
}
