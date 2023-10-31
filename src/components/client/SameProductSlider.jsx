// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import PropTypes from "prop-types";
import {
    discountCalculator,
    maxPriceCalculator,
    minPriceCalculator,
    stockCalculator,
} from "../../utils/helper";
import { Link } from "react-router-dom";
import { IoStar } from "react-icons/io5";

export default function SameProductSlider({ sameProducts }) {
    return (
        <>
            <Swiper
                style={{
                    height: "100%",
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                slidesPerView={5}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
            >
                {sameProducts.map((product) => {
                    return (
                        <SwiperSlide key={product.id}>
                            <Link
                                to={`/product/${product.id}`}
                                className="w-full cursor-pointer rounded-sm bg-neutral-50 shadow-sm"
                                key={product.id}
                            >
                                <div className="relative h-56 w-auto p-4">
                                    {product.discount ? (
                                        <span className="absolute right-0 top-0 rounded-bl-lg bg-yellow-300 px-2 py-1 text-sm text-red-500">
                                            -{product.discount}%
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                    <img
                                        style={{ objectFit: "contain" }}
                                        className="h-full w-auto"
                                        src={
                                            import.meta.env.VITE_IMAGE_LINK +
                                            product.image
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="flex h-32 flex-col justify-between p-2">
                                    <p className="line-clamp-2 flex-1 text-sm hover:text-orange-500">
                                        {product.name}
                                    </p>
                                    <span className="my-2 flex flex-col text-base text-orange-500">
                                        <span className="text-xs text-neutral-500 line-through">
                                            $
                                            {minPriceCalculator(
                                                product.classify,
                                            ).toFixed(1)}
                                            {" - "}$
                                            {maxPriceCalculator(
                                                product.classify,
                                            ).toFixed(1)}
                                        </span>
                                        $
                                        {discountCalculator(
                                            minPriceCalculator(
                                                product.classify,
                                            ),
                                            product.discount,
                                        ).toFixed(1)}
                                        {" - "}$
                                        {discountCalculator(
                                            maxPriceCalculator(
                                                product.classify,
                                            ),
                                            product.discount,
                                        ).toFixed(1)}
                                    </span>
                                    <div className="flex items-center justify-between gap-1 text-yellow-500">
                                        <span className="flex">
                                            <IoStar />
                                            <IoStar />
                                            <IoStar />
                                            <IoStar />
                                            <IoStar />
                                        </span>
                                        <span className="text-sm text-neutral-600">
                                            {stockCalculator(product.classify)}{" "}
                                            sold
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}

SameProductSlider.propTypes = {
    sameProducts: PropTypes.array,
};
