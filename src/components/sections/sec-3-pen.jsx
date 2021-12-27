// ================= section two
import React from 'react'
import Lottie from "react-lottie";
import MoreInfoBtn from "../../lotties/button-what-does-this-mean.json";
import loadingBgVid from "../../videos/water-beams_1.mp4";
import {useDispatch} from "react-redux";
import {OPEN_MODAL, openModalAction} from "../../redux/modal/actions";
import generalLottieSettings from "../../lotties/general-settings";
import checkMarkIcon from "../../images/icons/checkmark-white.svg";

export default function Sec3Pen() {
  const MoreInfoBtnOptions = generalLottieSettings(MoreInfoBtn)
  const dispatch = useDispatch()

  const openModal = (e) => {
    e.preventDefault()
    dispatch(openModalAction(OPEN_MODAL, e.currentTarget.dataset.targetmodal))
  }

  return (
    <section className={"section section-pen"}>
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
          <div className="col-12 col-md-7 text-left section-content">
            <div className="section-number">03.</div>
            <h2 className="section-title">THE SMOLT SALMON IS PLACED IN OCEAN BASED CLOSED PENS</h2>
            <div className="section-text text mt-3">
              When the smolt I ready it is transported from land to the Ocean where it is placed in an eco friendly Cosed Pen.
            </div>
            <div className="section-text text mt-3">
              The closed pen creates an optimal environment for the salmon to grow.
            </div>
            <div className="section-text text mt-3">
              <ul className="bullet-list list-unstyled text-left">
                <li className="list-item d-flex align-content-start align-items-start">
                  <span className="mr-2"><img src={checkMarkIcon} height={20} width={20} alt="list_icon"/></span>
                  <span>Eliminates fish escapes and separates the fish completely from predators</span>
                </li>
                <li className="list-item d-flex align-content-start align-items-start">
                  <span className="mr-2"><img src={checkMarkIcon} height={20} width={20} alt="list_icon"/></span>
                  <span>Reduces the need for medicine/chemicals</span>
                </li>
                <li className="list-item d-flex align-content-start align-items-start">
                  <span className="mr-2"><img src={checkMarkIcon} height={20} width={20} alt="list_icon"/></span>
                  <span>Eliminates sea lice</span>
                </li>
                <li className="list-item d-flex align-content-start align-items-start">
                  <span className="mr-2"><img src={checkMarkIcon} height={20} width={20} alt="list_icon"/></span>
                  <span>Controls waste from reaching the ocean</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="col-12 col-md-5 section-modal-trigger text-center text-md-right mt-4 mt-md-0">
            <div className="modal-trigger d-inline-block"
              data-targetmodal={"pen"}
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