/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/Adult-Salmon-Centered-1.glb')

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
      <group position={[0, 13.1, 0]}>
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
}
