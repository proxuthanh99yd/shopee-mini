import { useDispatch, useSelector } from "react-redux";
import { BannerSlider, ListProduct, Sidebar } from "../../components/client";
import { useEffect } from "react";
import { fetchBrands } from "../../features/brands/brandsThunkApi";
import { fetchCategories } from "../../features/categories/categoriesThunkApi";
import { fetchProducts } from "../../features/products/productsThunkApi";

export default function HomePage() {
    const { results: brandResults } = useSelector((state) => state.brands);
    const { results: categoryResults } = useSelector(
        (state) => state.categories,
    );
    const { results: productResults } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBrands());
        dispatch(fetchCategories());
        dispatch(fetchProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <BannerSlider />
            <div className="container mx-auto mb-6 mt-10 flex gap-4 px-2 pb-2 xl:max-w-7xl">
                <div className="basis-2/12">
                    <Sidebar
                        brandResults={brandResults}
                        categoryResults={categoryResults}
                    />
                </div>
                <div className="flex-1">
                    <ListProduct productResults={productResults} />
                </div>
            </div>
        </>
    );
}
