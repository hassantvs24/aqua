import React, { Suspense, useRef, useEffect, createContext, useContext, useMemo } from 'react'
import Loading from './Loading'
import PanelHeader from './PanelHeader'
import PanelEgg from './PanelEgg'
import PanelSmolt from './PanelSmolt'
import PanelGrow from './PanelGrow'
import PanelFish from './PanelFish'
import PanelSteak from './PanelSteak'
import { Canvas, Dom, useFrame, useLoader } from 'react-three-fiber'
import lerp from 'lerp'
import state from './utils/store'
import { Block, useBlock } from './utils/blocks'
// import { Text } from 'drei'
import { TextureLoader, LinearFilter } from 'three'
import { Text, MultilineText } from './Text'

const Plane = ({ color = "white", ...props }) => {
  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry"/>
      <meshBasicMaterial attach="material" color={color}/>
    </mesh>  
  )
}

const Cross = () => {
  const ref = useRef()
  const {viewportHeight } = useBlock()
  useFrame(() => {
    const curTop = state.top.current
    const curY = ref.current.rotation.z
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 
    ref.current.rotation.z = lerp(curY, nextY, 0.1)
  })
  return (
    <group ref={ref} scale={[2, 2, 2]}>
      <Plane scale={[1, 0.2 , 0.2]} color="green" />
      <Plane scale={[0.2, 1, 0.2]} color="green" />
    </group>  
  )
}

const Content = ({ left, children }) => {
  const { contentMaxWidth, w, canvasWidth, canvasHeight, mobile, margin } = useBlock()
  const aspect = 1.75
  const alignRight = ( canvasWidth - contentMaxWidth - margin ) / 2
  return(
    <group position= {[alignRight * (left ? -1 : 1), 0, 0]}>
          <Text left size={w * 0.08} position={[-w / 3.2, 0.5, -1]} color="#d40749">
            American Salmon
          </Text>
      <Plane scale={[contentMaxWidth, contentMaxWidth / aspect, 1 ]} color="blue" />
      {children}
    </group> 
  )
}

const Stripe = () => {
  const { contentMaxWidth } = useBlock()
  return (
    <Plane scale={[100, contentMaxWidth,1]} rotation={[0,0, Math.PI / 4]} position={[0,0, -1]} color="red" />
  )
}

function TextContent() {
  const images = useLoader(
    TextureLoader,
    state.paragraphs.map(({ image }) => image)
  )
  useMemo(() => images.forEach(texture => (texture.minFilter = LinearFilter)), [images])
  const { contentMaxWidth: w, canvasWidth, canvasHeight, mobile } = useBlock()
  return (
    <>
      <Block factor={1} offset={0}>
        <Block factor={1.2}>
          <Text left size={w * 0.08} position={[-w / 3.2, 0.5, -1]} color="#d40749">
            American Salmon
          </Text>
        </Block>
        <Block factor={1.0}>
          <Dom position={[-w / 3.2, -w * 0.08 + 0.25, -1]}>It was the year 2076.{mobile ? <br /> : " "}The substance had arrived.</Dom>
        </Block>
      </Block>
      <Block factor={1.2} offset={5.7}>
        <MultilineText top left size={w * 0.15} lineHeight={w / 5} position={[-w / 3.5, 0, -1]} color="#2fe8c3" text={"four\nzero\nzero"} />
      </Block>
      {/*PARAGRAPHS MAP*/}
      {state.paragraphs.map((props, index) => (
        <Paragraph key={index} index={index} {...props} image={images[index]} />
      ))}
      {state.stripes.map(({ offset, color, height }, index) => (
        <Block key={index} factor={-1.5} offset={offset}>
          <Plane args={[50, height, 32, 32]} shift={-4} color={color} rotation={[0, 0, Math.PI / 8]} position={[0, 0, -10]} />
        </Block>
      ))}
      <Block factor={1.25} offset={8}>
        <Dom className="bottom-left" position={[-canvasWidth / 2, -canvasHeight / 2, 0]}>
          Culture is not your friend.
        </Dom>
      </Block>
    </>
  )
}

function Paragraph({ image, index, offset, factor, header, aspect, text }) {
  const { contentMaxWidth: w, canvasWidth, margin, mobile } = useBlock()
  const size = aspect < 1 && !mobile ? 0.65 : 1
  const alignRight = (canvasWidth - w * size - margin) / 2
  const pixelWidth = w * state.zoom * size
  const left = !(index % 2)
  const color = index % 2 ? "#D40749" : "#2FE8C3"
  return (
    <Block factor={factor} offset={offset}>
      <group position={[left ? -alignRight : alignRight, 0, 0]}>
        <Plane map={image} args={[1, 1, 32, 32]} shift={200} size={size} aspect={aspect} scale={[w * size, (w * size) / aspect, 1]} frustumCulled={false} />
        <Dom
          style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: left ? "left" : "right" }}
          position={[left || mobile ? (-w * size) / 2 : 0, (-w * size) / 2 / aspect - 0.4, 1]}>
          {text}
        </Dom>
        <Text left={left} right={!left} size={w * 0.04} color={color} top position={[((left ? -w : w) * size) / 2, (w * size) / aspect / 2 + 0.5, -1]}>
          {header}
        </Text>
        <Block factor={0.2}>
          <Text opacity={0.5} size={w * 0.1} color="#1A1E2A" position={[((left ? w : -w) / 2) * size, (w * size) / aspect / 1.5, -10]}>
            {"0" + (index + 1)}
          </Text>
        </Block>
      </group>
    </Block>
  )
}



export default function App() {
  const scrollArea = useRef()
  const onScroll = e => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({target: scrollArea.current}), [])
  
  return (
    <>   
      <Canvas concurrent pixelRatio={1} orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>
        <Suspense fallback={<Dom center className="loading" children="Loading..." />}>          
      
          <Block factor={1.5} offset={0}>
         
           <Content>
            </Content> 
          </Block>  
          
          <Block factor={2.0} offset={1}>
            <Content>
            </Content> 
          </Block> 
          
          <Block factor={-1.0} offset={1}>
            <Stripe />
          </Block>

          <Block factor={1.5} offset={2} >
            <Content left>
              <Block factor={-0.5}>
                <Cross />
              </Block> 
            </Content>  
          </Block> 
    
        </Suspense>
        </Canvas>

        <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
          {new Array(state.sections).fill().map((_, index) => (
            <div key={index} id={"0" + index} style={{ height: `${(state.pages / state.sections) * 100}vh` }} />
          ))}
        </div>

        {/* FIXED UI */}
        <div className="frame">
          <h1 className="frame__title">Scroll, Refraction and Shader Effects</h1>
          <div className="frame__links">
            <a className="frame__link" href="http://tympanus.net/Tutorials/PhysicsMenu/">
              Previous demo
            </a>
            <a className="frame__link" href="https://tympanus.net/codrops/?p=45441">
              Article
            </a>
            <a className="frame__link" href="https://github.com/drcmda/the-substance">
              GitHub
            </a>
          </div>
          <div className="frame__nav">
            <a className="frame__link" href="#00" children="intro" />
            <a className="frame__link" href="#01" children="01" />
            <a className="frame__link" href="#02" children="02" />
            <a className="frame__link" href="#03" children="03" />
            <a className="frame__link" href="#04" children="04" />
            <a className="frame__link" href="#05" children="05" />
            <a className="frame__link" href="#07" children="06" />
          </div>
      </div>

        {/*
        <Suspense fallback={null}>
          <PanelHeader/>
          <PanelEgg/>
          <PanelSmolt/>  
          <PanelGrow/>    
          <PanelFish/> 
          <PanelSteak/>     
        <div className="layer" /> 
          <a href="https://github.com/drcmda/learnwithjason" className="top-left" children="Github" />
          <a href="https://twitter.com/0xca0a" className="top-right" children="Twitter" />
          <a href="https://github.com/drcmda/react-three-fiber" className="bottom-left" children="+ react-three-fiber" />
        </Suspense>
        <Loading/>
        */}

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