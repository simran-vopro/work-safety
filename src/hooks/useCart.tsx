import { sessionId, type CartItem } from '../pages/cartPage';
import { API_PATHS } from '../utils/config'
import useFetch from './useFetch';

const useCart = () => {
    const { data, fetchData, loading, error } = useFetch<{ _id: string; sessionId: string; items: CartItem[] }[]>(API_PATHS.GET_CART, { sessionId });

    const cartdata = data || [];
    const cartLoading = loading;
    const cartError = error;

    return { cartdata, fetchData, cartLoading, cartError };
};


export default useCart;