

export const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'; // Fallback for local development

export const USERS_URL = `${BASE_URL}/api/users`;
export const CATEGORY_URL = `${BASE_URL}/api/category`;
export const PRODUCT_URL = `${BASE_URL}/api/products`;
export const UPLOAD_URL = `${BASE_URL}/api/upload`;
export const CART_URL = `${BASE_URL}/api/cart`;

