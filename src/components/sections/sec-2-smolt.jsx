// ================= section two
import React from 'react'
import Lottie from "react-lottie";
import MoreInfoBtn from "../../lotties/button-what-does-this-mean.json";
import loadingBgVid from "../../videos/water-beams_1.mp4";
import {useDispatch} from "react-redux";
import {OPEN_MODAL, openModalAction} from "../../redux/modal/actions";
import generalLottieSettings from "../../lotties/general-settings";

export default function Sec2Smolt() {
  const MoreInfoBtnOptions = generalLottieSettings(MoreInfoBtn)
  const dispatch = useDispatch()

  const openModal = (e) => {
    e.preventDefault()
    dispatch(openModalAction(OPEN_MODAL, e.currentTarget.dataset.targetmodal))
  }

  return (
    <section className={"section section-smolt"}>
      {/*start video*/}
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
      <div className="video-overlay" />
      {/*end video bg*/}

      <div className="container">
        <div className="row flex-md-row-reverse flex-wrap">
          <div className="col-12 col-md-7 text-center text-md-left section-content">
            <div className="section-number">02.</div>
            <h2 className="section-title">THE ROE LATER GROWS INTO A SMOLT SALMON</h2>
            <div className="section-text text mt-3">
              The smolt is grown in a land based grow out facility in a temperature and bio controlled environment that ensures a healthy fish with strong growth rate and an excellent platform before being transported to the ocean.
            </div>
          </div>
          
          <div className="col-12 col-md-5 section-modal-trigger text-center text-md-left mt-4 mt-md-0">
            <div className="modal-trigger d-inline-block"
                 data-targetmodal={"smolt"}
                 onClick={e => openModal(e)}
            >
              <Lottie
                options={MoreInfoBtnOptions}
                height={200}
                width={200}
                isClickToPauseDisabled={true}
                style={{'margin': 0,'marginLeft': 'auto'}}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}