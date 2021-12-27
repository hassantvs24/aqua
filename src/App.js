import React, {Suspense, useEffect} from 'react'
// import Loading from "./Loading";
import Navigation from './Navigation'
import PanelHeader from './PanelHeader'
import PanelSteak from './PanelSteak'
import PanelLast from './PanelLast'
import Panel3D from './Panel3D'
import Ui3dText from './Ui3dText'
import Ui3dButtons from './Ui3dButtons'
import {Provider} from 'react-redux'
import store from './redux/store'
import LoadingIE from './components/loader/LoadingIE'
import LoadingChrome from './components/loader/LoadingChrome'
import scroll3DAction from './redux/scroll3DAction'
import scroll3Dpos from './utils/scroll3Dpos'
import {connect} from 'react-redux'
import GlobalModal from './components/modals/global-modal'
import GlobalModalContainer from './components/modals/global-modal-container'
import PanelHatchery from "./PanelHatchery";

// Redux - For connecting the current 3d scroll position from Panel3D to this componant's props
// mapStatetoProps
const mapStatetoProps = (state) => {
  return {
    scroll3D: state.scroll3DEntry.scroll3D,
  }
}
// mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  scroll3DPos: () => dispatch(scroll3DAction()),
})

const ConnectedNavigation = connect(
  mapStatetoProps,
  mapDispatchToProps
)(Navigation)
const ConnectedPanelHeader = connect(
  mapStatetoProps,
  mapDispatchToProps
)(PanelHeader)
const ConnectedUi3dText = connect(mapStatetoProps, mapDispatchToProps)(Ui3dText)
const ConnectedUi3dButtons = connect(
  mapStatetoProps,
  mapDispatchToProps
)(Ui3dButtons)
const ConnectedPanelHatchery = connect(
  mapStatetoProps,
  mapDispatchToProps
)(PanelHatchery)
const ConnectedPanelSteak = connect(
  mapStatetoProps,
  mapDispatchToProps
)(PanelSteak)
const ConnectedPanelLast = connect(
  mapStatetoProps,
  mapDispatchToProps
)(PanelLast)

// check if internet explorer 6-11
const isIE = false || !!document.documentMode

export default function App() {
  // Start at top of website onload or on page refresh
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        {isIE ? <LoadingIE /> : <LoadingChrome />}
        <Provider store={store}>
          <ConnectedNavigation />
          <ConnectedPanelHeader />
          <ConnectedUi3dButtons />
          <ConnectedUi3dText />
          <Panel3D />
          <ConnectedPanelHatchery />
          <ConnectedPanelSteak />
          <ConnectedPanelLast />
          <div className="layer" />
          <GlobalModal />
          {/*this element is to show a video in the modal background*/}
          <GlobalModalContainer />
        </Provider>
      </Suspense>
    </>
  )
}
