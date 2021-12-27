/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/Adult-Fish-alphatex-52.glb')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) => mixer.update(delta))
  useEffect(() => {
    actions.current = {
      Anim_0: mixer.clipAction(animations[0], group.current),
    }
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
  return (
    <group ref={group} {...props} dispose={null}>
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
  )
}
