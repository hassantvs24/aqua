import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import ParticleField from 'react-particles-webgl'
//import "./styles.css";

function ParticleWebGl() {
  /**
   * Docs
   * @see https://timellenberger.com/libraries/react-particles-webgl
   *
   * Config Builder
   * @see https://timellenberger.com/particles
   *
   * Repo
   * @see https://github.com/tim-soft/react-particles-webgl
   */
  const config = {
    showCube: false,
    dimension: '3D',
    velocity: 2,
    boundaryType: 'passthru',
    antialias: false,
    direction: {
      xMin: -0.6,
      xMax: 0.3,
      yMin: -1,
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
      transparency: 0.9,
      shape: 'circle',
      boundingBox: 'canvas',
      count: 2500,
      minSize: 1,
      maxSize: 25,
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

  return <ParticleField config={config} />
}

export default ParticleWebGl
