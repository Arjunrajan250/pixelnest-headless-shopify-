export type ProductCategory = 'Peripherals' | 'Displays' | 'Power & Charging' | 'Home & Living' | 'Desk Setup' | 'Others';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'INR';

export interface ProductVariant {
  id: string;
  title: string;
  price?: number;
  inStock: boolean;
  colorHex?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  country?: string;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  subtitle?: string;
  description: string;
  category: ProductCategory;
  subCategory?: string;
  price: number; // Base price in USD
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  reviews?: ProductReview[];
  imageUrl: string;
  gallery: string[];
  features: string[];
  specs?: Record<string, string>;
  whatsInTheBox?: string[];
  variants?: ProductVariant[];
  warranty?: string;
  shippingInfo?: string;
  shippingSuitability?: 'Standard Parcel' | 'Freight / Bulky' | 'Lightweight Express';
  weightKg?: number;
  inStock?: boolean;
  inventoryCount?: number;
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
  selectedVariant?: ProductVariant;
}

export type OrderStatus = 'Completed' | 'Processing' | 'Cancelled';

export type PaymentMethod = 'card' | 'paypal' | 'shopify' | 'apple_pay' | 'upi';

export interface Address {
  id: string;
  type: string;
  isDefault: boolean;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  defaultAddressId?: string;
  createdAt: string;
  shopifyCustomerId?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "PN-24876"
  customerName: string;
  customerEmail: string;
  shippingAddress?: string;
  items: CartItem[];
  currency: Currency;
  subtotal: number;
  discount: number;
  discountCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  date: string; // ISO or human readable
  deliveryDate: string;
  trackingNumber?: string;
  trackingCarrier?: string;
  trackingUrl?: string;
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

export type TrustPolicyType = 
  | 'about' 
  | 'contact' 
  | 'shipping' 
  | 'returns' 
  | 'privacy' 
  | 'terms' 
  | 'faq' 
  | 'tracking';

