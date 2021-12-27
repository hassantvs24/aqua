import React from "react";
import bgProcessingHatchery from '../../images/bg-0005.jpg'

export default function Sec5ProcessingHatchery() {
  return (
    <div className="section section-final-product" style={{ backgroundImage: `url(${bgProcessingHatchery})`}}>
      <div className="container">
        <div className="row align-items-center align-content-center">
          
          <div className="content-col col-12 offset-lg-7 col-lg-5 text-center text-md-left bg-light">
            <div className="section-number">05.</div>
            <h2 className="section-title">PROCESSING AND HATCHERY</h2>
            <div className="section-text text mt-3">
              The finished product.
            </div>
            <div className="section-text text mt-3">
              Superior salmon born and raised in Maine is transformed into first class products for the American market.
            </div>
            <div className="section-text text mt-3">
              Our eco friendly production and close access to the market ensures a low carbon footprint, and provides access to fresh and healthy products with exquisite taste.
            </div>
            <div className="section-text text mt-3">
              Salmon from American aquafarms is highly beneficial for your health with high levels of omega 3 fats, EPA and DHA, decreasing the risk for heart diseases, diabetes and obesity.
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
