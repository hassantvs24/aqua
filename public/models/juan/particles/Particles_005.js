/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/particles_006.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={materials['particle_large-round']}
        geometry={nodes['particle_large-round'].geometry}
        position={[5.99, 4.11, -36.73]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[19.53, 19.53, 19.53]}
      />
      <mesh
        material={materials['particle_large-round']}
        geometry={nodes['particle_large-round001'].geometry}
        position={[-144.61, -65.7, -50.4]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[19.53, 19.53, 19.53]}
      />
      <mesh
        material={materials['particle_large-round']}
        geometry={nodes['particle_large-round002'].geometry}
        position={[-155.8, 22.73, 92]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[19.53, 19.53, 19.53]}
      />
      <mesh
        material={materials['particle_large-round']}
        geometry={nodes['particle_large-round003'].geometry}
        position={[179.79, 71.7, 147.52]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[19.53, 19.53, 19.53]}
      />
      <mesh
        material={materials['particle_large-round']}
        geometry={nodes['particle_large-round004'].geometry}
        position={[158.63, -162.19, 92.72]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[19.53, 19.53, 19.53]}
      />
      <mesh
        material={materials['particle_large-round']}
        geometry={nodes['particle_large-round005'].geometry}
        position={[226.77, -171.99, 135.69]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[19.53, 19.53, 19.53]}
      />
      <mesh
        material={materials['particle_large-round']}
        geometry={nodes['particle_large-round006'].geometry}
        position={[256.01, -118.42, 238.17]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[19.53, 19.53, 19.53]}
      />
      <mesh
        material={materials['particle_large-round']}
        geometry={nodes['particle_large-round007'].geometry}
        position={[391.43, -196.73, 219.12]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[19.53, 19.53, 19.53]}
      />
      <mesh
        material={materials['particle_large-round']}
        geometry={nodes['particle_large-round008'].geometry}
        position={[473.59, 101.01, 259.27]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[19.53, 19.53, 19.53]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round'].geometry}
        position={[57.61, 32.55, 391.65]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round001'].geometry}
        position={[-335.67, 24.79, 219.77]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round002'].geometry}
        position={[-173.89, 108.07, 176.09]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round003'].geometry}
        position={[149.24, 99.8, 354.2]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round004'].geometry}
        position={[240.94, 41.94, 297.37]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round005'].geometry}
        position={[35.6, 226.84, 297.49]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round006'].geometry}
        position={[-365.82, 265.58, 227.77]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round007'].geometry}
        position={[-263.28, 173.82, 434.31]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round008'].geometry}
        position={[196.9, -87.79, 415.94]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round009'].geometry}
        position={[131.62, 8.4, 336.4]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round010'].geometry}
        position={[45.47, 74.16, 365.83]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round011'].geometry}
        position={[-112.12, 18.86, 327.44]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round012'].geometry}
        position={[-48.25, 155.84, 399.86]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round013'].geometry}
        position={[49.7, 55.44, 290.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round014'].geometry}
        position={[-137.74, 159.4, 248.15]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round015'].geometry}
        position={[-182.49, 59.86, 216.89]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round016'].geometry}
        position={[210.19, 171.8, 288.13]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round017'].geometry}
        position={[191.29, 183.84, 444.6]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round018'].geometry}
        position={[189.37, 106.59, 421.49]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round019'].geometry}
        position={[136.57, 159.05, 442.98]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round020'].geometry}
        position={[281.77, 112.25, 427.19]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round021'].geometry}
        position={[282.58, 192.22, 392.21]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round022'].geometry}
        position={[-6.23, 120.38, 429.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round023'].geometry}
        position={[360.24, 83.92, 419.46]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round024'].geometry}
        position={[168.42, 202.79, 412.44]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round025'].geometry}
        position={[-252.75, 62.13, 329.4]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round026'].geometry}
        position={[406.26, 255.28, 429.45]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round027'].geometry}
        position={[217.85, 123.98, 291.97]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round028'].geometry}
        position={[343.82, -72.54, 407.74]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round029'].geometry}
        position={[242.47, -193.15, 377.98]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round030'].geometry}
        position={[314.8, 139.06, 345.19]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round031'].geometry}
        position={[-227.3, -26.17, 217.22]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round032'].geometry}
        position={[-124.02, -77.39, 296.51]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round033'].geometry}
        position={[44.59, -88.28, 332]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round034'].geometry}
        position={[245.29, 46.42, 431.51]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round035'].geometry}
        position={[210.25, 23.43, 388.2]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round036'].geometry}
        position={[52.49, 281.15, 418.55]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round037'].geometry}
        position={[236.94, 323.19, 353.7]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round038'].geometry}
        position={[458.43, 66.82, 445.61]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round039'].geometry}
        position={[47.71, -167.44, 329.69]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round040'].geometry}
        position={[65.33, -120.91, 329.98]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round041'].geometry}
        position={[-180.21, -197.9, 343.02]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round042'].geometry}
        position={[-231.66, -3.62, 256.97]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round043'].geometry}
        position={[-144.06, -17.95, 311.81]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round044'].geometry}
        position={[-25.52, 5.48, 327.66]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round045'].geometry}
        position={[4.41, -16.7, 405.91]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round046'].geometry}
        position={[-106.8, -102.38, 431.91]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round047'].geometry}
        position={[87.27, -56.04, 391.47]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round048'].geometry}
        position={[121.55, -161.51, 394.15]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round049'].geometry}
        position={[391.3, -190.75, 432.63]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round050'].geometry}
        position={[496.9, -39, 354.36]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round051'].geometry}
        position={[363.88, -10.12, 201.31]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round052'].geometry}
        position={[208.25, -3.73, 330.58]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round053'].geometry}
        position={[187.03, -63.73, 264.84]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round054'].geometry}
        position={[-279.61, 108.32, 412.69]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round055'].geometry}
        position={[645.57, 247.02, 461.12]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round056'].geometry}
        position={[679.05, 21.9, 241.6]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round057'].geometry}
        position={[546.43, 135.47, 243.23]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round058'].geometry}
        position={[493.51, 189.36, 354.53]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round059'].geometry}
        position={[617.46, -7.35, 340.49]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round060'].geometry}
        position={[649.52, -175.77, 290.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round061'].geometry}
        position={[436.19, -276.96, 340.92]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round062'].geometry}
        position={[272.98, -266.74, 337.81]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round063'].geometry}
        position={[149.53, -220.19, 214.62]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round064'].geometry}
        position={[-19.8, -148.83, 234.4]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round065'].geometry}
        position={[-95.19, -135.29, 166.46]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round066'].geometry}
        position={[-16.65, -207.67, 285.25]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round067'].geometry}
        position={[-284.65, -277.35, 549.75]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round068'].geometry}
        position={[-414.66, -126.41, 202.74]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round069'].geometry}
        position={[-343.21, -171.07, 297.88]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round070'].geometry}
        position={[-237.3, -262.8, 427.26]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round071'].geometry}
        position={[-242.59, -336.57, 355.1]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round072'].geometry}
        position={[-153.87, -340.26, 243.03]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round073'].geometry}
        position={[-37.27, -334.64, 285.95]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round074'].geometry}
        position={[-1.27, -279.25, 414.09]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round075'].geometry}
        position={[172.29, -420.23, 385.39]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round076'].geometry}
        position={[576.85, -452.93, 405.73]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round077'].geometry}
        position={[575.15, -217.89, 237.89]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round078'].geometry}
        position={[-117.91, 339.95, 239.27]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
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
