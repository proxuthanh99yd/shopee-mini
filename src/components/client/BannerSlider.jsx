import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function BannerSlider() {
    return (
        <div className="container mx-auto mt-6 px-2 pb-2 xl:max-w-7xl">
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
                <SwiperSlide>
                    <img
                        className="h-full w-full object-cover"
                        src="../public/images/banner-1.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="h-full w-full object-cover"
                        src="../public/images/banner-2.png"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="h-full w-full object-cover"
                        src="../public/images/banner-3.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="h-full w-full object-cover"
                        src="../public/images/banner-4.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="h-full w-full object-cover"
                        src="../public/images/banner-5.png"
                        alt=""
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
