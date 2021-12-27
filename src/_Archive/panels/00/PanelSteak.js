import * as THREE from 'three'
import React, { Suspense, useState, useEffect, useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, draco } from 'drei'
import { Canvas, useThree, useFrame, useLoader } from 'react-three-fiber'
import { PerspectiveCamera } from 'drei'
import { getMousePos, getMouseDegrees } from "./utils/getmouse"

const SteakModel = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, 'models/juan/003/Salmon-Steak-16.gltf')
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) =>
  {
  mixer.update(delta);

  let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, .8);
  group.current.rotation.x =  degrees.y;
  group.current.rotation.y =  degrees.x;

  })
  return (
    <group ref={group} {...props} dispose={null} position={[0, -2, 0]} scale={[.5, .5, .5]} rotation={[0, 70.2, 0]}>
      <mesh
        material={materials.Mat}
        geometry={nodes.Salmon.geometry}
        position={[0, -0.18, 0]}
        rotation={[Math.PI, -0.81, 0]}
      />
      </group>
    )
  }
  
  const PanelSteak = () => { 
    const mouse = useRef({ x:0, y:0 })
  
    return (
      <>
      <div id="panel-steak">
        <div id="steak-para">
          <h2 className="steak-text">Stage 1</h2>
          <br/>
          <p className="steak-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>     
        </div>
        <Canvas onMouseMove={e => (mouse.current = getMousePos(e))} id="steak-canvas" shadowMap>
          {/*
            <OrbitControls
              autoRotate
              enablePan={false}
              enableZoom={false}
              enableDamping
              dampingFactor={0.5}
              rotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}        
            />
            */}
          <PerspectiveCamera makeDefault position= {[0, 0, 15]} >   
            <ambientLight intensity={2.75} />          
              <hemisphereLight
              position={[205, 0, 50]}         
              intensity={0.25}
            />            
            <spotLight
              position={[205, 5, 50]}         
              intensity={2.25}
              rotation={[45, 0, 0]}
            />
            <spotLight
              position={[-195, 5, -50]}
              intensity={2.25}
            /> 
          </PerspectiveCamera>    
        
          <Suspense fallback={null}>   
            <SteakModel mouse={mouse}/>     
          </Suspense> 
               
        </Canvas>
    
        </div> 
     </>
    )  
  }
  
  export default PanelSteak;

  /*
   const group = useRef()
    const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/002/Salmon-steak-Fixed-Spec-Ver-2.gltf')
  
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
  */