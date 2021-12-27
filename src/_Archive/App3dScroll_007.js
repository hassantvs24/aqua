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
import PanelHeader from './PanelHeader'

const mouseMove = 0.1

// General position controls
const positionX = 0 
const positionY = 0
const positionZ = 0

const fishRotate = -70.1

// Camera controls
const camEggDefPosX = -1.3
const camEggDefPosY = .6
const camEggDefPosZ = 2

const camSmoltDefPosX = -3.8
const camSmoltDefPosY = .6
const camSmoltDefPosZ = 10

const camAdultDefPosX = -7
const camAdultDefPosY = 0
const camAdultDefPosZ = 15

// Scroll positions
const scrollEgg = 200
const scrollPreHatch = 400
const scrollEggSmolt = 800
const scrollSmolt = 900

const scrollPenIn = 1100
const scrollPenState = 1300 
const scrollPenOut =1400
const smoltPenRate = .05

const scrollGrowAdult = 1500
const scrollAdult = 1800
const scrollAdultNext = 2300

let scrollPosition
const getScrollPos = () => {
  return scrollPosition
}

// Egg to Smolt - Growth ratio
const smoltHatchPreScale = .3
const smoltHatchFullScale = 1
const smoltHatchUp = .1
const smoltHatchDown = .1
let hatched = false

// Egg to Smolt - Position
const smoltHatchStartPosY = 0.2 /* 0.48 */
const smoltHatchEndPosY = -6 /* -10 */
const smoltHatchPosX = 0
const smoltHatchPosZ = 0 
const smoltHatchUpY = 1
const smoltHatchDownY = 1

// Smolt to Pen
 const smoltToPenStartPosY = 9
 const smoltToPenEndPosY = smoltHatchEndPosY
 const smoltToPenRate = .5

const penRate = .1 
let inPen = false
let outPen = false

/*
const smoltGrowStartPosX = 0.48 // 0.48
const smoltGrowEndPosX = -10 // -10 
const smoltMoveUpX = 1
const smoltMoveDownX = 1

const smoltGrowStartPosZ = 0.48 // 0.48
const smoltGrowEndPosZ = -10 // -10
const smoltMoveUpZ = 1
const smoltMoveDownZ = 1
*/

// Smolt to Adult - Growth ratio
const growthBaseSmoltScale = .16
const growthBaseAdultScale = .20
const growthBaseScaleUp = .01
const growthBaseScaleDown = .01
let grown

let speed = .2

// EGG MODEL

const EggModel = (props) => {
  const { contentMaxWidth, canvasWidth, margin,viewportHeight } = useBlock()
  const { camera } = useThree()
  const shape = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/scrollTest/fish-fry-retopo-21.glb', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  const ref = useRef()
  
  
  const setCamEggDefPos = () => {
    camera.position.x = camEggDefPosX
    camera.position.y = camEggDefPosY
    camera.position.z = camEggDefPosZ
  }
  
 
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

    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current).play(),
    }

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
 
  useFrame((ani ,delta) => {

    // console.log('camera',camera.position.x ,'x', camera.position.y, 'y', camera.position.z, 'z' )

    mixer.update(delta)

    // follow mouse
    let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
    ref.current.rotation.x =  degrees.y;
    ref.current.rotation.y =  degrees.x -0.6;

    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI
    scrollPosition = curTop 
  //  console.log(scrollPosition,'scrollPosition')

    switch (true){

      case (curTop >=0 && curTop <= scrollEgg ) :
        ref.current.position.y = lerp(curTop * -2.7, nextY + 10 * -2, 0.1)
        eggDefState()
        setCamEggDefPos()
        break;

      case (curTop >= scrollEgg && curTop <= scrollEggSmolt ) :
        ref.current.position.y = -500
        ref.current.visible = true
        // fade back
        if (materials['Egg Salmon'].opacity < .5){
          materials['Egg Salmon'].opacity = materials['Egg Salmon'].opacity + .04 
          materials.egg_outter1.opacity = materials.egg_outter1.opacity + .04 
          materials.eye_gold.opacity = materials.eye_gold.opacity + .04 
          materials.Fish.opacity = materials.Fish.opacity + .04
          materials['Mat.4'].opacity = materials['Mat.4'].opacity + .04      
        }        
          
        break;
  
      // fade out
      case (curTop >= scrollEggSmolt) : 
        ref.current.position.y = -500
        ref.current.visible = true
        if (materials['Egg Salmon'].opacity > 0){
            materials['Egg Salmon'].opacity = materials['Egg Salmon'].opacity - .04 
            materials.egg_outter1.opacity = materials.egg_outter1.opacity - .04 
            materials.eye_gold.opacity = materials.eye_gold.opacity - .04 
            materials.Fish.opacity = materials.Fish.opacity - .04
            materials['Mat.4'].opacity = materials['Mat.4'].opacity - .04
          }
      case (curTop >= scrollEggSmolt) :
        eggFadedState()
        break;
      }
    })
  
  return(
    <group  position={[positionX, positionY, positionZ]} >     
      <group  ref={group} rotation={[0, 0, 0]}  position={[0.2, 4.1, 0]} {...props} dispose={null} scale={[.007, .007, .007]}>
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

// SMOLT MODEL

const SmoltModel = (props) => {

  const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/012/smolt-fish-physicaleye-12.glb', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  const { camera } = useThree()
  const smoltGrowth = useRef()
  
  /*
  const setCamSmoltDefPos = () => {
    camera.position.x = camSmoltDefPosX
    camera.position.y = camSmoltDefPosY
    camera.position.z = camSmoltDefPosZ
  }
  */

  useEffect(() => {

    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current).play(),
    }

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])

  useFrame((ani, delta) => {

    mixer.update(delta);
    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI

    // follow mouse
    let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
    group.current.rotation.x =  degrees.y;
    group.current.rotation.y =  degrees.x + fishRotate;

    switch (true){

      case ( curTop >= 0 && curTop <= scrollEgg ) :
        ref.current.visible = false
        break
      
      case ( curTop >= scrollEgg && curTop <= scrollPreHatch ) :
        ref.current.visible = false
//        console.log(camera.position.x, 'LERP PRE Smolt camera.position.x', curTop,'curtop', nextY, 'nextY')
//        console.log(camera.position.z, 'LERP PRE Smolt camera.position.z', curTop,'curtop', nextY, 'nextY')

        break

      case ( curTop >= scrollPreHatch && curTop <= scrollEggSmolt ) :
        ref.current.visible = false
        hatched = false 
        smoltGrowth.current.scale.x = smoltHatchPreScale
        smoltGrowth.current.scale.y = smoltHatchPreScale
        smoltGrowth.current.scale.z = smoltHatchPreScale
        ref.current.position.y = smoltHatchStartPosY
        // console.log('smolt start y pos',ref.current.position.y)

        // LERP - EGG TO SMOLT
        camera.position.x = lerp((curTop / 100 * -.75) + 1.9 , nextY * -1, 0.01) 
        camera.position.z = lerp(((curTop / 100 * 2.3) - 7.4) , nextY , 0.01) 
//        console.log(camera.position.x, 'LERP TO Smolt camera.position.x', curTop,'curtop', nextY, 'nextY')
//        console.log(camera.position.z, 'LERP TO Smolt camera.position.z', curTop,'curtop', nextY, 'nextY')

        break;

      case (curTop >= scrollEggSmolt &&  curTop <= scrollSmolt) :

        ref.current.visible = true 
        // Hatch start
        if (ref.current.position.y > smoltHatchEndPosY && hatched === false){
          ref.current.position.y = ref.current.position.y - smoltHatchUpY
        //  console.log('smolt Hatch y pos',ref.current.position.y)
        }
        if (smoltGrowth.current.scale.x < smoltHatchFullScale && hatched === false){
        //  console.log('Hatch start',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )
          smoltGrowth.current.scale.x = smoltGrowth.current.scale.x + smoltHatchUp
          smoltGrowth.current.scale.y = smoltGrowth.current.scale.y + smoltHatchUp
          smoltGrowth.current.scale.z = smoltGrowth.current.scale.z + smoltHatchUp
        //  console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt Scale up to',ref.current.position.y ,'position Y' , smoltGrowFullScale, 'hatched', hatched)
        }

        //Hatch back
        if (ref.current.position.y < smoltHatchStartPosY && hatched === true){
          ref.current.position.y = ref.current.position.y + smoltHatchDownY
        //  console.log('smolt DeHatch y pos',ref.current.position.y)
        }
        if (smoltGrowth.current.scale.x > smoltHatchPreScale && hatched === true){    
       //   console.log('Hatch back',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )   
          smoltGrowth.current.scale.x = smoltGrowth.current.scale.x - smoltHatchDown
          smoltGrowth.current.scale.y = smoltGrowth.current.scale.y - smoltHatchDown
          smoltGrowth.current.scale.z = smoltGrowth.current.scale.z - smoltHatchDown         
        //  console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt Scale down to',ref.current.position.y ,'position Y', smoltHatchPreScale, 'hatched', hatched )
        }

//        console.log(camera.position.x, 'LERP AT Smolt camera.position.x')
//        console.log(camera.position.z, 'LERP AT Smolt camera.position.z')

        break

      case (curTop >= scrollSmolt && curTop <= scrollPenIn) :
      
        hatched = true
        smoltGrowth.current.scale.x = 1.0999999999999999 
        smoltGrowth.current.scale.y = 1.0999999999999999 
        smoltGrowth.current.scale.z = 1.0999999999999999 
        ref.current.position.y = -6.8
        ref.current.position.x = smoltHatchPosX
        ref.current.position.z = smoltHatchPosZ

        //console.log('smolt end y pos',ref.current.position.y)
        break
        
        /*
        const scrollEgg = 200
        const scrollPreHatch = 400
        const scrollEggSmolt = 800
        const scrollSmolt = 900

        const scrollPenIn = 1100
        const scrollPenState = 1300 
        const scrollPenOut =1400
        const smoltPenRate = .05 
        let inPen = false

        const scrollGrowAdult = 1500
        const scrollAdult = 1800
        const scrollAdultNext = 2300
        */

        // Smolt Shrink to Pen
      case ( curTop >= scrollPenIn && curTop <= scrollPenState) : 
        ref.current.visible = true
        

        // Smolt to Pen

        // Move to Pen
          //  const smoltToPenStartPosY = 4
          //  const smoltToPenEndPosY = smoltHatchEndPosY

        if (ref.current.position.y > smoltToPenEndPosY && inPen === false){
          ref.current.position.y = ref.current.position.y - smoltToPenRate
          console.log('smolt TO PEN y pos',ref.current.position.y, 'smoltToPenEndPosY', inPen,'inPen')
        }

       if (smoltGrowth.current.scale.x > 0 && inPen === false){    
         //  console.log('Pen In',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )   
           smoltGrowth.current.scale.x = smoltGrowth.current.scale.x - smoltPenRate
           smoltGrowth.current.scale.y = smoltGrowth.current.scale.y - smoltPenRate
           smoltGrowth.current.scale.z = smoltGrowth.current.scale.z - smoltPenRate         //
 //          console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt PEN IN  to',ref.current.position.y ,'position Y', smoltHatchPreScale, 'inPen', inPen )
         }

        if (ref.current.position.y < smoltToPenStartPosY && inPen === true){
          ref.current.position.y = ref.current.position.y + smoltToPenRate
          console.log('smolt BACK PEN y pos',ref.current.position.y, 'smoltToPenStartPosY', inPen,'inPen')
        }

        if (smoltGrowth.current.scale.x < smoltHatchFullScale && inPen === true){    
          //  console.log('Pen Out',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )   
             smoltGrowth.current.scale.x = smoltGrowth.current.scale.x + smoltPenRate
             smoltGrowth.current.scale.y = smoltGrowth.current.scale.y + smoltPenRate
             smoltGrowth.current.scale.z = smoltGrowth.current.scale.z + smoltPenRate         
//             console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt PEN OUT to',ref.current.position.y ,'position Y', smoltHatchPreScale, 'inPen', inPen )
        }
        break
        // Smolt off
      case ( curTop >= scrollPenState && curTop <= scrollPenOut ) :
          smoltGrowth.current.scale.x = 0
          smoltGrowth.current.scale.y = 0
          smoltGrowth.current.scale.z = 0 
          ref.current.visible = false    
          break
      // SMolt out pen
      case (curTop >= scrollPenOut && curTop <= scrollGrowAdult ) :
        ref.current.visible = true
      //  console.log('triggered')
        
        if (smoltGrowth.current.scale.x > 0 && outPen === true){    
          //  console.log('Pen In',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )   
            smoltGrowth.current.scale.x = smoltGrowth.current.scale.x - smoltPenRate
            smoltGrowth.current.scale.y = smoltGrowth.current.scale.y - smoltPenRate
            smoltGrowth.current.scale.z = smoltGrowth.current.scale.z - smoltPenRate         //
        //    console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt PEN JUMP IN  to',ref.current.position.y ,'position Y', smoltHatchPreScale, 'inPen', inPen )
          }
          

          /*
  const scrollEgg = 200
  const scrollPreHatch = 400
  const scrollEggSmolt = 800
  const scrollSmolt = 900

  const scrollPenIn = 1100
  const scrollPenState = 1300 
  const scrollPenOut =1400
  const smoltPenRate = .05 
  let inPen = false

  const scrollGrowAdult = 1500
  const scrollAdult = 1800
  const scrollAdultNext = 2300
  */
          
         if (smoltGrowth.current.scale.x < smoltHatchFullScale  && outPen === false){    
           //  console.log('Pen Out',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )   

              smoltGrowth.current.scale.x = smoltGrowth.current.scale.x + .1
              smoltGrowth.current.scale.y = smoltGrowth.current.scale.y + .1
              smoltGrowth.current.scale.z = smoltGrowth.current.scale.z + .1      
     //        console.log('curTop',curTop, smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt PEN JUMP OUT to',ref.current.position.y ,'position Y', smoltHatchPreScale, 'inPen', inPen )
         }
         
         break
      case (curTop >= scrollGrowAdult):
        ref.current.visible = false
    }
  })

  /*
  <group position={[positionX,positionY,positionZ]}>
      <group ref={smoltGrowth}  position={[0, smoltHatchStartPosY, 0]} scale={[smoltHatchPreScale, smoltHatchPreScale, smoltHatchPreScale]}>
        <group rotation={[0, 70.2, 0]} scale={[.1, .1, .1]} ref={group} {...props} dispose={null}  position={[-1.3, .2, 0]}>
          <group  ref={ref}  position={[0, 0, 0]}></group>
   */

  return (
    <group position={[positionX,positionY,positionZ]}>
      <group ref={smoltGrowth} position={[0, smoltHatchStartPosY, 0]} scale={[smoltHatchPreScale, smoltHatchPreScale, smoltHatchPreScale]}>
        <group position={[0, 0, 0]} /* position={[-1.3, .2, 0]} */ rotation={[0, -70.2, 0]} scale={[.1, .1, .1]} ref={group} {...props} dispose={null}>
          <group ref={ref}>
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
              material={materials.Fish_EyeOuter}
              geometry={nodes['eye_L.003_0'].geometry}
              skeleton={nodes['eye_L.003_0'].skeleton}
            />
            <skinnedMesh
              material={materials.Fish_Eye_1}
              geometry={nodes['eye_L.003_1'].geometry}
              skeleton={nodes['eye_L.003_1'].skeleton}
            />
            <skinnedMesh
              material={materials.Fish_EyeOuter}
              geometry={nodes['eye_R.003_0'].geometry}
              skeleton={nodes['eye_R.003_0'].skeleton}
            />
            <skinnedMesh
              material={materials.Fish_Eye_1}
              geometry={nodes['eye_R.003_1'].geometry}
              skeleton={nodes['eye_R.003_1'].skeleton}
            />  
          </group>
        </group>
      </group>
    </group>  
  )
}



// PEN MODEL

const PenModel = (props) => {
  
  const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/012/fish-pen-lowpoly-1.gltf')
  const ref = useRef()
  const refWater = useRef()
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  const penSize = useRef()

  useFrame((ani, delta) =>
  {
   mixer.update(delta);
   const curY = ref.current.position.y
   const curTop = state.top.current
   const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 

  // materials['Salmon Final Texture'].transparent = true

   /* FOLLOW MOUSE   */
   let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
   group.current.rotation.x =  degrees.y + .5
   group.current.rotation.y =  degrees.x  
   group.current.rotation.z = .1  

//   console.log(curTop,'curTop', nextY,'nextY')

   switch (true){
    
    // Pen off
    case (curTop >= 0  &&  curTop <= scrollPenIn ) :
      ref.current.visible = false
      refWater.current.visible = false
      inPen = false
      outPen = true
      console.log(penSize.current.scale.x, penSize.current.scale.y, penSize.current.scale.z, 'xyz PEN PRE IN  to',penSize.current.position.y ,'position Y', smoltHatchPreScale, 'inPen', inPen )
      break
    // Pen scale up
    case ( curTop >= scrollPenIn && curTop <= scrollPenState ) :
      ref.current.visible = true
      refWater.current.visible = true
      break
    // Pen present
    case ( curTop >= scrollPenState && curTop <= scrollPenOut ) :
      ref.current.visible = true
      refWater.current.visible = true
      inPen = true
      outPen = false
      break

    // Pen scale down  
    case ( curTop >= scrollPenOut && curTop <= scrollGrowAdult ) :
      ref.current.visible = true
      refWater.current.visible = true
    //  inPen = true
    // Pen off
      break
    case (curTop >= scrollGrowAdult && curTop <= scrollAdult ) :
      ref.current.visible = false
      refWater.current.visible = false
      outPen = true
   //   inPen = false
      break
    case (curTop <= scrollAdult) :
      outPen = true
      break
  }

  /*
  const scrollEgg = 200
  const scrollPreHatch = 400
  const scrollEggSmolt = 800
  const scrollSmolt = 900

  const scrollPenIn = 1100
  const scrollPenState = 1300 
  const scrollPenOut =1400
  const smoltPenRate = .05 
  let inPen = false

  const scrollGrowAdult = 1500
  const scrollAdult = 1800
  const scrollAdultNext = 2300
  */

/*
    if (smoltGrowth.current.scale.x > 0 && inPen === false){    
      //  console.log('Pen In',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )   
        smoltGrowth.current.scale.x = smoltGrowth.current.scale.x - smoltPenRate
        smoltGrowth.current.scale.y = smoltGrowth.current.scale.y - smoltPenRate
        smoltGrowth.current.scale.z = smoltGrowth.current.scale.z - smoltPenRate         //
        console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt PEN IN  to',ref.current.position.y ,'position Y', smoltHatchPreScale, 'inPen', inPen )
      }
     if (smoltGrowth.current.scale.x < smoltHatchFullScale && inPen === true){    
       //  console.log('Pen Out',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )   
          smoltGrowth.current.scale.x = smoltGrowth.current.scale.x + smoltPenRate
          smoltGrowth.current.scale.y = smoltGrowth.current.scale.y + smoltPenRate
          smoltGrowth.current.scale.z = smoltGrowth.current.scale.z + smoltPenRate         
          console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt PEN OUT to',ref.current.position.y ,'position Y', smoltHatchPreScale, 'inPen', inPen )
     }
*/



  })

  useEffect(() => {
    actions.current = {
      animation_0: mixer.clipAction(animations[0], group.current).play(),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
  return (
    <group ref={penSize}>
    <group position={[-.55, 2, 0]}  scale={[.0015, .0015, .0015]}  ref={group} {...props} dispose={null}>
      <group ref={ref} rotation={[0, 0, 0]}>
      <group position={[0, 665.26, 2544.96]} scale={[0.15, 0.15, 0.15]}>
          <mesh material={materials.Blue} geometry={nodes.sub02.geometry} />
          <mesh material={materials.White} geometry={nodes.sub01.geometry} />
          <mesh material={materials.Dark} geometry={nodes.arch48_002.geometry} />
          <mesh material={materials.Dark} geometry={nodes.arch48_003.geometry} />
          <mesh material={materials.Dark} geometry={nodes.arch48_004.geometry} />
          <mesh material={materials.Blue} geometry={nodes.arch48_005.geometry} />
          <mesh material={materials.Blue} geometry={nodes.arch48_006.geometry} />
          <mesh material={materials.Blue} geometry={nodes.arch48_011.geometry} />
          <mesh material={materials.White} geometry={nodes.arch48_007.geometry} />
          <mesh material={materials.Metal} geometry={nodes.arch48_008.geometry} />
          <mesh material={materials.Metal} geometry={nodes.arch48_009.geometry} />
          <mesh material={materials.Metal} geometry={nodes.arch48_010.geometry} />
          <mesh material={materials['Egg Salmon']} geometry={nodes.arch48_012.geometry} />
        </group>
        <group position={[0, 1054.05, 0]}>
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_0.geometry}
            position={[0, 0, -2043.53]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_1.geometry}
            position={[1769.75, 0, -1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_2.geometry}
            position={[1769.75, 0, 1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_3.geometry}
            position={[0, 0, 2043.53]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_4.geometry}
            position={[-1769.75, 0, 1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_5.geometry}
            position={[-1769.75, 0, -1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
        </group>
        <group position={[1591.95, 858.14, -1458.93]} rotation={[-Math.PI / 2, 0, -0.76]} scale={[6.45, 6.45, 6.45]}>
          <mesh material={materials.Dark} geometry={nodes['Numbers-Dark'].geometry} />
          <mesh material={materials.Blue} geometry={nodes['Numbers-Blue'].geometry} />
        </group>
        <group position={[1591.95, 858.14, -1458.93]} rotation={[-Math.PI / 2, 0, -0.76]} scale={[6.45, 6.45, 6.45]}>
          <mesh material={materials.White} geometry={nodes['Pen-White'].geometry} />
          <mesh material={materials.Blue} geometry={nodes['Pen-Blue'].geometry} />
          <mesh material={materials.White} geometry={nodes['Pen-White'].geometry} />
          <mesh material={materials.Metal} geometry={nodes['Pen-Metal'].geometry} />
          <mesh material={materials.Blue} geometry={nodes['Pen-Blue'].geometry} />
          <mesh material={materials.Dark} geometry={nodes['Pen-Dark'].geometry} />
          <mesh material={materials.Metal} geometry={nodes['Pen-Metal'].geometry} />
          <mesh material={materials.Metal} geometry={nodes['Pen-Metal'].geometry} />
          <mesh material={materials.Logo} geometry={nodes['Pen-Logo'].geometry} />
          <mesh material={materials.Logo} geometry={nodes['Pen-Logo'].geometry} />
          <mesh material={materials['Net 2']} geometry={nodes['Pen-Net_2'].geometry} />
          <mesh material={materials.White} geometry={nodes['Pen-White'].geometry} />
          <mesh material={materials.Net} geometry={nodes['Pen-Net'].geometry} />
          <mesh material={materials['Material #2097633216']} geometry={nodes['Pen-Material_#2097633216'].geometry} />
        </group>
      </group>
      <mesh ref={refWater} material={materials.Mat} geometry={nodes.Water.geometry} position={[0, 609.42, 0]} />
    </group>
    </group>
  )
}


// GROWTH MODEL

const GrowthModel = (props) => {

  const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const { camera } = useThree();
  const aspect = 1.75
  const alignRight = ( canvasWidth - contentMaxWidth - margin ) / 2
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/012/smolt-to-adult-physicaleye-54.gltf', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  const growthScale = useRef()

  const setCamAdultDefPos = () => {
    camera.position.x = camAdultDefPosX
    camera.position.y = camAdultDefPosY
    camera.position.z = camAdultDefPosZ
  }

  useEffect(() => {

    ref.current.position.y = -8.1
    ref.current.position.z = 3.4

    materials['Salmon Final Texture'].transparent = true
    materials['Salmon Final Texture'].opacity = 0
    materials['Salmon Final Texture'].blendEquationAlpha = true
    
    mixer.clipAction(animations[0], group.current).clampWhenFinished = true
    mixer.clipAction(animations[0], group.current).repetitions = 0
    mixer.clipAction(animations[0], group.current).timeScale = 10

    actions.current = {
      animation_0: mixer.clipAction(animations[0], group.current).play(),
    }
    
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])

  useFrame((ani, delta) =>
    {
    // follow mouse
    let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
    group.current.rotation.x =  degrees.y;
    group.current.rotation.y =  degrees.x + fishRotate;
    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 

//    console.log(curTop, 'curTop')

/*    
const scrollEgg = 200
const scrollPreHatch = 400
const scrollEggSmolt = 800
const scrollSmolt = 900

const scrollPenIn = 1100
const scrollPenState = 1300 
const scrollPenOut =1400
const smoltPenRate = .05 
let inPen = false

const scrollGrowAdult = 1500
const scrollAdult = 1800
const scrollAdultNext = 2300
*/

    switch (true){
      case (curTop >= 0 && curTop <= scrollPenOut ) :
        ref.current.visible = false
        materials['Salmon Final Texture'].opacity = 0
        materials['Salmon Final Texture'].alphaTest = 0   
        break;

      case (curTop >= scrollPenOut && curTop <= scrollGrowAdult ) :
 //     console.log(camera.position.x, 'LERP PRE Adult camera.position.x', curTop,'curtop', nextY, 'nextY') 
//      console.log(camera.position.z, 'LERP PRE Adult camera.position.z', curTop,'curtop', nextY, 'nextY') 
        ref.current.visible = false
        grown = false
        mixer.stopAllAction()
        mixer.clipAction(animations[0], group.current).enabled = false
        break;

      case (curTop >= scrollGrowAdult  &&  curTop <= scrollAdult ) :
        ref.current.visible = true
        mixer.clipAction(animations[0], group.current).enabled = true
        
        if (growthScale.current.scale.x < growthBaseAdultScale && grown === false){
          growthScale.current.scale.x = growthScale.current.scale.x + growthBaseScaleUp
          growthScale.current.scale.y = growthScale.current.scale.y + growthBaseScaleUp
          growthScale.current.scale.z = growthScale.current.scale.z + growthBaseScaleUp

         // console.log('growth scale up',growthScale.current.scale.x,'x',growthScale.current.scale.y,'y',growthScale.current.scale.z,'z')
         // console.log(growthScale.current.scale.x, growthScale.current.scale.y, growthScale.current.scale.z, 'xyz growth Scale up to', growthBaseAdultScale)
        }
        if (growthScale.current.scale.x > growthBaseSmoltScale && grown === true){       
          growthScale.current.scale.x = growthScale.current.scale.x - growthBaseScaleDown
          growthScale.current.scale.y = growthScale.current.scale.y - growthBaseScaleDown
          growthScale.current.scale.z = growthScale.current.scale.z - growthBaseScaleDown

        //  console.log('growth scale down',growthScale.current.scale.x,'x',growthScale.current.scale.y,'y',growthScale.current.scale.z,'z')
        //  console.log(growthScale.current.scale.x, growthScale.current.scale.y, growthScale.current.scale.z, 'xyz growth Scale down to', growthBaseSmoltScale )
        }

      //  console.log('growth current',growthScale.current.scale.x,'x',growthScale.current.scale.y,'y',growthScale.current.scale.z,'z')
      //  console.log('SmoltScale',growthBaseSmoltScale,'AdultScale', growthBaseAdultScale)
      
        if (mixer.clipAction(animations[0], group.current).time === 0 &&  grown === false){
          mixer.clipAction(animations[0], group.current).play()        
        }
        if ( mixer.clipAction(animations[0], group.current).time > 0 &&  grown === true){
          mixer.clipAction(animations[0], group.current).time = mixer.clipAction(animations[0], group.current).time - .6     
        }

    //    console.log(growthScale.current.position.y, 'Y', growthScale.current.position.x, 'X', growthScale.current.position.y, 'Z')
    //    ref.current.position.y = -8.1
     //   ref.current.position.z = 3.4

       // console.log(growthScale,'growthScale')
        // Scale base
        mixer.update(delta);          
        materials['Salmon Final Texture'].opacity = 1
        materials['Salmon Final Texture'].alphaTest = 0.5
        

        // LERP - GROWTH TO ADULT

        camera.position.x = lerp(((curTop) / 100 * -.5 )  + 3.8, nextY * -1, 0.01) 
        camera.position.z = lerp((((curTop) / 100 * 1.1) - 5.90) , nextY , 0.01) 
//        console.log(camera.position.x, 'LERP TO Adult camera.position.x', curTop,'curtop', nextY, 'nextY')
//        console.log(camera.position.z, 'LERP TO Adult camera.position.z', curTop,'curtop', nextY, 'nextY')

        break

      case (curTop >= scrollAdult) :
//      console.log(camera.position.x, 'LERP AT Adult camera.position.x', curTop,'curtop', nextY, 'nextY') 
//      console.log(camera.position.z, 'LERP AT Adult camera.position.z', curTop,'curtop', nextY, 'nextY')
      //  setCamAdultDefPos()
        mixer.clipAction(animations[0], group.current).time = 4
        grown = true
        ref.current.visible = false
        break
    }
  })

  return (
    <group position={[positionX,positionY,positionZ]} ref={growthScale} scale={[growthBaseSmoltScale, growthBaseSmoltScale, growthBaseSmoltScale]}>
      <group rotation={[0, 180.1, 0]} scale={[1, 1,1]} ref={group} {...props} dispose={null}  position={[5.2, .8, 0]}>
          <group ref={ref}  position={[0, 0, 0]}>
            <mesh
            material={materials['Egg Salmon']}
            geometry={nodes.SubD_Eye_Fix_Eye.geometry}
            name="SubD_Eye_Fix_Eye"
            morphTargetDictionary={nodes.SubD_Eye_Fix_Eye.morphTargetDictionary}
            morphTargetInfluences={nodes.SubD_Eye_Fix_Eye.morphTargetInfluences}
            rotation={[0, 0, 0]}
          />
          <mesh
            material={materials['Salmon Final Texture']}
            geometry={nodes.SubD_Eye_Fix_Body.geometry}
            name="SubD_Eye_Fix_Body"
            morphTargetDictionary={nodes.SubD_Eye_Fix_Body.morphTargetDictionary}
            morphTargetInfluences={nodes.SubD_Eye_Fix_Body.morphTargetInfluences}
            rotation={[0, 0, 0]}
          />
        </group>
      </group>
    </group>  
  )
}

// ADULT MODEL

const AdultModel = (props) => {

  const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const { renderer } = useThree();
  const aspect = 1.75
  const alignRight = ( canvasWidth - contentMaxWidth - margin ) / 2
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/011/adult-fish-eyefix-58.glb', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  const { camera } = useThree()
  const setcamAdultDefPosZ = () => {camera.position.z = camAdultDefPosZ}

  useEffect(() => {
    materials['Salmon Final Texture'].alphaTest = .5  
    materials['Salmon Final Texture'].transparent = true
    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current).play(),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])

  useFrame((ani, delta) =>
   {
    mixer.update(delta);
    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 

    /* FOLLOW MOUSE   */
    let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
    group.current.rotation.x =  degrees.y;
    group.current.rotation.y =  degrees.x + fishRotate;

    switch (true){

      case (curTop >= 0 && curTop <= scrollAdult ) :
        ref.current.visible = false
        materials['Salmon Final Texture'].opacity = 0       
        break;

      case (curTop >= scrollAdult && curTop <= scrollAdultNext ) :
        // setcamAdultDefPosZ() 
        ref.current.visible = true
        materials['Salmon Final Texture'].opacity = 1
        break;
 
      case (curTop >= scrollAdultNext) :    
        break
    }
  })

  return (
    <group position={[positionX,positionY,positionZ]}>
      <group rotation={[0, 70.2, 0]} scale={[.362, .362, .362]} ref={group} {...props} dispose={null}  position={[5.7, -3.2, -10]}>
        <group  ref={ref}  position={[0, 0, 0]}>
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
          material={materials.Fish_EyeOuter}
          geometry={nodes['eye_L.001_0'].geometry}
          skeleton={nodes['eye_L.001_0'].skeleton}
        />
        <skinnedMesh
          material={materials['Salmon Final Texture']}
          geometry={nodes['eye_L.001_1'].geometry}
          skeleton={nodes['eye_L.001_1'].skeleton}
        />
        <skinnedMesh
          material={materials.Fish_EyeOuter}
          geometry={nodes['eye_R.001_0'].geometry}
          skeleton={nodes['eye_R.001_0'].skeleton}
        />
        <skinnedMesh
          material={materials['Salmon Final Texture']}
          geometry={nodes['eye_R.001_1'].geometry}
          skeleton={nodes['eye_R.001_1'].skeleton}
        />
        </group>  
      </group>
    </group> 
  )
}

const Scene = () => {
  return (
   // <Block factor={0} offset={0}>          
      <PerspectiveCamera makeDefault position= {[0, 0, 15]} >   
      {/*  />      
          <hemisphereLight
          position={[205, 0, 50]}         
          intensity={0.25}
        /> */}     
        {/*<ambientLight intensity={0.75}/> */} 
        <hemisphereLight intensity={0.55} />    
        <spotLight
        position={[200, 400, 0]}         
        intensity={.7}
        />
        <spotLight
          position={[-200, 0, 0]}
          intensity={.7}
        />  
      </PerspectiveCamera>
   //  </Block>  
  )
}

const EggContent = (props) => {
 // const [scrollNow, setScrollNow]  useState(scrollPosition)
 //const ref = useRef()
  /*
  useFrame((ani, delta) =>
  {
    switch (true){

      case (scrollPosition) :  
        break;

      case (scrollPosition ) :
        break;
    }
  })
  */
 /*
  useFrame(()=> {
    console.log('EggContent curTop', curTop)
  })
*/
 useEffect(() =>{
//  console.log(props.scrollPos,'props.scrollPos')
//  console.log(state.top.current,'state.top.current')
  //console.log('triggered',props.scrollPos,'getScrollPos',getScrollPos)
  // console.log('EggContent curTop', curTop)
 },[])


  return (
    <group>
      <div /* ref={ref} */ id="egg-content" className="content">
        {scrollPosition < 300 ?  <h2>TRIGGERED!</h2> : <h2>IT ALL STARTS WITH A ROE FROM AMERICA</h2> }
        {/*console.log(scrollPosition, 'scrollPosition')*/}
        <p>In a tub of fresh water that holds eight degrees. Here the roe is fertilized, and lies for hatching for about 60 days. After one and a half month freshly hatched salmon is called yolk sac fry, because it has a sack on its stomach that it is nourished from the first four to six weeks. When it begins to absorb feed, it moves from the hatchery to a larger tub.</p>
      </div>
    </group>
  )
}

export default function App() {
  
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
    {/*  <PanelHeader/> */} 
    <EggContent scrollPos={state.top.current}/>  
    <Canvas>
      <Suspense fallback= {null/* <Dom center className="loading" children="Loading..."/> */}> 
        
            {/* Header */}
          <Block factor={0} offset={0}> 
            <Dom>TITLE</Dom>       
          </Block>  
          
          {/* 3D elements */}          
          <Scene/>
          <EggModel mouse={mouse}/>    
          <SmoltModel mouse={mouse} />
          <Particles mouse={mouse}/> 
          <GrowthModel mouse={mouse}/>
          <AdultModel mouse={mouse}/>
          <PenModel mouse={mouse} />
          
          {/* Following Content*/}
          <Block factor={0} offset={0}>      

          </Block>  
          
          <Block factor={0} offset={1}>      
          </Block> 
          
          <Block factor={0} offset={1}>         
          </Block>

          <Block factor={1.5} offset={2} >          
          </Block> 
      
        </Suspense>
        </Canvas>
    
      <div  onMouseMove={e => {mouse.current = getMousePos(e) /*;console.log('mouse moved')*/ }}  className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        {new Array(state.sections).fill().map((_, index) => (
          <div key={index} id={"0" + index} style={{ height: `${(state.pages / state.sections) * 100}vh` }} />
        ))}
      </div>

      {/* FIXED NAVIGATION UI */}
      <div className="frame">
        <h1 className="frame__title">American Aquafarms</h1>
        <div className="frame__links">
          {/*
          <a className="frame__link" href="http://tympanus.net/Tutorials/PhysicsMenu/">
            Previous demo
          </a>*/}
          <a className="frame__link" href="https://tympanus.net/codrops/?p=45441">
            ABOUT US
          </a>
          <a className="frame__link" href="https://github.com/drcmda/the-substance">
            INVESTOR RELATIONS
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

/* SMOLT LATEST

  const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/011/smolt-fish-eyefix-9.glb', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  const { camera } = useThree()
  const smoltGrowth = useRef()
  
 useEffect(() => {

  actions.current = {
    Anim_0: mixer.clipAction(animations[0], group.current).play(),
  }

  return () => animations.forEach((clip) => mixer.uncacheClip(clip))
}, [])

useFrame((ani, delta) => {

  mixer.update(delta);
  const curY = ref.current.position.y
  const curTop = state.top.current
  const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI

  // follow mouse
  let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
  group.current.rotation.x =  degrees.y;
  group.current.rotation.y =  degrees.x + fishRotate;

  switch (true){

    case ( curTop >= 0 && curTop <= scrollEgg ) :
      ref.current.visible = false
      break
    
    case ( curTop >= scrollEgg && curTop <= scrollPreHatch ) :
      ref.current.visible = false
//        console.log(camera.position.x, 'LERP PRE Smolt camera.position.x', curTop,'curtop', nextY, 'nextY')
//        console.log(camera.position.z, 'LERP PRE Smolt camera.position.z', curTop,'curtop', nextY, 'nextY')

      break

    case ( curTop >= scrollPreHatch && curTop <= scrollEggSmolt ) :
      ref.current.visible = false
      hatched = false 
      smoltGrowth.current.scale.x = smoltHatchPreScale
      smoltGrowth.current.scale.y = smoltHatchPreScale
      smoltGrowth.current.scale.z = smoltHatchPreScale
      ref.current.position.y = smoltHatchStartPosY
      // console.log('smolt start y pos',ref.current.position.y)

      // LERP - EGG TO SMOLT
      camera.position.x = lerp((curTop / 100 * -.75) + 1.9 , nextY * -1, 0.01) 
      camera.position.z = lerp(((curTop / 100 * 2.3) - 7.4) , nextY , 0.01) 
//        console.log(camera.position.x, 'LERP TO Smolt camera.position.x', curTop,'curtop', nextY, 'nextY')
//        console.log(camera.position.z, 'LERP TO Smolt camera.position.z', curTop,'curtop', nextY, 'nextY')

      break;

    case (curTop >= scrollEggSmolt &&  curTop <= scrollSmolt) :

      ref.current.visible = true 
      // Hatch start
      if (ref.current.position.y > smoltHatchEndPosY && hatched === false){
        ref.current.position.y = ref.current.position.y - smoltHatchUpY
      //  console.log('smolt Hatch y pos',ref.current.position.y)
      }
      if (smoltGrowth.current.scale.x < smoltHatchFullScale && hatched === false){
      //  console.log('Hatch start',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )
        smoltGrowth.current.scale.x = smoltGrowth.current.scale.x + smoltHatchUp
        smoltGrowth.current.scale.y = smoltGrowth.current.scale.y + smoltHatchUp
        smoltGrowth.current.scale.z = smoltGrowth.current.scale.z + smoltHatchUp
      //  console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt Scale up to',ref.current.position.y ,'position Y' , smoltGrowFullScale, 'hatched', hatched)
      }

      //Hatch back
      if (ref.current.position.y < smoltHatchStartPosY && hatched === true){
        ref.current.position.y = ref.current.position.y + smoltHatchDownY
      //  console.log('smolt DeHatch y pos',ref.current.position.y)
      }
      if (smoltGrowth.current.scale.x > smoltHatchPreScale && hatched === true){    
     //   console.log('Hatch back',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )   
        smoltGrowth.current.scale.x = smoltGrowth.current.scale.x - smoltHatchDown
        smoltGrowth.current.scale.y = smoltGrowth.current.scale.y - smoltHatchDown
        smoltGrowth.current.scale.z = smoltGrowth.current.scale.z - smoltHatchDown         
      //  console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt Scale down to',ref.current.position.y ,'position Y', smoltHatchPreScale, 'hatched', hatched )
      }

//        console.log(camera.position.x, 'LERP AT Smolt camera.position.x')
//        console.log(camera.position.z, 'LERP AT Smolt camera.position.z')

      break

    case (curTop >= scrollSmolt && curTop <= scrollGrowAdult) :
      // setCamSmoltDefPos()
      ref.current.visible = true
      hatched = true
      smoltGrowth.current.scale.x = 1.0999999999999999 
      smoltGrowth.current.scale.y = 1.0999999999999999 
      smoltGrowth.current.scale.z = 1.0999999999999999 
      ref.current.position.y = -6.8
      ref.current.position.x = smoltHatchPosX
      ref.current.position.z = smoltHatchPosZ

      //console.log('smolt end y pos',ref.current.position.y)
      break
 
    case (curTop >= scrollGrowAdult) : 
      ref.current.visible = false
      break
  }
})


return (
  <group position={[positionX,positionY,positionZ]}>
    <group ref={smoltGrowth} position={[0, smoltHatchStartPosY, 0]} scale={[smoltHatchPreScale, smoltHatchPreScale, smoltHatchPreScale]}>
      <group position={[0, 0, 0]} rotation={[0, -70.2, 0]} scale={[.1, .1, .1]} ref={group} {...props} dispose={null}>
        <group ref={ref}>
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
              material={materials.Fish_Eye_1}
              geometry={nodes['eye_L.003_0'].geometry}
              skeleton={nodes['eye_L.003_0'].skeleton}
            />
            <skinnedMesh
              material={materials.Fish_Eye_1}
              geometry={nodes['eye_L.003_1'].geometry}
              skeleton={nodes['eye_L.003_1'].skeleton}
            />
            <skinnedMesh
              material={materials.Fish_Eye_1}
              geometry={nodes['eye_R.003_0'].geometry}
              skeleton={nodes['eye_R.003_0'].skeleton}
            />
            <skinnedMesh
              material={materials.Fish_Eye_1}
              geometry={nodes['eye_R.003_1'].geometry}
              skeleton={nodes['eye_R.003_1'].skeleton}
            />
          </group>
      </group>
    </group>
  </group>  
)
*/

/* GROWTH LATEST 

  const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const { camera } = useThree();
  const aspect = 1.75
  const alignRight = ( canvasWidth - contentMaxWidth - margin ) / 2
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/scrollTest/smolt-to-adult-20_newMat.glb', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  const growthScale = useRef()

  const setCamAdultDefPos = () => {
    camera.position.x = camAdultDefPosX
    camera.position.y = camAdultDefPosY
    camera.position.z = camAdultDefPosZ
  }

  useEffect(() => {

    ref.current.position.y = -8.1
    ref.current.position.z = 3.4

    materials['Salmon Final Texture'].transparent = true
    materials['Salmon Final Texture'].opacity = 0
    materials['Salmon Final Texture'].blendEquationAlpha = true
    
    mixer.clipAction(animations[0], group.current).clampWhenFinished = true
    mixer.clipAction(animations[0], group.current).repetitions = 0
    mixer.clipAction(animations[0], group.current).timeScale = 10

    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current).play(),
    }
    
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])

  useFrame((ani, delta) =>
    {
    // follow mouse
    let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
    group.current.rotation.x =  degrees.y;
    group.current.rotation.y =  degrees.x + fishRotate;
    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 

    switch (true){
      case (curTop >= 0 && curTop <= scrollEggSmolt ) :
        ref.current.visible = false
        materials['Salmon Final Texture'].opacity = 0
        materials['Salmon Final Texture'].alphaTest = 0   
        break;

      case (curTop >= scrollEggSmolt && curTop <= scrollGrowAdult ) :
 //     console.log(camera.position.x, 'LERP PRE Adult camera.position.x', curTop,'curtop', nextY, 'nextY') 
//      console.log(camera.position.z, 'LERP PRE Adult camera.position.z', curTop,'curtop', nextY, 'nextY') 
        ref.current.visible = false
        grown = false
        mixer.stopAllAction()
        mixer.clipAction(animations[0], group.current).enabled = false
        break;

      case (curTop >= scrollGrowAdult  &&  curTop <= scrollAdult ) :
        ref.current.visible = true
        mixer.clipAction(animations[0], group.current).enabled = true
        
        if (growthScale.current.scale.x < growthBaseAdultScale && grown === false){
          growthScale.current.scale.x = growthScale.current.scale.x + growthBaseScaleUp
          growthScale.current.scale.y = growthScale.current.scale.y + growthBaseScaleUp
          growthScale.current.scale.z = growthScale.current.scale.z + growthBaseScaleUp

         // console.log('growth scale up',growthScale.current.scale.x,'x',growthScale.current.scale.y,'y',growthScale.current.scale.z,'z')
         // console.log(growthScale.current.scale.x, growthScale.current.scale.y, growthScale.current.scale.z, 'xyz growth Scale up to', growthBaseAdultScale)
        }
        if (growthScale.current.scale.x > growthBaseSmoltScale && grown === true){       
          growthScale.current.scale.x = growthScale.current.scale.x - growthBaseScaleDown
          growthScale.current.scale.y = growthScale.current.scale.y - growthBaseScaleDown
          growthScale.current.scale.z = growthScale.current.scale.z - growthBaseScaleDown

        //  console.log('growth scale down',growthScale.current.scale.x,'x',growthScale.current.scale.y,'y',growthScale.current.scale.z,'z')
        //  console.log(growthScale.current.scale.x, growthScale.current.scale.y, growthScale.current.scale.z, 'xyz growth Scale down to', growthBaseSmoltScale )
        }

      //  console.log('growth current',growthScale.current.scale.x,'x',growthScale.current.scale.y,'y',growthScale.current.scale.z,'z')
      //  console.log('SmoltScale',growthBaseSmoltScale,'AdultScale', growthBaseAdultScale)
      
        if (mixer.clipAction(animations[0], group.current).time === 0 &&  grown === false){
          mixer.clipAction(animations[0], group.current).play()        
        }
        if ( mixer.clipAction(animations[0], group.current).time > 0 &&  grown === true){
          mixer.clipAction(animations[0], group.current).time = mixer.clipAction(animations[0], group.current).time - .6     
        }

    //    console.log(growthScale.current.position.y, 'Y', growthScale.current.position.x, 'X', growthScale.current.position.y, 'Z')
    //    ref.current.position.y = -8.1
     //   ref.current.position.z = 3.4

       // console.log(growthScale,'growthScale')
        // Scale base
        mixer.update(delta);          
        materials['Salmon Final Texture'].opacity = 1
        materials['Salmon Final Texture'].alphaTest = 0.5
        

        // LERP - GROWTH TO ADULT

        camera.position.x = lerp((curTop / 100 * -.5 )  + 3.8, nextY * -1, 0.01) 
        camera.position.z = lerp(((curTop / 100 * 1.1) - 5.90) , nextY , 0.01) 
//        console.log(camera.position.x, 'LERP TO Adult camera.position.x', curTop,'curtop', nextY, 'nextY')
//        console.log(camera.position.z, 'LERP TO Adult camera.position.z', curTop,'curtop', nextY, 'nextY')

        break

      case (curTop >= scrollAdult) :
//      console.log(camera.position.x, 'LERP AT Adult camera.position.x', curTop,'curtop', nextY, 'nextY') 
//      console.log(camera.position.z, 'LERP AT Adult camera.position.z', curTop,'curtop', nextY, 'nextY')
      //  setCamAdultDefPos()
        mixer.clipAction(animations[0], group.current).time = 4
        grown = true
        ref.current.visible = false
        break
    }
  })

  return (
    <group position={[positionX,positionY,positionZ]} ref={growthScale} scale={[growthBaseSmoltScale, growthBaseSmoltScale, growthBaseSmoltScale]}>
      <group rotation={[0, 180.1, 0]} scale={[1, 1,-1]} ref={group} {...props} dispose={null}  position={[1.2, .8, 0]}>
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
    </group>  
  )

*/


/*  ADULT LATEST

  const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const { renderer } = useThree();
  const aspect = 1.75
  const alignRight = ( canvasWidth - contentMaxWidth - margin ) / 2
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/010/Adult-Fish-alphatex-57.glb', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  const { camera } = useThree()
  const setcamAdultDefPosZ = () => {camera.position.z = camAdultDefPosZ}

  useEffect(() => {
    materials['Salmon Final Texture'].alphaTest = .5  
    materials['Salmon Final Texture'].transparent = true
    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current).play(),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])

  useFrame((ani, delta) =>
   {
    mixer.update(delta);
    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 

    let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
    group.current.rotation.x =  degrees.y;
    group.current.rotation.y =  degrees.x + 70;

    switch (true){

      case (curTop >= 0 && curTop <= scrollAdult ) :
        ref.current.visible = false
        materials['Salmon Final Texture'].opacity = 0       
        break;

      case (curTop >= scrollAdult && curTop <= scrollAdultNext ) :
        // setcamAdultDefPosZ() 
        ref.current.visible = true
        materials['Salmon Final Texture'].opacity = 1
        break;
 
      case (curTop >= scrollAdultNext) :    
        break
    }
  })

  return (
    <group position={[positionX,positionY,positionZ]}>
      <group rotation={[0, 70.2, 0]} scale={[.37, .37, .37]} ref={group} {...props} dispose={null}  position={[-1.6, -2.8, -10]}>
        <group  ref={ref}  position={[0, 0, 0]}>
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
      </group>
    </group> 
  )
*/


// PEN - HIGH POLY
/*
  const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/012/Fish-pen-hipoly-1.gltf')
  const ref = useRef()

  useFrame((ani, delta) =>
  {
   mixer.update(delta);
   const curY = ref.current.position.y
   const curTop = state.top.current
   const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 

   // FOLLOW MOUSE
   let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
   group.current.rotation.x =  degrees.y + .5
   group.current.rotation.y =  degrees.x  
   group.current.rotation.z = .1
  
  })

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) => mixer.update(delta))
  useEffect(() => {
    actions.current = {
      animation_0: mixer.clipAction(animations[0], group.current),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
  return (
    <group position={[-.55, 2, 0]}  scale={[.002, .002, .002]}  ref={group} {...props} dispose={null}>
      <group ref={ref} rotation={[0, 0, 0]}>
        <group position={[0, 665.26, 2544.96]} scale={[0.15, 0.15, 0.15]}>
          <mesh material={materials.Blue} geometry={nodes.sub02.geometry} />
          <mesh material={materials.White} geometry={nodes.sub01.geometry} />
          <mesh material={materials.Dark} geometry={nodes.arch48_002.geometry} />
          <mesh material={materials.Dark} geometry={nodes.arch48_003.geometry} />
          <mesh material={materials.Dark} geometry={nodes.arch48_004.geometry} />
          <mesh material={materials.Blue} geometry={nodes.arch48_005.geometry} />
          <mesh material={materials.Blue} geometry={nodes.arch48_006.geometry} />
          <mesh material={materials.Blue} geometry={nodes.arch48_011.geometry} />
          <mesh material={materials.White} geometry={nodes.arch48_007.geometry} />
          <mesh material={materials.Metal} geometry={nodes.arch48_008.geometry} />
          <mesh material={materials.Metal} geometry={nodes.arch48_009.geometry} />
          <mesh material={materials.Metal} geometry={nodes.arch48_010.geometry} />
          <mesh material={materials['Egg Salmon']} geometry={nodes.arch48_012.geometry} />
        </group>
        <group position={[0, 1054.05, 0]}>
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_0.geometry}
            position={[0, 0, -2043.53]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_1.geometry}
            position={[1769.75, 0, -1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_2.geometry}
            position={[1769.75, 0, 1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_3.geometry}
            position={[0, 0, 2043.53]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_4.geometry}
            position={[-1769.75, 0, 1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_5.geometry}
            position={[-1769.75, 0, -1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
        </group>
        <group position={[1591.95, 858.14, -1458.93]} rotation={[-Math.PI / 2, 0, -0.76]} scale={[6.45, 6.45, 6.45]}>
          <mesh material={materials.Dark} geometry={nodes['Numbers-Dark'].geometry} />
          <mesh material={materials.Blue} geometry={nodes['Numbers-Blue'].geometry} />
        </group>
        <group position={[1591.95, 858.14, -1458.93]} rotation={[-Math.PI / 2, 0, -0.76]} scale={[6.45, 6.45, 6.45]}>
          <mesh material={materials.White} geometry={nodes['Pen-White'].geometry} />
          <mesh material={materials.Blue} geometry={nodes['Pen-Blue'].geometry} />
          <mesh material={materials.White} geometry={nodes['Pen-White'].geometry} />
          <mesh material={materials.Metal} geometry={nodes['Pen-Metal'].geometry} />
          <mesh material={materials.Blue} geometry={nodes['Pen-Blue'].geometry} />
          <mesh material={materials.Dark} geometry={nodes['Pen-Dark'].geometry} />
          <mesh material={materials.Metal} geometry={nodes['Pen-Metal'].geometry} />
          <mesh material={materials.Metal} geometry={nodes['Pen-Metal'].geometry} />
          <mesh material={materials.Logo} geometry={nodes['Pen-Logo'].geometry} />
          <mesh material={materials.Logo} geometry={nodes['Pen-Logo'].geometry} />
          <mesh material={materials['Net 2']} geometry={nodes['Pen-Net_2'].geometry} />
          <mesh material={materials.White} geometry={nodes['Pen-White'].geometry} />
          <mesh material={materials['Material #2097633223']} geometry={nodes['Pen-Material_#2097633223'].geometry} />
          <mesh material={materials.Net} geometry={nodes['Pen-Net'].geometry} />
          <mesh material={materials['Material #2097633216']} geometry={nodes['Pen-Material_#2097633216'].geometry} />
        </group>
      </group>
      <mesh material={materials.Mat} geometry={nodes.Water.geometry} position={[0, 609.42, 0]} />
    </group>
  )
*/