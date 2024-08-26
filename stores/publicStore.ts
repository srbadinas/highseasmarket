import { ListingProductDto } from "@/types/objects/ListingProductDto";
import { getError } from "@/utils/getError";
import axios, { AxiosError } from "axios";
import { create } from "zustand";

interface PublicStore {
    newestProducts: ListingProductDto[],
    loading: boolean,
    error: string,
    initStore: () => void;
}

export const usePublicStore = create<PublicStore>((set) => ({
    newestProducts: [],
    loading: false,
    error: '',
    initStore: () => {
        set({ loading: true, error: '' });
        axios(`${process.env.NEXT_PUBLIC_BASE_URI}/api/listings/products`)
        .then(res => {
            if (res.status !== 200) return;
            const { data }: { data: ListingProductDto[] } = res.data;
            set({ newestProducts: data ?? [], loading: false, error: '' });
        })
        .catch((err: AxiosError) => {
            const errorMessage = getError(err);
            set({ newestProducts: [], loading: false, error: errorMessage });
            return;
        });
    }
}))