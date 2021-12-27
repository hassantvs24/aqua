import React from "react";
import MadeInUsLogo from "../../images/made-in-us.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import slide1 from '../../images/modal/egg/american-grown-01.jpg'
import slide2 from '../../images/modal/egg/american-grown-02.jpg'
import slide3 from '../../images/modal/egg/american-grown-03.jpg'

export default function EggModalContent() {
  return (
    <div className={"custom-modal-content egg-modal"}>
      <div className="top-slideshow">
        <Carousel 
          showArrows={false} showIndicators={false} infiniteLoop={true}
          showThumbs={false} autoPlay={true} interval={3000} stopOnHover={false}
          showStatus={true} transitionTime={150} swipeScrollTolerance={5}
        >
          <div>
            <img src={slide1} alt={"slide1"}/>
          </div>
          <div>
            <img src={slide2} alt={"slide2"}/>
          </div>
          <div>
            <img src={slide3} alt={"slide3"}/>
          </div>
        </Carousel>
      </div>
      
      <div className="container-fluid">
        <div className="row">
          <div className="col p-0">
            <div className="modal-subtitle">
              MADE IN AMERICA, FOR AMERICA
            </div>
            {/*<div>*/}
            {/*  <img src={MadeInUsLogo} alt="made in usa" width={90}/>*/}
            {/*</div>*/}
            <div className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet id nisl in pellentesque. In vel nunc lacus. Vivamus vulputate neque eu sem varius, vitae consequat dolor pretium. Aliquam luctus elit sed velit mattis, id laoreet sem ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
