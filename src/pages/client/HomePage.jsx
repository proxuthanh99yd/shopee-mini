import { useDispatch, useSelector } from "react-redux";
import { BannerSlider, ListProduct, Sidebar } from "../../components/client";
import { useEffect } from "react";
import { fetchBrands } from "../../features/client/brands/brandsThunkApi";
import { fetchCategories } from "../../features/client/categories/categoriesThunkApi";
import { fetchProducts } from "../../features/client/products/productsThunkApi";
import {
    clearFilter,
    setCurrentPage,
    setFilter,
    setSort,
} from "../../features/client/products/productsSlice";

export default function HomePage() {
    const { sidebar } = useSelector((state) => state.account);
    const { results: brandResults } = useSelector((state) => state.brands);
    const { results: categoryResults } = useSelector(
        (state) => state.categories,
    );
    const {
        results: productResults,
        sort,
        brandFilter,
        categoryFilter,
        totalPage,
        currentPage,
    } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBrands());
        dispatch(fetchCategories());
        dispatch(fetchProducts({ sort }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        dispatch(
            fetchProducts({
                sort,
                brandFilter,
                categoryFilter,
                page: currentPage,
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, brandFilter, categoryFilter, currentPage]);
    const handleSort = (value) => {
        dispatch(setSort(value));
    };
    const handleSetFilter = (value) => {
        dispatch(setFilter(value));
    };
    const handleClearFilter = () => {
        dispatch(clearFilter());
    };
    const handlePageClick = (select) => {
        dispatch(setCurrentPage(select.selected));
    };
    return (
        <>
            <BannerSlider />
            <div className="container mx-auto mb-6 mt-5 px-2 pb-2 md:mt-10 md:flex md:gap-4 lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
                <div
                    className={`${
                        sidebar ? "translate-x-0" : ""
                    } fixed bottom-14 left-0 right-0 top-0 z-[9999] -translate-x-full bg-orange-100 transition-transform md:static md:block md:basis-2/12 md:translate-x-0 md:bg-transparent`}
                >
                    <Sidebar
                        handleClearFilter={handleClearFilter}
                        brandFilter={brandFilter}
                        categoryFilter={categoryFilter}
                        handleSetFilter={handleSetFilter}
                        brandResults={brandResults}
                        categoryResults={categoryResults}
                    />
                </div>
                <div className="flex-1">
                    <ListProduct
                        currentPage={currentPage}
                        sort={sort}
                        handleSort={handleSort}
                        productResults={productResults}
                        handlePageClick={handlePageClick}
                        pageCount={totalPage}
                    />
                </div>
            </div>
        </>
    );
}
