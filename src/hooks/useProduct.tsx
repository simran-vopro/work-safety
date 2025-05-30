import { useState } from 'react';
import { API_PATHS } from '../utils/config';
import useFetch from './useFetch';

interface Category {
    _id: string;
    image?: string;
    icon?: string;
    Category1?: string;
    Category2?: string;
    "Image Ref"?: string;
    Category1Id?: string;
    Category2Id?: string;
}

export interface ProductType {
    _id: string;
    Code: string;
    Description: string;
    Pack: number;
    rrp: number;
    GrpSupplier: string;
    GrpSupplierCode: string;
    Manufacturer: string;
    ManufacturerCode: string;
    ISPCCombined: number;
    VATCode: number;
    Brand: string;
    ExtendedCharacterDesc: string;
    CatalogueCopy: string;
    "Image Ref": string;
    Style: string;
    Category1: Category;
    Category2: Category;
    Category3: Category;
}



type UseProductsOptions = {
    search?: string;
    page?: number;
    limit?: number;
};


const useProducts = (options: UseProductsOptions = {}) => {


    const {
        search = "",
        page = 1,
        limit = 20,
    } = options;

    const { data, loading: productLoading, error, total } = useFetch<ProductType[]>(API_PATHS.PRODUCTS, {
        page,
        limit,
        search,
    });

    const products = data ?? [];
    const totalPages = Math.ceil(total / limit);

    return {
        products,
        productLoading,
        error,
        total,
        totalPages,
    };
};


export default useProducts;
