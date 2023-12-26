import { Container, Rating } from "@mui/material";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Reviews = () => {
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axios.get("./reviews.json");
      return res.data;
    },
  });

  return (
    <Container maxWidth="xl">
      <SectionTitle title="Reviews" justify="justify-center" />
      <div className="py-7">
        {/* for desktop and tablet */}
        <div className="my-5 hidden md:block">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {reviews?.map((review, index) => (
              <SwiperSlide
                className="md:h-[380px] shadow-md shadow-tertiary bg-secondary text-primary rounded-xl"
                key={index}
              >
                <div className="text-center py-5 px-5 space-y-3">
                  <img
                    className="lg:w-[180px] lg:h-[180px] md:w-[130px] md:h-[130px] rounded-full object-cover mx-auto"
                    src={review?.img}
                    alt={review?.name}
                  />
                  <h3 className="text-xl font-bold">{review?.name}</h3>
                  <p className="max-h-[100px]  overflow-y-scroll">
                    {review?.review}
                  </p>
                  <Rating
                    name="read-only"
                    value={review?.rating}
                    className="text-primary"
                    readOnly
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* for mobile */}
        <div className="flex md:hidden flex-col gap-5">
          {reviews?.map((review, idx) => (
            <div
              key={idx}
              className="text-center py-5 px-5 space-y-3 md:h-[350px] 
              shadow-md shadow-tertiary bg-secondary text-primary rounded-xl"
            >
              <img
                className="w-24 border-2 border-primary h-24 rounded-full object-cover mx-auto"
                src={review?.img}
                alt={review?.name}
              />
              <h3 className="text-xl font-bold">{review?.name}</h3>
              <p className="max-h-[100px]  overflow-y-scroll">
                {review?.review}
              </p>
              <Rating
                name="read-only"
                value={review?.rating}
                className="text-primary"
                readOnly
              />
              <p></p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Reviews;
