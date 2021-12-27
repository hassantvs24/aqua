import * as THREE from "three";
import React from "react";
import Steak3DCanvas from "./Steak3DCanvas";
import scroll3Dpos from "./utils/scroll3Dpos";
import madeInAmerica from "./images/footer-001.jpg";
import good4Health from "./images/footer-002.jpg";
import freshFish from "./images/footer-003.jpg";
import {useDispatch} from "react-redux";
import {OPEN_MODAL, openModalAction} from "./redux/modal/actions";

// Imported scroll positions which could also be used with the Ui3d componant
const {
  scroll3dStart,
  scrollEgg,
  scrollPreHatch,
  scrollEggSmolt,
  scrollSmolt,

  scrollPenIn,
  scrollPenState,
  scrollPenOut,
  smoltPenRate,

  scrollGrowAdult,
  scrollAdult,
  scrollSteak,
  scrollLast
} = scroll3Dpos

const PanelLast = (props) => {
  const dispatch = useDispatch()
  
  const openModal = (e) => {
    e.preventDefault()
    dispatch(openModalAction(OPEN_MODAL, e.target.dataset.targetmodal))
  }
  
  return (
    <>
      <div className={
        props.scroll3D > scrollLast ? "panel-last panel-on"
          : "panel-last panel-off"
      }>
        <div className="section section-info-cards">
          <div className="container">
            <div className="row align-content-stretch align-items-stretch flex-wrap">
              {/*start card*/}
              <div className="col-md-4 col-sm-6 col-12 mb-4 mb-md-0">
                <div className="info-card">
                  <div className="info-card-img">
                    <img src={madeInAmerica} alt="" className="img-fluid"/>
                  </div>
                  <div className="info-card-content p-3">
                    <h3 className="info-card-title">MADE IN AMERICA</h3>
                    <div className="info-card-text">
                      <div className="text">
                        We are passionate about bringing you the best possible product.
                      </div>
                      <div className="text">
                        Fromthe very start of its journey all the way to your dinner plate,our salmonis all American.We take greatpride in havinga local productthat is born,raised and handledthrough the whole process in America,and by Americans.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*end card*/}
              {/*start card*/}
              <div className="col-md-4 col-sm-6 col-12 mb-4 mb-md-0">
                <div className="info-card">
                  <div className="info-card-img">
                    <img src={good4Health} alt="" className="img-fluid"/>
                  </div>
                  <div className="info-card-content p-3">
                    <h3 className="info-card-title">GOOD FOR YOUR HEALTH</h3>
                    <div className="info-card-text">
                      <div className="text">
                        In addition to being tasty and nutritious, Salmon is also very good for your health.
                      </div>
                      <div className="text">
                        Salmon offers high levels of omega-3 fatsEPA and DHa and is highly beneficial for decreasing the risk of heart diseases, diabetes and obesity.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*end card*/}
              {/*start card*/}
              <div className="col-md-4 col-sm-6 col-12">
                <div className="info-card">
                  <div className="info-card-img">
                    <img src={freshFish} alt="" className="img-fluid"/>
                  </div>
                  <div className="info-card-content p-3">
                    <h3 className="info-card-title">FRESH SALMON EVERYDAY DIRECTLY FROM THE U.S.</h3>
                    <div className="info-card-text">
                      <div className="text">
                        From the ocean in Mainethrough processing and freight,fresh salmon is delivered all over the US in a matter of hours.We arepassionateand dedicated to bring to the American marketaproduct that is both fresh, healthy and environmentally friendly.
                      </div>
                      <div className="text">
                        Salmon from American Aquafarms ensures that youcanenjoy a unique freshness and a superior taste.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*end card*/}
            </div>
          </div>
        </div>
      </div>

      <div className={
        props.scroll3D > scrollLast ? "panel-on "
          : " panel-off"
      } id="row-cta">
        <div className="col text-center mt-4 pt-3">
          <button className="btn btn-outline-dark rounded-0 px-4 py-2"
                  data-targetmodal={"about"}
                  onClick={e => openModal(e)}>
            ABOUT US
          </button>
        </div>
      </div>
    </>
  );
};

export default PanelLast;

/*
     const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, 'models/juan/003/Salmon-Steak-16.gltf')
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) =>
  {
  mixer.update(delta);

  let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, .8);
  group.current.rotation.x =  degrees.y;
  group.current.rotation.y =  degrees.x;

  })
  return (
    <group ref={group} {...props} dispose={null} position={[0, -2, 0]} scale={[.5, .5, .5]} rotation={[0, 70.2, 0]}>
      <mesh
        material={materials.Mat}
        geometry={nodes.Salmon.geometry}
        position={[0, -0.18, 0]}
        rotation={[Math.PI, -0.81, 0]}
      />
      </group>
    )
  */

/*
   const group = useRef()
    const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/juan/002/Salmon-steak-Fixed-Spec-Ver-2.gltf')

    const actions = useRef()
    const [mixer] = useState(() => new THREE.AnimationMixer())
    useFrame((state, delta) =>
     {
      mixer.update(delta);

      let degrees = getMouseDegrees (props.mouse.current.x, props.mouse.current.y, .2);

      group.current.rotation.x =  degrees.y;
      group.current.rotation.y =  degrees.x;

    })
    useEffect(() => {
      actions.current = {
        Anim_0_Sphere: mixer.clipAction(animations[0], group.current),
      }
      return () => animations.forEach((clip) => mixer.uncacheClip(clip))
    }, [])
    return (
      <group ref={group} position={[5, 0, 0]} {...props} dispose={null} scale={[.04, .04, .04]}>
        <group position={[-74.14, 11.92, -78.71]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials['Mat.9']}
            geometry={nodes.Sphere.geometry}
            position={[73.67, 78.7, 10.96]}
            rotation={[0.1, 0.62, 2.78]}
            scale={[0.9, 0.9, 0.9]}>
            <group position={[27.86, 105.82, -59.95]} rotation={[-0.14, 0.62, -2.74]} scale={[1.11, 1.11, 1.11]}>
              <mesh
                material={materials.Glass}
                geometry={nodes.Sphere001.geometry}
                position={[80.15, 76.62, 17.82]}
                rotation={[0.11, 0.62, 2.75]}
                scale={[1.02, 1.02, 1.02]}
              />
            </group>
          </mesh>
          <mesh
            material={materials['Mat.8']}
            geometry={nodes.Fish.geometry}
            position={[73.97, 78.72, 11.69]}
            rotation={[0.03, 0.52, 2.87]}
          />
        </group>
      </group>
    )
  */
