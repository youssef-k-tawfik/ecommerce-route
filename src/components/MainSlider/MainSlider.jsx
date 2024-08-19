// import Style from './MainSlider.module.css';

import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="grid grid-cols-4">
        <div className="col-span-3 row-span-2">
          <Slider {...settings}>
            <img
              src="https://img.freepik.com/premium-photo/fresh-root-vegetables-herbs-healthy-food-autumn-cooking-concept-gray-background-with-negative-space-top-view_630207-2611.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
            <img
              src="https://www.thepowdershampoo.com/cdn/shop/files/Group-new.jpg"
              alt=""
              className="w-full h-full "
            />
          </Slider>
        </div>
        <div>
          <img
            src="https://www.thepowdershampoo.com/cdn/shop/files/Group-new.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src="https://assets.cntraveller.in/photos/64475681c810805ead8e34aa/16:9/w_2112,h_1188,c_limit/GettyImages-1305078018.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
