// ================= section two
import React from 'react'
import Lottie from "react-lottie";
import MoreInfoBtn from "../../lotties/button-what-does-this-mean.json";
import loadingBgVid from "../../videos/water-beams_1.mp4";
import {useDispatch} from "react-redux";
import {OPEN_MODAL, openModalAction} from "../../redux/modal/actions";
import generalLottieSettings from "../../lotties/general-settings";

export default function Sec4LargeFish() {
  const MoreInfoBtnOptions = generalLottieSettings(MoreInfoBtn)
  const dispatch = useDispatch()

  const openModal = (e) => {
    e.preventDefault()
    dispatch(openModalAction(OPEN_MODAL, e.currentTarget.dataset.targetmodal))
  }

  return (
    <section className={"section section-large-fish"}>
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
        <div className="row flex-md-row-reverse flex-row">
          <div className="col-12 col-md-5 text-center text-md-left section-content">
            <div className="section-number">04.</div>
            <h2 className="section-title">AND THERE IS GROWS INTO A LARGE SALMON</h2>
            <div className="section-text text mt-3">
              When the salmon reaches the desired size, it is collected onto a modern harvesting vessel and itis now ready fora short trip back on land to beprocessed byourdedicated team.
            </div>
          </div>
          
          <div className="col-12 col-md-7 section-modal-trigger text-center text-md-left mt-4 mt-md-0">
            <div className="modal-trigger d-inline-block"
              data-targetmodal={"large-fish"}
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