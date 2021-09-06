import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

SwiperCore.use([Navigation]);

const SwiperContainer = styled.div`
  max-width: 700px;
`;

const ImageSwiper = ({ images }) => {
  return (
    <SwiperContainer>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          prevEl: `.prev`,
          nextEl: `.next`,
        }}
      >
        {images.map((image) => {
          return (
            <SwiperSlide key={image}>
              <img src={`http://localhost:8000${image}`} />
            </SwiperSlide>
          );
        })}
        <button type="button" className={`prev`}>
          <span>Slider prev button</span>
        </button>
        <button type="button" className={`next`}>
          <span>Slider next button</span>
        </button>
      </Swiper>
    </SwiperContainer>
  );
};

export default ImageSwiper;
