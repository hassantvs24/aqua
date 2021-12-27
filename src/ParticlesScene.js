import React, {useRef, useState, useEffect, Suspense} from 'react'
import {useLoader, useFrame, useThree} from 'react-three-fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {getMousePos, getMouseDegrees} from './utils/getmouse'
import ParticleField from './utils/react-particles-webgl/ParticleField'
import merge from 'lodash.merge'
import initialConfig from './utils/react-particles-webgl/config'
import ObjParticles from './tests/ParticlesJuan/019/ObjParticles'
// import OutFocusParticles from './tests/ParticlesJuan/018/OutFocusParticles'
// import UpwardsParticles from './tests/ParticlesJuan/018/UpwardsParticles'

const Bg3d = (props) => {
  const {camera, gl} = useThree()
  const group = useRef()
  const {nodes, materials, animations} = useLoader(
    GLTFLoader,
    '/models/juan/017/bg3d_004.glb'
  )

  /*
  useEffect(() => {
    camera.far = 10000
    console.log('camera', camera)
    console.log('gl', gl)
  }, [])
*/

  return (
    <group
      scale={[1.2, 1.2, 1.2]}
      position={[100, 0, 500]}
      ref={group}
      {...props}
      dispose={null}>
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

const ParticlesScene = (props) => {
  const {gl} = useThree()
  const group = useRef()

  const config = {
    showCube: false,
    dimension: '3D',
    velocity: 0.2,
    boundaryType: 'passthru',
    antialias: false,
    direction: {
      xMin: -0.6,
      xMax: 0.3,
      yMin: 1,
      yMax: -0.6,
      zMin: -0.6,
      zMax: 0.3,
    },
    lines: {
      colorMode: 'rainbow',
      color: '#351CCB',
      transparency: 1,
      limitConnections: true,
      maxConnections: 20,
      minDistance: 150,
      visible: false,
    },
    particles: {
      colorMode: 'solid',
      color: '#ffffff',
      transparency: 0.07,
      shape: 'circle',
      boundingBox: 'canvas',
      count: 4000,
      minSize: 10,
      maxSize: 20,
      visible: true,
    },
    cameraControls: {
      enabled: false,
      enableDamping: false,
      dampingFactor: 0.2,
      enableZoom: false,
      autoRotate: false,
      autoRotateSpeed: 0.3,
      resetCameraFlag: false,
    },
  }
/*
  useEffect(() => {
    gl.gammaOutput = true
    gl.gammaFactor = 2
  }, [])
*/
  useFrame((ani, delta) => {
    let degrees = getMouseDegrees(
      props.mouse.current.x,
      props.mouse.current.y,
      0.1
    )
    group.current.rotation.x = degrees.y
    group.current.rotation.y = degrees.x + 3.1
  })

  return (
    <Suspense>
      <group ref={group} {...props} dispose={null}>
        {/* 
        <UpwardsParticles />
        <OutFocusParticles /> */}
        <ObjParticles
          xPos={0}
          yPos={1}
          zPos={0}
          xRot={0}
          yRot={0}
          zRot={0}
          xSca={1}
          ySca={1}
          zSca={1}
        />
        <ObjParticles
          xPos={1}
          yPos={6}
          zPos={0}
          xRot={0}
          yRot={0}
          zRot={0}
          xSca={1.5}
          ySca={1}
          zSca={1.5}
        />
        <ObjParticles
          xPos={3}
          yPos={-1}
          zPos={0}
          xRot={0}
          yRot={0}
          zRot={0}
          xSca={1}
          ySca={1}
          zSca={1}
        />
        <ParticleField {...merge({}, initialConfig, config)} />
        <Bg3d />
      </group>
    </Suspense>
  )
}

export default ParticlesScene
