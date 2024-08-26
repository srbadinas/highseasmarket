import { ProductCategoryDto } from "@/types/objects/ProductCategoryDto"
import { UnitDto } from "@/types/objects/UnitDto"
import axios from "axios"
import { create } from "zustand"

type DashboardStore = {
    productCategories: ProductCategoryDto[],
    units: UnitDto[],
    loading: boolean,
    initStore: () => void,
}

export const useDashboardStore = create<DashboardStore>((set) => ({
    productCategories: [],
    units: [],
    loading: false,
    initStore: async () => {
        set({ loading: true });

        const productCategoryData = await axios(`${process.env.NEXT_PUBLIC_BASE_URI}/api/productCategories`)
            .then(res => {
                if (res.status !== 200) return;
                const { data }: { data: ProductCategoryDto[] } = res.data;
                return data;
            })
            .catch(err => {
                console.error(err);
            });

        const unitData = await axios(`${process.env.NEXT_PUBLIC_BASE_URI}/api/units`)
            .then(res => {
                if (res.status !== 200) return;
                const { data }: { data: UnitDto[] } = res.data;
                return data;
            })
            .catch(err => {
                console.error(err);
            });

        set({ productCategories: productCategoryData ?? [], units: unitData ?? [], loading: false });
    }
}))