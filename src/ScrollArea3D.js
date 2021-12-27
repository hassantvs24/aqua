import React, {useRef, useState, useEffect} from 'react'
import {getMousePos, getMouseDegrees} from './utils/getmouse'
import state from './utils/store'
import useScrollPosition from 'use-scroll-position'
import {connect} from 'react-redux'
import scroll3DAction from './redux/scroll3DAction'
import scroll3Dpos from './utils/scroll3Dpos'

// How 3D elemennts are scrolled through in Panel3D

// 3D scroll postions
const {
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
  scrollAdultNext,
} = scroll3Dpos

// REDUX
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

const Scroll3D = (props) => {
  const ref3D = useRef()
  const scrollPosition = useScrollPosition()
  const [processed, setProcessed] = useState(false)
  const [processStart, setProcessStart] = useState(false)
  const [panel3DposCaught, setPanel3DposCaught] = useState(false)
  const [scrollCatchStart, setScrollCatchStart] = useState(0)
  const [scrollCatchEnd, setScrollCatchEnd] = useState(0)

  let panel3Dpos

  const getPanel3dPos = () => {
    /* console.log(
       props.passRef.current.getBoundingClientRect().y,
       'scrollposition'
     ) */

    panel3Dpos = props.passRef.current.getBoundingClientRect().y

    setScrollCatchStart(panel3Dpos + 200 - 50)
    setScrollCatchEnd(panel3Dpos + 200 + 50)
    setPanel3DposCaught(true)
    console.log(
      scrollCatchStart,
      'scrollCatchStart',
      scrollCatchEnd,
      'scrollCatchEnd',
      panel3DposCaught,
      'panel3DposCaught'
    )
  }

  const lockPanel = () => {
    props.passRef.current.style.display = 'block'
    window.scroll({
      top: props.passRef.current.offsetTop,
      //  behavior: 'smooth',
    })
    document.getElementById('scrollBlock').click()
    document.body.style.overflowY = 'hidden'
  }

  const unlockPanel = () => {
    props.passRef.current.style.display = 'none'
    document.body.style.overflowY = 'auto'
    if (processed === false) {
      setProcessed(true)
      setProcessStart(false)
    }
  }

  /*
  // Lock to 3d panel
  switch (true) {
    
    case scrollPosition > 200 && scrollPosition < 500:
      lockPanel()

    // Reset process
    case scrollPosition > 200 && scrollPosition < 500:

      if (panel3DposCaught === false) {
        getPanel3dPos()
      }
      props.passRef.current.style.display = 'none'
      if (processed === true) {
        setProcessed(false)
      }
      break

    // Start and lock
    case scrollPosition > scrollCatchStart && scrollPosition < scrollCatchEnd:
      if (processed === false && processStart == false) {
        lockPanel()
      }

      // Process started
      if (props.scroll3D > 200 && props.scroll3D < scrollAdultNext - 200) {
        if (processStart === false) {
          setProcessStart(true)
        }
      }

      // If scroll to end or beginning after process started
      if (
        (props.scroll3D <= 0 && processStart === true) ||
        (props.scroll3D > scrollAdultNext && processStart === true)
      ) {
        unlockPanel()
      }
      break

    // Reset process
    case scrollPosition > scrollCatchEnd + 200:
      if (processed === true) {
        setProcessed(false)
      }
      break
  }
  */

  return (
    <div
      style={{display: 'block'}}
      onMouseMove={(e) => {
        props.mouse.current = getMousePos(e)
      }}>
      <div
        className="scrollArea"
        id="scrollBlock"
        ref={props.passRef}
        onScroll={props.passOnScroll}>
        {new Array(state.sections).fill().map((_, index) => (
          <div
            ref={ref3D}
            key={index}
            id={'0' + index}
            style={{height: `${(state.pages / state.sections) * 100}vh`}}
          />
        ))}
      </div>
    </div>
  )
}

const ConnectedScroll3D = connect(mapStatetoProps, mapDispatchToProps)(Scroll3D)

const ScrollArea3D = (props) => {
  return (
    <ConnectedScroll3D
      mouse={props.mouse}
      passRef={props.passRef}
      passOnScroll={props.passOnScroll}
      scrollPos={props.scrollPos}
    />
  )
}

export default ScrollArea3D
