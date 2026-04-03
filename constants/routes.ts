export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  ARTISANS: '/artisans',
  ARTISAN_PROFILE: (id: string) => `/artisans/${id}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  ACCOUNT: '/account',
  ACCOUNT_EDIT: '/account/edit',
  ARTISAN_MANAGE: (id: string) => `/artisans/${id}/manage`,
} as const;
