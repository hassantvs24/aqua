/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/smolt-fish-eyefix-9.glb')

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
  )
}
