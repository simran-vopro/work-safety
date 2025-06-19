export const BASE_URL = "https://work-safety-backend.onrender.com";
export const IMAGE_URL = "https://work-safety-backend.onrender.com/static";

// export const BASE_URL = "http://localhost:3000";
// export const IMAGE_URL = "http://localhost:3000/static";

export const API_PATHS = {
  LOGIN: `${BASE_URL}/api/auth/login`,
  EDIT_PROFILE : `${BASE_URL}/api/auth/edit`,
  CHANGE_PASSWORD : `${BASE_URL}/api/auth/change-password`,

  CATEGORIES: `${BASE_URL}/api/categories/nested-categories`,
  PRODUCTS: `${BASE_URL}/api/products`,
  GET_PRODUCT: `${BASE_URL}/api/products/get-product`,

  TOP_BANNERS: `${BASE_URL}/api/banner`,
  GET_FLOATING_BANNER: `${BASE_URL}/api/banner/getFloatingBanner`,

  TOP_CATEGORIES: `${BASE_URL}/api/categories/top-categories`,
  GET_BRANDS: `${BASE_URL}/api/categories/brands`,

  ADD_TO_CART: `${BASE_URL}/api/cart/add`,
  GET_CART: `${BASE_URL}/api/cart`,
  UPDATE_CART: `${BASE_URL}/api/cart/update`,
  REMOVE_CART_ITEM: `${BASE_URL}/api/cart/remove`,


  PLACE_ORDER: `${BASE_URL}/api/order/request-quote`,
  GET_ORDER: `${BASE_URL}/api/order/get-order`,
  EDIT_ORDER: `${BASE_URL}/api/order/edit-order`,
  SEND_QUERY: `${BASE_URL}/api/query/send-query`,

  GET_ALL_ORDERS: `${BASE_URL}/api/order/get-all-orders`,



};

