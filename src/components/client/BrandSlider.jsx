import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
import { IoChevronForward } from "react-icons/io5";
register();
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
// import required modules
import { Grid, Navigation } from "swiper/modules";

export default function BrandSlider() {
    return (
        <div className="container mx-auto mt-6 px-2 pb-2 xl:max-w-7xl">
            <div className="h-64 bg-neutral-50 shadow">
                <div className="brand-wrap h-56">
                    <div className="flex justify-between  px-3 pt-2 text-orange-600">
                        <h2 className="text-lg uppercase">Brands</h2>
                        <span className="flex cursor-pointer items-center text-sm underline">
                            See All <IoChevronForward />
                        </span>
                    </div>
                    <Swiper
                        navigation={true}
                        slidesPerView={6}
                        grid={{
                            rows: 2,
                        }}
                        spaceBetween={1}
                        modules={[Grid, Navigation]}
                        className="mx-auto h-full w-full"
                    >
                        {Array.from({ length: 14 }, (_, i) => {
                            return (
                                <SwiperSlide key={i} className="card h-28 w-52">
                                    <img
                                        className="h-full w-full object-contain"
                                        src="../public/images/ssb.jpg"
                                        alt=""
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
