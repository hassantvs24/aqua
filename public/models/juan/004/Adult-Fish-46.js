/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/Adult-Fish-46.gltf')

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
    <group ref={group} {...props} dispose={null}>
      <group rotation={[0, 0, 0]}>
        <group rotation={[0, 0, 0]}>
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