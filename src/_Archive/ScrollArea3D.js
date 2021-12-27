import React, {useRef, useState} from 'react'
import {getMousePos, getMouseDegrees} from './utils/getmouse'
import state from './utils/store'
import useScrollPosition from 'use-scroll-position'
import {connect} from 'react-redux'
import scroll3DAction from './redux/scroll3DAction'
import scroll3Dpos from './utils/scroll3Dpos'

// How 3D elemennts are scrolled through in Panel3D

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

// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

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
  const [locked, setLocked] = useState(false)
  const [startAtstart, setStartAtStart] = useState(true)

  const scrollCatchStart = 650
  const scrollCatchEnd = 800

  // const [lockState, setLockState] = useState(false);
  console.log(
    scrollPosition,
    '2D scroll pos',
    props.scroll3D,
    'scroll 3D',
    processed,
    'processed'
  )

  switch (true) {
    case scrollPosition < scrollCatchStart:
      if (processed === true) {
        setProcessed(false)
      }
      /*
      console.log(
        "stage 1",
        props.scroll3D,
        "scroll",
        scrollPosition,
        "2D scroll pos"
      );*/
      break

    // Start at Start from Start
    case scrollPosition > scrollCatchStart &&
      scrollPosition < scrollCatchEnd &&
      props.scroll3D <= 0 &&
      startAtstart === true &&
      processed === false:
      props.passRef.current.style.display = 'block'
      if (locked === false) {
        window.scroll({
          top: props.passRef.current.offsetTop,
          behavior: 'smooth',
        })
      }
      document.getElementById('scrollBlock').click()
      document.body.style.overflowY = 'hidden'
      if (locked === false) {
        setLocked(true)
      }
      break

    // End at End from Start
    case scrollPosition > scrollCatchStart &&
      scrollPosition < scrollCatchEnd &&
      props.scroll3D > scrollAdultNext /* || props.scroll3D <= 0 */ &&
      startAtstart === true &&
      locked === true:
      if (processed === false) {
        setProcessed(true)
        setLocked(false)
        setStartAtStart(false)
      }
      props.passRef.current.style.display = 'none'
      document.body.style.overflowY = 'auto'
      console.log('overflow auto')
      break

    // Start at End from End
    case scrollPosition > scrollCatchStart &&
      scrollPosition < scrollCatchEnd &&
      props.scroll3D > scrollAdultNext &&
      startAtstart === false &&
      processed === false:
      console.log('START AT END')
      props.passRef.current.style.display = 'block'
      if (locked === false) {
        window.scroll({
          top: props.passRef.current.offsetTop,
          behavior: 'smooth',
        })
      }
      document.getElementById('scrollBlock').click()
      document.body.style.overflowY = 'hidden'
      if (locked === false) {
        setLocked(true)
      }
      break

    // End at Start from End
    case scrollPosition > scrollCatchStart &&
      scrollPosition < scrollCatchEnd &&
      props.scroll3D <= 0 /* || props.scroll3D > scrollAdultNext */ &&
      startAtstart === false &&
      locked === true:
      console.log('END AT START')
      if (processed === false) {
        setProcessed(true)
        setLocked(false)
        setStartAtStart(true)
      }
      props.passRef.current.style.display = 'none'
      document.body.style.overflowY = 'auto'
      console.log('overflow auto')
      break

    // End at End from End
    case scrollPosition > scrollCatchStart &&
      scrollPosition < scrollCatchEnd &&
      props.scroll3D > scrollAdultNext /* || props.scroll3D <= 0 */ &&
      startAtstart === false &&
      locked === true:
      if (processed === false) {
        setProcessed(true)
        setLocked(false)
        setStartAtStart(false)
      }
      props.passRef.current.style.display = 'none'
      document.body.style.overflowY = 'auto'
      console.log('overflow auto')
      break

    // End at Start from Start

    /*
      console.log(
        "stage 2",
        props.passRef.current.offsetTop,
        "props.passRef.current.offsetTop",
        props.scroll3D,
        "scroll",
        scrollPosition,
        "2D scroll pos"
      );
      */

    /*
      console.log(
        "stage 3",
        props.passRef.current.offsetTop,
        "props.passRef.current.offsetTop",
        props.scroll3D,
        "scroll",
        scrollPosition,
        "2D scroll pos"
      );*/

    case scrollPosition > scrollCatchEnd:
      if (processed === true) {
        setProcessed(false)
      }
      // console.log("stage 4", passedPanel, "passedPanel");
      break
  }

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
