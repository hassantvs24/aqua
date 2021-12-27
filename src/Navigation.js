import React from "react";
import Logo from "./images/american-logo-white.png";
import LogoDark from "./images/logo-dark.png";
import MenuBars from "./components/icons/menuBars";
import {useDispatch, useSelector} from "react-redux";
import {OPEN_MODAL, openModalAction} from "./redux/modal/actions";
import scroll3Dpos from "./utils/scroll3Dpos";
import MenuBarsDark from "./components/icons/menuBarsDark";

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
  scrollLast
} = scroll3Dpos

const StageButtons = (props) => {
  return (
    <div
      className="stages">
      <a  className={
         props.scroll3D < scroll3dStart
        ? "stage-link selected"
        : "stage-link unselected"
      } href="#00" children="01" />
      <a className={
         props.scroll3D > scroll3dStart && props.scroll3D < scrollEggSmolt
        ? "stage-link selected"
        : "stage-link unselected"
      } href="#07" children="02" />
      <a className={
        props.scroll3D > scrollEggSmolt && props.scroll3D < scrollPenIn
        ? "stage-link selected"
        : "stage-link unselected"
      } href="#017" children="03" />
      <a  className={
        props.scroll3D > scrollPenIn && props.scroll3D < scrollGrowAdult
        ? "stage-link selected"
        : "stage-link unselected"
      } href="#022" children="04" />
      <a className={
        props.scroll3D >
        scrollGrowAdult && props.scroll3D < scrollHatchery
          ? "stage-link selected"
          : "stage-link unselected"
      } href="#033" children="05" />
      <a className={
         props.scroll3D >
         scrollHatchery && props.scroll3D < scrollSteak 
        ? "stage-link selected"
        : "stage-link unselected"
      } href="#040" children="06" />
      <a className={
         props.scroll3D >
         scrollSteak  && props.scroll3D < scrollLast 
        ? "stage-link selected"
        : "stage-link unselected"
      }  href="#055" children="07" />
      <a className={
         props.scroll3D > scrollLast 
        ? "stage-link selected"
        : "stage-link unselected"
      } href="#066" children="08" />
    </div>
  );
};

const Navigation = (props) => {
  const dispatch = useDispatch()
  const openModal = (e) => {
    e.preventDefault()
    dispatch(openModalAction(OPEN_MODAL, e.currentTarget.dataset.targetmodal))
  }
  // const scrollState3d = useSelector(state => state.scroll3DEntry.scroll3D)
  // let isFirstSectionActive = scrollState3d >= 300 ? "hidden" : ""
  
  return (
    <>
      <div className={props.scroll3D > scrollLast ? "nav-frame no-gradient"
        : "nav-frame"}>
        <a className="frame__title" href="https://americanaquafarms.com/">
          {
            props.scroll3D > scrollLast ? 
            <img src={LogoDark} alt="american_aquafarm_logo" className="site-logo" />  : 
            <img src={Logo} alt="american_aquafarm_logo" className="site-logo" /> 
          }
        </a>
        <div className="frame__links">
          <span className="d-inline-block rounded-0 main-menu-trigger" 
             data-targetmodal={"main-menu"} 
             onClick={e => openModal(e)}>
            {
              props.scroll3D > scrollLast ?
                <MenuBarsDark className={"main-menu-toggle"}/> :
                <MenuBars className={"main-menu-toggle"}/>
            }
          </span>
        </div>
      </div>
      
      <StageButtons scroll3D={props.scroll3D} />
    </>
  );
};

export default Navigation;
