import React, {useState, Suspense, useRef, useEffect, createContext, useContext, useMemo } from 'react'
import Loading from './Loading'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, Dom, useFrame, useLoader, useThree } from 'react-three-fiber'
import lerp from 'lerp'
import state from './utils/store'
import { Block, useBlock } from './utils/blocks'
// import { Text } from 'drei'
import { TextureLoader, LinearFilter } from 'three'
import { Text, MultilineText } from './Text'
import { PerspectiveCamera , draco} from 'drei'
import deepwWaterVid from './videos/Deep-Water-Particles_emc_7-sec.mp4'
import { getMousePos, getMouseDegrees } from "./utils/getmouse"
import Particles from './Particles'

const mouseMove = 0.1

// EGGPANEL

const EggPanel = (props) => {
  const { contentMaxWidth, canvasWidth, margin,viewportHeight } = useBlock()
  const aspect = 1.75
  const alignRight = ( canvasWidth - contentMaxWidth - margin ) / 2
  const shape = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/scrollTest/fish-fry-retopo-21.glb', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  const ref = useRef()
 
  const eggDefState = () => {
    materials['Egg Salmon'].opacity = .5 
    materials.egg_outter1.opacity = .6 
    materials.eye_gold.opacity = .5 
    materials.Fish.opacity = 1
    materials['Mat.4'].opacity = .5
    ref.current.visible = true
  } 
 
  const eggFadedState = () => {
    materials['Egg Salmon'].opacity = 0 
    materials.egg_outter1.opacity = 0 
    materials.eye_gold.opacity = 0 
    materials.Fish.opacity = 0
    materials['Mat.4'].opacity = 0
    ref.current.visible = false
  }
  
  useEffect(() => {
    
    // console.log('egg ref',ref.current.visible)
 
    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current).play(),
    }
 
      materials['Egg Salmon'].transparent = true
      materials.egg_outter1.transparent = true
      materials.eye_gold.transparent = true
      materials.Fish.transparent = true
      materials['Mat.4'].transparent = true
      materials['Egg Salmon'].depthWrite = false
      materials.egg_outter1.depthWrite = false
      materials.eye_gold.depthWrite = false
      materials.Fish.depthWrite = false
      materials['Mat.4'].depthWrite = false
 
      return () => animations.forEach((clip) => mixer.uncacheClip(clip))
 
    }, [])
 
    const fall = () => {
      if (group.current.position.y > 0){
      }
    }
 
  useFrame((ani ,delta) => {

    /*Working 
    const curTop = state.top.current
    const curY = ref.current.rotation.z
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 
    ref.current.rotation.z = lerp(curY, nextY, 0.1)
    */
 
    mixer.update(delta)

    /* FOLLOW MOUSE   */
    let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
    ref.current.rotation.x =  degrees.y;
    ref.current.rotation.y =  degrees.x;

    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 
   
    ref.current.position.y = lerp(curTop * -1, nextY + 10 * -1, 0.1)
  
    switch (true){
        // move out
      case (curTop >=0 && curTop <=200 ) :
        eggDefState()
        break;
        
        // fall in
      case (curTop >=200 && curTop <=300 ) :
        eggDefState()  
        break;
        
        // fallow camera - fade back
      case (curTop >=300 && curTop <=500 ) :
        eggDefState()
        break;

      // fade back
      case (curTop >=500 && curTop <=800 ) :
        ref.current.position.y = -500
        ref.current.visible = true
        if (materials['Egg Salmon'].opacity < .5){
          materials['Egg Salmon'].opacity = materials['Egg Salmon'].opacity + .04 
          materials.egg_outter1.opacity = materials.egg_outter1.opacity + .04 
          materials.eye_gold.opacity = materials.eye_gold.opacity + .04 
          materials.Fish.opacity = materials.Fish.opacity + .04
          materials['Mat.4'].opacity = materials['Mat.4'].opacity + .04      
        }  
        break;
  
      // fade out
      case (curTop >=800 /* && curTop <=1200 */ ) : 
        ref.current.position.y = -500
        ref.current.visible = true
        if (materials['Egg Salmon'].opacity > 0){
            materials['Egg Salmon'].opacity = materials['Egg Salmon'].opacity - .04 
            materials.egg_outter1.opacity = materials.egg_outter1.opacity - .04 
            materials.eye_gold.opacity = materials.eye_gold.opacity - .04 
            materials.Fish.opacity = materials.Fish.opacity - .04
            materials['Mat.4'].opacity = materials['Mat.4'].opacity - .04
          }
      case (curTop >=800 /* && curTop <=1200 */ ) :
        eggFadedState()
        break;
      }
    })
  
 
  return(
    <group  position={[0, 0, 0]} >     
      <group  ref={group} rotation={[0, 0, 0]}  position={[2, 21, 0]} {...props} dispose={null} scale={[.04, .04, .04]}>
        <group  ref={ref}  position={[-74.14, 11.92, -78.71]} rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={nodes.Joint2} />
        <group position={[13.8, -23.08, -17.61]} />
        <mesh ref={shape}
          material={materials['Egg Salmon']}
          geometry={nodes.Sphere1.geometry}
          position={[0, 3.21, 5.5]}
          rotation={[-0.02, 1.13, 2.31]}
        />
        <skinnedMesh
          material={materials.egg_outter1}
          geometry={nodes['Fry_model_4_rigged-egg_outter1001'].geometry}
          skeleton={nodes['Fry_model_4_rigged-egg_outter1001'].skeleton}
        />
        <skinnedMesh
          material={materials.eye_gold}
          geometry={nodes['Fry_model_4_rigged-eye_gold001'].geometry}
          skeleton={nodes['Fry_model_4_rigged-eye_gold001'].skeleton}
        />
        <skinnedMesh
          material={materials.Fish}
          geometry={nodes['Fry_model_4_rigged-Fish001'].geometry}
          skeleton={nodes['Fry_model_4_rigged-Fish001'].skeleton}
        />
        <skinnedMesh
          material={materials['Mat.4']}
          geometry={nodes['Fry_model_4_rigged-Mat001'].geometry}
          skeleton={nodes['Fry_model_4_rigged-Mat001'].skeleton}
        />
        </group>
      </group>  
    </group> 
  )
}

// SMOLT PANEL

const SmoltPanel = (props) => {

  const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
    const { renderer } = useThree();
    const aspect = 1.75
    const alignRight = ( canvasWidth - contentMaxWidth - margin ) / 2
    const ref = useRef()
    const group = useRef()
    const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/009/Smolt-Fish-alphatex-7.glb', draco())
    const actions = useRef()
    const [mixer] = useState(() => new THREE.AnimationMixer())
  
    const { camera } = useThree()
  
    useFrame((ani, delta) =>
     {

      /* FOLLOW MOUSE   */
      let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
      group.current.rotation.x =  degrees.y;
      group.current.rotation.y =  degrees.x + 70;

      mixer.update(delta);
      const curY = ref.current.position.y
      const curTop = state.top.current
      const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 
  
      switch (true){
  
        case (curTop >= 0 && curTop <=800 ) :
          ref.current.visible = false
          materials['Salmon Final Texture'].opacity = 0
         // materials['Salmon Final Texture'].alphaTest = 0      
          break;
  
        case (curTop >=500 && curTop <=800 ) :
          ref.current.visible = true 
          break;

        case (curTop >=800 &&  curTop <=1200) :
          ref.current.visible = true 
          ref.current.position.y = -6
         // group.current.position.y = -1
          if (materials['Salmon Final Texture'].opacity < 1 ){
            materials['Salmon Final Texture'].opacity = materials['Salmon Final Texture'].opacity + .1    
          }         
          break

        case (curTop >=1200 && curTop <=1500) :
          ref.current.visible = true

        case (curTop <=1500) : 
          ref.current.visible = false
        }
      })
  
    useEffect(() => {
      actions.current = {
        Anim_0: mixer.clipAction(animations[0], group.current).play(),
      }
     
      materials['Salmon Final Texture'].transparent = true
      materials['Salmon Final Texture'].opacity = 0
      materials['Salmon Final Texture'].alphaTest = 0.5
      materials['Salmon Final Texture'].blendEquationAlpha = true
       
      return () => animations.forEach((clip) => mixer.uncacheClip(clip))
    }, [])
  
    return (
      <group rotation={[0, 70.2, 0]} scale={[.16, .16, .16]} ref={group} {...props} dispose={null}  position={[-2, 0, 0]}>
         <group  ref={ref}  position={[0, 0, 0]}>
         <primitive object={nodes.Atlantic_salmonhead} />
        <skinnedMesh
          material={materials['Salmon Final Texture']}
          geometry={nodes.body006.geometry}
          skeleton={nodes.body006.skeleton}
        />
        <skinnedMesh
          material={materials['Salmon Final Texture']}
          geometry={nodes.dents006.geometry}
          skeleton={nodes.dents006.skeleton}
        />
        <skinnedMesh
          material={materials['Salmon Final Texture']}
          geometry={nodes.eye_L006.geometry}
          skeleton={nodes.eye_L006.skeleton}
        />
        <skinnedMesh
          material={materials['Salmon Final Texture']}
          geometry={nodes.eye_R006.geometry}
          skeleton={nodes.eye_R006.skeleton}
        />
        </group>
      </group>
    )
  }

// GROWTH PANEL

const GrowthPanel = (props) => {

  const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
    const { renderer } = useThree();
    const aspect = 1.75
    const alignRight = ( canvasWidth - contentMaxWidth - margin ) / 2
    const ref = useRef()
    const group = useRef()
    const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/scrollTest/smolt-to-adult-20.glb', draco())
    const actions = useRef()
    const [mixer] = useState(() => new THREE.AnimationMixer())
  
    const { camera } = useThree()

    let grown
  
    useFrame((ani, delta) =>
     {

      /* FOLLOW MOUSE   */
      let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
      group.current.rotation.x =  degrees.y;
      group.current.rotation.y =  degrees.x + 70;

      const curY = ref.current.position.y
      const curTop = state.top.current
      const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 
  
      switch (true){
        case (curTop >= 0 && curTop <=800 ) :
          ref.current.visible = false
          materials['Salmon Final Texture'].opacity = 0
          materials['Salmon Final Texture'].alphaTest = 0   
          break;
  
        case (curTop >=800 && curTop <=1200 ) : 
          ref.current.visible = false
          ref.current.position.y = -8.1
          ref.current.position.z = 3.4
          grown = false

          mixer.stopAllAction()
          mixer.clipAction(animations[0], group.current).enabled = false
          break;

        case (curTop >=1200  &&  curTop <=1500 ) : 
          ref.current.visible = true
          ref.current.position.y = -8.1
          ref.current.position.z = 3.4

          mixer.clipAction(animations[0], group.current).enabled = true
          if (mixer.clipAction(animations[0], group.current).time === 0 &&  grown === false){
            mixer.clipAction(animations[0], group.current).play()        
          }
          if ( mixer.clipAction(animations[0], group.current).time > 0 &&  grown === true){
            mixer.clipAction(animations[0], group.current).time = mixer.clipAction(animations[0], group.current).time - .8      
          }

          mixer.update(delta);
          
          materials['Salmon Final Texture'].opacity = 1
          materials['Salmon Final Texture'].alphaTest = 0.5  
          break

        case (curTop >=1500 /* &&  curTop <=1200 */ ) : 
    //      mixer.stopAllAction()
          mixer.clipAction(animations[0], group.current).time = 4
          grown = true
          ref.current.visible = false
          break
        }
    })
  
    useEffect(() => {

      mixer.clipAction(animations[0], group.current).clampWhenFinished = true
      mixer.clipAction(animations[0], group.current).repetitions = 0
      mixer.clipAction(animations[0], group.current).timeScale = 10

      actions.current = {
        Anim_0: mixer.clipAction(animations[0], group.current).play(),
      }
  
      // console.log(ref.current, "Growth ref")    
      materials['Salmon Final Texture'].transparent = true
      materials['Salmon Final Texture'].opacity = 0
      materials['Salmon Final Texture'].blendEquationAlpha = true
      
      return () => animations.forEach((clip) => mixer.uncacheClip(clip))
    }, [])
  
    return (
      <group rotation={[0, 180.1, 0]} scale={[.23, .23, -.23]} ref={group} {...props} dispose={null}  position={[-2, 0, 0]}>
         <group ref={ref}  position={[0, 0, 0]}>
          <mesh
            material={materials['Salmon Final Texture']}
            geometry={nodes['smolt-to-adult-15'].geometry}
            name="smolt-to-adult-15"
            morphTargetDictionary={nodes['smolt-to-adult-15'].morphTargetDictionary}
            morphTargetInfluences={nodes['smolt-to-adult-15'].morphTargetInfluences}
            rotation={[Math.PI, 0, Math.PI]}
          />
        </group>
      </group>
    )
  }

// ADULTPANEL

const AdultPanel = (props) => {

const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const { renderer } = useThree();
  const aspect = 1.75
  const alignRight = ( canvasWidth - contentMaxWidth - margin ) / 2
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/009/Adult-Fish-alphatex-51.glb', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())

  const { camera } = useThree()

  useFrame((ani, delta) =>
   {
    mixer.update(delta);
    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 

    /* FOLLOW MOUSE   */
    let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
    group.current.rotation.x =  degrees.y;
    group.current.rotation.y =  degrees.x + 70;

    switch (true){

      case (curTop >= 0 && curTop <=1500 ) :
        ref.current.visible = false
        materials['Salmon Final Texture'].opacity = 0    
        break;

      case (curTop >=1500 && curTop <=1800 ) : 
        ref.current.visible = true
        materials['Salmon Final Texture'].opacity = 1
        break;
 
      case (curTop >=1800 /* &&  curTop <=1200 */ ) :    
          break
      }
  })

  useEffect(() => {
    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current).play(),
    }

    materials['Salmon Final Texture'].alphaTest = .5  
    materials['Salmon Final Texture'].transparent = true
   // materials['Salmon Final Texture'].blendEquationAlpha = true
    
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])

  return (
    <group rotation={[0, 70.2, 0]} scale={[.37, .37, .37]} ref={group} {...props} dispose={null}  position={[-4.6, -3, -10]}>
       <group  ref={ref}  position={[0, 0, 0]}></group>
        <primitive object={nodes.Atlantic_salmonhead} />
        <skinnedMesh
          material={materials['Salmon Final Texture']}
          geometry={nodes.body002.geometry}
          skeleton={nodes.body002.skeleton}
        />
        <skinnedMesh
          material={materials['Salmon Final Texture']}
          geometry={nodes.dents002.geometry}
          skeleton={nodes.dents002.skeleton}
        />
        <skinnedMesh
          material={materials['Salmon Final Texture']}
          geometry={nodes.eye_L002.geometry}
          skeleton={nodes.eye_L002.skeleton}
        />
        <skinnedMesh
          material={materials['Salmon Final Texture']}
          geometry={nodes.eye_R002.geometry}
          skeleton={nodes.eye_R002.skeleton}
        />
    </group> 
  )
}


// PARTICLES
/*
const Particles = (props) => {
  
  useEffect(() => { 
    materials['particles-1'].transparent = true
    materials['particles-2'].transparent = true
    materials['particles-3'].transparent = true
    materials['particles-1'].opacity = .4
    materials['particles-2'].opacity = .4
    materials['particles-3'].opacity = .4
    materials['particles-1'].alphaTest = .4
    materials['particles-2'].alphaTest = .4
    materials['particles-3'].alphaTest = .4
  }, [])

  useFrame((ani, delta) =>{
    let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
    group.current.rotation.x =  degrees.y;
    group.current.rotation.y =  degrees.x;
  })

  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/particles/particles_001.glb')
  return (
    <group scale={[.07, .07, .07]} ref={group} {...props} dispose={null}>
      <mesh
        material={materials['particles-1']}
        geometry={nodes.Particles_1.geometry}
        rotation={[1.97, -0.27, -0.51]}
        scale={[589.23, 405.17, 334.24]}
      />
      <mesh
        material={materials['particles-2']}
        geometry={nodes.Particles_2.geometry}
        rotation={[1.39, -0.14, 0.55]}
        scale={[589.23, 405.17, 334.24]}
      />
      <mesh
        material={materials['particles-3']}
        geometry={nodes.Particles_3.geometry}
        rotation={[1.56, 0, 0]}
        scale={[589.23, 405.17, 334.24]}
      />
    </group>
  )
}
*/

const Stripe = () => {
  const { contentMaxWidth } = useBlock()
  return (
    <Plane scale={[100, contentMaxWidth,1]} rotation={[0,0, Math.PI / 4]} position={[0,0, -1]} color="red" />
  )
}

const Plane = ({ color = "white", ...props }) => {
  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry"/>
      <meshBasicMaterial attach="material" color={color}/>
    </mesh>  
  )
}


export default function App() {

  const ref = useRef()
  const cam = useRef()
  const panel = useRef();

  const mouse = useRef({ x:0, y:0 })

  const scrollArea = useRef()
  let toFreezeOne =  1.5
  let toFreezeTwo = 2
  const onScroll = e => {
    state.top.current = e.target.scrollTop
  }
  useEffect(() => void onScroll(
    {target: scrollArea.current}
    ), [])
 
  
  return (
    <>   
    {/*<Canvas concurrent pixelRatio={1} orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>*/}
     
      <Canvas>
        <Suspense fallback= {null/* <Dom center className="loading" children="Loading..."/> */}> 
          <PerspectiveCamera ref={cam} makeDefault position= {[0, 0, 15]} >   
            {/*  />      
                <hemisphereLight
                position={[205, 0, 50]}         
                intensity={0.25}
              /> */}     
              {/*<ambientLight intensity={0.75}/> */} 
              <hemisphereLight intensity={0.55} />    
              <spotLight
              position={[200, 0, 0]}         
              intensity={.7}
              />
              <spotLight
                position={[-200, 0, 0]}
                intensity={.7}
              />  
            </PerspectiveCamera>             
            <Particles mouse={mouse}/> 
            <Block factor={toFreezeOne} offset={0}>
              <EggPanel mouse={mouse}/>      
            </Block>  
            
            <Block factor={toFreezeTwo} offset={1}>
              <SmoltPanel mouse={mouse} />
            </Block> 
            
            <Block factor={toFreezeTwo} offset={1}>
              <GrowthPanel mouse={mouse}/>
            </Block>

            <Block factor={1.5} offset={2} >
              <AdultPanel mouse={mouse}/>
            </Block> 
        
          </Suspense>
          </Canvas>
      
        <div  onMouseMove={e => {mouse.current = getMousePos(e) /*;console.log('mouse moved')*/ }}  className="scrollArea" ref={scrollArea} onScroll={onScroll}>
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