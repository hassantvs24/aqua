import React, {useRef} from 'react'
import { getMousePos, getMouseDegrees } from './utils/getmouse'
import state from './utils/store'

const ScrollArea3D = (props) => {
	return (
		<>
			<div  onMouseMove={e => {props.mouse.current = getMousePos(e) }}  className="scrollArea" ref={props.passRef} onScroll={props.passOnScroll}>
				{new Array(state.sections).fill().map((_, index) => (
					<div key={index} id={"0" + index} style={{ height: `${(state.pages / state.sections) * 100}vh` }} />
				))}
			</div>
		</>
	)
}

export default ScrollArea3D

