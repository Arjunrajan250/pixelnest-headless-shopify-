export type ProductCategory = 'Peripherals' | 'Displays' | 'Power & Charging' | 'Home & Living' | 'Desk Setup' | 'Others';

export interface Product {
  id: string;
  title: string;
  handle: string;
  subtitle?: string;
  description: string;
  category: ProductCategory;
  subCategory?: string; // 'Mice' | 'Keyboards' | 'Monitors' | 'Chargers' | 'Lighting' | 'Hooks'
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  gallery: string[];
  features: string[];
  specs?: Record<string, string>;
  warranty?: string;
  shippingInfo?: string;
  inStock?: boolean;
  status: 'active' | 'draft';
  downloadUrl?: string;
  downloadFileName?: string;
  fileSize?: string;
  isTrending?: boolean;
  createdAt: string;
  shopifyId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Completed' | 'Processing' | 'Cancelled';

export type PaymentMethod = 'upi' | 'card' | 'paypal' | 'shopify';

export interface Order {
  id: string;
  orderNumber: string; // e.g. "DN24876"
  customerName: string;
  customerEmail: string;
  shippingAddress?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  date: string; // ISO or human readable
  deliveryDate: string;
  shopifyCheckoutUrl?: string;
}

export interface ShopifyConfig {
  shopDomain: string; // e.g., 'your-store.myshopify.com'
  storefrontAccessToken: string;
  adminAccessToken?: string;
  apiVersion: string;
  isConnected: boolean;
  liveMode: boolean;
  lastSyncTime?: string;
}

export type AppMode = 'storefront' | 'admin';
export type DeviceView = 'responsive' | 'mobile-mockup';
export type StorefrontTab = 'home' | 'categories' | 'planners' | 'product-detail' | 'cart' | 'checkout' | 'orders' | 'profile';
export type AdminTab = 'overview' | 'products' | 'orders' | 'shopify-settings';
