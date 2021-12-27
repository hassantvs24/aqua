import React from 'react';
import madeInAmerica from "../../images/footer-001.jpg";
import good4Health from "../../images/footer-002.jpg";
import freshFish from "../../images/footer-003.jpg";
import {useDispatch} from "react-redux";
import {OPEN_MODAL, openModalAction} from "../../redux/modal/actions";

export default function Sec7InfoCards() {
  const dispatch = useDispatch()
  const openModal = (e) => {
    e.preventDefault()
    dispatch(openModalAction(OPEN_MODAL, e.target.dataset.targetmodal))
  }
  return (
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
        <div className="row">
          <div className="col text-center mt-4 pt-3">
            <button className="btn btn-outline-dark rounded-0 px-4 py-2"
                    data-targetmodal={"about"}
                    onClick={e => openModal(e)}>
              ABOUT US
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};