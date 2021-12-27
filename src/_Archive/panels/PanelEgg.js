import * as THREE from 'three'
import React, { Suspense, useState, useEffect, useRef, createRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, draco } from 'drei'
import { Canvas, useThree, useFrame, useLoader } from 'react-three-fiber'
import shallowWaterVid from './videos/Shallow-Water-_enc_2.mp4'
import { PerspectiveCamera } from 'drei'
import { getMousePos, getMouseDegrees } from "./utils/getmouse"
import state from "./utils/store"
import { Block,  useBlock } from "./utils/blocks"

const EggModel = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/009/fish-fry-retopo-21.glb')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) =>
  {
   mixer.update(delta);

   let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, .4);
   group.current.rotation.x =  degrees.y;
   group.current.rotation.y =  degrees.x;
  
   // const curTop = state.top.current
   // console.log(curTop)
  
 })
  useEffect(() => {
    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current).play()
    }

    /*
    materials['Egg Salmon'].opacity = .5
    materials['Egg Salmon'].transparent = true
    materials.egg_outter1.opacity = .5
    materials.egg_outter1.transparent = true
    materials.eye_gold.opacity = .5
    materials.eye_gold.transparent = true
    materials.Fish.opacity = .5
    materials.Fish.transparent = true
    materials['Mat.4'].opacity = .5
    materials['Mat.4'].transparent = true
    */

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
  return (
    <group  scale={[.04, .04, .04]} ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI, 
        80, 0]}>
        <primitive object={nodes.Joint2} />
        <group position={[13.8, -23.08, -17.61]} />
        <mesh
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
  )
}

const PanelEgg = () => { 
  const mouse = useRef({ x:0, y:0 })

  return (
    <>
    <div id="panel-egg"  style={{padding:'56.25% 0 0 0',position:'relative'}}>
      <video preload='true' id="shallow-water-vid" autoPlay={true} muted={true} loop={true} src={shallowWaterVid} ></video>
      <div id="egg-text">
        <h2>Egg</h2>
        <br/>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div> 

      <Canvas onMouseMove={e => (mouse.current = getMousePos(e))} id="egg-canvas" shadowMap>

        {/*
        <OrbitControls
      
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}        
        />
       */}
        <PerspectiveCamera makeDefault position= {[0, 0, 15]} >  
          <ambientLight intensity={0.55} />  
          <directionalLight  
            position={[100, 200, -60]}         
            intensity={2.25}
          />
          {/*
          <directionalLight  
            position={[-195, 0, -50]}
            intensity={0.25}
          /> */}
        </PerspectiveCamera>    
    
        <Suspense fallback={null}>   
          <EggModel mouse={mouse}/>     
        </Suspense> 
             
      </Canvas>
      </div>
   </>
  )  
}

export default PanelEgg;

/* DEFAULT
const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/008/Physical Egg  Export 90820/fish-fry-retopo-19-blendimport.gltf')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) =>
  {
   mixer.update(delta);

   let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, .4);
   group.current.rotation.x =  degrees.y;
   group.current.rotation.y =  degrees.x;
  
   // const curTop = state.top.current
   // console.log(curTop)
  
 })
  useEffect(() => {
    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current).play(),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
  return (
    <group rotation={[-180, 0, 0]} >
    <group  scale={[.04, .04, .04]} ref={group} {...props} dispose={null}>
      <primitive object={nodes.Joint2} />
      <mesh
        material={materials['Egg Salmon']}
        geometry={nodes.Sphere1.geometry}
        position={[6.09, 29.71, -29.67]}
        rotation={[2.36, 0.38, -1.98]}
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
      <mesh material={materials.Material} geometry={nodes.Cube.geometry} />
    </group>
    </group>
  )  
*/


/* RETOPO 9
 const group = useRef()

  useEffect(() => {
    
      materials.Fish.transparent = true;
      materials.eye_gold.transparent = true;
      materials['Mat.4'].transparent = true;
      materials['Egg Salmon'].transparent = true;
      materials.Fish.opacity = .5
      materials.eye_gold.opacity = .5
      materials['Mat.4'].opacity = .5
      materials['Egg Salmon'].opacity = .5
  
  }, [])

  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/007/fish-fry-retopo-9.gltf')
  return (
    <group scale={[.04, .04, .04]} ref={group} {...props} dispose={null}   >
       <group position={[0, 0, 0]} >
      <group position={[19.82, -12.35, 0]}>
        <mesh material={materials.Fish} geometry={nodes['Fry_Model_4-Fish'].geometry} rotation={[0, 0, 0]} />
        <mesh material={materials.eye_gold} geometry={nodes['Fry_Model_4-eye_gold'].geometry} rotation={[0, 0, 0]} />
        <mesh material={materials['Mat.4']} geometry={nodes['Fry_Model_4-Mat4'].geometry} rotation={[0, 0, 0]} />
      </group>
      <mesh material={materials['Egg Salmon']} geometry={nodes.Sphere1.geometry} rotation={[0, 0, -0.67]} />
      </group>
    </group>
  )
*/

/* RETOPO 19 BLEND GLB
const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/008/Physical Egg  Export 90820/fish-fry-retopo-19-blendimport.glb')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) => mixer.update(delta))
  useEffect(() => {
    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current).play(),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
  return (
    <group  scale={[.04, .04, .04]}  ref={group} {...props} dispose={null}>
      <primitive object={nodes.Joint2} />
      <mesh
        material={materials['Egg Salmon']}
        geometry={nodes.Sphere1.geometry}
        position={[6.09, 29.71, -29.67]}
        rotation={[2.36, 0.38, -1.98]}
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
      <mesh material={materials.Material} geometry={nodes.Cube.geometry} />
    </group>
  )
*/

/* RETO 19
const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/008/Physical Egg  Export 90820/fish-fry-retopo-19.gltf')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) => mixer.update(delta))
  useEffect(() => {
    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current).play(),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
  return (
    <group scale={[.04, .04, .04]} ref={group} {...props} dispose={null}>
      <primitive object={nodes.Joint2} />
      <mesh
        material={materials['Egg Salmon']}
        geometry={nodes.Sphere1.geometry}
        position={[6.09, 29.71, -29.67]}
        rotation={[2.36, 0.38, -1.98]}
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
      <mesh material={materials.Material} geometry={nodes.Cube.geometry} />
    </group>
  )
*/

/* RETO 18
const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/008/Physical Egg  Export 90820/fish-fry-retopo-18.gltf')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) => mixer.update(delta))
  useEffect(() => {
    actions.current = {
      animation_0: mixer.clipAction(animations[0], group.current).play(),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
  return (
    <group scale={[.04, .04, .04]} ref={group} {...props} dispose={null}>
      <group rotation={[0, 0, 0]}>
        <skinnedMesh
          material={materials['Mat.4']}
          geometry={nodes['Fry_model_4_rigged-Mat4'].geometry}
          skeleton={nodes['Fry_model_4_rigged-Mat4'].skeleton}
        />
      </group>
      <group rotation={[0, 0, 0]}>
        <skinnedMesh
          material={materials.Fish}
          geometry={nodes['Fry_model_4_rigged-Fish'].geometry}
          skeleton={nodes['Fry_model_4_rigged-Fish'].skeleton}
        />
      </group>
      <group rotation={[0, 0, 0]}>
        <skinnedMesh
          material={materials.egg_outter1}
          geometry={nodes['Fry_model_4_rigged-egg_outter1'].geometry}
          skeleton={nodes['Fry_model_4_rigged-egg_outter1'].skeleton}
        />
      </group>
      <group rotation={[0, 0, 0]}>
        <skinnedMesh
          material={materials.eye_gold}
          geometry={nodes['Fry_model_4_rigged-eye_gold'].geometry}
          skeleton={nodes['Fry_model_4_rigged-eye_gold'].skeleton}
        />
      </group>
      <primitive object={nodes.Joint2} />
      <mesh
        material={materials['Egg Salmon']}
        geometry={nodes.Sphere1.geometry}
        position={[6.09, 29.71, -29.67]}
        rotation={[2.36, 0.38, -1.98]}
      />
    </group>
  )
*/

/* RETO 9
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/008/fish-fry-retopo-9.gltf')
  return (
    <group  scale={[0.04, 0.04, 0.04]} ref={group} {...props} dispose={null}>
       <group position={[19.82, -12.35, 0]}>
        <mesh material={materials.Fish} geometry={nodes['Fry_Model_4-Fish'].geometry} rotation={[0, 0, 0]} />
        <mesh material={materials.eye_gold} geometry={nodes['Fry_Model_4-eye_gold'].geometry} rotation={[0, 0, 0]} />
        <mesh material={materials['Mat.4']} geometry={nodes['Fry_Model_4-Mat4'].geometry} rotation={[0, 0, 0]} />
      </group>
      <mesh material={materials['Egg Salmon']} geometry={nodes.Sphere1.geometry} rotation={[0, 0, -0.67]} />
    </group>
  )
*/

/* RETOPO 8
 const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/008/fish-fry-retopo-8.gltf')
  return (
    <group scale={[.04, .04, .04]} ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0]}>
        <group position={[0, 0, 0]}>
          <mesh material={materials.Fish} geometry={nodes['Fry_Model_4-Fish'].geometry} rotation={[0, 0, 0]} />
          <mesh material={materials.eye_gold} geometry={nodes['Fry_Model_4-eye_gold'].geometry} rotation={[0, 0, 0]} />
          <mesh material={materials['Mat.4']} geometry={nodes['Fry_Model_4-Mat4'].geometry} rotation={[0, 0, 0]} />
        </group>
        <mesh
          material={materials['Egg Salmon']}
          geometry={nodes.Sphere1.geometry}
          position={[-2.12, 2.39, 26]}
          rotation={[0, 0, -0.67]}
        />
      </group>
    </group>
  )
*/

/*
const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/007/fish-fry-retopo-8.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={[0.04, 0.04, 0.04]} position={[3, 0, 0]} rotation={[0, 0, 0]}>
        <group position={[-13.37, -5.07, -1.99]}>
          <mesh material={materials.Fish} geometry={nodes['Fry_Model_4-Fish'].geometry} rotation={[0, 0, 0]} />
          <mesh material={materials.eye_gold} geometry={nodes['Fry_Model_4-eye_gold'].geometry} rotation={[0, 0, 0]} />
          <mesh material={materials['Mat.4']} geometry={nodes['Fry_Model_4-Mat4'].geometry} rotation={[0, 0, 0]} />
        </group>
        <mesh
          material={materials['Egg Salmon']}
          geometry={nodes.Sphere1.geometry}
          position={[-2.12, 2.39, 26]}
          rotation={[0, 0, -0.67]}
        />
      </group>
    </group>
  )
*/

/*
 const [model, setModel] = useState()
  const scroll = createRef()
  useEffect(() => {
    new GLTFLoader().load("/models/juan/005/Physical-Salmon-Egg-2.gltf", setModel)
  })

  return model ? (

      <primitive ref={scroll} scale={[0.03, 0.03, 0.03]} position={[6, 0, 0]} rotation={[0, 0, 0]} object={model.scene} />
    )  : null
  
*/


/*

  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/005/Physical-Salmon-Egg-2.gltf')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) =>
  {
   mixer.update(delta);

   let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, .2);

   group.current.rotation.x =  degrees.y;
   group.current.rotation.y =  degrees.x;

 })
  useEffect(() => {
    actions.current = {
      animation_0: mixer.clipAction(animations[0], group.current),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip)).play()
  }, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={[0.04, 0.04, 0.04]} position={[3, 0, 0]} rotation={[0, 0, 0]}>
        <group position={[-13.37, -5.07, -1.99]}>
          <primitive object={nodes.Joint2} />
        </group>
        <group position={[13.37, 5.07, 1.99]} rotation={[0, 0, 0]}>
          <mesh material={materials.Egg} geometry={nodes.Sphere1.geometry}>
            <group position={[8.76, -10.15, -8.25]} rotation={[0.42, 0.37, -0.06]}>
              <skinnedMesh
                material={materials.Fish}
                geometry={nodes['Fry-Fish'].geometry}
                skeleton={nodes['Fry-Fish'].skeleton}
              />
              <skinnedMesh
                material={materials.Fish}
                geometry={nodes['Fry-Fish'].geometry}
                skeleton={nodes['Fry-Fish'].skeleton}
              />
              <skinnedMesh
                material={materials.Fish}
                geometry={nodes['Fry-Fish'].geometry}
                skeleton={nodes['Fry-Fish'].skeleton}
              />
              <skinnedMesh
                material={materials.eye_gold}
                geometry={nodes['Fry-eye_gold'].geometry}
                skeleton={nodes['Fry-eye_gold'].skeleton}
              />
              <skinnedMesh
                material={materials['Mat.4']}
                geometry={nodes['Fry-Mat4'].geometry}
                skeleton={nodes['Fry-Mat4'].skeleton}
              />
              <skinnedMesh
                material={materials.Fish}
                geometry={nodes['Fry-Fish'].geometry}
                skeleton={nodes['Fry-Fish'].skeleton}
              />
            </group>
          </mesh>
        </group>
      </group>
    </group>
  )
  */



/*
 const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/002/Salmon-Egg-Fixed-Spec-Ver-2.gltf')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) =>
   {
    mixer.update(delta);

    let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, .2);

    group.current.rotation.x =  degrees.y;
    group.current.rotation.y =  degrees.x;

  })
  useEffect(() => {
    actions.current = {
      Anim_0_Sphere: mixer.clipAction(animations[0], group.current),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
  return (
    <group  rotation={[0, 0, 0]} ref={group} position={[5, 0, 0]} {...props} dispose={null} scale={[.04, .04, .04]}>
      <group position={[-74.14, 11.92, -78.71]} rotation={[Math.PI / 2, 0, 0]}>
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
  )
*/

/*
const EggModel = () => {
  const [model, setModel] = useState();

  useEffect(() => {     

    new GLTFLoader().load("/models/juan/002/Salmon-Egg-Fixed-Spec-Ver-2.gltf", setModel)  
  }, [])
  
 return  model ?  <group scale={[.04, .04, .04]}><primitive object={model.scene} /></group> : null

}
*/

    /*
    console.log("props.mouse.x", props.mouse.current.x);
    console.log("props.mouse.y", props.mouse.current.y);
    console.log("degrees.x", degrees.x);
    console.log("degrees.y", degrees.y);
    */



// Salmon-Egg-Fixed-Spec-Ver-2.gltf
    /*  
   const EggModel = (props) => {
    const group = useRef()
    const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/002/Salmon-Egg-Fixed-Spec-Ver-2.gltf')
  
    const actions = useRef()
    const [mixer] = useState(() => new THREE.AnimationMixer())
    useFrame((state, delta) =>
     {
      mixer.update(delta);
  
      let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, .2);
  
      group.current.rotation.x =  degrees.y;
      group.current.rotation.y =  degrees.x;
  
    })
    useEffect(() => {
      actions.current = {
        Anim_0_Sphere: mixer.clipAction(animations[0], group.current),
      }
      return () => animations.forEach((clip) => mixer.uncacheClip(clip))
    }, [])
    return (
      <group ref={group} position={[5, 0, 0]} {...props} dispose={null} scale={[.04, .04, .04]}>
        <group position={[-74.14, 11.92, -78.71]} rotation={[Math.PI / 2, 0, 0]}>
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
    )
  }
  */