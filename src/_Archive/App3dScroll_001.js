import React, {useState, Suspense, useRef, useEffect, createContext, useContext, useMemo } from 'react'
import Loading from './Loading'
import PanelHeader from './PanelHeader'
import PanelEgg from './PanelEgg'
import PanelSmolt from './PanelSmolt'
import PanelGrow from './PanelGrow'
import PanelFish from './PanelFish'
import PanelSteak from './PanelSteak'
import * as THREE from 'three'
import { getMousePos, getMouseDegrees } from "./utils/getmouse"
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

const Stripe = () => {
  const { contentMaxWidth } = useBlock()
  return (
    <Plane scale={[100, contentMaxWidth,1]} rotation={[0,0, Math.PI / 4]} position={[0,0, -1]} color="red" />
  )
}



// EGGPANEL

const EggPanel = ({ model, props }) => {
  const { contentMaxWidth, canvasWidth, margin,viewportHeight } = useBlock()
  const aspect = 1.75
  const alignRight = ( canvasWidth - contentMaxWidth - margin ) / 2
  
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/002/Salmon-Egg-Fixed-Spec-Ver-2.gltf', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())

  const ref = useRef()

  useEffect(() => {
    materials['Mat.9'].transparent = true
    materials.Glass.transparent = true
    materials['Mat.8'].transparent = true
    })

  useFrame(() => {
    const curY = ref.current.position.y
    const curTop = state.top.current
    let nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 


//    console.log(nextY, 'nextY')

    const eggDefState = () => {
      materials['Mat.9'].opacity = 1 
      materials.Glass.opacity = 1
      materials['Mat.8'].opacity = 1
    } 

    const eggFadedState = () => {
      materials['Mat.9'].opacity = 0 
      materials.Glass.opacity = 0
      materials['Mat.8'].opacity = 0
    }
    // Hold states on onjects to be called again

    // PHASE TYPES
    // ANI EVENT
    // Elements Locked to Scroll

    // ANI PROCESS EACH STAGE
    // Start-Top -  Expected End Position from previous
    // Mid       -  Animation
    // Start-End  - Expected Positon

 //    console.log(ref.current.position.y, "position egg y")
//     console.log(curTop, "scroll")
  
  switch (true){

       // move out
    case (curTop >=0 && curTop <=100 ) :
      eggDefState() 
     // ref.current.position.y = lerp(curY, (-10 / state.zoom) * 2, 0.1)
      ref.current.position.y = lerp(curY, 10, 1)
      group.current.position.y = lerp(curY, 10, 1)
      break;
      
      // fall in
    case (curTop >=100 && curTop <=200 ) :
       eggDefState() 
      //if (group.current.position.y < 110){
 //       ref.current.position.y = 0
//       group.current.position.y = 0
//        ref.current.position.y = lerp(curY, (10 / state.zoom) * 2, 0.1)
//        group.current.position.y = lerp(curY, (nextY * -4), 0.1)
 //       console.log( group.current.position.y, " group.current.position.y", curY, "curY" )
     // }
      break;
   /*  
      // fall in
    case (curTop >=200 && curTop <=300 ) :
      eggDefState() 
      ref.current.position.y = 5
      group.current.position.y = lerp(curY, (nextY * -11), 0.1)
//      console.log(group.current.position.y )
      break;
*/
      // fallow camera - fade back
    case (curTop >=300 && curTop <=500 ) :
 //     group.current.position.y = lerp((curY), (nextY * -11), 0.1)

  
    
    // fade back
    case (curTop >=500 && curTop <=800 ) :

      ref.current.position.y = 0
      group.current.position.y = 0

      if (materials['Mat.9'].opacity < 1){
        materials['Mat.9'].opacity = materials['Mat.9'].opacity  +.04 /* lerp(curY, (nextY * -1), 0.1) */
        materials.Glass.opacity = materials.Glass.opacity  +.04 /* lerp(curY, (nextY * -1), 0.1) */
        materials['Mat.8'].opacity = materials['Mat.8'].opacity  +.04 /* lerp(curY, (nextY * -1), 0.1) */
      }
      break;

    // fade out
    case (curTop >=800 && curTop <=1200 ) : 
    //  group.current.position.y = -13;
 //     nextY= 10;
      ref.current.position.y = 0
      group.current.position.y = 0

     if (materials['Mat.9'].opacity > 0){
      materials['Mat.9'].opacity = materials['Mat.9'].opacity  -.04 /* lerp(curY, (nextY * -1), 0.1) */
      materials.Glass.opacity = materials.Glass.opacity  -.04 /* lerp(curY, (nextY * -1), 0.1) */
      materials['Mat.8'].opacity = materials['Mat.8'].opacity  -.04 /* lerp(curY, (nextY * -1), 0.1) */
      break;
      }
    }
    })

  return(
    <group >     
      <group rotation={[0, 0, 0]} ref={group} position={[0, 10, 0]} {...props} dispose={null} scale={[.04, .04, .04]}>
        <group ref={ref} position={[-74.14, 11.92, -78.71]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials['Mat.9']}
            geometry={nodes.Sphere.geometry}
            position={[73.67, 78.7, 10.96]}
            rotation={[0.1, 0.62, 2.78]}
            scale={[0.9, 0.9, 0.9]}>
            <group position={[27.86, 105.82, -59.95]} rotation={[-0.14, 0.62, -2.74]} scale={[1.11, 1.11, 1.11]}>
              <mesh
                material={materials.Glass}
                geometry={nodes.Sphere001.geometry}
                position={[80.15, 76.62, 17.82]}
                rotation={[0.11, 0.62, 2.75]}
                scale={[1.02, 1.02, 1.02]}
              />
            </group>
          </mesh>
          <mesh
            material={materials['Mat.8']}
            geometry={nodes.Fish.geometry}
            position={[73.97, 78.72, 11.69]}
            rotation={[0.03, 0.52, 2.87]}
          />
        </group>
      </group>  
    </group> 
  )
}



// FISHPANEL

const FishPanel = ({ model, props }) => {

const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const { renderer } = useThree();
  const aspect = 1.75
  const alignRight = ( canvasWidth - contentMaxWidth - margin ) / 2
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/scrollTest/Adult-Fish-alphatex-51.glb', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())

 
  const { camera } = useThree()
  
  /*
  useFrame(() => {
    console.log(camera.position, 'camera')
  })
  */
  
  
// Materials
//materials.Testt.opacity = 0.5
//materials.Testt.transparent = true;

  useFrame((ani, delta) =>
   {
    mixer.update(delta);
    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 
    //console.log("curY", curY, "curTop", curTop)
 //   console.log(materials['Salmon Final Texture'].alphaTest, "alphaTest")
    switch (true){
      case (curTop >=500 && curTop <=800 ) : 
      ref.current.position.y = 0
      group.current.position.y = 0
        if (materials['Salmon Final Texture'].opacity > 0){
          materials['Salmon Final Texture'].opacity = materials['Salmon Final Texture'].opacity - .1
          if ( materials['Salmon Final Texture'].alphaTest < .5){
            materials['Salmon Final Texture'].alphaTest = materials['Salmon Final Texture'].alphaTest + .1
          }      
        }
        break;
      case (curTop >=800 && curTop <=1200 ) : 
      ref.current.position.y = -1
      group.current.position.y = -1
      if (materials['Salmon Final Texture'].opacity < 1 ){
        materials['Salmon Final Texture'].opacity = materials['Salmon Final Texture'].opacity + .1
        if ( materials['Salmon Final Texture'].alphaTest > 0){
          materials['Salmon Final Texture'].alphaTest = materials['Salmon Final Texture'].alphaTest - .1
          }      
      }         
        break
      }
  })

  useEffect(() => {
    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current).play(),
    }

    console.log(ref)
   
    materials['Salmon Final Texture'].transparent = true
    materials['Salmon Final Texture'].opacity = 0
 //   materials['Salmon Final Texture'].alphaTest = 2
 //   materials['Salmon Final Texture'].blendSrcAlpha = true
    materials['Salmon Final Texture'].blendEquationAlpha = true
   // materials['Salmon Final Texture'].depthWrite = false
   // materials['Salmon Final Texture'].depthTest = false
   // materials['Salmon Final Texture'].premultipliedAlpha = true;
//   console.log(materials['Salmon Final Texture'].alphaTest,"alphaTest")
//   console.log(ref,"ref")
//   console.log(materials['Salmon Final Texture'], "material")
    

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])

  return (
    <group rotation={[0, 70.2, 0]} scale={[.3, .3, .3]} ref={group} {...props} dispose={null}  position={[-5, -20, -10]}>
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

  /*
  return(
    <group >
   
      <group ref={group} {...props} dispose={null} position={[-5, -22, -10]} scale={[.4, .4, .4]} >
      <group  ref={ref} rotation={[0, 70.2, 0]} position={[0, 0, 0]}>
        <group  rotation={[0, 0, 0]}>
          <primitive  object={nodes.Atlantic_salmonhead} />
        </group>
        <group position={[12.15, 30.71, 3.08]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.Testt} geometry={nodes.eye_L.geometry} skeleton={nodes.eye_L.skeleton} />
        </group>
        <group position={[12.15, 30.71, -3.04]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.Testt} geometry={nodes.eye_R.geometry} skeleton={nodes.eye_R.skeleton} />
        </group>
        <group position={[8.51, 36.11, 0.19]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.Testt} geometry={nodes.dents.geometry} skeleton={nodes.dents.skeleton} />
        </group>
        <group position={[17.65, -10.79, 0]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.Testt} geometry={nodes.body.geometry} skeleton={nodes.body.skeleton} />
        </group>
      </group>
    </group>

    </group> 
  )
  */
}

export default function App() {
  const scrollArea = useRef()
  let toFreezeOne =  1.5
  let toFreezeTwo = 2
  const onScroll = e => {
    state.top.current = e.target.scrollTop
    //const curY = ref.current.position.y
    const curTop = state.top.current
    // const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 
    // console.log('panel', panel.position)

 //   console.log(toFreezeOne,'toFreezeOne')
//    console.log(toFreezeOne,'toFreezeTwo')

      if(curTop >=500 && curTop <=1200){
          toFreezeOne = 0
          toFreezeTwo = 0

  //        console.log(toFreezeOne,'toFreezeOne')
  //        console.log(toFreezeOne,'toFreezeTwo')
  //        console.log(panel.current,'panel')
        }
  }
  useEffect(() => void onScroll({target: scrollArea.current}), [])
  const ref = useRef()
  const cam = useRef()
  const mouse = useRef({ x:0, y:0 })

  //console.log(scrollArea, "scrollArea")


  // const { camera } = useThree()

/*
  useEffect(() => {
    //const curY = ref.current.position.y
    const curTop = state.top.current
   // const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 
   // console.log('panel', panel.position)

    if(curTop >=500 && curTop <=1200){
        toFreezeOne = 0
        toFreezeTwo = 0
    }
  },[])
  */
  

 const panel = useRef();
  
  return (
    <>   
    {/*<Canvas concurrent pixelRatio={1} orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>*/}
     
      <Canvas >
        <Suspense fallback={<Dom center className="loading" children="Loading..." />}> 
          <PerspectiveCamera ref={cam} makeDefault position= {[0, 0, 15]} >   
            {/*  />      
                <hemisphereLight
                position={[205, 0, 50]}         
                intensity={0.25}
              /> */}     
              <ambientLight intensity={0.75}/>     
              <spotLight
              position={[200, 0, 0]}         
              intensity={1.25}
              />
              <spotLight
                position={[-200, 0, 0]}
                intensity={1.25}
              />  
            </PerspectiveCamera>             
      
            <Block ref={panel} factor={toFreezeOne} offset={0}>
              <EggPanel model='/models/juan/002/Salmon-Egg-Fixed-Spec-Ver-2.gltf' />      
            </Block>  
            
            <Block factor={toFreezeTwo} offset={1}>
              <FishPanel/>
            </Block> 
            
            <Block factor={-1.0} offset={1}>
              <Stripe />
            </Block>

            <Block factor={1.5} offset={2} >

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

/* DEFAULT Adult-Fish-46.glb

const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const aspect = 1.75
  const alignRight = ( canvasWidth - contentMaxWidth - margin ) / 2
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/004/Adult-Fish-46.glb', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())

  
  
// Materials
//materials.Testt.opacity = 0.5
//materials.Testt.transparent = true;

  useFrame((ani, delta) =>
   {
    mixer.update(delta);
    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 
    //console.log("curY", curY, "curTop", curTop)

    switch (true){
      case (curTop >=500 && curTop <=800 ) : 
        if (materials.Testt.opacity > 0){
          materials.Testt.opacity = materials.Testt.opacity - .03 
        }
        break;
      case (curTop >=800 && curTop <=1200 ) : 
      if (materials.Testt.opacity < 1 ){
        materials.Testt.opacity = materials.Testt.opacity + .03
      }         
        break
      }
  })

  useEffect(() => {
    actions.current = {
      animation_0: mixer.clipAction(animations[0], group.current).play(),
    }

    console.log(ref)

    materials.Testt.transparent = true
    materials.Testt.opacity = 0
    materials.Testt.alphaTest = 0
    

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])

  return(
    <group >
      
      <group ref={group} {...props} dispose={null} position={[-5, -22, -10]} scale={[.4, .4, .4]} >
      <group  ref={ref} rotation={[0, 70.2, 0]} position={[0, 0, 0]}>
        <group  rotation={[0, 0, 0]}>
          <primitive  object={nodes.Atlantic_salmonhead} />
        </group>
        <group position={[12.15, 30.71, 3.08]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.Testt} geometry={nodes.eye_L.geometry} skeleton={nodes.eye_L.skeleton} />
        </group>
        <group position={[12.15, 30.71, -3.04]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.Testt} geometry={nodes.eye_R.geometry} skeleton={nodes.eye_R.skeleton} />
        </group>
        <group position={[8.51, 36.11, 0.19]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.Testt} geometry={nodes.dents.geometry} skeleton={nodes.dents.skeleton} />
        </group>
        <group position={[17.65, -10.79, 0]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.Testt} geometry={nodes.body.geometry} skeleton={nodes.body.skeleton} />
        </group>
      </group>
    </group>

    </group> 
  )
*/

/*
ADULT 46
const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const aspect = 1.75
  const alignRight = ( canvasWidth - contentMaxWidth - margin ) / 2
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/004/Adult-Fish-46.glb', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())

  
  
// Materials
//materials.Testt.opacity = 0.5
//materials.Testt.transparent = true;

  useFrame((ani, delta) =>
   {
    mixer.update(delta);
    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 
    //console.log("curY", curY, "curTop", curTop)

    switch (true){
      case (curTop >=500 && curTop <=800 ) : 
        if (materials.Testt.opacity > 0){
          materials.Testt.opacity = materials.Testt.opacity - .03 
        }
        break;
      case (curTop >=800 && curTop <=1200 ) : 
      if (materials.Testt.opacity < 1 ){
        materials.Testt.opacity = materials.Testt.opacity + .03
      }         
        break
      }
  })

  useEffect(() => {
    actions.current = {
      animation_0: mixer.clipAction(animations[0], group.current).play(),
    }

    console.log(ref)

    materials.Testt.transparent = true
    materials.Testt.opacity = 0
    materials.Testt.alphaTest = 0
    

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])

  return(
    <group >
      
      <group ref={group} {...props} dispose={null} position={[-5, -22, -10]} scale={[.4, .4, .4]} >
      <group  ref={ref} rotation={[0, 70.2, 0]} position={[0, 0, 0]}>
        <group  rotation={[0, 0, 0]}>
          <primitive  object={nodes.Atlantic_salmonhead} />
        </group>
        <group position={[12.15, 30.71, 3.08]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.Testt} geometry={nodes.eye_L.geometry} skeleton={nodes.eye_L.skeleton} />
        </group>
        <group position={[12.15, 30.71, -3.04]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.Testt} geometry={nodes.eye_R.geometry} skeleton={nodes.eye_R.skeleton} />
        </group>
        <group position={[8.51, 36.11, 0.19]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.Testt} geometry={nodes.dents.geometry} skeleton={nodes.dents.skeleton} />
        </group>
        <group position={[17.65, -10.79, 0]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.Testt} geometry={nodes.body.geometry} skeleton={nodes.body.skeleton} />
        </group>
      </group>
    </group>

    </group> 
  )
*/

/* SKETCHFAB FISH
const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const aspect = 1.75
  const alignRight = ( canvasWidth - contentMaxWidth - margin ) / 2
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/004/Sketchfab/scene.gltf', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())

  
  
// Materials
//materials.Testt.opacity = 0.5
//materials.Testt.transparent = true;

  useFrame((ani, delta) =>
   {
    mixer.update(delta);
    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 
    //console.log("curY", curY, "curTop", curTop)

    switch (true){
      case (curTop >=500 && curTop <=800 ) : 
        if (materials.Testt.opacity > 0){
          materials.Testt.opacity = materials.Testt.opacity - .03 
        }
        break;
      case (curTop >=800 && curTop <=1200 ) : 
      if (materials.Testt.opacity < 1 ){
        materials.Testt.opacity = materials.Testt.opacity + .03
      }         
        break
      }
  })

  useEffect(() => {
    actions.current = {
      'GltfAnimation 0': mixer.clipAction(animations[0], group.current).play(),
    }

    console.log(ref)

    materials.Testt.transparent = true
    materials.Testt.opacity = 0
    materials.Testt.alphaTest = 0
    

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])

  return (
    
    <group ref={group} {...props} dispose={null} position={[-5, -22, -10]} scale={[.4, .4, .4]} >
    <group  ref={ref} rotation={[70.2, 90, 270]} position={[0, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[0, 0, 0]}>
            <group rotation={[0, 0, 0]}>
              <primitive object={nodes.GLTF_created_0_rootJoint} />
              <group position={[12.15, 30.71, 3.08]} rotation={[Math.PI, Math.PI / 2, 0]} />
              <group position={[12.15, 30.71, -3.04]} rotation={[Math.PI, Math.PI / 2, 0]} />
              <group position={[8.51, 36.11, 0.19]} rotation={[Math.PI, Math.PI / 2, 0]} />
              <group position={[17.65, -10.79, 0]} rotation={[Math.PI, Math.PI / 2, 0]} />
              <skinnedMesh
                material={materials.Testt}
                geometry={nodes.mesh_0.geometry}
                skeleton={nodes.mesh_0.skeleton}
              />
              <skinnedMesh
                material={materials.Testt}
                geometry={nodes.mesh_1.geometry}
                skeleton={nodes.mesh_1.skeleton}
              />
              <skinnedMesh
                material={materials.Testt}
                geometry={nodes.mesh_2.geometry}
                skeleton={nodes.mesh_2.skeleton}
              />
              <skinnedMesh
                material={materials.Testt}
                geometry={nodes.mesh_3.geometry}
                skeleton={nodes.mesh_3.skeleton}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
*/


// Egg model ani work process
/*
 //Working rotaion on scroll
  // ref.current.rotation.z = lerp(curY, nextY, 0.1)

   //   group.current.position.y = lerp(curY, nextY, 0.1)
/*
  if (curTop >=400 && curTop <=600 ){
    ref.current.position.y = lerp(10, -10, 10)
  }

 if (curTop >=400 && curTop <=600 ){
 ref.current.rotation.z = lerp(0, 960, 20)
 group.current.position.y =  lerp(5, -10,1);
}
 */  

 // Working movement
 /*
  if (curTop >=1 && curTop <=700 ){
    group.current.position.y = lerp((curY * -1), (nextY * -1), 0.1)
  }
*/

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