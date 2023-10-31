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
            <div className="container mx-auto mb-6 mt-10 flex gap-4 px-2 pb-2 xl:max-w-7xl">
                <div className="basis-2/12">
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
