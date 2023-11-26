import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import slide_bg from "../../../assets/slide-bg.png";
import { Container } from "@mui/material";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios.get("/banner.json").then((res) => setBanners(res.data));
  }, []);
  return (
    <Container maxWidth="xl">
      <div className="pt-4">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div
                className="w-full min-h-[40vh] md:min-h-[85vh] bg-center bg-no-repeat bg-cover  flex justify-end"
                style={{ backgroundImage: `url(${banner.imageSrc})` }}
              >
                {/* <div className=" hidden md:block"></div> */}
                <div
                  className="w-full md:w-[70%] bg-no-repeat bg-cover p-4  grid place-items-center bg-blend-overlay md:bg-blend-normal md:bg-[#00000000] bg-[#00000065]"
                  style={{ backgroundImage: `url(${slide_bg})` }}
                >
                  <div className="md:w-[400px] mx-auto  mr-0 md:mr-28">
                    <h2 className="text-left text-primary md:text-3xl text-lg font-semibold font-lora">
                      {banner.title}
                    </h2>
                    <p className="text-base md:text-xl py-4 text-[#d8d3b3]">
                      {banner.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default Banner;
