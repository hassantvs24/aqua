/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/fish-fry-retopo-18.gltf')

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
    <group ref={group} {...props} dispose={null}>
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
}
