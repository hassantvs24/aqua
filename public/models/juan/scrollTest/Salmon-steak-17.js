/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/salmon-steak-17.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh material={materials['Salmon 1K']} geometry={nodes['Salmon-Steak-2'].geometry} />
    </group>
  )
}
