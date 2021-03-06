/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/smolt-to-adult-eyefix-21.glb')

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
      <mesh
        material={materials['Salmon Final Texture']}
        geometry={nodes.SubD_Smolt.geometry}
        name="SubD_Smolt"
        morphTargetDictionary={nodes.SubD_Smolt.morphTargetDictionary}
        morphTargetInfluences={nodes.SubD_Smolt.morphTargetInfluences}
        position={[0, -6.87, 0]}
        rotation={[Math.PI, 0, Math.PI]}
      />
    </group>
  )
}
