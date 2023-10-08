// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";

export default function SameProductSlider() {
    return (
        <>
            <Swiper
                style={{
                    height: "100%",
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                slidesPerView={6}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
            >
                {Array.from({ length: 10 }, (_, i) => {
                    return (
                        <SwiperSlide key={i}>
                            <div className="cursor-pointer rounded-sm bg-neutral-50">
                                <div>
                                    <img
                                        className="h-full w-full object-cover"
                                        src="../public/images/product.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col justify-between gap-3 p-2">
                                    <p className="line-clamp-2 text-left text-sm">
                                        Bộ giấy vệ sinh dây sạc nhanh PD20W
                                        Bu27,cáp sạc bọc dù chống đứt, xạc nhanh
                                        truyền dữ liệu
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className=" text-orange-500">
                                            $80000
                                        </span>
                                        <span className="text-sm text-neutral-600">
                                            512 sold
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}
