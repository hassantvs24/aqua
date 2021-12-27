import React, { Suspense, useRef, useEffect, createContext, useContext } from 'react'
import Loading from './Loading'
import PanelHeader from './PanelHeader'
import PanelEgg from './PanelEgg'
import PanelSmolt from './PanelSmolt'
import PanelGrow from './PanelGrow'
import PanelFish from './PanelFish'
import PanelSteak from './PanelSteak'
import { Canvas, useFrame } from 'react-three-fiber'
import lerp from 'lerp'
import state from '../utils/store'
import { Block, useBlock } from './utils/blocks'

function Plane({ color = "white", ...props }) {
  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color={color} />
    </mesh>
  )
}

function Cross() {
  const ref = useRef()
  const { viewportHeight } = useBlock()
  useFrame(() => {
    const curTop = state.top.current
    const curY = ref.current.rotation.z
    const nextY = (curTop / ((state.pages - 1) * viewportHeight)) * Math.PI
    ref.current.rotation.z = lerp(curY, nextY, 0.1)
  })
  return (
    <group ref={ref} scale={[2, 2, 2]}>
      <Plane scale={[1, 0.2, 0.2]} color="#e2bfca" />
      <Plane scale={[0.2, 1, 0.2]} color="#e2bfca" />
    </group>
  )
}

function Content({ left, children }) {
  const { contentMaxWidth, canvasWidth, margin } = useBlock()
  const aspect = 1.75
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2
  return (
    <group position={[alignRight * (left ? -1 : 1), 0, 0]}>
      <Plane scale={[contentMaxWidth, contentMaxWidth / aspect, 1]} color=/*"#bfe2ca"*/"blue" />
      {children}
    </group>
  )
}

function Stripe() {
  const { contentMaxWidth } = useBlock()
  return (
    <Plane scale={[100, contentMaxWidth, 1]} rotation={[0, 0, Math.PI / 4]} position={[0, 0, -1]} color="#e3f6f5" />
  )
}

export default function App() {
  const scrollArea = useRef()
  const onScroll = e => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])
  return (
    <>
      <Canvas orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>
        {/* First section */}
        <Block factor={1.5} offset={0}>
          <Content left />
        </Block>
        {/* Second section */}
        <Block factor={2.0} offset={1}>
          <Content />
        </Block>
        {/* Stripe */}
        <Block factor={-1.0} offset={1}>
          <Stripe />
        </Block>
        {/* Last section */}
        <Block factor={1.5} offset={2}>
          <Content left>
            <Block factor={-0.5}>
              <Cross />
            </Block>
          </Content>
        </Block>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  )
}



/*
const offsetContext = createContext(0);

function Block({ children, offset, factor, ...props }) {
  const ref = useRef()
  // Fetch parent offset and the height of a single section
  const { offset: parentOffset, sectionHeight } = useBlock()
  offset = offset !== undefined ? offset : parentOffset
  // Runs every frame and lerps the inner block into its place
  useFrame(() => {
    const curY = ref.current.position.y
    const curTop = state.top.current
    ref.current.position.y = lerp(curY, (curTop / state.zoom) * factor, 0.1)
  })
  return (
    <offsetContext.Provider value={offset}>
      <group {...props} position={[0, -sectionHeight * offset * factor, 0]}>
        <group ref={ref}>{children}</group>
      </group>
    </offsetContext.Provider>
  )
}

function useBlock(){
  const {viewport} = useThree()
  const offset = useContext(offsetContext)
  const canvasWidth = viewport.width / zoom
  const canvasHeight = viewport.height / zoom
  const sectionHeight = canvasHeight * ((pages - 1) / (sections - 1))

  return { offset, canvasWidth, canvasHeight, sectionHeight}
}

<Block offset={2} factor={1.5}>
  <Content>
    <Block factor={-0.5}>
      <SubContent/> 
    </Block>
  </Content>  
</Block>

function Cross(){
  const ref = useRef();
  const { viewportHeight } = useBlock()
  useFrame(()=> {
    const curTop = state.top.current
    const nextY = ( curTop / ((state.pages - 1 ) * viewportHeight))* Math.PI
    ref.current.rotation.z = lerp(ref.current.rotation.z, nextY, 0.1)
  })
  <group ref={ref}>
}
*/