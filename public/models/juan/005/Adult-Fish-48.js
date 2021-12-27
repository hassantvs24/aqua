/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/Adult-Fish-48.gltf')

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
        <skinnedMesh
          material={materials.Testt}
          geometry={nodes.eye_L.geometry}
          skeleton={nodes.eye_L.skeleton}
          position={[3.08, 12.15, 30.71]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <skinnedMesh
          material={materials.Testt}
          geometry={nodes.eye_R.geometry}
          skeleton={nodes.eye_R.skeleton}
          position={[-3.04, 12.15, 30.71]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <skinnedMesh
          material={materials.Testt}
          geometry={nodes.dents.geometry}
          skeleton={nodes.dents.skeleton}
          position={[0.19, 8.51, 36.11]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <skinnedMesh
          material={materials.Testt}
          geometry={nodes.body.geometry}
          skeleton={nodes.body.skeleton}
          position={[0, 17.65, -10.79]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  )
}
