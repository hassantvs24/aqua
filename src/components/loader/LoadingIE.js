import React from 'react'
import logo from '../../images/american-logo-white.png'
import loadingBgVid from "../../videos/water-beams_1.mp4";
import ChromeLogo from "../../images/icons/chrome.svg"
import FirefoxLogo from "../../images/icons/firefox.svg"
import SafariLogo from "../../images/icons/safari.svg"
import EdgeLogo from "../../images/icons/edge.svg"
// import '../style/loading/loading-ie.scss'

export default function LoadingIE() {
    return (
        <div id="loading-ie" className="loading-section">
            {/*start video*/}
            <div className="video-bg-wrap">
                <video preload='true' id="loading-video-bg" autoPlay={true} muted={true} loop={true} src={loadingBgVid} />
            </div>
            <div className="video-overlay" />
            {/*end video bg*/}

            <div className="wrapper">
                <div className="header">
                    <div className="brand">
                        <img src={logo} alt="logo"/>
                    </div>
                    <h1 className="title">
                        This website experience unfortunately will not work on this browser.
                    </h1>
                </div>

                <div className="body">
                    <div className="cta">
                        <div className="recommend">
                            <div className="left">Please use one of the following browsers instead:</div>
                            <div className="right browser-icons">
                                <div className="browser">
                                    <span className="icon"><img src={ChromeLogo} alt="chrome logo"/></span>
                                    <span className="text">Chrome</span>
                                </div>
                                <div className="browser">
                                    <span className="icon"><img src={FirefoxLogo} alt="firefox logo"/></span>
                                    <span className="text">Firefox</span>
                                </div>
                                <div className="browser">
                                    <span className="icon"><img src={SafariLogo} alt="safari logo"/></span>
                                    <span className="text">Safari</span>
                                </div>
                                <div className="browser">
                                    <span className="icon"><img src={EdgeLogo} alt="edge logo"/></span>
                                    <span className="text">Edge</span>
                                </div>
                            </div>
                        </div>
                        <div>Or press the button below for the low end version</div>
                        <div>
                            <a href='https://americanaquafarms.com/' target='_blank' className="btn btn-outline-light">Enter low bandwidth version</a>
                        </div>
                    </div>
                </div>{/*end body*/}
            </div>{/*end wrapper*/}
        </div>
    )
}
