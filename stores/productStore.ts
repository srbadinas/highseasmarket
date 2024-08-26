import { ProductDto } from "@/types/objects/ProductDto";
import { getError } from "@/utils/getError";
import axios, { AxiosError } from "axios"
import { create } from "zustand"

type ProductStore = {
    products: ProductDto[],
    loading: boolean,
    error: string,
    fetchProducts: (token: string) => void,
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    loading: false,
    error: '',
    fetchProducts: (token) => {
        set({ loading: true, error: '' });
        axios(`${process.env.NEXT_PUBLIC_BASE_URI}/api/products`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.status !== 200) return;
            const { data }: { data: ProductDto[] } = res.data;
            set({ products: data ?? [], loading: false, error: '' });
        })
        .catch((err: AxiosError) => {
            const errorMessage = getError(err);
            set({ products: [], loading: false, error: errorMessage });
            return;
        });
    }
}))