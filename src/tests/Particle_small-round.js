/*
auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, {useRef} from 'react'
import {useGLTF} from '@react-three/drei/useGLTF'

/* Possible partices code
https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_stereo.html


    var spheres = [];


    //function init() 
		for ( var i = 0; i < 500; i ++ ) {

					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = Math.random() * 10000 - 5000;
					mesh.position.y = Math.random() * 10000 - 5000;
					mesh.position.z = Math.random() * 10000 - 5000;
					mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
					scene.add( mesh );

          spheres.push( mesh );

    }   
  
    //function render() 
    for ( var i = 0, il = spheres.length; i < il; i ++ ) {

					var sphere = spheres[ i ];

					sphere.position.x = 5000 * Math.cos( timer + i );
          sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );
    }
			
*/

export default function ParticleSmallRound(props) {
  const group = useRef()
  const {nodes, materials} = useGLTF(
    '/models/juan/particles/particle_small-round.glb'
  )

  useEffect(() => {
    for (var i = 0; i < 500; i++) {
      var mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = Math.random() * 10000 - 5000
      mesh.position.y = Math.random() * 10000 - 5000
      mesh.position.z = Math.random() * 10000 - 5000
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1
      scene.add(mesh)

      spheres.push(mesh)
    }
  }, [])

  useFrame((ani, delta) => {})

  return (
    <group ref={group} {...props}>
      <mesh
        material={materials['particle_small-round']}
        geometry={nodes['particle_small-round'].geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8.9, 8.9, 8.9]}
      />
    </group>
  )
}

useGLTF.preload('/models/juan/particles/particle_small-round.glb')
