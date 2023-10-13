export const productsInitState = {
    searchParam: "",
    filter: "all",
    currentPage: 1,
    totalPage: 0,
    links: [],
    firstLoading: false,
    isError: false,
    isLoading: true,
    results: [],
    create: {
        name: '',
        description: '',
        image: [],
        imagePreview: [],
        active: 0,
        discount: 0,
        category_id: 0,
        brand_id: 0,
        thumbnails: [],
        classification: {
            name: ""
        },
        classify: [{
            name: "",
            price: 0,
            stock: 0
        }],
        thumbPreviews: []
    },
    deleted: false,
    edit: {
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
        thumbPreviews: []
    },
    status: "",
    errorMsg: ""
}
