export const productsInitState = {
    searchParam: "",
    currentPage: 1,
    totalPage: 1,
    links: [],
    firstLoading: false,
    isError: false,
    isLoading: true,
    results: [],
    result: {
        id: '',
        name: '',
        description: '',
        image: [],
        imagePreview: [],
        active: '',
        discount: '',
        category_id: '',
        brand_id: '',
        thumbnails: [],
        classification: {},
        classify: [],
        thumbPreviews: [],
        brand: '',
    },
    errorMsg: "",
    sort: "updated_at.desc",
    categoryFilter: "",
    brandFilter: "",
    sameProducts: []
}
