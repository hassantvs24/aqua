/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/Opt-Pen-V2-17_normalsoff.glb')

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
      <group position={[0, 103.42, 0]} scale={[0.1, 0.1, 0.1]}>
        <group position={[0, 665.26, 2544.96]} scale={[0.15, 0.15, 0.15]}>
          <group scale={[0.75, 0.75, 0.75]}>
            <mesh material={materials['Dark Metal']} geometry={nodes.arch48_002001.geometry} />
            <mesh material={materials['Dark Metal']} geometry={nodes.arch48_003001.geometry} />
            <mesh material={materials['Dark Metal']} geometry={nodes.arch48_004001.geometry} />
            <mesh material={materials['White.010']} geometry={nodes.arch48_007001.geometry} />
            <mesh material={materials['White.010']} geometry={nodes.sub01001.geometry} />
            <mesh material={materials['Blue.016']} geometry={nodes.arch48_005001.geometry} />
            <mesh material={materials['Blue.016']} geometry={nodes.arch48_006001.geometry} />
            <mesh material={materials['Blue.016']} geometry={nodes.arch48_011001.geometry} />
            <mesh material={materials['Blue.016']} geometry={nodes.sub02001.geometry} />
            <mesh material={materials['Handrail Metal']} geometry={nodes.arch48_008001.geometry} />
            <mesh material={materials['Handrail Metal']} geometry={nodes.arch48_009001.geometry} />
            <mesh material={materials['Handrail Metal']} geometry={nodes.arch48_010001.geometry} />
            <mesh material={materials['Egg Salmon.010']} geometry={nodes.arch48_012001.geometry} />
          </group>
        </group>
        <group position={[0, 1054.05, 0]}>
          <mesh
            material={materials.Aluminum}
            geometry={nodes.Leg_0001.geometry}
            position={[0, 0, -2043.53]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}>
            <mesh
              material={materials.Base}
              geometry={nodes.Cylinder012.geometry}
              position={[0, 0, -452.22]}
              rotation={[Math.PI / 2, 0.76, 0]}
              scale={[0.16, 0.16, 0.16]}
            />
          </mesh>
          <mesh
            material={materials.Aluminum}
            geometry={nodes.Leg_1001.geometry}
            position={[1769.75, 0, -1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}>
            <mesh
              material={materials.Base}
              geometry={nodes.Cylinder013.geometry}
              position={[0, 0, -452.22]}
              rotation={[Math.PI / 2, 0.76, 0]}
              scale={[0.16, 0.16, 0.16]}
            />
          </mesh>
          <mesh
            material={materials.Aluminum}
            geometry={nodes.Leg_2001.geometry}
            position={[1769.75, 0, 1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}>
            <mesh
              material={materials.Base}
              geometry={nodes.Cylinder014.geometry}
              position={[0, 0, -452.22]}
              rotation={[Math.PI / 2, 0.76, 0]}
              scale={[0.16, 0.16, 0.16]}
            />
          </mesh>
          <mesh
            material={materials.Aluminum}
            geometry={nodes.Leg_3001.geometry}
            position={[0, 0, 2043.53]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}>
            <mesh
              material={materials.Base}
              geometry={nodes.Cylinder015.geometry}
              position={[0, 0, -452.22]}
              rotation={[Math.PI / 2, 0.76, 0]}
              scale={[0.16, 0.16, 0.16]}
            />
          </mesh>
          <mesh
            material={materials.Aluminum}
            geometry={nodes.Leg_4001.geometry}
            position={[-1769.75, 0, 1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}>
            <mesh
              material={materials.Base}
              geometry={nodes.Cylinder016.geometry}
              position={[0, 0, -452.22]}
              rotation={[Math.PI / 2, 0.76, 0]}
              scale={[0.16, 0.16, 0.16]}
            />
          </mesh>
          <mesh
            material={materials.Aluminum}
            geometry={nodes.Leg_5001.geometry}
            position={[-1769.75, 0, -1021.76]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[10, 10, 8]}>
            <mesh
              material={materials.Base}
              geometry={nodes.Cylinder017.geometry}
              position={[0, 0, -452.22]}
              rotation={[Math.PI / 2, 0.76, 0]}
              scale={[0.16, 0.16, 0.16]}
            />
          </mesh>
        </group>
        <group position={[1988.26, 859.52, -289.72]} rotation={[0, 0, 0]}>
          <mesh
            material={materials['White.010']}
            geometry={nodes.Cube008.geometry}
            position={[0, 26.24, -52.31]}
            rotation={[0, -0.16, 0]}
          />
          <mesh material={materials['White.010']} geometry={nodes.Cube009.geometry} position={[0, -8.75, -91.26]} />
          <mesh material={materials['White.010']} geometry={nodes.Cube010.geometry} position={[0, -8.75, 18.95]} />
          <mesh material={materials['White.010']} geometry={nodes.Cube011.geometry} position={[0, -8.75, 124.63]} />
        </group>
        <group rotation={[0, 0, 0]}>
          <group position={[1588, 858.14, -1463.22]} rotation={[-Math.PI / 2, 0, -0.76]} scale={[6.45, 6.45, 6.45]}>
            <mesh material={materials['Handrail Metal']} geometry={nodes['Hand_Rails-Metal002'].geometry} />
          </group>
        </group>
        <group position={[1591.95, 818.33, -1458.93]} rotation={[-Math.PI / 2, 0, -0.76]} scale={[6.45, 6.45, 6.45]}>
          <mesh material={materials.Aluminum} geometry={nodes['Platform-Blue002'].geometry} />
        </group>
        <group position={[2164.59, 688.07, -16.39]} rotation={[-Math.PI, 0, -Math.PI]}>
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_0008.geometry}
            position={[0, 0, 468.72]}
            rotation={[2.34, 0, 0]}
          />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_1008.geometry}
            position={[0, 0, 312.48]}
            rotation={[2.34, 0, 0]}
          />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_2008.geometry}
            position={[0, 0, 156.24]}
            rotation={[2.34, 0, 0]}
          />
          <mesh material={materials['Dark Metal']} geometry={nodes.Cube4_3008.geometry} rotation={[2.34, 0, 0]} />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_4008.geometry}
            position={[0, 0, -156.24]}
            rotation={[2.34, 0, 0]}
          />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_5008.geometry}
            position={[0, 0, -312.48]}
            rotation={[2.34, 0, 0]}
          />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_6008.geometry}
            position={[0, 0, -468.72]}
            rotation={[2.34, 0, 0]}
          />
        </group>
        <group position={[-2195.79, 688.07, -1.04]} rotation={[0, 0, 0]}>
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_0007.geometry}
            position={[0, 0, 468.72]}
            rotation={[2.34, 0, 0]}
          />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_1007.geometry}
            position={[0, 0, 312.48]}
            rotation={[2.34, 0, 0]}
          />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_2007.geometry}
            position={[0, 0, 156.24]}
            rotation={[2.34, 0, 0]}
          />
          <mesh material={materials['Dark Metal']} geometry={nodes.Cube4_3007.geometry} rotation={[2.34, 0, 0]} />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_4007.geometry}
            position={[0, 0, -156.24]}
            rotation={[2.34, 0, 0]}
          />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_5007.geometry}
            position={[0, 0, -312.48]}
            rotation={[2.34, 0, 0]}
          />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_6007.geometry}
            position={[0, 0, -468.72]}
            rotation={[2.34, 0, 0]}
          />
        </group>
        <group position={[-1.55, 688.07, 2168.03]} rotation={[0, 1.57, 0]}>
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_0006.geometry}
            position={[0, 0, 468.72]}
            rotation={[2.34, 0, 0]}
          />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_1006.geometry}
            position={[0, 0, 312.48]}
            rotation={[2.34, 0, 0]}
          />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_2006.geometry}
            position={[0, 0, 156.24]}
            rotation={[2.34, 0, 0]}
          />
          <mesh material={materials['Dark Metal']} geometry={nodes.Cube4_3006.geometry} rotation={[2.34, 0, 0]} />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_4006.geometry}
            position={[0, 0, -156.24]}
            rotation={[2.34, 0, 0]}
          />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_5006.geometry}
            position={[0, 0, -312.48]}
            rotation={[2.34, 0, 0]}
          />
          <mesh
            material={materials['Dark Metal']}
            geometry={nodes.Cube4_6006.geometry}
            position={[0, 0, -468.72]}
            rotation={[2.34, 0, 0]}
          />
        </group>
        <group rotation={[0, 0, 0]}>
          <group position={[1588, 858.14, -1463.22]} rotation={[-Math.PI / 2, 0, -0.76]} scale={[6.45, 6.45, 6.45]}>
            <mesh material={materials['Logo.005']} geometry={nodes['Signs-Logo002'].geometry} />
            <mesh
              material={materials['Material #2097633216.005']}
              geometry={nodes['Signs-Material_#2097633216002'].geometry}
            />
          </group>
        </group>
        <group position={[1591.95, 858.14, -1458.93]} rotation={[-Math.PI / 2, 0, -0.76]} scale={[6.45, 6.45, 6.45]}>
          <mesh material={materials['Blue.016']} geometry={nodes['Pen-Blue002'].geometry} />
          <mesh material={materials['Dark Metal']} geometry={nodes['Pen-Dark001'].geometry} />
          <mesh material={materials['Handrail Metal']} geometry={nodes['Pen-Metal002'].geometry} />
          <mesh material={materials['Handrail Metal']} geometry={nodes['Pen-Metal003'].geometry} />
          <mesh material={materials['White.010']} geometry={nodes['Pen-White003'].geometry} />
          <mesh material={materials['White.010']} geometry={nodes['Pen-White005'].geometry} />
          <mesh material={materials['Logo.005']} geometry={nodes['Pen-Logo001'].geometry} />
          <mesh material={materials['Blue.014']} geometry={nodes['Pen-Blue003'].geometry} position={[0, 0, -0.3]} />
          <mesh material={materials['Mat.011']} geometry={nodes['Pen-Mat003'].geometry} />
          <mesh material={materials['White.011']} geometry={nodes['Pen-White004'].geometry} />
        </group>
        <mesh
          material={materials['Net.001']}
          geometry={nodes.Inner_Menbrane002.geometry}
          position={[1591.95, 858.14, -1458.93]}
          rotation={[-Math.PI / 2, 0, -0.76]}
          scale={[6.45, 6.45, 6.45]}
        />
        <mesh
          material={materials['Outer membrane']}
          geometry={nodes.Outer_Membrane002.geometry}
          position={[1591.95, 858.14, -1458.93]}
          rotation={[-Math.PI / 2, 0, -0.76]}
          scale={[6.45, 6.45, 6.45]}
        />
        <group position={[5086.93, -5154.03, -2795.37]} rotation={[Math.PI, -0.92, Math.PI]} scale={[10, 10, 10]}>
          <mesh
            material={materials['Mat.009']}
            geometry={nodes.Water003.geometry}
            position={[530.77, 576.35, 234.93]}
            rotation={[-Math.PI, 0.8, -Math.PI]}
            scale={[0.1, 0.1, 0.1]}
          />
        </group>
      </group>
    </group>
  )
}
