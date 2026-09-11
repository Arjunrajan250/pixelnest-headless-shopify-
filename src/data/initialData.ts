import { Product, Order, ShopifyConfig } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Ergonomic Wireless Mouse',
    handle: 'ergonomic-wireless-mouse',
    subtitle: 'Silent clicks, dual 2.4GHz & Bluetooth 5.2, sculpted comfort.',
    description: 'Engineered for all-day comfort and silent precision. Features whisper-quiet microswitches, high-precision 4000 DPI optical sensor, textured matte side grips, and rechargeable 500mAh battery with Type-C fast charging. Works seamlessly across macOS, Windows, and iPadOS.',
    category: 'Peripherals',
    subCategory: 'Mice',
    price: 1499,
    compareAtPrice: 2499,
    rating: 4.9,
    reviewsCount: 3420,
    imageUrl: '/images/mouse.jpg',
    gallery: [
      '/images/mouse.jpg',
      '/images/keyboard.jpg',
      '/images/hardware_hero.jpg'
    ],
    features: [
      'Whisper-Quiet Silent Switches',
      '4000 DPI Precision Sensor',
      'Bluetooth 5.2 + 2.4GHz USB Dongle',
      'Type-C Rechargeable (60-day battery)',
      'Contoured Ergonomic Palm Rest'
    ],
    specs: {
      'Connectivity': 'Wireless 2.4GHz + Bluetooth 5.2',
      'Sensor': 'High-Precision Optical 4000 DPI',
      'Battery': 'Rechargeable 500mAh (Up to 60 Days)',
      'Weight': '88g lightweight',
      'Warranty': '1 Year Official Replacement Warranty'
    },
    warranty: '1 Year Brand Warranty',
    shippingInfo: 'Free 2-Day Express Delivery',
    inStock: true,
    status: 'active',
    downloadUrl: '/downloads/mouse-manual.pdf',
    downloadFileName: 'Ergonomic_Mouse_User_Guide.pdf',
    fileSize: '1.8 MB',
    isTrending: true,
    createdAt: '2025-08-01T10:00:00Z'
  },
  {
    id: 'prod-2',
    title: 'Custom Mechanical Keyboard',
    handle: 'custom-mechanical-keyboard',
    subtitle: '75% Gasket-mounted tactile switches with warm backlighting.',
    description: 'A luxurious typing experience built with CNC aluminum frame, pre-lubed Gateron Pro Yellow tactile switches, sound-dampening acoustic foams, and thick dye-sub PBT keycaps. Fully hot-swappable with cross-platform Mac and Windows keycaps included.',
    category: 'Peripherals',
    subCategory: 'Keyboards',
    price: 4299,
    compareAtPrice: 6999,
    rating: 4.9,
    reviewsCount: 4890,
    imageUrl: '/images/keyboard.jpg',
    gallery: [
      '/images/keyboard.jpg',
      '/images/mouse.jpg',
      '/images/hardware_hero.jpg'
    ],
    features: [
      'Hot-Swappable 5-Pin Sockets',
      'Gasket Mount Sound Dampening',
      'Factory Pre-Lubed Mechanical Switches',
      'Thick PBT Dye-Sub Keycaps',
      'Multi-Device Tri-Mode Connectivity'
    ],
    specs: {
      'Layout': '75% Compact (82 Keys)',
      'Switches': 'Tactile Pre-lubed 45g',
      'Connectivity': 'Type-C Wired / 2.4G / Bluetooth 5.0',
      'Battery': '4000mAh (Up to 200 hours backlight off)',
      'Warranty': '1 Year Official Warranty'
    },
    warranty: '1 Year Brand Warranty',
    shippingInfo: 'Free Express Shipping with Tracking',
    inStock: true,
    status: 'active',
    downloadUrl: '/downloads/keyboard-manual.pdf',
    downloadFileName: 'Mechanical_Keyboard_Manual.pdf',
    fileSize: '2.4 MB',
    isTrending: true,
    createdAt: '2025-08-02T10:00:00Z'
  },
  {
    id: 'prod-3',
    title: '34" 4K Curved UltraWide Monitor',
    handle: '4k-curved-ultrawide-monitor',
    subtitle: '1500R curvature, 144Hz refresh rate, 90W USB-C power delivery.',
    description: 'Immerse yourself in panoramic productivity and rich cinematic visuals. Featuring an expansive 21:9 aspect ratio, 3840x1600 resolution, 99% sRGB color gamut, and single-cable Type-C hub that charges your laptop while transmitting 4K video and peripherals data.',
    category: 'Displays',
    subCategory: 'Monitors',
    price: 24999,
    compareAtPrice: 34999,
    rating: 4.8,
    reviewsCount: 2150,
    imageUrl: '/images/monitor.jpg',
    gallery: [
      '/images/monitor.jpg',
      '/images/monitor_arm.jpg',
      '/images/hardware_hero.jpg'
    ],
    features: [
      '34-inch 1500R Immersive Curve',
      '144Hz Refresh Rate & 1ms MPRT',
      'USB-C 90W Laptop PD Charging',
      'HDR400 & 99% sRGB Factory Calibrated',
      'Built-in KVM Switch & Dual Speakers'
    ],
    specs: {
      'Resolution': '3840 x 1600 UWQHD',
      'Panel': 'Nano IPS Antiglare',
      'Ports': 'USB-C (90W), 2x HDMI 2.1, 1x DP 1.4, 3x USB 3.0',
      'Mount': 'VESA 100x100mm Compatible',
      'Warranty': '3 Years Zero-Dead-Pixel Warranty'
    },
    warranty: '3 Years Panel Warranty',
    shippingInfo: 'Insured White-Glove Courier Delivery',
    inStock: true,
    status: 'active',
    downloadUrl: '/downloads/monitor-specs.pdf',
    downloadFileName: '4K_UltraWide_Monitor_Guide.pdf',
    fileSize: '3.1 MB',
    isTrending: true,
    createdAt: '2025-08-03T10:00:00Z'
  },
  {
    id: 'prod-4',
    title: '140W GaN 4-Port Fast Multi-Charger',
    handle: '140w-gan-multi-port-charger',
    subtitle: 'Gallium Nitride fast charging for MacBook, iPhone, and Android.',
    description: 'One compact charger to power your entire desk setup. Powered by next-generation GaN III technology, delivers up to 140W single-port speed to charge a 16-inch MacBook Pro to 55% in 30 minutes, or distribute power intelligently across 3 USB-C and 1 USB-A port.',
    category: 'Power & Charging',
    subCategory: 'Chargers',
    price: 2899,
    compareAtPrice: 4299,
    rating: 4.9,
    reviewsCount: 5210,
    imageUrl: '/images/charger.jpg',
    gallery: [
      '/images/charger.jpg',
      '/images/cable_organizer.jpg'
    ],
    features: [
      '140W Max Power Delivery 3.1',
      'GaN III Semiconductor Efficiency',
      'Intelligent Dynamic Power Balancing',
      'Foldable Compact Travel Prongs',
      'Active Temperature & Surge Protection'
    ],
    specs: {
      'Outputs': '3x USB-C (140W max), 1x USB-A (22.5W)',
      'Total Output': '140W Shared Intelligent Distribution',
      'Dimensions': '75 x 75 x 30 mm',
      'Certifications': 'BIS, CE, FCC, RoHS Certified',
      'Warranty': '18 Months Replacement Warranty'
    },
    warranty: '18 Months Brand Warranty',
    shippingInfo: 'Same-Day Dispatch, Free Delivery',
    inStock: true,
    status: 'active',
    downloadUrl: '/downloads/charger-manual.pdf',
    downloadFileName: 'GaN_140W_Charger_Manual.pdf',
    fileSize: '1.2 MB',
    isTrending: true,
    createdAt: '2025-08-04T10:00:00Z'
  },
  {
    id: 'prod-5',
    title: 'Retro Magma Ambient Lava Lamp',
    handle: 'retro-magma-ambient-lava-lamp',
    subtitle: 'Hypnotic slow-motion wax fluid in warm sunset orange.',
    description: 'Bring iconic mid-century warmth and soothing tranquility to your bedside table or workstation. Crafted with brushed metallic aluminum casing, crystal-clear borosilicate glass, and non-toxic specially formulated fluid that creates mesmerizing flowing globes of warm ambient light.',
    category: 'Home & Living',
    subCategory: 'Lighting',
    price: 1899,
    compareAtPrice: 2999,
    rating: 4.8,
    reviewsCount: 1980,
    imageUrl: '/images/lava_lamp.jpg',
    gallery: [
      '/images/lava_lamp.jpg',
      '/images/hardware_hero.jpg'
    ],
    features: [
      'Hypnotic Soothing Motion Fluid',
      'Brushed Aluminum Top & Base',
      'Warm Ambient Calming Light (40W bulb)',
      'Heavyweight Stable Base',
      'Includes Spare Bulb & Heat Deflector'
    ],
    specs: {
      'Height': '14.5 Inches (37 cm)',
      'Base': 'Spun Brushed Aluminum',
      'Bulb': '40W E14 High-Temperature Bulb',
      'Safety': 'Heat-Resistant Borosilicate Glass',
      'Warranty': '1 Year Official Warranty'
    },
    warranty: '1 Year Warranty',
    shippingInfo: 'Shockproof Bubble Pack Delivery',
    inStock: true,
    status: 'active',
    downloadUrl: '/downloads/lava-lamp-guide.pdf',
    downloadFileName: 'Lava_Lamp_Care_Guide.pdf',
    fileSize: '1.5 MB',
    isTrending: true,
    createdAt: '2025-08-05T10:00:00Z'
  },
  {
    id: 'prod-6',
    title: 'Heavy Duty Magnetic Kitchen Hooks',
    handle: 'heavy-duty-magnetic-kitchen-hooks',
    subtitle: 'Set of 6 ultra-strong neodymium hooks with anti-scratch silicone pads.',
    description: 'Instant clutter-free kitchen and workstation organization without drilling any holes. Triple-plated with matte black powder coating and heavy-duty grade N52 neodymium magnets capable of supporting up to 8kg vertically on refrigerators, range hoods, or metal pegboards.',
    category: 'Home & Living',
    subCategory: 'Hooks',
    price: 699,
    compareAtPrice: 1199,
    rating: 4.9,
    reviewsCount: 6420,
    imageUrl: '/images/kitchen_hooks.jpg',
    gallery: [
      '/images/kitchen_hooks.jpg'
    ],
    features: [
      'Triple-Strength N52 Neodymium Core',
      '8kg Vertical Pull Capacity per hook',
      'Anti-Scratch Soft Protective Rubber Base',
      'Zero Tools, Zero Drilling Required',
      'Matte Black Rust-Proof Finish'
    ],
    specs: {
      'Quantity': 'Pack of 6 Heavy Duty Hooks',
      'Magnetic Grade': 'N52 Rare Earth Neodymium',
      'Capacity': 'Up to 8kg (17.6 lbs) vertical hold',
      'Finish': 'Rust-Resistant Matte Black Powder Coat',
      'Warranty': 'Lifetime Magnetism Guarantee'
    },
    warranty: 'Lifetime Magnetism Guarantee',
    shippingInfo: 'In Stock • Ready to Ship',
    inStock: true,
    status: 'active',
    downloadUrl: '/downloads/hooks-guide.pdf',
    downloadFileName: 'Magnetic_Hooks_Guide.pdf',
    fileSize: '950 KB',
    isTrending: true,
    createdAt: '2025-08-06T10:00:00Z'
  },
  {
    id: 'prod-7',
    title: 'Gas Spring Monitor Desk Mount Arm',
    handle: 'gas-spring-monitor-desk-mount',
    subtitle: 'Full motion 360° rotation for 17" to 35" screens.',
    description: 'Reclaim valuable desk space and position your screen at the ideal ergonomic eye level. Built with automotive-grade gas struts, heavy-duty clamp and grommet mounting options, and concealed cable management channels to keep your workspace pristine.',
    category: 'Displays',
    subCategory: 'Mounts',
    price: 2199,
    compareAtPrice: 3499,
    rating: 4.7,
    reviewsCount: 1650,
    imageUrl: '/images/monitor_arm.jpg',
    gallery: [
      '/images/monitor_arm.jpg',
      '/images/monitor.jpg'
    ],
    features: [
      'Smooth Counterbalanced Gas Spring',
      'Supports Monitors 2kg - 10kg',
      'VESA 75x75 & 100x100 Compatible',
      'Integrated Concealed Cable Routing',
      'C-Clamp & Grommet Base Included'
    ],
    specs: {
      'Supported Sizes': '17" - 35" Monitors',
      'Weight Capacity': '2 to 10 kg',
      'Tilt Range': '+90° to -45°',
      'Rotation': '360° Portrait / Landscape',
      'Warranty': '2 Years Mechanical Warranty'
    },
    warranty: '2 Years Mechanical Warranty',
    shippingInfo: 'Free Express Shipping',
    inStock: true,
    status: 'active',
    downloadUrl: '/downloads/monitor-arm-manual.pdf',
    downloadFileName: 'Monitor_Arm_Installation.pdf',
    fileSize: '3.4 MB',
    isTrending: false,
    createdAt: '2025-08-07T10:00:00Z'
  },
  {
    id: 'prod-8',
    title: 'Studio Eye-Care Monitor Light Bar',
    handle: 'studio-eye-care-monitor-light-bar',
    subtitle: 'Asymmetric anti-glare optical design with wireless touch puck.',
    description: 'Zero screen glare, zero eye strain. Features 45-degree angled asymmetric optical illumination that lights up your desk surface without reflecting off your screen. Adjustable color temperature (2700K to 6500K) with stepped touch dimmer and ambient light sensing.',
    category: 'Desk Setup',
    subCategory: 'Lighting',
    price: 1999,
    compareAtPrice: 3299,
    rating: 4.9,
    reviewsCount: 4120,
    imageUrl: '/images/lightbar.jpg',
    gallery: [
      '/images/lightbar.jpg',
      '/images/monitor.jpg'
    ],
    features: [
      'Asymmetric Anti-Screen Glare Optics',
      'Stepless Dimming & Color Temp Control',
      'Ra95 High Color Rendering Index',
      'Weighted Counterbalance Clamp (No adhesives)',
      'Auto-Dimming Ambient Light Sensor'
    ],
    specs: {
      'Length': '45 cm (17.7 inches)',
      'Color Temperature': '2700K - 6500K Stepless',
      'CRI': 'Ra > 95 True Color',
      'Power': 'USB Type-C 5V 1A (Powered by monitor)',
      'Warranty': '1 Year Full Replacement'
    },
    warranty: '1 Year Official Warranty',
    shippingInfo: 'Free 2-Day Delivery',
    inStock: true,
    status: 'active',
    downloadUrl: '/downloads/lightbar-manual.pdf',
    downloadFileName: 'Light_Bar_User_Manual.pdf',
    fileSize: '1.6 MB',
    isTrending: false,
    createdAt: '2025-08-08T10:00:00Z'
  },
  {
    id: 'prod-9',
    title: 'Magnetic Desk Cable Organizer & Hub',
    handle: 'magnetic-desk-cable-organizer',
    subtitle: 'Weighted metallic base with 5 magnetic snap collars.',
    description: 'Keep charging and display cables securely within arm reach instead of dropping behind your desk. Features a weighted matte metallic baseplate with non-slip micro-suction underside and 5 precision magnetic snap collars for flat, braided, and round cables.',
    category: 'Desk Setup',
    subCategory: 'Accessories',
    price: 499,
    compareAtPrice: 899,
    rating: 4.8,
    reviewsCount: 3820,
    imageUrl: '/images/cable_organizer.jpg',
    gallery: [
      '/images/cable_organizer.jpg',
      '/images/charger.jpg'
    ],
    features: [
      '5 Magnetic Universal Cable Collars',
      'Heavy Weighted Metal Baseplate',
      'Reusable Residue-Free Micro-Suction Base',
      'Fits Cables up to 5.5mm Diameter',
      'Sleek Minimalist Aesthetic'
    ],
    specs: {
      'Dimensions': '90 x 20 x 4 mm',
      'Material': 'Anodized Aluminum Alloy + Silicone',
      'Magnetic Strength': 'Neodymium Snap Grip',
      'Compatibility': 'Lightning, USB-C, HDMI, Micro-USB',
      'Warranty': '1 Year Guarantee'
    },
    warranty: '1 Year Warranty',
    shippingInfo: 'In Stock • Ships in 24h',
    inStock: true,
    status: 'active',
    downloadUrl: '/downloads/cable-hub-guide.pdf',
    downloadFileName: 'Cable_Organizer_Setup.pdf',
    fileSize: '820 KB',
    isTrending: false,
    createdAt: '2025-08-09T10:00:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'DN24876',
    customerName: 'Aesthetic Girl',
    customerEmail: 'aestheticgirl@gmail.com',
    shippingAddress: 'Flat 402, Lotus Greens, Indiranagar, Bengaluru, KA 560038',
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Ergonomic Wireless Mouse
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[3], // 140W GaN Charger
        quantity: 1
      }
    ],
    subtotal: 4398,
    discount: 440,
    discountCode: 'FIRST10',
    total: 3958,
    paymentMethod: 'upi',
    status: 'Completed',
    date: '2025-09-08T11:20:00Z',
    deliveryDate: 'Delivered via BlueDart (Tracking: BD8492019)'
  },
  {
    id: 'order-2',
    orderNumber: 'DN24879',
    customerName: 'Aesthetic Girl',
    customerEmail: 'aestheticgirl@gmail.com',
    shippingAddress: 'Flat 402, Lotus Greens, Indiranagar, Bengaluru, KA 560038',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Custom Mechanical Keyboard
        quantity: 1
      }
    ],
    subtotal: 4299,
    discount: 0,
    total: 4299,
    paymentMethod: 'card',
    status: 'Processing',
    date: '2025-09-10T14:30:00Z',
    deliveryDate: 'Out for Delivery with Delhivery (Tracking: DL772910)'
  },
  {
    id: 'order-3',
    orderNumber: 'DN24882',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.v@techflow.io',
    shippingAddress: '74 Silicon Boulevard, Koramangala, Bengaluru, KA 560034',
    items: [
      {
        product: INITIAL_PRODUCTS[4], // Retro Magma Lava Lamp
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[5], // Kitchen Hooks
        quantity: 2
      }
    ],
    subtotal: 3297,
    discount: 0,
    total: 3297,
    paymentMethod: 'upi',
    status: 'Completed',
    date: '2025-09-02T16:10:00Z',
    deliveryDate: 'Delivered on 4 Sep 2025 via FedEx'
  },
  {
    id: 'order-4',
    orderNumber: 'DN24889',
    customerName: 'Sophia Miller',
    customerEmail: 'sophia.m@designstudio.co',
    shippingAddress: 'Tower B-1204, Highclere Palms, Powai, Mumbai, MH 400076',
    items: [
      {
        product: INITIAL_PRODUCTS[2], // 4K Curved Monitor
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[6], // Monitor Arm
        quantity: 1
      }
    ],
    subtotal: 27198,
    discount: 1000,
    discountCode: 'FIRST10',
    total: 26198,
    paymentMethod: 'card',
    status: 'Processing',
    date: '2025-09-10T09:15:00Z',
    deliveryDate: 'In Transit • Expected Tomorrow via BlueDart'
  }
];

export const INITIAL_SHOPIFY_CONFIG: ShopifyConfig = {
  shopDomain: 'pixelnest-hardware.myshopify.com',
  storefrontAccessToken: '9f8b7c6d5e4a3b2c1d0e',
  adminAccessToken: 'shpat_demo_admin_token_123456',
  apiVersion: '2024-01',
  isConnected: true,
  liveMode: false,
  lastSyncTime: 'Just now'
};

export const CATEGORIES_META = [
  { name: 'Peripherals', count: 18, icon: 'Mouse', desc: 'Ergonomic mice, mechanical keyboards, and trackpads' },
  { name: 'Displays', count: 9, icon: 'Monitor', desc: 'Curved ultrawide screens, desk arms, and mounts' },
  { name: 'Power & Charging', count: 14, icon: 'Zap', desc: 'GaN multi-port fast chargers, docks, and braided cables' },
  { name: 'Home & Living', count: 16, icon: 'Flame', desc: 'Aesthetic lava lamps, magnetic kitchen hooks, and accents' },
  { name: 'Desk Setup', count: 12, icon: 'LayoutGrid', desc: 'Screen light bars, cable organizers, and desk mats' },
  { name: 'Others', count: 6, icon: 'Package', desc: 'Cleaning kits, adapters, and hardware accessories' }
];
