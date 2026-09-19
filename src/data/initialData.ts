import { Product, Order, ShopifyConfig } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Ergonomic Wireless Mouse',
    handle: 'ergonomic-wireless-mouse',
    subtitle: 'Silent clicks, dual 2.4GHz & Bluetooth 5.2, sculpted ergonomic comfort.',
    description: 'Engineered for all-day comfort and silent precision. Features whisper-quiet microswitches, high-precision 4000 DPI optical sensor, textured matte side grips, and rechargeable 500mAh battery with Type-C fast charging. Works seamlessly across macOS, Windows, and iPadOS with zero driver installation.',
    category: 'Peripherals',
    subCategory: 'Mice',
    price: 29.99,
    compareAtPrice: 34.99,
    rating: 4.8,
    reviewsCount: 38,
    imageUrl: '/images/mouse.jpg',
    gallery: [
      '/images/mouse.jpg',
      '/images/mouse_side.jpg',
      '/images/mouse_desk.jpg'
    ],
    features: [
      'Whisper-Quiet Silent Microswitches',
      '4000 DPI Optical Precision Sensor',
      'Bluetooth 5.2 + 2.4GHz USB Receiver',
      'Type-C Fast Rechargeable (Up to 60 days battery)',
      'Contoured Natural Palm Grip'
    ],
    specs: {
      'Connectivity': 'Tri-Mode: 2.4GHz Wireless + Dual Bluetooth 5.2',
      'Sensor': 'High-Precision Optical 800 - 4000 DPI',
      'Battery': 'Rechargeable 500mAh Lithium (USB-C)',
      'Weight': '88g (Lightweight ergonomic)',
      'Compatibility': 'macOS 10.12+, Windows 10/11, iPadOS, Linux',
      'Warranty': '1-Year Limited Manufacturer Warranty'
    },
    whatsInTheBox: [
      '1x Ergonomic Wireless Mouse',
      '1x 2.4GHz Nano USB Receiver',
      '1x Braided USB-C Charging Cable (1m)',
      '1x Quick Start Guide'
    ],
    variants: [
      { id: 'v1-black', title: 'Matte Obsidian Black', inStock: true, colorHex: '#1E1E1E' },
      { id: 'v1-white', title: 'Lunar White', inStock: true, colorHex: '#F0EFEA' },
      { id: 'v1-grey', title: 'Space Grey', inStock: true, colorHex: '#6E7278' }
    ],
    warranty: '1-Year Limited Manufacturer Warranty',
    shippingInfo: 'Tracked International Shipping: 5–9 Business Days',
    shippingSuitability: 'Lightweight Express',
    weightKg: 0.18,
    inStock: true,
    inventoryCount: 42,
    status: 'active',
    isTrending: true,
    createdAt: '2025-08-01T10:00:00Z',
    reviews: [
      {
        id: 'rev-1',
        author: 'Julian M.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Perfect for long coding sessions',
        comment: 'The silent switches are truly whisper-quiet. The grip angle relieved my wrist strain completely. Battery lasts easily over a month on a single charge.',
        verified: true,
        country: 'United States'
      },
      {
        id: 'rev-2',
        author: 'Elena R.',
        rating: 5,
        date: '1 month ago',
        title: 'Seamless Bluetooth switching',
        comment: 'Connected to both my MacBook and iPad without any hiccups. Beautiful minimalist finish on my desk.',
        verified: true,
        country: 'Germany'
      },
      {
        id: 'rev-3',
        author: 'David K.',
        rating: 4,
        date: '2 months ago',
        title: 'Great ergonomics, smooth tracking',
        comment: 'Very comfortable grip. Smooth tracking on wood without a pad. Only took 6 days to deliver to London.',
        verified: true,
        country: 'United Kingdom'
      }
    ]
  },
  {
    id: 'prod-2',
    title: 'Custom Mechanical Keyboard',
    handle: 'custom-mechanical-keyboard',
    subtitle: '75% Gasket-mounted tactile switches with warm ambient backlighting.',
    description: 'A luxurious typing experience built with CNC aluminum frame, pre-lubed Gateron Pro Yellow tactile switches, sound-dampening acoustic foams, and thick dye-sub PBT keycaps. Fully hot-swappable with cross-platform Mac and Windows keycaps included in the box.',
    category: 'Peripherals',
    subCategory: 'Keyboards',
    price: 69.99,
    compareAtPrice: 79.99,
    rating: 4.9,
    reviewsCount: 42,
    imageUrl: '/images/keyboard.jpg',
    gallery: [
      '/images/keyboard.jpg',
      '/images/keyboard_detail.jpg',
      '/images/keyboard_overhead.jpg'
    ],
    features: [
      'Hot-Swappable 5-Pin Switch Sockets',
      'Multi-Layer Gasket Mount Acoustic Dampening',
      'Factory Pre-Lubed Mechanical Switches',
      'Thick PBT Dye-Sublimated Keycaps',
      'Tri-Mode Wireless (Bluetooth 5.0, 2.4G, Type-C)'
    ],
    specs: {
      'Layout': '75% Compact (82 Keys + Media Dial)',
      'Switches': 'Tactile Pre-lubed 45g (Hot-swappable)',
      'Connectivity': 'USB-C Wired / 2.4GHz / Bluetooth 5.0',
      'Battery': '4000mAh (Up to 200 hours without backlight)',
      'Weight': '860g Solid Desktop Feel',
      'Warranty': '1-Year Limited Manufacturer Warranty'
    },
    whatsInTheBox: [
      '1x Custom 75% Mechanical Keyboard',
      '1x 2-in-1 Keycap & Switch Puller',
      '4x Mac Replacement Keycaps',
      '1x Braided USB-C Cable (1.5m)',
      '1x Dust Cover & User Manual'
    ],
    variants: [
      { id: 'v2-tactile', title: 'Tactile Warm Yellow', inStock: true, colorHex: '#F59E0B' },
      { id: 'v2-linear', title: 'Smooth Linear Red', inStock: true, colorHex: '#EF4444' }
    ],
    warranty: '1-Year Limited Manufacturer Warranty',
    shippingInfo: 'Tracked International Shipping: 6–10 Business Days',
    shippingSuitability: 'Standard Parcel',
    weightKg: 0.95,
    inStock: true,
    inventoryCount: 28,
    status: 'active',
    isTrending: true,
    createdAt: '2025-08-02T10:00:00Z',
    reviews: [
      {
        id: 'rev-4',
        author: 'Liam P.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Deep thock sound straight out of the box',
        comment: 'No rattling stabs, pure acoustic goodness. The pre-lubed switches feel buttery smooth and the Mac layout keys were super easy to swap.',
        verified: true,
        country: 'Canada'
      },
      {
        id: 'rev-5',
        author: 'Sara T.',
        rating: 5,
        date: '1 month ago',
        title: 'Solid build quality',
        comment: 'Very premium heft and satisfying feel. Typing all day for work has never been more enjoyable.',
        verified: true,
        country: 'Australia'
      }
    ]
  },
  {
    id: 'prod-3',
    title: '34" 4K Curved UltraWide Monitor',
    handle: '4k-curved-ultrawide-monitor',
    subtitle: '1500R curvature, 144Hz refresh rate, 90W USB-C single cable dock.',
    description: 'Immerse yourself in panoramic productivity and rich cinematic visuals. Featuring an expansive 21:9 aspect ratio, 3840x1600 resolution, 99% sRGB color gamut, and single-cable Type-C hub that charges your laptop while transmitting 4K video and peripheral data.',
    category: 'Displays',
    subCategory: 'Monitors',
    price: 349.99,
    compareAtPrice: 389.99,
    rating: 4.7,
    reviewsCount: 19,
    imageUrl: '/images/monitor.jpg',
    gallery: [
      '/images/monitor.jpg'
    ],
    features: [
      '34-inch 1500R Immersive Curvature',
      '144Hz Refresh Rate & 1ms MPRT Response',
      'USB-C 90W Laptop Power Delivery Hub',
      'HDR400 & 99% sRGB Factory Color Calibrated',
      'Integrated Dual 5W Stereo Speakers'
    ],
    specs: {
      'Resolution': '3840 x 1600 UWQHD',
      'Panel Type': 'Nano IPS Antiglare (350 nits)',
      'Ports': 'USB-C (90W PD), 2x HDMI 2.1, 1x DP 1.4, 3x USB 3.0 Hub',
      'VESA Mount': '100x100mm Standard',
      'Net Weight': '7.4 kg (with ergonomic stand)',
      'Warranty': '2-Year Limited Panel Warranty'
    },
    whatsInTheBox: [
      '1x 34" Curved UltraWide Monitor',
      '1x Heavy-duty Height & Tilt Adjustable Stand',
      '1x Thunderbolt/USB-C 4K 100W Cable (1.5m)',
      '1x DisplayPort 1.4 Cable',
      '1x Power Adapter & Regional Cord'
    ],
    variants: [
      { id: 'v3-dark', title: 'Midnight Grey Aluminum', inStock: true, colorHex: '#374151' }
    ],
    warranty: '2-Year Limited Panel Warranty',
    shippingInfo: 'Insured Freight Parcel Delivery (Customs Clearance Included): 7–14 Business Days',
    shippingSuitability: 'Freight / Bulky',
    weightKg: 8.8,
    inStock: true,
    inventoryCount: 12,
    status: 'active',
    isTrending: true,
    createdAt: '2025-08-03T10:00:00Z',
    reviews: [
      {
        id: 'rev-6',
        author: 'Marcus V.',
        rating: 5,
        date: '1 month ago',
        title: 'Replaced my dual monitor setup',
        comment: 'The 21:9 ratio is a revelation for timeline editing and spreadsheet work. Packaging was exceptionally protective.',
        verified: true,
        country: 'United States'
      }
    ]
  },
  {
    id: 'prod-4',
    title: '140W GaN 4-Port Fast Multi-Charger',
    handle: '140w-gan-multi-port-charger',
    subtitle: 'Next-gen Gallium Nitride fast charging for MacBook, iPhone, and peripherals.',
    description: 'One compact wall charger to power your entire desk setup and travel bag. Powered by cutting-edge GaN III semiconductors, delivers up to 140W single-port speed to charge a 16-inch laptop to 50% in under 30 minutes, or distribute power dynamically across 3 USB-C and 1 USB-A port.',
    category: 'Power & Charging',
    subCategory: 'Chargers',
    price: 39.99,
    compareAtPrice: 45.99,
    rating: 4.9,
    reviewsCount: 54,
    imageUrl: '/images/charger.jpg',
    gallery: [
      '/images/charger.jpg'
    ],
    features: [
      '140W Max Power Delivery 3.1 Protocol',
      'GaN III Semiconductor Technology (Runs cool & compact)',
      'Intelligent Smart Power Allocation',
      'Foldable Travel Prongs with Global Voltage Support (100-240V)',
      'Active Over-Temperature & Short-Circuit Safety'
    ],
    specs: {
      'Output Ports': '3x USB-C (140W max PD 3.1), 1x USB-A (22.5W QC 4.0)',
      'Input': 'AC 100-240V ~ 50/60Hz 2.0A Universal Global',
      'Dimensions': '75 x 75 x 30 mm',
      'Weight': '230g Compact',
      'Certifications': 'CE, FCC, UL, RoHS Tested',
      'Warranty': '18 Months Manufacturer Warranty'
    },
    whatsInTheBox: [
      '1x 140W GaN 4-Port Fast Charger',
      '1x 240W Braided 100W USB-C E-Marker Cable (1.2m)',
      '1x Universal Travel Plug Adapters (UK/EU/AU)',
      '1x User Manual'
    ],
    variants: [
      { id: 'v4-white', title: 'Arctic Matte White', inStock: true, colorHex: '#F9FAFB' },
      { id: 'v4-black', title: 'Carbon Black', inStock: true, colorHex: '#1F2937' }
    ],
    warranty: '18 Months Manufacturer Warranty',
    shippingInfo: 'Tracked International Shipping: 5–8 Business Days',
    shippingSuitability: 'Lightweight Express',
    weightKg: 0.32,
    inStock: true,
    inventoryCount: 65,
    status: 'active',
    isTrending: true,
    createdAt: '2025-08-04T10:00:00Z',
    reviews: [
      {
        id: 'rev-7',
        author: 'Sophie B.',
        rating: 5,
        date: '1 week ago',
        title: 'Only charger I need for work trips',
        comment: 'Powers my MacBook Pro and iPhone simultaneously with speed to spare. Tiny footprint in my backpack.',
        verified: true,
        country: 'France'
      },
      {
        id: 'rev-8',
        author: 'Aaron L.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Doesn’t get hot at all',
        comment: 'High quality GaN chips. Stays cool even when outputting 100W+ for hours.',
        verified: true,
        country: 'United States'
      }
    ]
  },
  {
    id: 'prod-5',
    title: 'Retro Magma Ambient Lava Lamp',
    handle: 'retro-magma-ambient-lava-lamp',
    subtitle: 'Soothing slow-motion wax fluid in warm sunset amber glow.',
    description: 'Bring mid-century warmth and calming tranquility to your workstation or bedside table. Crafted with brushed metallic aluminum casing, heat-resistant borosilicate glass, and non-toxic fluid creating mesmerizing flowing globes of warm ambient light.',
    category: 'Home & Living',
    subCategory: 'Lighting',
    price: 28.99,
    compareAtPrice: 32.99,
    rating: 4.8,
    reviewsCount: 26,
    imageUrl: '/images/lava_lamp.jpg',
    gallery: [
      '/images/lava_lamp.jpg'
    ],
    features: [
      'Hypnotic Soothing Motion Fluid Flow',
      'Spun Brushed Aluminum Top & Heavy Base',
      'Warm Ambient Calming Illumination (30W Warm Bulb)',
      'Heat-Resistant Borosilicate Safety Glass',
      'Spare High-Temp Bulb Included'
    ],
    specs: {
      'Height': '37 cm (14.5 Inches)',
      'Base Material': 'Spun Brushed Aluminum',
      'Power': '110-240V with In-line On/Off Switch',
      'Bulb': '30W E14 High-Temperature Reflector Bulb',
      'Warranty': '1-Year Limited Warranty'
    },
    whatsInTheBox: [
      '1x Spun Aluminum Base & Cap',
      '1x Sealed Borosilicate Liquid Globe',
      '2x 30W E14 Heating Bulbs (1 Pre-installed + 1 Spare)',
      '1x Setup & Care Guide'
    ],
    variants: [
      { id: 'v5-orange', title: 'Sunset Amber & Red Wax', inStock: true, colorHex: '#F97316' },
      { id: 'v5-blue', title: 'Deep Ocean Blue & Green', inStock: true, colorHex: '#0EA5E9' }
    ],
    warranty: '1-Year Limited Warranty',
    shippingInfo: 'Shockproof Reinforced Cushion Packaging: 6–10 Business Days',
    shippingSuitability: 'Standard Parcel',
    weightKg: 1.45,
    inStock: true,
    inventoryCount: 34,
    status: 'active',
    isTrending: true,
    createdAt: '2025-08-05T10:00:00Z',
    reviews: [
      {
        id: 'rev-9',
        author: 'Chloe D.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Aesthetic perfection',
        comment: 'Warm, calming light on my desk during evening writing. Arrived double-boxed with no glass damage whatsoever.',
        verified: true,
        country: 'United Kingdom'
      }
    ]
  },
  {
    id: 'prod-6',
    title: 'Heavy Duty Magnetic Kitchen Hooks',
    handle: 'heavy-duty-magnetic-kitchen-hooks',
    subtitle: 'Pack of 6 ultra-strong neodymium hooks with anti-scratch protective bases.',
    description: 'Instant clutter-free organization without drilling holes. Triple-plated with matte powder coating and rare-earth N52 neodymium magnets capable of supporting up to 8kg vertically on refrigerators, range hoods, or metal workstation pegboards.',
    category: 'Home & Living',
    subCategory: 'Hooks',
    price: 14.99,
    compareAtPrice: 17.99,
    rating: 4.8,
    reviewsCount: 63,
    imageUrl: '/images/kitchen_hooks.jpg',
    gallery: [
      '/images/kitchen_hooks.jpg'
    ],
    features: [
      'Rare Earth N52 Neodymium Magnetic Core',
      '8kg Vertical Pull Hold Capacity per hook',
      'Anti-Scratch Soft Protective Rubber Pad Base',
      'Zero Tools, Zero Drilling or Adhesive Residue',
      'Matte Rust-Proof Durable Finish'
    ],
    specs: {
      'Quantity': 'Pack of 6 Heavy Duty Hooks',
      'Magnetic Grade': 'N52 Neodymium',
      'Capacity': 'Up to 8kg (17.6 lbs) vertical hold',
      'Finish': 'Rust-Resistant Matte Powder Coat',
      'Warranty': 'Lifetime Magnetism Guarantee'
    },
    whatsInTheBox: [
      '6x Heavy Duty Magnetic Hooks',
      '6x Silicone Anti-Scratch Base Protectors',
      '1x Storage Tin Box'
    ],
    variants: [
      { id: 'v6-black', title: 'Matte Black (Pack of 6)', inStock: true, colorHex: '#1C1917' },
      { id: 'v6-silver', title: 'Brushed Nickel (Pack of 6)', inStock: true, colorHex: '#94A3B8' }
    ],
    warranty: 'Lifetime Magnetism Guarantee',
    shippingInfo: 'Tracked International Shipping: 5–8 Business Days',
    shippingSuitability: 'Lightweight Express',
    weightKg: 0.22,
    inStock: true,
    inventoryCount: 88,
    status: 'active',
    isTrending: true,
    createdAt: '2025-08-06T10:00:00Z',
    reviews: [
      {
        id: 'rev-10',
        author: 'Oliver H.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Super strong grip',
        comment: 'Holds heavy cast iron pans on our kitchen rack with zero slipping. Rubber base protects the paint.',
        verified: true,
        country: 'Canada'
      }
    ]
  },
  {
    id: 'prod-7',
    title: 'Gas Spring Monitor Desk Mount Arm',
    handle: 'gas-spring-monitor-desk-mount',
    subtitle: 'Full motion 360° counterbalance arm for 17" to 35" screens.',
    description: 'Reclaim valuable desk space and position your screen at your ergonomic eye level. Built with precision automotive-grade gas struts, heavy-duty clamp and grommet mounting options, and concealed cable channels to keep your workspace pristine.',
    category: 'Displays',
    subCategory: 'Mounts',
    price: 44.99,
    compareAtPrice: 49.99,
    rating: 4.8,
    reviewsCount: 31,
    imageUrl: '/images/monitor_arm.jpg',
    gallery: [
      '/images/monitor_arm.jpg'
    ],
    features: [
      'Smooth Counterbalanced Gas Spring Strut',
      'Supports Screens from 2kg to 10kg',
      'VESA 75x75 & 100x100mm Compatible',
      'Concealed Cable Routing Channels',
      'Heavy-duty C-Clamp & Grommet Mounting'
    ],
    specs: {
      'Screen Sizes': '17" - 35" Monitors',
      'Weight Capacity': '2 to 10 kg (4.4 - 22 lbs)',
      'Tilt Range': '+90° to -45°',
      'Swivel': '180° / Rotation 360° Portrait & Landscape',
      'Warranty': '2-Year Mechanical Warranty'
    },
    whatsInTheBox: [
      '1x Gas Spring Monitor Arm',
      '1x C-Clamp & Grommet Base Mount',
      '1x VESA Quick-Release Plate & Screws (M4/M5)',
      '1x Cable Clip Routing Kit & Hex Keys'
    ],
    variants: [
      { id: 'v7-black', title: 'Matte Black', inStock: true, colorHex: '#18181B' },
      { id: 'v7-white', title: 'Clean White', inStock: true, colorHex: '#F4F4F5' }
    ],
    warranty: '2-Year Mechanical Warranty',
    shippingInfo: 'Tracked International Shipping: 6–10 Business Days',
    shippingSuitability: 'Standard Parcel',
    weightKg: 2.85,
    inStock: true,
    inventoryCount: 32,
    status: 'active',
    isTrending: false,
    createdAt: '2025-08-07T10:00:00Z',
    reviews: [
      {
        id: 'rev-11',
        author: 'Danielle K.',
        rating: 5,
        date: '1 month ago',
        title: 'Freed up so much desk real estate',
        comment: 'Effortless to reposition with one hand. Holds my 32-inch screen rock solid without sagging.',
        verified: true,
        country: 'United States'
      }
    ]
  },
  {
    id: 'prod-8',
    title: 'Studio Eye-Care Monitor Light Bar',
    handle: 'studio-eye-care-monitor-light-bar',
    subtitle: 'Asymmetric anti-glare optical design with touch puck control.',
    description: 'Zero screen glare, zero eye strain. Features 45-degree angled asymmetric optical illumination that illuminates your desktop workspace without casting any reflection onto your display. Stepless color temperature (2700K to 6500K) with stepped touch dimmer and ambient light sensing.',
    category: 'Desk Setup',
    subCategory: 'Lighting',
    price: 34.99,
    compareAtPrice: 39.99,
    rating: 4.9,
    reviewsCount: 29,
    imageUrl: '/images/lightbar.jpg',
    gallery: [
      '/images/lightbar.jpg'
    ],
    features: [
      'Asymmetric Anti-Screen Glare Optical Track',
      'Stepless Dimming & 2700K-6500K Color Temperature',
      'Ra95 High Color Rendering Index (True daylight accuracy)',
      'Weighted Gravity Counterbalance Clamp (Zero adhesives)',
      'Auto-Dimming Ambient Light Sensor'
    ],
    specs: {
      'Length': '45 cm (17.7 inches)',
      'Color Temperature': '2700K - 6500K Stepless',
      'CRI': 'Ra > 95 True Color',
      'Power Source': 'USB Type-C 5V 1A (Powers from monitor or hub)',
      'Warranty': '1-Year Limited Warranty'
    },
    whatsInTheBox: [
      '1x Monitor Light Bar (45cm)',
      '1x Weighted Gravity Clamp',
      '1x USB-A to USB-C Braided Cable (1.5m)',
      '1x User Guide'
    ],
    variants: [
      { id: 'v8-dark', title: 'Anodized Space Black', inStock: true, colorHex: '#27272A' }
    ],
    warranty: '1-Year Limited Warranty',
    shippingInfo: 'Tracked International Shipping: 5–8 Business Days',
    shippingSuitability: 'Lightweight Express',
    weightKg: 0.52,
    inStock: true,
    inventoryCount: 45,
    status: 'active',
    isTrending: false,
    createdAt: '2025-08-08T10:00:00Z',
    reviews: [
      {
        id: 'rev-12',
        author: 'Tom W.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Huge difference for night coding',
        comment: 'Zero reflection on the display glass. My eyes feel so much less fatigued after 8-hour shifts.',
        verified: true,
        country: 'Germany'
      }
    ]
  },
  {
    id: 'prod-9',
    title: 'Magnetic Desk Cable Organizer & Hub',
    handle: 'magnetic-desk-cable-organizer',
    subtitle: 'Weighted metallic baseplate with 5 magnetic snap collars.',
    description: 'Keep your charging and display cables securely within arm reach instead of dropping behind your desk. Features a weighted matte metallic baseplate with non-slip micro-suction underside and 5 precision magnetic snap collars for flat, braided, and round cables.',
    category: 'Desk Setup',
    subCategory: 'Accessories',
    price: 12.99,
    compareAtPrice: 15.99,
    rating: 4.8,
    reviewsCount: 47,
    imageUrl: '/images/cable_organizer.jpg',
    gallery: [
      '/images/cable_organizer.jpg'
    ],
    features: [
      '5 Magnetic Universal Cable Collars',
      'Heavy Weighted Metal Baseplate',
      'Reusable Residue-Free Micro-Suction Base',
      'Fits Round, Flat & Braided Cables (up to 5.5mm)',
      'Sleek Minimalist Aesthetic'
    ],
    specs: {
      'Baseplate Dimensions': '90 x 20 x 4 mm',
      'Material': 'Anodized Aluminum Alloy + Soft Silicone',
      'Compatibility': 'USB-C, Lightning, HDMI, DisplayPort cables',
      'Warranty': '1-Year Limited Warranty'
    },
    whatsInTheBox: [
      '1x Weighted Metal Baseplate',
      '5x Magnetic Silicone Cable Collars',
      '2x Reusable Micro-Suction Adhesive Strips'
    ],
    variants: [
      { id: 'v9-black', title: 'Matte Black', inStock: true, colorHex: '#18181B' },
      { id: 'v9-silver', title: 'Silver Mist', inStock: true, colorHex: '#E2E8F0' }
    ],
    warranty: '1-Year Limited Warranty',
    shippingInfo: 'Tracked International Shipping: 5–8 Business Days',
    shippingSuitability: 'Lightweight Express',
    weightKg: 0.15,
    inStock: true,
    inventoryCount: 90,
    status: 'active',
    isTrending: false,
    createdAt: '2025-08-09T10:00:00Z',
    reviews: [
      {
        id: 'rev-13',
        author: 'Mia C.',
        rating: 5,
        date: '3 weeks ago',
        title: 'Cleanest desk accessory I own',
        comment: 'No more crawling under my desk to grab fallen charging cables. Strong magnetic snap.',
        verified: true,
        country: 'United Kingdom'
      }
    ]
  }
];

// Start with empty orders by default so live customers see authentic clean state
export const INITIAL_ORDERS: Order[] = [];

export const INITIAL_SHOPIFY_CONFIG: ShopifyConfig = {
  shopDomain: 'pixelnest-store.myshopify.com',
  storefrontAccessToken: '',
  adminAccessToken: '',
  apiVersion: '2024-01',
  isConnected: false,
  liveMode: false,
  lastSyncTime: 'Not yet connected'
};

export const CATEGORIES_META = [
  { name: 'Peripherals', count: 2, icon: 'Mouse', desc: 'Ergonomic mice, mechanical keyboards, and precision tools' },
  { name: 'Displays', count: 2, icon: 'Monitor', desc: 'Curved ultrawide screens, counterbalance desk arms, and mounts' },
  { name: 'Power & Charging', count: 1, icon: 'Zap', desc: 'GaN fast multi-chargers, docks, and power accessories' },
  { name: 'Home & Living', count: 2, icon: 'Flame', desc: 'Ambient lava lamps, magnetic hooks, and functional home accents' },
  { name: 'Desk Setup', count: 2, icon: 'LayoutGrid', desc: 'Eye-care screen light bars and cable organizers' },
  { name: 'Others', count: 0, icon: 'Package', desc: 'Adapters, cleaning gear, and tech accessories' }
];
