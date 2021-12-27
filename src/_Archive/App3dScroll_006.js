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

/*
function lerp(v0, v1, t) {
  return v0*(1-t)+v1*t
}
module.exports = lerp
*/

const mouseMove = 0.1

// General position controls
const positionX = 0 
const positionY = 0
const positionZ = 0

// Camera controls
const camPosX = -.3
const camPosY = 0
const camPosZ = 0

const camDefPosX = -.4
const camDefPosZ = 3
const camDefPosY = .45

const camSpeedHatch = 0.2
const camMoveZ = 0.25
const camMoveXegg = 0
const camMoveXsmolt = 0.05
const camMoveXadult = 0.1

const camEggDefPosX = -1
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
const scrollEggSmolt = 800
const scrollSmoltGrow = 1200 
const scrollGrowAdult = 1500
const scrollAdult = 1800
const scrollAdultNext = 2300

// Egg to Smolt - Growth ratio
const smoltGrowPreScale = .3
const smoltGrowFullScale = 1
const smoltGrowthUp = .1
const smoltGrowDown = .1
let hatched = false

// Egg to Smolt - Position
const smoltGrowStartPos = 0.38
const smoltGrowEndPos = -6
const smoltMoveUp = 1
const smoltMoveDown = 1

// Smolt to Adult - Growth ratio
const growthBaseSmoltScale = .15
const growthBaseAdultScale = .23
const growthBaseScaleUp = .01
const growthBaseScaleDown = .01
let grown

let speed = .2

// EGGPANEL

const EggPanel = (props) => {
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

    /* Working 
    const curTop = state.top.current
    const curY = ref.current.rotation.z
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 
    ref.current.rotation.z = lerp(curY, nextY, 0.1)
    */
 
    mixer.update(delta)

    // follow mouse
    let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, mouseMove);
    ref.current.rotation.x =  degrees.y;
    ref.current.rotation.y =  degrees.x;

    const curY = ref.current.position.y
    const curTop = state.top.current
    const nextY = (curTop / ((state.pages -1 ) * viewportHeight)) * Math.PI 
   
    /*
    function lerp(v0, v1, t) {
      return v0*(1-t)+v1*t
    }

    v0*(1-t)+v1*t
    ref.current.position.y = lerp(curTop * -2.7, nextY + 10 * -2, 0.1)
    */

    switch (true){

      case (curTop >=0 && curTop <= scrollEgg ) :
        ref.current.position.y = lerp(curTop * -2.7, nextY + 10 * -2, 0.1)
//        console.log(ref.current.position.y,'posY', curTop, 'curTop', nextY,'nextY' )
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

// SMOLT PANEL

const SmoltPanel = (props) => {

  const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/011/smolt-fish-eyefix-9.glb', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  const { camera } = useThree()
  const smoltGrowth = useRef()
  
  const setCamSmoltDefPos = () => {
    camera.position.x = camSmoltDefPosX
    camera.position.y = camSmoltDefPosY
    camera.position.z = camSmoltDefPosZ
  }

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
    group.current.rotation.y =  degrees.x + 70;

    switch (true){

      case (curTop >= 0 && curTop <= scrollEggSmolt ) :
        ref.current.visible = false
        hatched = false 
        smoltGrowth.current.scale.x = smoltGrowPreScale
        smoltGrowth.current.scale.y = smoltGrowPreScale
        smoltGrowth.current.scale.z = smoltGrowPreScale
      //  ref.current.position.y = smoltGrowStartPos
      //  console.log(camera.position.x, 'PRE camera.position.x')
        break;

      case (curTop >= scrollEggSmolt &&  curTop <= scrollSmoltGrow) :

        ref.current.visible = true 
       /* if (materials['Salmon Final Texture'].opacity < 1 ){
          materials['Salmon Final Texture'].opacity = materials['Salmon Final Texture'].opacity + .1    
        } */
  
        if (smoltGrowth.current.scale.x < smoltGrowFullScale && hatched === false){
          smoltGrowth.current.scale.x = smoltGrowth.current.scale.x + smoltGrowthUp
          smoltGrowth.current.scale.y = smoltGrowth.current.scale.y + smoltGrowthUp
          smoltGrowth.current.scale.z = smoltGrowth.current.scale.z + smoltGrowthUp
          
          if (ref.current.position.y > smoltGrowEndPos){
            ref.current.position.y = ref.current.position.y - smoltMoveUp
          //  console.log(ref.current.position.y,'PosY', smoltGrowEndPos, 'smoltGrowStartPos' )
          }

        //  console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt Scale up to', smoltGrowFullScale, 'hatched', hatched)
        }
        if (smoltGrowth.current.scale.x > smoltGrowPreScale && hatched === true){       
          smoltGrowth.current.scale.x = smoltGrowth.current.scale.x - smoltGrowDown
          smoltGrowth.current.scale.y = smoltGrowth.current.scale.y - smoltGrowDown
          smoltGrowth.current.scale.z = smoltGrowth.current.scale.z - smoltGrowDown

          if (ref.current.position.y < smoltGrowStartPos){
            ref.current.position.y = ref.current.position.y + smoltMoveDown
          //  console.log(ref.current.position.y,'PosY', smoltGrowStartPos, 'smoltGrowStartPos' )
          }

        //  console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt Scale down to', smoltGrowPreScale, 'hatched', hatched )
        }


        /*
        function lerp(v0, v1, t) {
          return v0*(1-t)+v1*t
        }      
        v0*(1-t)+v1*t
        ref.current.position.y = lerp(curTop * -2.7, nextY + 10 * -2, 0.1)
        */        

        camera.position.x = lerp((curTop / 100 -7) * -.49, nextY * -1, 0.01) 
        camera.position.z = lerp(((curTop / 100 * 1.5) - 10.55) , nextY , 0.01) 
//      console.log(camera.position.x, 'LERP toSmolt camera.position.x', curTop,'curtop', nextY, 'nextY')
//      console.log(camera.position.z, 'LERP toSmolt camera.position.z', curTop,'curtop', nextY, 'nextY')

        break

      case (curTop >= scrollSmoltGrow && curTop <= scrollGrowAdult) :
   //     setCamSmoltDefPos()
        ref.current.visible = true
        hatched = true
//        console.log(camera.position.x, 'SMOLT camera.position.x')
//        console.log(camera.position.z, 'SMOLT camera.position.z')
        smoltGrowth.current.scale.x = smoltGrowFullScale
        smoltGrowth.current.scale.y = smoltGrowFullScale
        smoltGrowth.current.scale.z = smoltGrowFullScale

        break

      case (curTop >= scrollGrowAdult) : 
        ref.current.visible = false
        break
    }
  })

  /*
  <group position={[positionX,positionY,positionZ]}>
      <group ref={smoltGrowth}  position={[0, smoltGrowStartPos, 0]} scale={[smoltGrowPreScale, smoltGrowPreScale, smoltGrowPreScale]}>
        <group rotation={[0, 70.2, 0]} scale={[.1, .1, .1]} ref={group} {...props} dispose={null}  position={[-1.3, .2, 0]}>
          <group  ref={ref}  position={[0, 0, 0]}></group>
   */

  return (
    <group position={[positionX,positionY,positionZ]}>
      <group ref={smoltGrowth}  position={[0, smoltGrowStartPos, 0]} scale={[smoltGrowPreScale, smoltGrowPreScale, smoltGrowPreScale]}>
        <group rotation={[0, 70.2, 0]} scale={[.1, .1, .1]} ref={group} {...props} dispose={null}  position={[-1.3, .2, 0]}>
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
}

// GROWTH PANEL

const GrowthPanel = (props) => {

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
    group.current.rotation.y =  degrees.x + 70;
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
        // console.log(camera.position.x, 'LERP PRE Adult camera.position.x', curTop,'curtop', nextY, 'nextY') 
        console.log(camera.position.z, 'LERP PRE Adult camera.position.z', curTop,'curtop', nextY, 'nextY') 
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
       // console.log(growthScale,'growthScale')
        // Scale base
        mixer.update(delta);          
        materials['Salmon Final Texture'].opacity = 1
        materials['Salmon Final Texture'].alphaTest = 0.5
        

//      camera.position.x = lerp((curTop / 100 -7) * -.49, nextY * -1, 0.01) 
//      camera.position.z = lerp(((curTop / 100 * 1.5) - 10.55) , nextY , 0.01) 

        camera.position.x = lerp((curTop / 100 -7) * -1 + 6.14, nextY * -1, 0.01) 
        camera.position.z = lerp(((curTop / 100 * 3) - 38.20) , nextY , 0.01) 
//        console.log(camera.position.x, 'LERP TO Adult camera.position.x', curTop,'curtop', nextY, 'nextY')
//        console.log(camera.position.z, 'LERP TO Adult camera.position.z', curTop,'curtop', nextY, 'nextY')

        /*
        // zoom out
        if(camera.position.x > camAdultDefPosX && grown === false){
          camera.position.x = camera.position.x - (camSpeedHatch / 1.8 )
        }   
         
      //  if(camera.position.y < camSmoltDefPosY  && grown === false){
      //    camera.position.y = camera.position.y + camSpeedHatch
      //  }
        if(camera.position.z < camAdultDefPosZ && grown === false ){
          camera.position.z = camera.position.z + camSpeedHatch
        }
        // zoom in
        if(camera.position.x < camSmoltDefPosX && grown === true){
          camera.position.x = camera.position.x + (camSpeedHatch / 1.8 )
        }   
             
      //  if(camera.position.y < camSmoltDefPosY  && grown === true){
      //    camera.position.y = camera.position.y + camSpeedHatch
      //  }
        if(camera.position.z > camSmoltDefPosZ && grown === true){
          //LERP
          console.log('LERP cam z', camera.position.z, 'speed', speed)
          camera.position.z = camera.position.z + speed
         // for (let i = .01; i < camera.position.z; i++){
            speed = speed - .001 
      //    }
        } 
        */
        break

      case (curTop >= scrollAdult) :
      // console.log(camera.position.x, 'LERP AT Adult camera.position.x', curTop,'curtop', nextY, 'nextY') 
      console.log(camera.position.z, 'LERP AT Adult camera.position.z', curTop,'curtop', nextY, 'nextY')
      //  setCamAdultDefPos()
        mixer.clipAction(animations[0], group.current).time = 4
        grown = true
        ref.current.visible = false
        break
    }
  })

  return (
    <group position={[positionX,positionY,positionZ]} ref={growthScale} scale={[growthBaseSmoltScale, growthBaseSmoltScale, growthBaseSmoltScale]}>
      <group rotation={[0, 180.1, 0]} scale={[1, 1, 1 * -1]} ref={group} {...props} dispose={null}  position={[-10, 1, 0]}>
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
}

// ADULTPANEL

const AdultPanel = (props) => {

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

export default function App() {

  const cam = useRef()
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

/* SMOLT LATEST

  const { contentMaxWidth, canvasWidth, margin, viewportHeight } = useBlock()
  const ref = useRef()
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/009/Smolt-Fish-alphatex-7.glb', draco())
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  const { camera } = useThree()
  const smoltGrowth = useRef()
  
  const setCamSmoltDefPos = () => {
    camera.position.x = camSmoltDefPosX
    camera.position.y = camSmoltDefPosY
    camera.position.z = camSmoltDefPosZ
  }

  useEffect(() => {

    materials['Salmon Final Texture'].transparent = true
    materials['Salmon Final Texture'].opacity = 1
    materials['Salmon Final Texture'].alphaTest = 0.5
    materials['Salmon Final Texture'].blendEquationAlpha = true
     
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
    group.current.rotation.y =  degrees.x + 70;

    switch (true){

      case (curTop >= 0 && curTop <= scrollEggSmolt ) :
        ref.current.visible = false
        hatched = false 
        smoltGrowth.current.scale.x = smoltGrowPreScale
        smoltGrowth.current.scale.y = smoltGrowPreScale
        smoltGrowth.current.scale.z = smoltGrowPreScale
      //  ref.current.position.y = smoltGrowStartPos
      //  console.log(camera.position.x, 'PRE camera.position.x')
        break;

      case (curTop >= scrollEggSmolt &&  curTop <= scrollSmoltGrow) :

        ref.current.visible = true 
  
        if (smoltGrowth.current.scale.x < smoltGrowFullScale && hatched === false){
          smoltGrowth.current.scale.x = smoltGrowth.current.scale.x + smoltGrowthUp
          smoltGrowth.current.scale.y = smoltGrowth.current.scale.y + smoltGrowthUp
          smoltGrowth.current.scale.z = smoltGrowth.current.scale.z + smoltGrowthUp
          
          if (ref.current.position.y > smoltGrowEndPos){
            ref.current.position.y = ref.current.position.y - smoltMoveUp
          //  console.log(ref.current.position.y,'PosY', smoltGrowEndPos, 'smoltGrowStartPos' )
          }

        //  console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt Scale up to', smoltGrowFullScale, 'hatched', hatched)
        }
        if (smoltGrowth.current.scale.x > smoltGrowPreScale && hatched === true){       
          smoltGrowth.current.scale.x = smoltGrowth.current.scale.x - smoltGrowDown
          smoltGrowth.current.scale.y = smoltGrowth.current.scale.y - smoltGrowDown
          smoltGrowth.current.scale.z = smoltGrowth.current.scale.z - smoltGrowDown

          if (ref.current.position.y < smoltGrowStartPos){
            ref.current.position.y = ref.current.position.y + smoltMoveDown
          //  console.log(ref.current.position.y,'PosY', smoltGrowStartPos, 'smoltGrowStartPos' )
          }

        //  console.log(smoltGrowth.current.scale.x, smoltGrowth.current.scale.y, smoltGrowth.current.scale.z, 'xyz smolt Scale down to', smoltGrowPreScale, 'hatched', hatched )
        }
      

        camera.position.x = lerp((curTop / 100 -7) * -.49, nextY * -1, 0.01) 
        camera.position.z = lerp(((curTop / 100 * 1.5) - 10.55) , nextY , 0.01) 
//      console.log(camera.position.x, 'LERP toSmolt camera.position.x', curTop,'curtop', nextY, 'nextY')
//      console.log(camera.position.z, 'LERP toSmolt camera.position.z', curTop,'curtop', nextY, 'nextY')

        break

      case (curTop >= scrollSmoltGrow && curTop <= scrollGrowAdult) :
   //     setCamSmoltDefPos()
        ref.current.visible = true
        hatched = true
//        console.log(camera.position.x, 'SMOLT camera.position.x')
//        console.log(camera.position.z, 'SMOLT camera.position.z')
        smoltGrowth.current.scale.x = smoltGrowFullScale
        smoltGrowth.current.scale.y = smoltGrowFullScale
        smoltGrowth.current.scale.z = smoltGrowFullScale

        break

      case (curTop >= scrollGrowAdult) : 
        ref.current.visible = false
        break
    }
  })
   
  return (
    <group position={[positionX,positionY,positionZ]}>
      <group ref={smoltGrowth}  position={[0, smoltGrowStartPos, 0]} scale={[smoltGrowPreScale, smoltGrowPreScale, smoltGrowPreScale]}>
        <group rotation={[0, 70.2, 0]} scale={[.1, .1, .1]} ref={group} {...props} dispose={null}  position={[-1.3, .2, 0]}>
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
      </group>
    </group>  
  )
*/