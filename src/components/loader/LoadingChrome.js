import React, {useEffect, useState} from 'react'
import loadingBgVid from '../../videos/water-beams_1.mp4'
import logo from '../../images/american-logo-white.png'
import Lottie from 'react-lottie'
import LoadingTwoFish from '../../lotties/loader.json'
import LoadingFishes from '../../lotties/loading-fishes.json'
import generalLottieSettings from '../../lotties/general-settings'
import * as THREE from 'three'

// import * as THREE from "three";
// import {useTransition, animated, a} from "react-spring";
// import ChromeLogo from "../images/icons/chrome.svg";
// import FirefoxLogo from "../images/icons/firefox.svg";
// import SafariLogo from "../images/icons/safari.svg";
// import EdgeLogo from "../images/icons/edge.svg";

export default function LoadingChrome() {
  const LoadingTwoFishOptions = generalLottieSettings(LoadingTwoFish)
  const LoadingFishesOptions = generalLottieSettings(LoadingFishes)

  const [loadingStatus, setLoadingStatus] = useState('start')
  const [width, setWidth] = useState(0)

  useEffect(() => {
    THREE.DefaultLoadingManager.onStart = function (
      url,
      itemsLoaded,
      itemsTotal
    ) {
   /*   console.log(
        'Started loading file: ' +
          url +
          '.\nLoaded ' +
          itemsLoaded +
          ' of ' +
          itemsTotal +
          ' files.'
      ) */
    }

    THREE.DefaultLoadingManager.onLoad = () => {
    //  console.log('Loading Complete!')
      setLoadingStatus('done')
    }

    THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    /*  console.log(
        'Loading file: ' +
          url +
          '.\nLoaded ' +
          itemsLoaded +
          ' of ' +
          itemsTotal +
          ' files.'
      ) */
      setWidth(Math.round((itemsLoaded / itemsTotal) * 100))
    }

    THREE.DefaultLoadingManager.onError = function (url) {
    //  console.log('There was an error loading ' + url)
    }

    /*
    for (let i = 0; i < 101; i++) {
      setTimeout(function timer() {
        setWidth(i)
        if (i === 100) {
          setLoadingStatus('done')
        }
      }, i * 20)
    }
    */
  }, [])

  return (
    <div id="loading-chrome" className={'loading-section ' + loadingStatus}>
      {/*start video*/}
      <div className="video-bg-wrap">
        <video  id="vid"
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

      <div className="wrapper">
        <div className="header">
          <div className="brand">
            <img src={logo} alt="logo" />
          </div>
        </div>

        <div className="body">
          <div id="loading-center">
            <div id="bg-fishes">
              <Lottie
                options={LoadingFishesOptions}
                speed={1.5}
                isClickToPauseDisabled={true}
              />
            </div>
            <div className="content-loading">
              <div id="centered-fishes">
                <Lottie
                  options={LoadingTwoFishOptions}
                  height={100}
                  width={100}
                  isClickToPauseDisabled={true}
                />
              </div>
              <h2 id="counter">{width}%</h2>
              <div>Loading your experience</div>
            </div>
          </div>
        </div>
        {/*end body*/}

        <div className="footer">
          <div className="text">
            Press the button below for slower internet connections
          </div>

          <div>
            <a
              href="https://m.americanaquafarms.com/"
              className="btn btn-outline-light">
              Enter low bandwidth version
            </a>
          </div>
        </div>
      </div>
      {/*end wrapper*/}
    </div>
  )
}
