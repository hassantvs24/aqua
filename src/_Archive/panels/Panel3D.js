import React, {
  useState,
  Suspense,
  useRef,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, Dom, useFrame, useLoader, useThree } from 'react-three-fiber'
import lerp from 'lerp'
import state from './utils/store'
import { Block, useBlock } from './utils/blocks'
// import { Text } from 'drei'
import { PerspectiveCamera, draco } from 'drei'
import { getMousePos, getMouseDegrees } from './utils/getmouse'
import ParticlesScene from './ParticlesScene'
import ScrollArea3D from './ScrollArea3D'
import scroll3DAction from './redux/scroll3DAction'
import store from './redux/store'
import scroll3Dpos from './utils/scroll3Dpos'
import { EquirectangularRefractionMapping } from 'three'
//import PanelHeader from './PanelHeader'
import loadingBgVid from './videos/water-beams_1.mp4'
import Particles from "react-particles-js";

// Dispatch the scroll 3D position to the redux store
const scroll3DDispatched = (scroll3D) => {
  store.dispatch(scroll3DAction(scroll3D))
}

const mouseMove = 0.1
let scroll3D

// Consistant viewport height for when the 3D panel is accessed again
const viewportH = 3.1391892502184757

// General position, rotations and scale controls
let scaleGen = 1 
let fishRotate = -70.1

let positionX = 0
let positionY = 0
let positionZ = 0

// Egg default position
let posEggX = 0
let posEggY = 0
let posEggZ = 0

// Smolt default position
let posSmoltX = 0
let posSmoltY = 0
let posSmoltZ = 0

// Pen default position
let posPenX = 0
let posPenY = 0
let posPenZ = 0

// Pen default rotation
let rotPenX = 0
let rotPenY = 0
let rotPenZ = 0

// Growth detault posotion
let posGrowthX = 0
let posGrowthY = 0
let posGrowthZ = 0

// Adult default position
let posAdultX = 0
let posAdultY = 0
let posAdultZ = 0


// Media queries
const mobile = 960

// Camera controls
let camStartPosX = -1.6
let camStartPosY = 0.6
let camStartPosZ = 2.9

let camEndPosX = -5.367531225536116
let camEndPosY = 0.6
let camEndPosZ = 12.693531225536116

/*
const camAdultDefPosX = -5.36
const camAdultDefPosY = 0.6
const camAdultDefPosZ = 12.68
*/

// Imported scroll positions 
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
  scrollSteak,
  scrollLast
} = scroll3Dpos

let scrollPosition
const getScrollPos = () => {
  return scrollPosition
}

// Egg to Smolt - Growth ratio
const smoltHatchPreScale = 0.3
const smoltHatchFullScale = 1

const smoltHatchUpScaleRate = 0.1
const smoltHatchDownScaleRate = 0.1
let hatched = false

// Egg to Smolt - Position
const smoltHatchStartPosY = 0.35 /* 0.48 */
const smoltHatchEndPosY = -6 /* -10 */

const smoltHatchUpPosYRate = 1
const smoltHatchDownPosYRate = 1

const smoltHatchStartPosX = -35
const smoltHatchEndPosX = 0

const smoltHatchUpPosXRate = 4
const smoltHatchDownPosXRate = 4

// Smolt to Pen - Position
const smoltToPenStartPosY = 9
const smoltToPenEndPosY = smoltHatchEndPosY
const smoltToPenRate = 0.5

const penRate = 0.1
let inPen = false
let outPen = false

// Pen Scale
const penScaleStart = 0
const penScaleEnd = .1
const penScaleUpRate = .01
const penScaleDownRate = .01

// Smolt to Adult - Growth ratio
const growthBaseSmoltScale = 0.14
const growthBaseAdultScale = 0.2
const growthBaseScaleUp = 0.0003
const growthBaseScaleDown = 0.01
let grown
let growthScaleFull = false
let growthAniFull = false

let speed = 0.2


// EGG MODEL

const EggModel = (props) => {
  const { contentMaxWidth, canvasWidth, margin, viewportHeight, viewportWidth } = useBlock()
  const { camera } = useThree()
  const shape = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(
    GLTFLoader,
    '/models/juan/014/fish-fry-retopo-53.glb',
    draco()
  )
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  const ref = useRef()

  const setCamStartPos = () => {
    camera.position.x = camStartPosX
    camera.position.y = camStartPosY
    camera.position.z = camStartPosZ
  }

  const eggCamDefState = () => {
    ref.current.position.y = -500
    ref.current.visible = true
    setCamStartPos()
  }


  useEffect(() => {
    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current).play(),
    }

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])

  useFrame((ani, delta) => {



    // MEDIA QUEIRES
    // console.log('viewportWidth',viewportWidth)
    // console.log ('window.innerWidth', window.innerWidth)
    
    // Model scales
    if (window.innerWidth < mobile){
      scaleGen = .7
    } else{
      scaleGen = 1
    }

    // Default positions
    // Mobile
    if (window.innerWidth < mobile){
      camStartPosX = -0.6
      camEndPosX = -0.6
      fishRotate = -.40

        // Egg Pos
        posEggX = 0
        posEggY = 0
        posEggZ = 0
  
        // Smolt Pos
        posSmoltX = -5
        posSmoltY = 0
        posSmoltZ = 0
  
        // Pen Pos
        posPenX = -.5
        posPenY = 0
        posPenZ = 0
  
        // Pen Rot
        rotPenX = 0
        rotPenY = 0
        rotPenZ = -0.11
  
        // Growth Pos
        posGrowthX = 0
        posGrowthY = 0
        posGrowthZ = 0
  
        // Adult Pos
        posAdultX = -2.7
        posAdultY = 0
        posAdultZ = 0

    }
      // Desktop
      else {
      camStartPosX = -1.6
      camEndPosX = -5.367531225536116
      fishRotate = -70.1
      
      // Egg Pos
      posEggX = 0
      posEggY = 0
      posEggZ = 0

      // Smolt Pos
      posSmoltX = 0
      posSmoltY = 0
      posSmoltZ = 0

      // Pen Pos
      posPenX = 0
      posPenY = 0
      posPenZ = 0

      // Pen Rot
      rotPenX = 0
      rotPenY = 0
      rotPenZ = 0

      // Growth Pos
      posGrowthX = 0
      posGrowthY = 0
      posGrowthZ = 0

      // Adult Pos
      posAdultX = 0
      posAdultY = 0
      posAdultZ = 0
    }

    /*
    const camStartPosX = -1.6
    const camStartPosY = 0.6
    const camStartPosZ = 2.9

    let positionX = 0
    let positionY = 0
    let positionZ = 0
    */

    // Cam move X
    



    /*console.log(
      'camera',
      camera.position.x,
      'x',
      camera.position.y,
      'y',
      camera.position.z,
      'z'
    )*/

    //   console.log('Egg Pos X', ref.current.position.x, 'Egg Pos Y', ref.current.position.y, 'Egg Poz Z', ref.current.position.z)
    //   console.log('camera.position.x', camera.position.x, 'camera.position.y', camera.position.y, 'camera.position.z ')

    //  console.log(scroll3D, 'scroll3D')

    mixer.update(delta)

    // follow mouse
    let degrees = getMouseDegrees(
      props.mouse.current.x,
      props.mouse.current.y,
      mouseMove
    )
    ref.current.rotation.x = degrees.y
    ref.current.rotation.y = degrees.x - 0.6

    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages - 1) * viewportH)) * Math.PI
    scrollPosition = curTop
    // console.log(curTop, 'curTop')

    // console.log('curTop', curTop)

    switch (true) {
      case curTop >= scroll3dStart && curTop <= scrollEgg:
        //  console.log('egg.y', ref.current.position.y, 'curTop', curTop, 'nextY', nextY)
        // ref.current.position.y = lerp(curTop * -3.6, nextY * -50, 0.1)
        ref.current.position.y = lerp(curTop * -1.2, nextY + 10 * -10, 0.001)
        setCamStartPos()
        break

      case curTop >= scrollEgg && curTop <= scrollEggSmolt:
        eggCamDefState()
        break

      // fade out
      case curTop >= scrollEggSmolt:
        ref.current.position.y = -500
        ref.current.visible = true
        ref.current.visible = false
        break

      default:
    }
  })

  return (
    <group scale={[scaleGen, scaleGen, scaleGen]}> position={[posEggX, posEggY, posEggZ]}>
      <group
        ref={group}
        {...props}
        dispose={null}
        position={[-0.6, 4.1, 0]}
        scale={[0.007, 0.007, 0.007]} >
        <group ref={ref} rotation={[-Math.PI, 0, 0]}>
          <primitive object={nodes.Joint2} />
          <mesh
            material={materials['Egg Salmon.003']}
            geometry={nodes.Sphere002.geometry}
            position={[0, 3.21, 5.5]}
            rotation={[-0.02, 1.13, 2.31]}
            scale={[1.04, 1.04, 1.04]}
          />
          <mesh
            material={materials['Egg Salmon']}
            geometry={nodes.Sphere1.geometry}
            position={[0, 3.21, 5.5]}
            rotation={[-0.02, 1.13, 2.31]}
            scale={[1.03, 1.03, 1.03]}
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
  const { nodes, materials, animations } = useLoader(
    GLTFLoader,
    '/models/juan/Fix/smolt-fish-physicaleye-12.glb',
    draco()
  )
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

  const setCamEndPos = () => {
    camera.position.x = camEndPosX
    camera.position.y = camEndPosY
    camera.position.z = camEndPosZ
  }

  const smoltStartState = () => {
    ref.current.position.y = smoltHatchStartPosY
    ref.current.position.x = smoltHatchEndPosY
    smoltGrowth.current.scale.x = smoltHatchPreScale
    smoltGrowth.current.scale.y = smoltHatchPreScale
    smoltGrowth.current.scale.z = smoltHatchPreScale
  }

  const smoltCamDefState = () => {
    hatched = true
    smoltGrowth.current.scale.x = 1.0999999999999999
    smoltGrowth.current.scale.y = 1.0999999999999999
    smoltGrowth.current.scale.z = 1.0999999999999999
    ref.current.position.y = smoltHatchEndPosY - 0.65
    ref.current.position.x = smoltHatchEndPosX + 1.5
    setCamEndPos()
    ref.current.visible = true
    //   console.log('smolt psotitioned')
  }

  useFrame((ani, delta) => {
    mixer.update(delta)
    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages - 1) * viewportH)) * Math.PI

    // console.log('Smolt position x', ref.current.position.x)
    // console.log('Smolt position y', ref.current.position.y)

    // console.log('Egg Pos X', ref.current.position.x, 'Egg Pos Y', ref.current.position.y, 'Egg Poz Z', ref.current.position.z)
    // console.log('camera.position.x', camera.position.x, 'camera.position.y', camera.position.y, 'camera.position.z', camera.position.z)

    // follow mouse
    let degrees = getMouseDegrees(
      props.mouse.current.x,
      props.mouse.current.y,
      mouseMove
    )
    group.current.rotation.x = degrees.y
    group.current.rotation.y = degrees.x + fishRotate

    //console.log('scroll3D', scroll3D)

    switch (true) {
      case curTop >= 0 && curTop <= scrollEgg:
        ref.current.visible = false
        smoltStartState()
        /*  console.log('camera.position.z', camera.position.z,
            'curTop',
            curTop,
            'nextY',
            nextY,
            'state.pages - 1',
            state.pages - 1,
            'viewportHeight',
            viewportHeight,
            'FINISHED CAM MOVE CLOSE'
          )*/
        /*    console.log('camera.position.x', camera.position.x,
               'curTop',
               curTop,
               'nextY',
               nextY,
               'state.pages - 1',
               state.pages - 1,
               'viewportHeight',
               viewportHeight,
               'FINISHED CAM MOVE CLOSE'
             ) */
        break

      case curTop >= scrollEgg && curTop <= scrollPreHatch:
        ref.current.visible = false
        smoltStartState()
        //  console.log(camera.position.x, 'LERP PRE Smolt camera.position.x', curTop,'curtop', nextY, 'nextY')
        //  console.log(camera.position.z, 'LERP PRE Smolt camera.position.z', curTop,'curtop', nextY, 'nextY')

        break

      case curTop >= scrollPreHatch && curTop <= scrollEggSmolt:
        ref.current.visible = false
        hatched = false
        smoltStartState()
        // console.log('smolt start y pos',ref.current.position.y)

        // LERP - EGG TO SMOLT
        // camera.position.x = lerp((curTop / 100) * -0.75 + 2.2, nextY * -1, 0.01)
        // camera.position.z = lerp((curTop / 100) * 2.3 - 7.2, nextY, 0.01)
        if (window.innerWidth > mobile){ camera.position.x = lerp((curTop / 100) * -0.75 + 4.15, nextY * -1, 0.01)}
        camera.position.z = lerp((curTop / 100) * 2.3 - 12.2, nextY, 0.01)
        // console.log(camera.position.x, 'LERP TO Smolt camera.position.x', curTop, 'curtop', nextY, 'nextY')
        // console.log('camera.position.z', camera.position.z, 'curTop', curTop, 'nextY', nextY)

        break

      case curTop >= scrollEggSmolt && curTop <= scrollSmolt:
        /*   console.log(
          'curTop',
          curTop,
          'nextY',
          nextY,
          'state.pages - 1',
          state.pages - 1,
          'viewportHeight',
          viewportHeight,
          'FINISHED CAM MOVE BACK'
        ) */
        ref.current.visible = true
        // Hatch start
        // Pos Y
        if (ref.current.position.y > smoltHatchEndPosY && hatched === false) {
          ref.current.position.y = ref.current.position.y - smoltHatchUpPosYRate
          //  console.log('smolt Hatch y pos',ref.current.position.y)
        }
        // Pos X
        if (ref.current.position.x < smoltHatchEndPosX && hatched === false) {
          ref.current.position.x = ref.current.position.x + smoltHatchUpPosXRate
          //  console.log('smolt Hatch y pos',ref.current.position.y)
        }

        if (
          smoltGrowth.current.scale.x < smoltHatchFullScale &&
          hatched === false
        ) {
          //  console.log('Hatch start',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )
          smoltGrowth.current.scale.x =
            smoltGrowth.current.scale.x + smoltHatchUpScaleRate
          smoltGrowth.current.scale.y =
            smoltGrowth.current.scale.y + smoltHatchUpScaleRate
          smoltGrowth.current.scale.z =
            smoltGrowth.current.scale.z + smoltHatchUpScaleRate
          //  console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt Scale up to',ref.current.position.y ,'position Y' , smoltGrowFullScale, 'hatched', hatched)
        }

        // Hatch back
        // Pos Y
        if (ref.current.position.y < smoltHatchStartPosY && hatched === true) {
          ref.current.position.y = ref.current.position.y + smoltHatchDownPosYRate
          //  console.log('smolt DeHatch y pos',ref.current.position.y)
        }
        //Pox X
        if (ref.current.position.x > smoltHatchStartPosX && hatched === true) {
          ref.current.position.x = ref.current.position.x - smoltHatchDownPosXRate
          //  console.log('smolt DeHatch y pos',ref.current.position.y)
        }

        if (
          smoltGrowth.current.scale.x > smoltHatchPreScale &&
          hatched === true
        ) {
          // console.log('Hatch back',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )
          smoltGrowth.current.scale.x =
            smoltGrowth.current.scale.x - smoltHatchDownScaleRate
          smoltGrowth.current.scale.y =
            smoltGrowth.current.scale.y - smoltHatchDownScaleRate
          smoltGrowth.current.scale.z =
            smoltGrowth.current.scale.z - smoltHatchDownScaleRate
          //  console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt Scale down to',ref.current.position.y ,'position Y', smoltHatchPreScale, 'hatched', hatched )
        }

        //  console.log(camera.position.x, 'LERP AT Smolt camera.position.x')
        //  console.log(camera.position.z, 'LERP AT Smolt camera.position.z')

        break

      // SMOLT DEFAULT

      case curTop >= scrollSmolt && curTop <= scrollPenIn:

        smoltCamDefState()

        break

      // Smolt Shrink to Pen
      case curTop >= scrollPenIn && curTop <= scrollPenState:
        ref.current.visible = false

        // Smolt to Pen
        // Move to Pen
        //  const smoltToPenStartPosY = 4
        //  const smoltToPenEndPosY = smoltHatchEndPosY

        if (ref.current.position.y > smoltToPenEndPosY && inPen === false) {
          ref.current.visible = true
          ref.current.position.y = ref.current.position.y - smoltToPenRate
          /*       console.log(
            "smolt TO PEN y pos",
            ref.current.position.y,
            "smoltToPenEndPosY",
            inPen,
            "inPen"
          ); */
        }

        if (smoltGrowth.current.scale.x > 0 && inPen === false) {
          ref.current.visible = true
          //  console.log('Pen In',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )
          smoltGrowth.current.scale.x =
            smoltGrowth.current.scale.x - smoltPenRate
          smoltGrowth.current.scale.y =
            smoltGrowth.current.scale.y - smoltPenRate
          smoltGrowth.current.scale.z =
            smoltGrowth.current.scale.z - smoltPenRate //
          // console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt PEN IN  to',ref.current.position.y ,'position Y', smoltHatchPreScale, 'inPen', inPen )
        }

        if (ref.current.position.y < smoltToPenStartPosY && inPen === true) {
          //  ref.current.position.y = ref.current.position.y + smoltToPenRate
          /*     console.log(
            "smolt BACK PEN y pos",
            ref.current.position.y,
            "smoltToPenStartPosY",
            inPen,
            "inPen"
          ); */
        }

        if (
          smoltGrowth.current.scale.x < smoltHatchFullScale &&
          inPen === true
        ) {
          //  console.log('Pen Out',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )
          smoltGrowth.current.scale.x =
            smoltGrowth.current.scale.x + smoltPenRate
          smoltGrowth.current.scale.y =
            smoltGrowth.current.scale.y + smoltPenRate
          smoltGrowth.current.scale.z =
            smoltGrowth.current.scale.z + smoltPenRate
          //  console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt PEN OUT to',ref.current.position.y ,'position Y', smoltHatchPreScale, 'inPen', inPen )
        }
        break
      // Smolt off
      case curTop >= scrollPenState && curTop <= scrollPenOut:
        smoltGrowth.current.scale.x = 0
        smoltGrowth.current.scale.y = 0
        smoltGrowth.current.scale.z = 0
        ref.current.visible = false
        break

      // Smolt Scale into Pen
      case curTop >= scrollPenOut && curTop <= scrollGrowAdult:
        ref.current.visible = true

        if (smoltGrowth.current.scale.x > 0 && outPen === true) {
          //  console.log('Pen In',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )
          smoltGrowth.current.scale.x =
            smoltGrowth.current.scale.x - smoltPenRate
          smoltGrowth.current.scale.y =
            smoltGrowth.current.scale.y - smoltPenRate
          smoltGrowth.current.scale.z =
            smoltGrowth.current.scale.z - smoltPenRate //
          // console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt PEN JUMP IN  to',ref.current.position.y ,'position Y', smoltHatchPreScale, 'inPen', inPen )
        }

        // Smolt Scale out pen
        if (
          smoltGrowth.current.scale.x < smoltHatchFullScale &&
          outPen === false
        ) {
          // console.log('Pen Out',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )

          smoltGrowth.current.scale.x = smoltGrowth.current.scale.x + 0.1
          smoltGrowth.current.scale.y = smoltGrowth.current.scale.y + 0.1
          smoltGrowth.current.scale.z = smoltGrowth.current.scale.z + 0.1
          // console.log('curTop',curTop, smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt PEN JUMP OUT to',ref.current.position.y ,'position Y', smoltHatchPreScale, 'inPen', inPen )
        }

        break
      case curTop >= scrollGrowAdult:
        ref.current.visible = false
    }
  })

  return (
    <group scale={[scaleGen, scaleGen, scaleGen]}> position={[posSmoltX, posSmoltY, posSmoltZ]}>
      <group
        ref={smoltGrowth}
       /* position={[0, smoltHatchStartPosY, 0]} */
        scale={[smoltHatchPreScale, smoltHatchPreScale, smoltHatchPreScale]}>
        <group
          position={[0, 0, 0]}
          /* position={[-1.3, .2, 0]} */ rotation={[0, -70.2, 0]}
          scale={[0.1, 0.1, 0.1]}
          ref={group}
          {...props}
          dispose={null}>
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
              geometry={nodes['eye_L003_0'].geometry}
              skeleton={nodes['eye_L003_0'].skeleton}
            />
            <skinnedMesh
              material={materials.Fish_Eye_1}
              geometry={nodes['eye_L.003_1_1'].geometry}
              skeleton={nodes['eye_L.003_1_1'].skeleton}
            />
            <skinnedMesh
              material={materials.Fish_EyeOuter}
              geometry={nodes['eye_R003_0'].geometry}
              skeleton={nodes['eye_R003_0'].skeleton}
            />
            <skinnedMesh
              material={materials.Fish_Eye_1}
              geometry={nodes['eye_R.003_1_1'].geometry}
              skeleton={nodes['eye_R.003_1_1'].skeleton}
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
  const { nodes, materials, animations } = useLoader(
    GLTFLoader,
    '/models/juan/014//Opt-Pen-V2-16_normalson.glb'
  )
  const ref = useRef()
  const refWater = useRef()
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  const penSize = useRef()

  useEffect(() => {
    ref.current.rotation.y = 1.6
  }, [])

  const penStartState = () => {
    ref.current.scale.x = penScaleStart
    ref.current.scale.y = penScaleStart
    ref.current.scale.z = penScaleStart
  }

  const penDefaultState = () => {
    ref.current.scale.x = penScaleEnd
    ref.current.scale.y = penScaleEnd
    ref.current.scale.z = penScaleEnd
  }

  useFrame((ani, delta) => {
    mixer.update(delta)
    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages - 1) * viewportH)) * Math.PI

    /* FOLLOW MOUSE   */
    let degrees = getMouseDegrees(
      props.mouse.current.x,
      props.mouse.current.y,
      mouseMove
    )

    // console.log('Pen Scale', ref.current.scale.x, 'x', ref.current.scale.y, 'y', ref.current.scale.x, 'x', ref.current.visible, 'visibility')

    // Original
    /*
      group.current.rotation.x = degrees.y + 0.5;
      group.current.rotation.y = degrees.x;
      group.current.rotation.z = 0.2;
      */

    group.current.rotation.x = degrees.y + 0.43
    group.current.rotation.y = degrees.x
    group.current.rotation.z = 0.1

    ref.current.rotation.y = ref.current.rotation.y + 0.001
    //  group.current.rotation.x = degrees.y + 0.5
    /*
    group.current.rotation.y = degrees.x + (group.current.rotation.y + 1)
    ref.current.rotation.x = 0.2
    ref.current.rotation.z = 0.2
    ref.current.rotation.y = ref.current.rotation.y + 0.001
    */

    //  console.log(curTop,'curTop', nextY,'nextY')

    switch (true) {
      // Pen off
      case curTop >= 0 && curTop <= scrollPenIn:
        penStartState()
        ref.current.visible = false
        refWater.current.visible = false
        inPen = false
        outPen = true
        /*   console.log(
          penSize.current.scale.x,
          penSize.current.scale.y,
          penSize.current.scale.z,
          "xyz PEN PRE IN  to",
          penSize.current.position.y,
          "position Y",
          smoltHatchPreScale,
          "inPen",
          inPen
        ); */
        break

      // Pen scale up
      case curTop >= scrollPenIn && curTop <= scrollPenState:
        ref.current.visible = true
        refWater.current.visible = true

        if (
          ref.current.scale.x < penScaleEnd &&
          outPen === false
        ) {
          //  console.log('Hatch start',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )
          ref.current.scale.x =
            ref.current.scale.x + penScaleUpRate
          ref.current.scale.y =
            ref.current.scale.y + penScaleUpRate
          ref.current.scale.z =
            ref.current.scale.z + penScaleUpRate
          //  console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt Scale up to',ref.current.position.y ,'position Y' , smoltGrowFullScale, 'hatched', hatched)
        }

        break

      // Pen present
      case curTop >= scrollPenState && curTop <= scrollPenOut:
        penDefaultState()
        ref.current.visible = true
        refWater.current.visible = true
        inPen = true
        outPen = false
        break

      // Pen scale down
      case curTop >= scrollPenOut && curTop <= scrollGrowAdult:

        if (ref.current.scale.x > 0 && outPen === true) {
          //  console.log('Pen In',ref.current.position.y,'PosY', smoltHatchStartPosY, 'smoltHatchStartPosY', curTop,'curTop' )
          ref.current.scale.x =
            ref.current.scale.x - penScaleDownRate
          ref.current.scale.y =
            ref.current.scale.y - penScaleDownRate
          ref.current.scale.z =
            ref.current.scale.z - penScaleDownRate //
          // console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt PEN JUMP IN  to',ref.current.position.y ,'position Y', smoltHatchPreScale, 'inPen', inPen )
        }

        ref.current.visible = false
        refWater.current.visible = true
        //  inPen = true
        // Pen off
        break
      case curTop >= scrollGrowAdult && curTop <= scrollAdult:
        penDefaultState()
        ref.current.visible = false
        refWater.current.visible = false
        outPen = true
        //   inPen = false
        break
      case curTop > scrollAdult:
        ref.current.visible = false
        refWater.current.visible = false
        outPen = true
        break
    }
  })

  useEffect(() => {
    actions.current = {
      animation_0: mixer.clipAction(animations[0], group.current).play(),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
  return (
    <group scale={[scaleGen, scaleGen, scaleGen]} rotation={[rotPenX,rotPenY,rotPenZ]}  position={[posPenX, posPenY, posPenZ]} >
      <group  scale={[0.015, 0.015, 0.015]}  ref={group} {...props} dispose={null}>
        <group ref={ref} position={[0, 103.42, 0]}  >
          <group position={[0, 665.26, 2544.96]} scale={[0.15, 0.15, 0.15]}>
            <group scale={[0.75, 0.75, 0.75]}>
              <mesh
                material={materials['Dark Metal']}
                geometry={nodes.arch48_002001.geometry}
              />
              <mesh
                material={materials['Dark Metal']}
                geometry={nodes.arch48_003001.geometry}
              />
              <mesh
                material={materials['Dark Metal']}
                geometry={nodes.arch48_004001.geometry}
              />
              <mesh
                material={materials['White.010']}
                geometry={nodes.arch48_007001.geometry}
              />
              <mesh
                material={materials['White.010']}
                geometry={nodes.sub01001.geometry}
              />
              <mesh
                material={materials['Blue.016']}
                geometry={nodes.arch48_005001.geometry}
              />
              <mesh
                material={materials['Blue.016']}
                geometry={nodes.arch48_006001.geometry}
              />
              <mesh
                material={materials['Blue.016']}
                geometry={nodes.arch48_011001.geometry}
              />
              <mesh
                material={materials['Blue.016']}
                geometry={nodes.sub02001.geometry}
              />
              <mesh
                material={materials['Handrail Metal']}
                geometry={nodes.arch48_008001.geometry}
              />
              <mesh
                material={materials['Handrail Metal']}
                geometry={nodes.arch48_009001.geometry}
              />
              <mesh
                material={materials['Handrail Metal']}
                geometry={nodes.arch48_010001.geometry}
              />
              <mesh
                material={materials['Egg Salmon.010']}
                geometry={nodes.arch48_012001.geometry}
              />
            </group>
          </group>
          <group position={[0, 1054.05, 0]}>
            <mesh
              material={materials.Aluminum}
              geometry={nodes.Leg_0001.geometry}
              position={[0, 0, -2043.53]}
              rotation={[-Math.PI / 2, 0, -Math.PI]}
              scale={[10, 10, 8]}>
              <mesh
                material={materials.Base}
                geometry={nodes.Cylinder012.geometry}
                position={[0, 0, -452.22]}
                rotation={[Math.PI / 2, 0.76, 0]}
                scale={[0.16, 0.16, 0.16]}
              />
            </mesh>
            <mesh
              material={materials.Aluminum}
              geometry={nodes.Leg_1001.geometry}
              position={[1769.75, 0, -1021.76]}
              rotation={[-Math.PI / 2, 0, -Math.PI]}
              scale={[10, 10, 8]}>
              <mesh
                material={materials.Base}
                geometry={nodes.Cylinder013.geometry}
                position={[0, 0, -452.22]}
                rotation={[Math.PI / 2, 0.76, 0]}
                scale={[0.16, 0.16, 0.16]}
              />
            </mesh>
            <mesh
              material={materials.Aluminum}
              geometry={nodes.Leg_2001.geometry}
              position={[1769.75, 0, 1021.76]}
              rotation={[-Math.PI / 2, 0, -Math.PI]}
              scale={[10, 10, 8]}>
              <mesh
                material={materials.Base}
                geometry={nodes.Cylinder014.geometry}
                position={[0, 0, -452.22]}
                rotation={[Math.PI / 2, 0.76, 0]}
                scale={[0.16, 0.16, 0.16]}
              />
            </mesh>
            <mesh
              material={materials.Aluminum}
              geometry={nodes.Leg_3001.geometry}
              position={[0, 0, 2043.53]}
              rotation={[-Math.PI / 2, 0, -Math.PI]}
              scale={[10, 10, 8]}>
              <mesh
                material={materials.Base}
                geometry={nodes.Cylinder015.geometry}
                position={[0, 0, -452.22]}
                rotation={[Math.PI / 2, 0.76, 0]}
                scale={[0.16, 0.16, 0.16]}
              />
            </mesh>
            <mesh
              material={materials.Aluminum}
              geometry={nodes.Leg_4001.geometry}
              position={[-1769.75, 0, 1021.76]}
              rotation={[-Math.PI / 2, 0, -Math.PI]}
              scale={[10, 10, 8]}>
              <mesh
                material={materials.Base}
                geometry={nodes.Cylinder016.geometry}
                position={[0, 0, -452.22]}
                rotation={[Math.PI / 2, 0.76, 0]}
                scale={[0.16, 0.16, 0.16]}
              />
            </mesh>
            <mesh
              material={materials.Aluminum}
              geometry={nodes.Leg_5001.geometry}
              position={[-1769.75, 0, -1021.76]}
              rotation={[-Math.PI / 2, 0, -Math.PI]}
              scale={[10, 10, 8]}>
              <mesh
                material={materials.Base}
                geometry={nodes.Cylinder017.geometry}
                position={[0, 0, -452.22]}
                rotation={[Math.PI / 2, 0.76, 0]}
                scale={[0.16, 0.16, 0.16]}
              />
            </mesh>
          </group>
          <group position={[1988.26, 859.52, -289.72]} rotation={[0, 0, 0]}>
            <mesh
              material={materials['White.010']}
              geometry={nodes.Cube008.geometry}
              position={[0, 26.24, -52.31]}
              rotation={[0, -0.16, 0]}
            />
            <mesh
              material={materials['White.010']}
              geometry={nodes.Cube009.geometry}
              position={[0, -8.75, -91.26]}
            />
            <mesh
              material={materials['White.010']}
              geometry={nodes.Cube010.geometry}
              position={[0, -8.75, 18.95]}
            />
            <mesh
              material={materials['White.010']}
              geometry={nodes.Cube011.geometry}
              position={[0, -8.75, 124.63]}
            />
          </group>
          <group rotation={[0, 0, 0]}>
            <group
              position={[1588, 858.14, -1463.22]}
              rotation={[-Math.PI / 2, 0, -0.76]}
              scale={[6.45, 6.45, 6.45]}>
              <mesh
                material={materials['Handrail Metal']}
                geometry={nodes['Hand_Rails-Metal002'].geometry}
              />
            </group>
          </group>
          <group
            position={[1591.95, 818.33, -1458.93]}
            rotation={[-Math.PI / 2, 0, -0.76]}
            scale={[6.45, 6.45, 6.45]}>
            <mesh
              material={materials.Aluminum}
              geometry={nodes['Platform-Blue002'].geometry}
            />
          </group>
          <group
            position={[2164.59, 688.07, -16.39]}
            rotation={[-Math.PI, 0, -Math.PI]}>
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_0008.geometry}
              position={[0, 0, 468.72]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_1008.geometry}
              position={[0, 0, 312.48]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_2008.geometry}
              position={[0, 0, 156.24]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_3008.geometry}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_4008.geometry}
              position={[0, 0, -156.24]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_5008.geometry}
              position={[0, 0, -312.48]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_6008.geometry}
              position={[0, 0, -468.72]}
              rotation={[2.34, 0, 0]}
            />
          </group>
          <group position={[-2195.79, 688.07, -1.04]} rotation={[0, 0, 0]}>
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_0007.geometry}
              position={[0, 0, 468.72]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_1007.geometry}
              position={[0, 0, 312.48]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_2007.geometry}
              position={[0, 0, 156.24]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_3007.geometry}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_4007.geometry}
              position={[0, 0, -156.24]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_5007.geometry}
              position={[0, 0, -312.48]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_6007.geometry}
              position={[0, 0, -468.72]}
              rotation={[2.34, 0, 0]}
            />
          </group>
          <group position={[-1.55, 688.07, 2168.03]} rotation={[0, 1.57, 0]}>
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_0006.geometry}
              position={[0, 0, 468.72]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_1006.geometry}
              position={[0, 0, 312.48]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_2006.geometry}
              position={[0, 0, 156.24]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_3006.geometry}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_4006.geometry}
              position={[0, 0, -156.24]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_5006.geometry}
              position={[0, 0, -312.48]}
              rotation={[2.34, 0, 0]}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes.Cube4_6006.geometry}
              position={[0, 0, -468.72]}
              rotation={[2.34, 0, 0]}
            />
          </group>
          <group rotation={[0, 0, 0]}>
            <group
              position={[1588, 858.14, -1463.22]}
              rotation={[-Math.PI / 2, 0, -0.76]}
              scale={[6.45, 6.45, 6.45]}>
              <mesh
                material={materials['Logo.005']}
                geometry={nodes['Signs-Logo002'].geometry}
              />
              <mesh
                material={materials['Material #2097633216.005']}
                geometry={nodes['Signs-Material_#2097633216002'].geometry}
              />
            </group>
          </group>
          <group
            position={[1591.95, 858.14, -1458.93]}
            rotation={[-Math.PI / 2, 0, -0.76]}
            scale={[6.45, 6.45, 6.45]}>
            <mesh
              material={materials['Blue.016']}
              geometry={nodes['Pen-Blue002'].geometry}
            />
            <mesh
              material={materials['Dark Metal']}
              geometry={nodes['Pen-Dark001'].geometry}
            />
            <mesh
              material={materials['Handrail Metal']}
              geometry={nodes['Pen-Metal002'].geometry}
            />
            <mesh
              material={materials['Handrail Metal']}
              geometry={nodes['Pen-Metal003'].geometry}
            />
            <mesh
              material={materials['White.010']}
              geometry={nodes['Pen-White003'].geometry}
            />
            <mesh
              material={materials['White.010']}
              geometry={nodes['Pen-White005'].geometry}
            />
            <mesh
              material={materials['Logo.005']}
              geometry={nodes['Pen-Logo001'].geometry}
            />
            <mesh
              material={materials['Blue.014']}
              geometry={nodes['Pen-Blue003'].geometry}
              position={[0, 0, -0.3]}
            />
            <mesh
              material={materials['Mat.011']}
              geometry={nodes['Pen-Mat003'].geometry}
            />
            <mesh
              material={materials['White.011']}
              geometry={nodes['Pen-White004'].geometry}
            />
          </group>
          <mesh
            material={materials['Net.001']}
            geometry={nodes.Inner_Menbrane002.geometry}
            position={[1591.95, 858.14, -1458.93]}
            rotation={[-Math.PI / 2, 0, -0.76]}
            scale={[6.45, 6.45, 6.45]}
          />
          <mesh
            material={materials['Outer membrane']}
            geometry={nodes.Outer_Membrane002.geometry}
            position={[1591.95, 858.14, -1458.93]}
            rotation={[-Math.PI / 2, 0, -0.76]}
            scale={[6.45, 6.45, 6.45]}
          />
          <group
            position={[5086.93, -5154.03, -2795.37]}
            rotation={[Math.PI, -0.92, Math.PI]}
            scale={[10, 10, 10]}>
            <mesh
              ref={refWater}
              material={materials['Mat.009']}
              geometry={nodes.Water003.geometry}
              position={[530.77, 576.35, 234.93]}
              rotation={[-Math.PI, 0.8, -Math.PI]}
              scale={[0.1, 0.1, 0.1]}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

// GROWTH MODEL

const GrowthModel = (props) => {
  const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const { camera } = useThree()
  const aspect = 1.75
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(
    GLTFLoader,
    '/models/juan/012/smolt-to-adult-physicaleye-54.gltf',
    draco()
  )
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  const growthScale = useRef()

  /*
  const setCamAdultDefPos = () => {
    camera.position.x = camAdultDefPosX
    camera.position.y = camAdultDefPosY
    camera.position.z = camAdultDefPosZ
  }
  */

  const smoltBaseSize = () => {
    growthScale.current.scale.x = growthBaseSmoltScale
    growthScale.current.scale.y = growthBaseSmoltScale
    growthScale.current.scale.z = growthBaseSmoltScale
  }

  const adultFullSize = () => {
    growthScale.current.scale.x = growthBaseAdultScale 
    growthScale.current.scale.y = growthBaseAdultScale 
    growthScale.current.scale.z = growthBaseAdultScale
  }

  useEffect(() => {
    ref.current.position.y = -8.1
    ref.current.position.z = 3.4

    materials['Salmon Final Texture'].transparent = true
    materials['Egg Salmon'].transparent = true
    materials['Salmon Final Texture'].opacity = 1
    materials['Egg Salmon'].opacity =1
    materials['Salmon Final Texture'].alphaTest = 0.5
//    materials['Salmon Final Texture'].blendEquationAlpha = true

    mixer.clipAction(animations[0], group.current).clampWhenFinished = true
    mixer.clipAction(animations[0], group.current).repetitions = 0
    mixer.clipAction(animations[0], group.current).timeScale = 1.5

    actions.current = {
      animation_0: mixer.clipAction(animations[0], group.current).play(),
    }

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])

  useFrame((ani, delta) => {
    // follow mouse
    let degrees = getMouseDegrees(
      props.mouse.current.x,
      props.mouse.current.y,
      mouseMove
    )
    group.current.rotation.x = degrees.y
    group.current.rotation.y = degrees.x + fishRotate
    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages - 1) * viewportH)) * Math.PI

    //  console.log(curTop, 'curTop')

    switch (true) {
      case curTop >= 0 && curTop <= scrollPenOut:
        ref.current.visible = false
        smoltBaseSize()
 //       materials['Salmon Final Texture'].opacity = 0
 //       materials['Salmon Final Texture'].alphaTest = 0
        break

      case curTop >= scrollPenOut && curTop <= scrollGrowAdult:
        //  console.log(camera.position.x, 'LERP PRE Adult camera.position.x', curTop,'curtop', nextY, 'nextY')
        //  console.log(camera.position.z, 'LERP PRE Adult camera.position.z', curTop,'curtop', nextY, 'nextY')
        ref.current.visible = false
        smoltBaseSize()
        grown = false
        mixer.stopAllAction()
        mixer.clipAction(animations[0], group.current).enabled = false
        break

      case curTop >= scrollGrowAdult && curTop <= scrollAdult:
        //  LERP - GROWTH TO ADULT
        // camera.position.x = lerp((curTop / 100) * -0.5 + 3.8, nextY * -1, 0.01)
        // camera.position.z = lerp((curTop / 100) * 1.1 - 5.9, nextY, 0.01)

        // camera.position.x = lerp((curTop / 100) * -0.5 + 3.8, nextY * -1, 0.01)
        // camera.position.z = lerp((curTop / 100) * 1.1 - 5.9, nextY, 0.01)
        mixer.update(delta)
 //       materials['Salmon Final Texture'].opacity = 1
 //       materials['Salmon Final Texture'].alphaTest = 0.5

       
        mixer.clipAction(animations[0], group.current).enabled = true

        if (
          growthScale.current.scale.x < growthBaseAdultScale &&
          grown === false
        ) {
          ref.current.visible = true
          growthScale.current.scale.x =
            growthScale.current.scale.x + growthBaseScaleUp
          growthScale.current.scale.y =
            growthScale.current.scale.y + growthBaseScaleUp
          growthScale.current.scale.z =
            growthScale.current.scale.z + growthBaseScaleUp

         //  console.log('growth scale up',growthScale.current.scale.x,'x',growthScale.current.scale.y,'y',growthScale.current.scale.z,'z')
          //  console.log(growthScale.current.scale.x, growthScale.current.scale.y, growthScale.current.scale.z, 'xyz growth Scale up to', growthBaseAdultScale)
          if (growthScale.current.scale.x >= growthBaseAdultScale){
            growthScaleFull = true
            //setTimeout(function(){ ref.current.visible = false; }, 100);
          // console.log('growthScalehFull Smolt', growthScaleFull, 'growthScale.current.scale.x < growthBaseAdultScale && grown === false')
          }
        }
        if (growthScaleFull === true ){
        //  materials['Salmon Final Texture'].transparent = true
          materials['Salmon Final Texture'].opacity = materials['Salmon Final Texture'].opacity  -.5
          materials['Egg Salmon'].opacity = materials['Egg Salmon'].opacity - .2
        //  console.log(materials['Salmon Final Texture'].opacity,'opacity')
        if(materials['Salmon Final Texture'].opacity <=0 ){
         //   console.log('growth off')
            ref.current.visible = false; 
            materials['Salmon Final Texture'].opacity = 1
            materials['Egg Salmon'].opacity = 1        
          }   
        }
        if (
          growthScale.current.scale.x > growthBaseSmoltScale &&
          grown === true
        ) {
          ref.current.visible = true
          growthScale.current.scale.x =
            growthScale.current.scale.x - growthBaseScaleDown
          growthScale.current.scale.y =
            growthScale.current.scale.y - growthBaseScaleDown
          growthScale.current.scale.z =
            growthScale.current.scale.z - growthBaseScaleDown

          //  console.log('growth scale down',growthScale.current.scale.x,'x',growthScale.current.scale.y,'y',growthScale.current.scale.z,'z')
          //  console.log(growthScale.current.scale.x, growthScale.current.scale.y, growthScale.current.scale.z, 'xyz growth Scale down to', growthBaseSmoltScale )
        }

        //  console.log('growth current',growthScale.current.scale.x,'x',growthScale.current.scale.y,'y',growthScale.current.scale.z,'z')
        //  console.log('SmoltScale',growthBaseSmoltScale,'AdultScale', growthBaseAdultScale)

        if (
          mixer.clipAction(animations[0], group.current).time === 0 &&
          grown === false
        ) {
          mixer.clipAction(animations[0], group.current).play()
        }
        if (
          mixer.clipAction(animations[0], group.current).time > 0 &&
          grown === true
        ) {
          mixer.clipAction(animations[0], group.current).time =
            mixer.clipAction(animations[0], group.current).time - 0.6
        }

        //  console.log(growthScale.current.position.y, 'Y', growthScale.current.position.x, 'X', growthScale.current.position.y, 'Z')
        //  ref.current.position.y = -8.1
        //  ref.current.position.z = 3.4

        //  console.log(growthScale,'growthScale')
        //  Scale base


        //  console.log(camera.position.x, 'LERP TO Adult camera.position.x', curTop,'curtop', nextY, 'nextY')
        //  console.log(camera.position.z, 'LERP TO Adult camera.position.z', curTop,'curtop', nextY, 'nextY')

        break

      case curTop >= scrollAdult:
        //  console.log(camera.position.x, 'LERP AT Adult camera.position.x', curTop,'curtop', nextY, 'nextY')
        //  console.log(camera.position.z, 'LERP AT Adult camera.position.z', curTop,'curtop', nextY, 'nextY')
        //  setCamAdultDefPos()
        mixer.clipAction(animations[0], group.current).time = 4
        adultFullSize()
        grown = true
        ref.current.visible = false
        materials['Salmon Final Texture'].opacity = 1
        materials['Egg Salmon'].opacity = 1
        break
    }
  })

  return (
    <group scale={[scaleGen, scaleGen, scaleGen]} position={[posGrowthX, posGrowthY, posGrowthZ]}>
    <group
      ref={growthScale}
      scale={[
        growthBaseSmoltScale,
        growthBaseSmoltScale,
        growthBaseSmoltScale,
      ]}>
      <group
        rotation={[0, 180.1, 0]}
        scale={[1, 1, 1]}
        ref={group}
        {...props}
        dispose={null}
        position={[5.2, 0.8, 0]}>
        <group ref={ref} position={[0, 0, 0]}>
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
            morphTargetDictionary={
              nodes.SubD_Eye_Fix_Body.morphTargetDictionary
            }
            morphTargetInfluences={
              nodes.SubD_Eye_Fix_Body.morphTargetInfluences
            }
            rotation={[0, 0, 0]}
          />
        </group>
      </group>
    </group>
    </group>
  )
}

// ADULT MODEL

const AdultModel = (props) => {
  const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const { renderer } = useThree()
  const aspect = 1.75
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(
    GLTFLoader,
    '/models/juan/011/adult-fish-eyefix-58.glb',
    draco()
  )
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())

  useEffect(() => {
    materials['Salmon Final Texture'].alphaTest = 0.5
    materials['Salmon Final Texture'].transparent = true
    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current).play(),
    }

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])

  useFrame((ani, delta) => {
    mixer.update(delta)
    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages - 1) * viewportH)) * Math.PI

    scroll3D = curTop
    scroll3DDispatched(curTop)
 
    let degrees = getMouseDegrees(
      props.mouse.current.x,
      props.mouse.current.y,
      mouseMove
    )
    group.current.rotation.x = degrees.y
    group.current.rotation.y = degrees.x + fishRotate

    switch (true) {
      case curTop >= 0 && curTop <= scrollGrowAdult :
        ref.current.visible = false
        materials['Salmon Final Texture'].opacity = 0
        break
/*
     case growthScaleFull === true:
       console.log   */
      
    case curTop >= scrollGrowAdult && curTop <= scrollAdult:
    //  console.log('growthScaleFull status FOR Adult', growthScaleFull)
      if (growthScaleFull === false){
        ref.current.visible = false
        materials['Salmon Final Texture'].opacity = 0
     //   growthAniFull = true
      }    
      if (growthScaleFull === true){
        ref.current.visible = true
        materials['Salmon Final Texture'].opacity = 1
       // growthAniFull 
      }        
      break
      
    case curTop >= scrollAdult && curTop <= scrollSteak && growthAniFull === true:
    
      //   console.log('growthScaleFull status AS Adult', growthScaleFull)
  
          growthScaleFull = false      
          ref.current.visible = true
          materials['Salmon Final Texture'].opacity = 1
          break
  
     


      case curTop >= scrollAdult && curTop <= scrollSteak:
        
     //   console.log('growthScaleFull status AS Adult', growthScaleFull)

         growthScaleFull = false
        ref.current.visible = true
        materials['Salmon Final Texture'].opacity = 1
        break

      case curTop >= scrollSteak:
        break
    }
  })

  return (
    <group scale={[scaleGen, scaleGen, scaleGen]} position={[posAdultX, posAdultY, posAdultZ]}>
      <group
        rotation={[0, 70.2, 0]}
        scale={[0.362, 0.362, 0.362]}
        ref={group}
        {...props}
        dispose={null}
        position={[5.7, -3.2, -10]}>
        <group ref={ref} position={[0, 0, 0]}>
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
            geometry={nodes['eye_L001_0'].geometry}
            skeleton={nodes['eye_L001_0'].skeleton}
          />
          <skinnedMesh
            material={materials['Salmon Final Texture']}
            geometry={nodes['eye_L.001_1_1'].geometry}
            skeleton={nodes['eye_L.001_1_1'].skeleton}
          />
          <skinnedMesh
            material={materials.Fish_EyeOuter}
            geometry={nodes['eye_R001_0'].geometry}
            skeleton={nodes['eye_R001_0'].skeleton}
          />
          <skinnedMesh
            material={materials['Salmon Final Texture']}
            geometry={nodes['eye_R.001_1_1'].geometry}
            skeleton={nodes['eye_R.001_1_1'].skeleton}
          />
        </group>
      </group>
    </group>
  )
}

const CameraLights = () => {

  const {gl} = useThree()
  useEffect(() => {
    gl.gammaOutput = true
    gl.gammaFactor = 2
  }, [])

  return (
    <PerspectiveCamera makeDefault position={[0, 0, 15]}>
      <hemisphereLight intensity={0.55} />
      <spotLight position={[200, 400, 0]} intensity={0.7} />
      <spotLight position={[-200, 0, 0]} intensity={0.7} />
    </PerspectiveCamera>
  )
}

export default function App() {
 
  const mouse = useRef({ x: 0, y: 0 })
  const scrollArea = useRef()
  const canvasPanel = useRef()
  let toFreezeOne = 1.5
  let toFreezeTwo = 2
  const onScroll = (e) => {
    state.top.current = e.target.scrollTop
  }

  useEffect(
    () =>
      void onScroll({
        target: scrollArea.current,
      }),
    []
  )

  return (
    <>
      <Canvas>
        <Suspense
          fallback={
            null /* <Dom center className="loading" children="Loading..."/> */
          }>
          {/* Header */}
          <Block factor={0} offset={0}>
            <Dom>TITLE</Dom>
          </Block>

          {/* 3D elements */}
          <CameraLights />
        {/*  <ParticlesScene mouse={mouse} /> */}
          <EggModel mouse={mouse} />
          <SmoltModel mouse={mouse} />
          <PenModel mouse={mouse} />
          <GrowthModel mouse={mouse} />
          <AdultModel mouse={mouse} />
        </Suspense>
      </Canvas>


      {/*start video*/}
      <div className="video-bg-wrap" id="vid-3d">
        <video
          preload="true"
          id="loading-video-bg"
          autoPlay={true}
          muted={true}
          loop={true}
          src={loadingBgVid}
        />
      </div>
      
     <div className="video-overlay video-overlay--3d" />
     
      <div className="video-overlay-particles">
        <Particles params={{"particles":{"number":{"value":100,"density":{"enable":true,"value_area":800}},"color":{"value":"#fff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img\/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1000000000000000055511151231257827021181583404541015625,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1000000000000000055511151231257827021181583404541015625,"sync":false}},"line_linked":{"enable":false,"distance":500,"color":"#ffffff","opacity":0.40000000000000002220446049250313080847263336181640625,"width":2},"move":{"enable":true,"speed":1.5,"direction":"top","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":false,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":0.5}},"bubble":{"distance":400,"size":4,"duration":0.299999999999999988897769753748434595763683319091796875,"opacity":1,"speed":3},"repulse":{"distance":200,"duration":0.40000000000000002220446049250313080847263336181640625},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true}} />
      </div>
     
      <ScrollArea3D
        ref={canvasPanel}
        mouse={mouse}
        passRef={scrollArea}
        passOnScroll={onScroll}
        scrollPos={scroll3D}
      />
    </>
  )
}
