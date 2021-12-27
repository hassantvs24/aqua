/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/bg3d.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={materials['water-bg']}
        geometry={nodes['water-bg'].geometry}
        position={[0, 0, 497.26]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[-1136.83, -592.1, -639.47]}
      />
    </group>
  )
}