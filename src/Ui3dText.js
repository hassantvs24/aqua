import React from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import scroll3DAction from './redux/scroll3DAction'
import scroll3Dpos from './utils/scroll3Dpos'
import checkMarkIcon from './images/icons/checkmark-white.svg'
import Lottie from 'react-lottie'
import generalLottieSettings from './lotties/general-settings'
import btnMoreInfo from './lotties/button-grown-in-america.json'
import btnWhatDoesThisMean from './lotties/button-what-does-this-mean.json'
import btnDoesItWork from './lotties/does-it-work.json'
import {OPEN_MODAL, openModalAction} from './redux/modal/actions'

// These imported variables below have the same 3D scroll positions used in the Panel3D switch statements, they determine when 3D elements will change during scrolling in the 3D panel.
// If similar conditions are made here for changing the interface's appearance from comparing these variables with the current 3d scroll position, they should be in sync with the scrolled 3D events, even if the positions in utils/scroll3Dpos.js are updated later
// Eg 'props.scroll3D > scrollGrowAdult' here will be the same as 'curTop > scrollGrowAdult in Panel3D.js

// Imported scroll positions which could also be used with the Ui3d componant
const {
  scroll3dStart,
  scrollEgg,
  scrollPreHatch,
  scrollEggSmolt,
  scrollSmolt,

  scrollPenIn,
  scrollPenState,
  scrollPenOut,
  smoltPenRate,

  scrollGrowAdult,
  scrollAdult,
  scrollHatchery,
  scrollSteak,
  scrollLast,
} = scroll3Dpos

const EggText = (props) => {
  const MoreInfoBtnOptions = generalLottieSettings(btnMoreInfo)
  const dispatch = useDispatch()

  const openModal = (e) => {
    e.preventDefault()
    dispatch(openModalAction(OPEN_MODAL, e.currentTarget.dataset.targetmodal))
  }

  return (
    <div
      //  The ternary operator below turns the appearace of the of this div on and off with css classes by comparing the imported currrent 3D scroll postion with the imported 3d scroll position variables
      className={
        props.scroll3D > scrollEgg && props.scroll3D < scrollEggSmolt - 100
          ? 'egg-content on'
          : 'egg-content off'
      }>
      <div className="text-center text-md-left section-content">
        <div className="section-number">01.</div>
        <h2 className="section-title">IT ALL STARTS WITH ROE</h2>
        <div className="section-subtitle font-weight-bold pb-4 pt-3">
          The Roe is the start of the journey. First class genetics is used to
          achieve a superior product.
        </div>
        <div className="section-text text">
          The roe is fertilized at the American Aquafarm hatchery where it is
          kept in tubs on land in cold fresh water. After 60 days the freshly
          hatched salmon is now called yolk sac fry, from its stomach sack that
          it nourished from for four to six weeks. When it begins to absorb
          feed, it is moved fromthe hatchery to a larger tub.
        </div>
      </div>
    </div>
  )
}

const SmoltText = (props) => {
  const MoreInfoBtnOptions = generalLottieSettings(btnWhatDoesThisMean)
  const dispatch = useDispatch()

  const openModal = (e) => {
    e.preventDefault()
    dispatch(openModalAction(OPEN_MODAL, e.currentTarget.dataset.targetmodal))
  }

  return (
    <div
      className={
        props.scroll3D > scrollEggSmolt && props.scroll3D < scrollPenIn
          ? 'smolt-content on'
          : 'smolt-content off'
      }>
      <div className="text-center text-md-left section-content">
        <div className="section-number">02.</div>
        <h2 className="section-title">
          THE ROE LATER GROWS INTO A SMOLT SALMON
        </h2>
        <div className="section-text text mt-3">
          The smolt is grown in a land based grow out facility in a temperature
          and bio controlled environment that ensures a healthy fish with strong
          growth rate and an excellent platform before being transported to the
          ocean.
        </div>
      </div>
    </div>
  )
}

const PenText = (props) => {
  const MoreInfoBtnOptions = generalLottieSettings(btnDoesItWork)
  const dispatch = useDispatch()

  const openModal = (e) => {
    e.preventDefault()
    dispatch(openModalAction(OPEN_MODAL, e.currentTarget.dataset.targetmodal))
  }

  return (
    <div
      className={
        props.scroll3D > scrollPenIn && props.scroll3D < scrollGrowAdult
          ? 'pen-content on'
          : 'pen-content off'
      }>
      <div className="text-center text-md-left section-content">
        <div className="section-number">03.</div>
        <h2 className="section-title">
          THE SMOLT SALMON IS PLACED IN OCEAN BASED CLOSED PENS
        </h2>
        <div className="section-text text mt-3">
          When the smolt is ready it is transported from land to the Ocean where
          it is placed in an eco friendly Cosed Pen.
        </div>
        <div className="section-text text mt-3">
          The closed pen creates an optimal environment for the salmon to grow.
        </div>
        <div className="section-text text mt-3">
          <ul className="bullet-list list-unstyled text-left">
            <li className="list-item mb-2 d-flex align-content-start align-items-start">
              <span className="mr-2">
                <img
                  src={checkMarkIcon}
                  height={20}
                  width={20}
                  alt="list_icon"
                />
              </span>
              <span>
                Eliminates fish escapes and separates the fish completely from
                predators
              </span>
            </li>
            <li className="list-item mb-2 d-flex align-content-start align-items-start">
              <span className="mr-2">
                <img
                  src={checkMarkIcon}
                  height={20}
                  width={20}
                  alt="list_icon"
                />
              </span>
              <span>Reduces the need for medicine/chemicals</span>
            </li>
            <li className="list-item mb-2 d-flex align-content-start align-items-start">
              <span className="mr-2">
                <img
                  src={checkMarkIcon}
                  height={20}
                  width={20}
                  alt="list_icon"
                />
              </span>
              <span>Eliminates sea lice</span>
            </li>
            <li className="list-item d-flex align-content-start align-items-start">
              <span className="mr-2">
                <img
                  src={checkMarkIcon}
                  height={20}
                  width={20}
                  alt="list_icon"
                />
              </span>
              <span>Controls waste from reaching the ocean</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const AdultText = (props) => {
  const MoreInfoBtnOptions = generalLottieSettings(btnWhatDoesThisMean)
  const dispatch = useDispatch()

  const openModal = (e) => {
    e.preventDefault()
    dispatch(openModalAction(OPEN_MODAL, e.currentTarget.dataset.targetmodal))
  }
  return (
    <div
      className={
        props.scroll3D > scrollGrowAdult &&
        props.scroll3D < scrollHatchery /* && props.scroll3D < scrollAdultNext */
          ? 'adult-content on'
          : 'adult-content off'
      }>
      <div className="text-center text-md-left section-content">
        <div className="section-number">04.</div>
        <h2 className="section-title">
          AND THERE IT GROWS INTO A LARGE SALMON
        </h2>
        <div className="section-text text mt-3">
          When the salmon reaches the desired size, it is collected onto a
          modern harvesting vessel and itis now ready fora short trip back on
          land to beprocessed byourdedicated team.
        </div>
      </div>
    </div>
  )
}

const Ui3dText = (props) => {
  // The current 3D scroll data from Panel3D
  // console.log(props.scroll3D, "Ui3d, 3d scroll data from Panel3D");
  const scrollState3d = useSelector((state) => state.scroll3DEntry.scroll3D)

  return (
    <div id="ui-3d-text">
      <EggText scroll3D={props.scroll3D} />
      <SmoltText scroll3D={props.scroll3D} />
      <PenText scroll3D={props.scroll3D} />
      <AdultText scroll3D={props.scroll3D} />
      {/* {scrollState3d >= 300 ? <StageButtons scroll3D={props.scroll3D} /> : ""} */}
    </div>
  )
}

export default Ui3dText
