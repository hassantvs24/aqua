/*
auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { useGLTF } from '@react-three/drei/useGLTF'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/upwards-particles-2.glb')

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
    <group ref={group} {...props}>
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_0003.geometry}
        position={[-262.91, -383.76, -51.21]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.74, 0.74, 0.74]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_0004.geometry}
        position={[-262.91, 168.55, -51.21]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.74, 0.74, 0.74]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_1003.geometry}
        position={[-129.01, -706.98, 68.99]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.68, 0.68, 0.68]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_1004.geometry}
        position={[-129.01, -154.67, 68.99]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.68, 0.68, 0.68]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_10003.geometry}
        position={[232.86, -613.8, 146.49]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.74, 0.74, 0.74]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_10004.geometry}
        position={[232.86, -61.49, 146.49]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.74, 0.74, 0.74]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_11003.geometry}
        position={[-63.46, -609.87, 104.13]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.48, 0.48, 0.48]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_11004.geometry}
        position={[-63.46, -57.56, 104.13]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.48, 0.48, 0.48]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_12003.geometry}
        position={[90.32, -641.52, 263.87]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.65, 0.65, 0.65]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_12004.geometry}
        position={[90.32, -89.22, 263.87]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.65, 0.65, 0.65]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_13003.geometry}
        position={[146.79, -392.63, 88.42]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.63, 0.63, 0.63]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_13004.geometry}
        position={[146.79, 159.68, 88.42]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.63, 0.63, 0.63]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_14003.geometry}
        position={[52.29, -382.08, -162.95]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.51, 0.51, 0.51]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_14004.geometry}
        position={[52.29, 170.22, -162.95]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.51, 0.51, 0.51]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_15003.geometry}
        position={[219.49, -602.34, -72.69]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.45, 0.45, 0.45]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_15004.geometry}
        position={[219.49, -50.03, -72.69]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.45, 0.45, 0.45]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_16003.geometry}
        position={[122.04, -665.39, 228.77]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.7, 0.7, 0.7]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_16004.geometry}
        position={[122.04, -113.08, 228.77]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.7, 0.7, 0.7]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_17003.geometry}
        position={[78.82, -571.12, 295.27]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.95, 0.95, 0.95]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_17004.geometry}
        position={[78.82, -18.81, 295.27]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.95, 0.95, 0.95]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_18003.geometry}
        position={[-40.52, -648.73, 289.52]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.76, 0.76, 0.76]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_18004.geometry}
        position={[-40.52, -96.42, 289.52]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.76, 0.76, 0.76]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_19003.geometry}
        position={[121.97, -356, 22.95]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.66, 0.66, 0.66]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_19004.geometry}
        position={[121.97, 196.31, 22.95]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.66, 0.66, 0.66]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_2003.geometry}
        position={[-171.61, -639.45, -264.5]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.88, 0.88, 0.88]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_2004.geometry}
        position={[-171.61, -87.14, -264.5]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.88, 0.88, 0.88]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_20003.geometry}
        position={[-161.94, -773.8, -126.67]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.9, 0.9, 0.9]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_20004.geometry}
        position={[-161.94, -221.49, -126.67]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.9, 0.9, 0.9]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_21003.geometry}
        position={[-114.17, -614.88, -175.92]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.79, 0.79, 0.79]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_21004.geometry}
        position={[-114.17, -62.58, -175.92]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.79, 0.79, 0.79]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_22003.geometry}
        position={[-4.28, -780.07, -176.05]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.93, 0.93, 0.93]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_22004.geometry}
        position={[-4.28, -227.76, -176.05]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.93, 0.93, 0.93]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_23003.geometry}
        position={[293.98, -512.29, -37.96]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.89, 0.89, 0.89]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_23004.geometry}
        position={[293.98, 40.01, -37.96]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.89, 0.89, 0.89]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_24003.geometry}
        position={[141.86, -390.71, 68.19]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.81, 0.81, 0.81]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_24004.geometry}
        position={[141.86, 161.59, 68.19]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.81, 0.81, 0.81]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_25003.geometry}
        position={[202.1, -239.12, 148.98]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.94, 0.94, 0.94]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_25004.geometry}
        position={[202.1, 313.19, 148.98]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.94, 0.94, 0.94]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_26003.geometry}
        position={[-18.19, -693.23, -346.31]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.55, 0.55, 0.55]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_26004.geometry}
        position={[-18.19, -140.93, -346.31]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.55, 0.55, 0.55]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_27003.geometry}
        position={[-110.08, -732.23, -100.34]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.95, 0.95, 0.95]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_27004.geometry}
        position={[-110.08, -179.92, -100.34]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.95, 0.95, 0.95]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_28003.geometry}
        position={[-227.82, -741.8, -239.7]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.68, 0.68, 0.68]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_28004.geometry}
        position={[-227.82, -189.5, -239.7]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.68, 0.68, 0.68]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_29003.geometry}
        position={[-91.57, -450.35, -260.91]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.65, 0.65, 0.65]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_29004.geometry}
        position={[-91.57, 101.96, -260.91]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.65, 0.65, 0.65]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_3003.geometry}
        position={[294.14, -515.17, 55.29]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.93, 0.93, 0.93]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_3004.geometry}
        position={[294.14, 37.14, 55.29]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.93, 0.93, 0.93]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_30003.geometry}
        position={[-103.13, -627.86, -149.01]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.77, 0.77, 0.77]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_30004.geometry}
        position={[-103.13, -75.55, -149.01]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.77, 0.77, 0.77]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_31003.geometry}
        position={[66.19, -221.75, 144.11]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.5, 0.5, 0.5]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_31004.geometry}
        position={[66.19, 330.56, 144.11]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.5, 0.5, 0.5]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_32003.geometry}
        position={[-180.9, -384.15, 197.97]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.45, 0.45, 0.45]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_32004.geometry}
        position={[-180.9, 168.15, 197.97]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.45, 0.45, 0.45]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_33003.geometry}
        position={[175.99, -302, 197.19]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.45, 0.45, 0.45]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_33004.geometry}
        position={[175.99, 250.31, 197.19]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.45, 0.45, 0.45]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_34003.geometry}
        position={[-72.82, -542.43, 140.01]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.52, 0.52, 0.52]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_34004.geometry}
        position={[-72.82, 9.88, 140.01]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.52, 0.52, 0.52]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_35003.geometry}
        position={[-233.6, -731.08, -234.25]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.76, 0.76, 0.76]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_35004.geometry}
        position={[-233.6, -178.77, -234.25]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.76, 0.76, 0.76]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_36003.geometry}
        position={[-293.65, -722.87, 21.08]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.44, 0.44, 0.44]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_36004.geometry}
        position={[-293.65, -170.57, 21.08]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.44, 0.44, 0.44]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_37003.geometry}
        position={[114.98, -588.7, -106.47]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.48, 0.48, 0.48]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_37004.geometry}
        position={[114.98, -36.4, -106.47]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.48, 0.48, 0.48]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_38003.geometry}
        position={[-174.69, -482.19, 44.59]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.95, 0.95, 0.95]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_38004.geometry}
        position={[-174.69, 70.11, 44.59]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.95, 0.95, 0.95]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_39003.geometry}
        position={[107.65, -403.38, 105.39]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.48, 0.48, 0.48]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_39004.geometry}
        position={[107.65, 148.93, 105.39]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.48, 0.48, 0.48]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_4003.geometry}
        position={[249.32, -568.27, 161.48]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.78, 0.78, 0.78]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_4004.geometry}
        position={[249.32, -15.97, 161.48]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.78, 0.78, 0.78]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_40003.geometry}
        position={[-293.2, -719.92, 33.98]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.95, 0.95, 0.95]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_40004.geometry}
        position={[-293.2, -167.61, 33.98]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.95, 0.95, 0.95]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_41003.geometry}
        position={[104.59, -412.18, -226.91]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.63, 0.63, 0.63]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_41004.geometry}
        position={[104.59, 140.13, -226.91]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.63, 0.63, 0.63]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_42003.geometry}
        position={[-100.92, -447.77, 18.6]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.83, 0.83, 0.83]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_42004.geometry}
        position={[-100.92, 104.54, 18.6]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.83, 0.83, 0.83]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_43003.geometry}
        position={[-214.72, -373.32, 178.67]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.54, 0.54, 0.54]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_43004.geometry}
        position={[-214.72, 178.99, 178.67]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.54, 0.54, 0.54]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_5003.geometry}
        position={[-90.19, -520, -226.42]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.59, 0.59, 0.59]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_5004.geometry}
        position={[-90.19, 32.31, -226.42]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.59, 0.59, 0.59]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_6003.geometry}
        position={[-247.28, -357.86, -78.29]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.52, 0.52, 0.52]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_6004.geometry}
        position={[-247.28, 194.45, -78.29]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.52, 0.52, 0.52]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_7003.geometry}
        position={[-241.78, -339.01, -77.13]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.48, 0.48, 0.48]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_7004.geometry}
        position={[-241.78, 213.3, -77.13]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.48, 0.48, 0.48]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_8003.geometry}
        position={[-278.37, -585.32, -30.32]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.45, 0.45, 0.45]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_8004.geometry}
        position={[-278.37, -33.01, -30.32]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.45, 0.45, 0.45]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_9003.geometry}
        position={[62.37, -560.2, -218.3]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.72, 0.72, 0.72]}
      />
      <mesh
        material={materials['Mat.004']}
        geometry={nodes.Plane3_9004.geometry}
        position={[62.37, -7.89, -218.3]}
        rotation={[0.24, 0, -Math.PI / 2]}
        scale={[0.72, 0.72, 0.72]}
      />
    </group>
  )
}

useGLTF.preload('/upwards-particles-2.glb')
