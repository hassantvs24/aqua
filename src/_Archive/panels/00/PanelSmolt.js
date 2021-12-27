import React, {Suspense, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, draco } from 'drei'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import deepwWaterVid from './videos/Deep-Water-Particles_emc_7-sec.mp4'
import { getMousePos, getMouseDegrees } from "./utils/getmouse"
import { PerspectiveCamera } from 'drei'

const SmoltModel = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/004/Smolt-Fish-3.gltf')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) =>
  {
   mixer.update(delta);

   let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, .4);
   group.current.rotation.x =  degrees.y;
   group.current.rotation.y =  degrees.x;

 })
 useEffect(() => {
  actions.current = {
    animation_0: mixer.clipAction(animations[0], group.current).play(),
  }
  return () => animations.forEach((clip) => mixer.uncacheClip(clip))
}, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[0, 0, 0]} position={[-5, 5, 0]} scale={[0.7, 0.7, 0.7]}>
        <group rotation={[0, 0, 0]} scale={[0.3, 0.3, 0.3]}>
          <primitive object={nodes.Atlantic_salmonhead} />
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
  )
}

const PanelSmolt = () => {
  const mouse = useRef({ x:0, y:0 }); 

  return (
    <>
    <div id="panel-fish"  style={{padding:'56.25% 0 0 0',position:'relative'}}>
      <video preload='true' id="deep-water-vid" autoPlay={true} muted={true} loop={true} src={deepwWaterVid} ></video>

      <Canvas onMouseMove={e => (mouse.current = getMousePos(e))} id="fish-canvas" shadowMap camera={{ position: [0, 0, 15] }}>
        
        {/* 
        <PerspectiveCamera makeDefault position= {[0, 0, 25]} >
          <ambientLight intensity={0.75} />
          <spotLight
              position={[200, 0, 0]}         
              intensity={1.25}
          />
          <spotLight
            position={[-200, 0, 0]}
            intensity={1.25}
          />  
             </PerspectiveCamera> 
        
        <ambientLight intensity={0.75} />
        <pointLight intensity={1} position={[-10, -25, -10]} />
        <spotLight
          castShadow
          intensity={2.25}
          angle={0.2}
          penumbra={1}
          position={[25, 25, 25]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />    
        */}
         <PerspectiveCamera makeDefault position= {[0, 0, 25]} >   
           {/*  />      
              <hemisphereLight
              position={[205, 0, 50]}         
              intensity={0.25}
            /> */}     
            <ambientLight intensity={3.45}/>     
            <directionalLight  
              position={[-195, 5, 50]}         
              intensity={.8}
              rotation={[45, 0, 0]}
            />
            <directionalLight  
              position={[50, 205, -50]}
              intensity={3.3}
            /> 
          </PerspectiveCamera>    
          {/*<fog attach="fog" args={['#fff', 1, 80]} /> */}
        <Suspense fallback={null}>   
          <SmoltModel mouse={mouse} />     
        </Suspense>
        {/*
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.5}
         // rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        */}
      </Canvas>

      <div id="fish-text">
        <h2>Smolt Fish</h2>
        <br/>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div> 
    </div>
   </>
  )  
}

export default PanelSmolt;


/*
const FishModel = () => {
    const [model, setModel] = useState();  
      useFrame((state, delta) => {
        mixer.update(delta);
      });

    useEffect(() => {  
      new GLTFLoader().load("/models/juan/002/Adult-Salmon-Centered-1.glb", setModel);
    }, [])

    return  model ?  <group position={[0, -4, 0]} scale={[.3, .3, .3]}><primitive object={model.scene} /></group> : null  
}
*/

   /*
   console.log("props.mouse.x", props.mouse.current.x);
   console.log("props.mouse.y", props.mouse.current.y);
   console.log("degrees.x", degrees.x);
   console.log("degrees.y", degrees.y);
   */



// models/juan/002/Adult-Salmon-Centered-1.glb
/*
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/002/Adult-Salmon-Centered-1.glb')
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) =>
  {
   mixer.update(delta);

   let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, .4);
   group.current.rotation.x =  degrees.y;
   group.current.rotation.y =  degrees.x;

 })
  useEffect(() => {
    actions.current = {
      animation_0: mixer.clipAction(animations[0], group.current).play(),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [animations,mixer])

  return (
    <group ref={group} {...props} dispose={null} position={[-9, -4, 0]} scale={[.3, .3, .3]} >
      <group rotation={[0, 70.2, 0]} position={[0, 13.1, 0]}>
        <primitive object={nodes.Atlantic_salmonhead} />
        <group position={[-0.12, -10.18, -19.43]}>
          <skinnedMesh
            material={materials['Mat.2']}
            geometry={nodes.body.geometry}
            skeleton={nodes.body.skeleton}
            position={[0, 17.65, -10.79]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
        <group position={[-3.16, 1.98, 11.29]} rotation={[-Math.PI / 2, 0, 0]}>
          <skinnedMesh material={materials['Mat.2']} geometry={nodes.eye_R.geometry} skeleton={nodes.eye_R.skeleton} />
        </group>
        <group position={[2.96, 1.98, 11.29]} rotation={[-Math.PI / 2, 0, 0]}>
          <skinnedMesh material={materials['Mat.2']} geometry={nodes.eye_L.geometry} skeleton={nodes.eye_L.skeleton} />
        </group>
        <skinnedMesh
          material={materials['Mat.2']}
          geometry={nodes.dents.geometry}
          skeleton={nodes.dents.skeleton}
          position={[0.08, -1.67, 16.69]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  )
*/



// Adult-Fish-Test-16-No-Pose-Morph.gltf
/*
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/003/Adult-Fish-Test-16-No-Pose-Morph.gltf')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) =>
  {
   mixer.update(delta);

   let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, .4);
   group.current.rotation.x =  degrees.y;
   group.current.rotation.y =  degrees.x;

 })
  useEffect(() => {
    actions.current = {
      animation_0: mixer.clipAction(animations[0], group.current).play(),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
  return (
    <group ref={group} {...props} dispose={null} position={[-9, -4, 0]} scale={[.3, .3, .3]} >
      <group rotation={[0, 70.2, 0]} position={[0, 0, 0]}>
        <group rotation={[0, 0, 0]}>
          <primitive object={nodes.Atlantic_salmonhead} />
        </group>
        <group position={[12.15, 30.71, 3.08]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.body} geometry={nodes.eye_L.geometry} skeleton={nodes.eye_L.skeleton} />
        </group>
        <group position={[12.15, 30.71, -3.04]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.body} geometry={nodes.eye_R.geometry} skeleton={nodes.eye_R.skeleton} />
        </group>
        <group position={[8.51, 36.11, 0.19]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.body} geometry={nodes.dents.geometry} skeleton={nodes.dents.skeleton} />
        </group>
        <group position={[17.65, -10.79, 0]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh
            material={materials.body}
            geometry={nodes.body.geometry}
            skeleton={nodes.body.skeleton}
            name="body"
            morphTargetDictionary={nodes.body.morphTargetDictionary}
            morphTargetInfluences={nodes.body.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  )
  */



  // Adult-Fish-Test-17-with-Pose-Morph.gltf
  /*
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/003/Adult-Fish-Test-17-with-Pose-Morph.gltf')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) =>
  {
   mixer.update(delta);

   let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, .4);
   group.current.rotation.x =  degrees.y;
   group.current.rotation.y =  degrees.x;

 })
  useEffect(() => {
    actions.current = {
      animation_0: mixer.clipAction(animations[0], group.current).play(),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
  return (
    <group ref={group} {...props} dispose={null} position={[-9, -4, 0]} scale={[.3, .3, .3]} >
      <group rotation={[0, 70.2, 0]} position={[0, 0, 0]}>
        <group rotation={[0, 0, 0]}>
          <primitive object={nodes.Atlantic_salmonhead} />
        </group>
        <group position={[12.15, 30.71, 3.08]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.body} geometry={nodes.eye_L.geometry} skeleton={nodes.eye_L.skeleton} />
        </group>
        <group position={[12.15, 30.71, -3.04]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.body} geometry={nodes.eye_R.geometry} skeleton={nodes.eye_R.skeleton} />
        </group>
        <group position={[8.51, 36.11, 0.19]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.body} geometry={nodes.dents.geometry} skeleton={nodes.dents.skeleton} />
        </group>
        <group position={[17.65, -10.79, 0]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh
            material={materials.body}
            geometry={nodes.body.geometry}
            skeleton={nodes.body.skeleton}
            name="body"
            morphTargetDictionary={nodes.body.morphTargetDictionary}
            morphTargetInfluences={nodes.body.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  )
  */




  // Adult-Fish-Test-18-with-Pose-Morph.glb
  /*
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, 'models/juan/003/Adult-Fish-Test-18-with-Pose-Morph.glb')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) =>
  {
   mixer.update(delta);

   let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, .4);
   group.current.rotation.x =  degrees.y;
   group.current.rotation.y =  degrees.x;

 })
  useEffect(() => {
    actions.current = {
      animation_0: mixer.clipAction(animations[0], group.current).play(),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
  return (
    <group ref={group} {...props} dispose={null} position={[-9, 0, 0]} scale={[.3, .3, .3]} >
      <group rotation={[0, 70.2, 0]} position={[0, 0, 0]}>
        <group rotation={[0, 0, 0]}>
          <primitive object={nodes.Atlantic_salmonhead} />
        </group>
        <group position={[12.15, 30.71, 3.08]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.body} geometry={nodes.eye_L.geometry} skeleton={nodes.eye_L.skeleton} />
        </group>
        <group position={[12.15, 30.71, -3.04]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.body} geometry={nodes.eye_R.geometry} skeleton={nodes.eye_R.skeleton} />
        </group>
        <group position={[8.51, 36.11, 0.19]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh material={materials.body} geometry={nodes.dents.geometry} skeleton={nodes.dents.skeleton} />
        </group>
        <group position={[17.65, -10.79, 0]} rotation={[Math.PI, 1.57, 0]}>
          <skinnedMesh
            material={materials.body}
            geometry={nodes.body.geometry}
            skeleton={nodes.body.skeleton}
            name="body"
            morphTargetDictionary={nodes.body.morphTargetDictionary}
            morphTargetInfluences={nodes.body.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  )
  */