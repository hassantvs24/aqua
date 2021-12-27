/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/fish-pen-lowpoly-1.gltf')

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
        <group position={[0, 665.26, 2544.96]} scale={[0.15, 0.15, 0.15]}>
          <mesh material={materials.Blue} geometry={nodes.sub02.geometry} />
          <mesh material={materials.White} geometry={nodes.sub01.geometry} />
          <mesh material={materials.Dark} geometry={nodes.arch48_002.geometry} />
          <mesh material={materials.Dark} geometry={nodes.arch48_003.geometry} />
          <mesh material={materials.Dark} geometry={nodes.arch48_004.geometry} />
          <mesh material={materials.Blue} geometry={nodes.arch48_005.geometry} />
          <mesh material={materials.Blue} geometry={nodes.arch48_006.geometry} />
          <mesh material={materials.Blue} geometry={nodes.arch48_011.geometry} />
          <mesh material={materials.White} geometry={nodes.arch48_007.geometry} />
          <mesh material={materials.Metal} geometry={nodes.arch48_008.geometry} />
          <mesh material={materials.Metal} geometry={nodes.arch48_009.geometry} />
          <mesh material={materials.Metal} geometry={nodes.arch48_010.geometry} />
          <mesh material={materials['Egg Salmon']} geometry={nodes.arch48_012.geometry} />
        </group>
        <group position={[0, 1054.05, 0]}>
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_0.geometry}
            position={[0, 0, -2043.53]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_1.geometry}
            position={[1769.75, 0, -1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_2.geometry}
            position={[1769.75, 0, 1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_3.geometry}
            position={[0, 0, 2043.53]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_4.geometry}
            position={[-1769.75, 0, 1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
          <mesh
            material={materials.Blue}
            geometry={nodes.Leg_5.geometry}
            position={[-1769.75, 0, -1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}
          />
        </group>
        <group position={[1591.95, 858.14, -1458.93]} rotation={[-Math.PI / 2, 0, -0.76]} scale={[6.45, 6.45, 6.45]}>
          <mesh material={materials.Dark} geometry={nodes['Numbers-Dark'].geometry} />
          <mesh material={materials.Blue} geometry={nodes['Numbers-Blue'].geometry} />
        </group>
        <group position={[1591.95, 858.14, -1458.93]} rotation={[-Math.PI / 2, 0, -0.76]} scale={[6.45, 6.45, 6.45]}>
          <mesh material={materials.White} geometry={nodes['Pen-White'].geometry} />
          <mesh material={materials.Blue} geometry={nodes['Pen-Blue'].geometry} />
          <mesh material={materials.White} geometry={nodes['Pen-White'].geometry} />
          <mesh material={materials.Metal} geometry={nodes['Pen-Metal'].geometry} />
          <mesh material={materials.Blue} geometry={nodes['Pen-Blue'].geometry} />
          <mesh material={materials.Dark} geometry={nodes['Pen-Dark'].geometry} />
          <mesh material={materials.Metal} geometry={nodes['Pen-Metal'].geometry} />
          <mesh material={materials.Metal} geometry={nodes['Pen-Metal'].geometry} />
          <mesh material={materials.Logo} geometry={nodes['Pen-Logo'].geometry} />
          <mesh material={materials.Logo} geometry={nodes['Pen-Logo'].geometry} />
          <mesh material={materials['Net 2']} geometry={nodes['Pen-Net_2'].geometry} />
          <mesh material={materials.White} geometry={nodes['Pen-White'].geometry} />
          <mesh material={materials.Net} geometry={nodes['Pen-Net'].geometry} />
          <mesh material={materials['Material #2097633216']} geometry={nodes['Pen-Material_#2097633216'].geometry} />
        </group>
      </group>
      <mesh material={materials.Mat} geometry={nodes.Water.geometry} position={[0, 609.42, 0]} />
    </group>
  )
}
