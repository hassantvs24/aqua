// ================= section one
import React from 'react'
import Lottie from "react-lottie";
import MoreInfoBtn from "../../lotties/button-grown-in-america.json";
import loadingBgVid from "../../videos/water-beams_1.mp4";
import {useDispatch} from "react-redux";
import {OPEN_MODAL, openModalAction} from "../../redux/modal/actions";
import generalLottieSettings from "../../lotties/general-settings";

export default function Sec1Egg() {
  const MoreInfoBtnOptions = generalLottieSettings(MoreInfoBtn)
  const dispatch = useDispatch()
  
  const openModal = (e) => {
    e.preventDefault()
    dispatch(openModalAction(OPEN_MODAL, e.currentTarget.dataset.targetmodal))
  }
  
  return (
    <section className={"section section-egg"}>
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
        <div className="row">
          <div className="col-12 col-md-6 text-center text-md-left section-content">
            <div className="section-number">01.</div>
            <h2 className="section-title">IT ALL STARTS WITH ROE</h2>
            <div className="section-subtitle font-weight-bold pb-4 pt-3">The Roe is the start of the journey. First class genetics is used to achieve a superior product.</div>
            <div className="section-text text">
              The roe is fertilized at the American Aquafarm hatchery where it is kept in tubs on land in cold fresh water. After 60 days the freshly hatched salmon is now called yolk sac fry, from its stomach sack that it nourished from for four to six weeks. When it begins to absorb feed, it is moved fromthe hatchery to a larger tub.
            </div>
          </div>
          
          <div className="col-12 col-md-6 section-modal-trigger text-center text-md-right mt-4 mt-md-0">
            <div className="modal-trigger d-inline-block" 
               data-targetmodal={"egg"}
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