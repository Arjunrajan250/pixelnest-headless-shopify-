import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  OrderStatus, 
  ShopifyConfig, 
  AppMode, 
  DeviceView, 
  StorefrontTab, 
  AdminTab 
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_SHOPIFY_CONFIG } from '../data/initialData';
import { fetchShopifyProducts } from '../services/shopify';

export interface StoreContextType {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  wishlist: string[];
  shopifyConfig: ShopifyConfig;
  appMode: AppMode;
  deviceView: DeviceView;
  activeTab: StorefrontTab;
  adminTab: AdminTab;
  selectedProduct: Product | null;
  searchQuery: string;
  appliedCoupon: string | null;
  discountAmount: number;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  
  // Navigation & UI controls
  setAppMode: (mode: AppMode) => void;
  setDeviceView: (view: DeviceView) => void;
  setActiveTab: (tab: StorefrontTab) => void;
  setAdminTab: (tab: AdminTab) => void;
  setSelectedProduct: (product: Product | null) => void;
  setSearchQuery: (query: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;

  // Cart operations
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  toggleWishlist: (productId: string) => void;

  // Order management
  createOrder: (orderInfo: {
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    paymentMethod: Order['paymentMethod'];
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Product management (Admin)
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Shopify integration
  updateShopifyConfig: (updates: Partial<ShopifyConfig>) => void;
  syncShopifyProducts: () => Promise<{ success: boolean; message: string }>;

  // Digital download helper
  triggerDownload: (product: Product) => void;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence via localStorage with clean versioning for hardware catalog
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pixelnest_hardware_products_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    localStorage.removeItem('pixelnest_products');
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('pixelnest_hardware_orders_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    localStorage.removeItem('pixelnest_orders');
    return INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('pixelnest_hardware_cart_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    localStorage.removeItem('pixelnest_cart');
    // Default initial cart: Ergonomic Wireless Mouse (1499) + 140W GaN Fast Charger (2899)
    return [
      { product: INITIAL_PRODUCTS[0], quantity: 1 },
      { product: INITIAL_PRODUCTS[3], quantity: 1 }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('pixelnest_hardware_wishlist_v2');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
  });

  const [shopifyConfig, setShopifyConfig] = useState<ShopifyConfig>(() => {
    const saved = localStorage.getItem('pixelnest_shopify_config');
    return saved ? JSON.parse(saved) : INITIAL_SHOPIFY_CONFIG;
  });

  // UI States
  const [appMode, setAppMode] = useState<AppMode>('storefront');
  const [deviceView, setDeviceView] = useState<DeviceView>('responsive');
  const [activeTab, setActiveTab] = useState<StorefrontTab>('home');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('FIRST10');
  const [discountAmount, setDiscountAmount] = useState<number>(440);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Sync back to localStorage
  useEffect(() => {
    localStorage.setItem('pixelnest_hardware_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('pixelnest_hardware_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('pixelnest_hardware_cart_v2', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('pixelnest_hardware_wishlist_v2', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('pixelnest_shopify_config', JSON.stringify(shopifyConfig));
  }, [shopifyConfig]);

  // Recalculate discount whenever cart or applied coupon changes
  useEffect(() => {
    if (appliedCoupon === 'FIRST10') {
      const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
    } else if (appliedCoupon === 'WELCOME100') {
      setDiscountAmount(100);
    } else {
      setDiscountAmount(0);
    }
  }, [cart, appliedCoupon]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const applyCoupon = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'FIRST10' || trimmed === 'WELCOME100') {
      setAppliedCoupon(trimmed);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Order creation
  const createOrder = ({
    customerName,
    customerEmail,
    shippingAddress,
    paymentMethod
  }: {
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    paymentMethod: Order['paymentMethod'];
  }): Order => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const total = Math.max(0, subtotal - discountAmount);
    const orderNumber = `DN${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      customerName,
      customerEmail,
      shippingAddress,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      discountCode: appliedCoupon || undefined,
      total,
      paymentMethod,
      status: 'Completed',
      date: new Date().toISOString(),
      deliveryDate: `Delivered on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              status,
              deliveryDate: status === 'Completed' ? `Delivered on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}` : status === 'Processing' ? 'Processing fulfillment' : 'Order Cancelled'
            }
          : order
      )
    );
  };

  // Product CRUD (Admin)
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      handle: productData.handle || productData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(prod => (prod.id === id ? { ...prod, ...updates } : prod))
    );
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(prev => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(prod => prod.id !== id));
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(null);
    }
  };

  // Shopify sync
  const updateShopifyConfig = (updates: Partial<ShopifyConfig>) => {
    setShopifyConfig(prev => ({ ...prev, ...updates }));
  };

  const syncShopifyProducts = async () => {
    if (!shopifyConfig.shopDomain || !shopifyConfig.storefrontAccessToken) {
      return { success: false, message: 'Please enter your Shopify store domain and Storefront token.' };
    }

    const res = await fetchShopifyProducts(shopifyConfig);
    if (res.success && res.products && res.products.length > 0) {
      // Merge with current catalog
      setProducts(prev => {
        const existingIds = new Set(res.products!.map(p => p.id));
        const kept = prev.filter(p => !existingIds.has(p.id));
        return [...res.products!, ...kept];
      });
      setShopifyConfig(prev => ({
        ...prev,
        isConnected: true,
        lastSyncTime: new Date().toLocaleTimeString()
      }));
      return { success: true, message: `Successfully synced ${res.products.length} products from Shopify!` };
    } else {
      return {
        success: false,
        message: res.error || 'Failed to fetch products from Shopify Storefront API.'
      };
    }
  };

  // Interactive Warranty Slip & Guide Download Handler
  const triggerDownload = (product: Product) => {
    const filename = product.downloadFileName || `${product.title.replace(/\s+/g, '_')}_Warranty_Slip.pdf`;
    
    // Generate an authentic minimalist aesthetic document
    const content = `%PDF-1.4
%âãÏÓ
1 0 obj
<< /Title (${product.title} - Warranty & User Guide)
   /Author (PixelNest Hardware & Gear)
   /Subject (Hardware Official Warranty & Specs)
   /Creator (PixelNest Headless Commerce)
>>
endobj
2 0 obj
<< /Type /Catalog /Pages 3 0 R >>
endobj
3 0 obj
<< /Type /Pages /Kids [4 0 R] /Count 1 >>
endobj
4 0 obj
<< /Type /Page /Parent 3 0 R /MediaBox [0 0 595 842] /Contents 5 0 R >>
endobj
5 0 obj
<< /Length 320 >>
stream
BT
/Helvetica-Bold 22 Tf
50 780 Td
(PIXELNEST HARDWARE - OFFICIAL WARRANTY SLIP) Tj
/Helvetica 14 Tf
0 -36 Td
(Product: ${product.title}) Tj
0 -26 Td
(Warranty Coverage: ${product.warranty || '1 Year Official Replacement'}) Tj
0 -26 Td
(Authenticity: 100% Genuine Tested & Certified Hardware) Tj
0 -32 Td
(Thank you for choosing PixelNest Hardware. Keep this slip for support.) Tj
0 -24 Td
(Customer Service: support@pixelnest.io • WhatsApp: +91 98765 43210) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000015 00000 n 
0000000180 00000 n 
0000000227 00000 n 
0000000288 00000 n 
0000000375 00000 n 
trailer
<< /Size 6 /Root 2 0 R /Info 1 0 R >>
startxref
720
%%EOF`;

    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        cart,
        wishlist,
        shopifyConfig,
        appMode,
        deviceView,
        activeTab,
        adminTab,
        selectedProduct,
        searchQuery,
        appliedCoupon,
        discountAmount,
        isCartOpen,
        isSearchOpen,
        setAppMode,
        setDeviceView,
        setActiveTab,
        setAdminTab,
        setSelectedProduct,
        setSearchQuery,
        setIsCartOpen,
        setIsSearchOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        updateShopifyConfig,
        syncShopifyProducts,
        triggerDownload
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { useStore } from './useStore';
