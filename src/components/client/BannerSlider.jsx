import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function BannerSlider() {
    return (
        <div className="container mx-auto mt-6 hidden px-2 pb-2 md:block lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
            <Swiper
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                navigation={true}
                modules={[Autoplay, Navigation, Pagination]}
                className=""
            >
                {Array.from({ length: 5 }, (_, i) => {
                    return (
                        <SwiperSlide key={i}>
                            <img
                                // style={{ objectFit: "contain", height: "auto" }}
                                className="h-auto w-full"
                                src={`/images/banner-${i + 1}.jpg`}
                                alt=""
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
