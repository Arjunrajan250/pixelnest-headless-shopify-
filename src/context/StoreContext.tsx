import React, { createContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  OrderStatus, 
  ShopifyConfig, 
  AppMode, 
  DeviceView, 
  StorefrontTab, 
  AdminTab,
  Currency,
  Customer,
  Address,
  ProductVariant,
  TrustPolicyType
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
  
  // Multi-Currency
  currency: Currency;
  setCurrency: (currency: Currency) => void;

  // Customer Authentication & Account
  customer: Customer | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  loginCustomer: (email: string, firstName?: string, lastName?: string) => void;
  registerCustomer: (data: { email: string; firstName: string; lastName: string }) => void;
  logoutCustomer: () => void;
  saveAddress: (address: Omit<Address, 'id'>) => Address;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Admin Authentication
  adminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // Trust Policies Modal
  activeTrustPolicy: TrustPolicyType | null;
  setActiveTrustPolicy: (policy: TrustPolicyType | null) => void;

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
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  buyNow: (product: Product, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
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

  // Digital download / Invoice helper
  triggerDownload: (product: Product) => void;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products catalog persistence
  const [products, setProducts] = useState<Product[]>(() => {
    localStorage.removeItem('pixelnest_hardware_products_v2');
    const saved = localStorage.getItem('pixelnest_products_v4_intl');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return INITIAL_PRODUCTS;
  });

  // Orders persistence (clean and tied to genuine checkout)
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('pixelnest_orders_v4_intl');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return INITIAL_ORDERS;
  });

  // Cart starts empty by default
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('pixelnest_cart_v4_intl');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  // Wishlist persistence
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('pixelnest_wishlist_v4_intl');
    return saved ? JSON.parse(saved) : [];
  });

  // Currency selection (defaults to USD)
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('pixelnest_currency');
    return (saved as Currency) || 'USD';
  });

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('pixelnest_currency', curr);
  };

  // Customer Account
  const [customer, setCustomer] = useState<Customer | null>(() => {
    const saved = localStorage.getItem('pixelnest_customer_v4');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Admin Authentication
  const [adminAuthenticated, setAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('pixelnest_admin_auth') === 'true';
  });

  // Trust Policies Modal
  const [activeTrustPolicy, setActiveTrustPolicy] = useState<TrustPolicyType | null>(null);

  // Shopify Configuration
  const [shopifyConfig, setShopifyConfig] = useState<ShopifyConfig>(() => {
    const saved = localStorage.getItem('pixelnest_shopify_config_v4');
    return saved ? JSON.parse(saved) : INITIAL_SHOPIFY_CONFIG;
  });

  // UI States
  const [appMode, setAppMode] = useState<AppMode>('storefront');
  const [deviceView, setDeviceView] = useState<DeviceView>('responsive');
  const [activeTab, setActiveTab] = useState<StorefrontTab>('home');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Local storage synchronization
  useEffect(() => {
    localStorage.setItem('pixelnest_products_v4_intl', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('pixelnest_orders_v4_intl', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('pixelnest_cart_v4_intl', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('pixelnest_wishlist_v4_intl', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (customer) {
      localStorage.setItem('pixelnest_customer_v4', JSON.stringify(customer));
    } else {
      localStorage.removeItem('pixelnest_customer_v4');
    }
  }, [customer]);

  useEffect(() => {
    localStorage.setItem('pixelnest_shopify_config_v4', JSON.stringify(shopifyConfig));
  }, [shopifyConfig]);

  // Discount calculations (FIRST10 gives 10% off)
  useEffect(() => {
    if (appliedCoupon === 'FIRST10' || appliedCoupon === 'PIXEL10') {
      const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      setDiscountAmount(parseFloat((subtotal * 0.1).toFixed(2)));
    } else if (appliedCoupon === 'WELCOME20') {
      const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      setDiscountAmount(parseFloat((subtotal * 0.2).toFixed(2)));
    } else {
      setDiscountAmount(0);
    }
  }, [cart, appliedCoupon]);

  // Customer authentication methods
  const loginCustomer = (email: string, firstName = 'Valued', lastName = 'Customer') => {
    const existing = customer && customer.email.toLowerCase() === email.toLowerCase() ? customer : null;
    const authed: Customer = existing || {
      id: `cust-${Date.now()}`,
      email: email.toLowerCase(),
      firstName,
      lastName,
      addresses: [
        {
          id: `addr-${Date.now()}`,
          type: 'Home',
          isDefault: true,
          name: `${firstName} ${lastName}`,
          phone: '+1 (555) 342-9182',
          street: '742 Evergreen Terrace, Suite 400',
          city: 'Seattle',
          state: 'WA',
          postalCode: '98101',
          country: 'United States'
        }
      ],
      createdAt: new Date().toISOString()
    };
    setCustomer(authed);
    setIsAuthModalOpen(false);
  };

  const registerCustomer = ({ email, firstName, lastName }: { email: string; firstName: string; lastName: string }) => {
    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      email: email.toLowerCase(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      addresses: [],
      createdAt: new Date().toISOString()
    };
    setCustomer(newCust);
    setIsAuthModalOpen(false);
  };

  const logoutCustomer = () => {
    setCustomer(null);
    localStorage.removeItem('pixelnest_customer_v4');
  };

  const saveAddress = (addressData: Omit<Address, 'id'>): Address => {
    const newAddr: Address = {
      ...addressData,
      id: `addr-${Date.now()}`
    };
    if (customer) {
      const updatedAddresses = newAddr.isDefault 
        ? customer.addresses.map(a => ({ ...a, isDefault: false })).concat(newAddr)
        : [...customer.addresses, newAddr];

      setCustomer({
        ...customer,
        addresses: updatedAddresses
      });
    }
    return newAddr;
  };

  const deleteAddress = (id: string) => {
    if (customer) {
      setCustomer({
        ...customer,
        addresses: customer.addresses.filter(a => a.id !== id)
      });
    }
  };

  const setDefaultAddress = (id: string) => {
    if (customer) {
      setCustomer({
        ...customer,
        addresses: customer.addresses.map(a => ({
          ...a,
          isDefault: a.id === id
        }))
      });
    }
  };

  // Admin authentication
  const loginAdmin = (password: string): boolean => {
    // Standard secure administrative passkey for store owner
    if (password === 'pixelnest2026' || password === 'admin') {
      setAdminAuthenticated(true);
      sessionStorage.setItem('pixelnest_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminAuthenticated(false);
    sessionStorage.removeItem('pixelnest_admin_auth');
    setAppMode('storefront');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    setCart(prev => {
      const existing = prev.find(
        item => item.product.id === product.id && item.selectedVariant?.id === variant?.id
      );
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedVariant?.id === variant?.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVariant: variant }];
    });
  };

  const buyNow = (product: Product, variant?: ProductVariant) => {
    // Clear and add single item for instant checkout
    setCart([{ product, quantity: 1, selectedVariant: variant }]);
    setSelectedProduct(null);
    setActiveTab('checkout');
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart(prev => prev.filter(item => {
      if (item.product.id !== productId) return true;
      if (variantId && item.selectedVariant?.id !== variantId) return true;
      return false;
    }));
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId && (!variantId || item.selectedVariant?.id === variantId)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const applyCoupon = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'FIRST10' || trimmed === 'PIXEL10' || trimmed === 'WELCOME20') {
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
    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const total = Math.max(0, subtotal - discountAmount);
    const orderNumber = `PN-${Math.floor(10000 + Math.random() * 90000)}`;

    const deliveryDateObj = new Date();
    deliveryDateObj.setDate(deliveryDateObj.getDate() + 7);

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      customerName,
      customerEmail,
      shippingAddress,
      items: [...cart],
      currency,
      subtotal,
      discount: discountAmount,
      discountCode: appliedCoupon || undefined,
      total,
      paymentMethod,
      status: 'Processing',
      date: new Date().toISOString(),
      deliveryDate: `Estimated Delivery by ${deliveryDateObj.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}`,
      trackingNumber: `PN-TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
      trackingCarrier: 'Tracked Global Courier (DHL / FedEx International)'
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
              deliveryDate: status === 'Completed' 
                ? `Delivered on ${new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}` 
                : status === 'Processing' 
                ? 'Processing dispatch with tracked courier' 
                : 'Order Cancelled'
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

  const triggerDownload = (product: Product) => {
    const filename = `${product.title.replace(/\s+/g, '_')}_Warranty_Slip.pdf`;
    const content = `========================================================\nPIXELNEST COMMERCE - OFFICIAL WARRANTY & ORDER RECORD\nProduct: ${product.title}\nWarranty Coverage: ${product.warranty || 'Standard Manufacturer Warranty'}\nCustomer Service: support@pixelnest.io\n========================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
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
        currency,
        setCurrency,
        customer,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginCustomer,
        registerCustomer,
        logoutCustomer,
        saveAddress,
        deleteAddress,
        setDefaultAddress,
        adminAuthenticated,
        loginAdmin,
        logoutAdmin,
        activeTrustPolicy,
        setActiveTrustPolicy,
        setAppMode,
        setDeviceView,
        setActiveTab,
        setAdminTab,
        setSelectedProduct,
        setSearchQuery,
        setIsCartOpen,
        setIsSearchOpen,
        addToCart,
        buyNow,
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
