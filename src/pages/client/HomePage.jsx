import {
    BannerSlider,
    BrandSlider,
    ListProduct,
    Sidebar,
} from "../../components/client";

export default function HomePage() {
    return (
        <>
            <BannerSlider />
            <BrandSlider />
            <div className="container mx-auto mb-6 mt-20 flex gap-4 px-2 pb-2 xl:max-w-7xl">
                <div className="basis-2/12">
                    <Sidebar />
                </div>
                <div className="flex-1">
                    <ListProduct />
                </div>
            </div>
        </>
    );
}
