import { Product, Order, ShopifyConfig } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Minimal Daily Planner',
    handle: 'minimal-daily-planner',
    subtitle: 'Stay organized, focused and productive.',
    description: 'A simple and aesthetic daily planner to help you organize your tasks, set goals and build better habits. Perfect for students, professionals and anyone who wants a more productive life. Compatible with GoodNotes, Notability, and printable on standard paper.',
    category: 'Planners',
    subCategory: 'Daily',
    price: 299,
    compareAtPrice: 499,
    rating: 4.8,
    reviewsCount: 2400,
    imageUrl: '/images/planner.jpg',
    gallery: [
      '/images/planner.jpg',
      '/images/wellness_planner.jpg',
      '/images/templates.jpg',
      '/images/hero.jpg'
    ],
    features: [
      'Instant Download (PDF)',
      'Printable & Digital Use',
      'A4, A5, US Letter Sizes',
      'GoodNotes & Notability Ready',
      'Undated — Reuse Every Year'
    ],
    status: 'active',
    downloadUrl: '/downloads/minimal-daily-planner.pdf',
    downloadFileName: 'Minimal_Daily_Planner_2025.pdf',
    fileSize: '4.2 MB',
    isTrending: true,
    createdAt: '2025-08-01T10:00:00Z'
  },
  {
    id: 'prod-2',
    title: 'Social Media Templates',
    handle: 'social-media-templates',
    subtitle: 'Curated neutral aesthetic for creators and brands.',
    description: '100+ fully customizable Canva and Figma social media templates. Boost your engagement with clean layouts, moodboards, educational carousels, and minimal story designs tailored for aesthetic brands.',
    category: 'Templates',
    subCategory: 'Instagram',
    price: 399,
    compareAtPrice: 599,
    rating: 4.9,
    reviewsCount: 3100,
    imageUrl: '/images/templates.jpg',
    gallery: [
      '/images/templates.jpg',
      '/images/planner.jpg',
      '/images/hero.jpg'
    ],
    features: [
      'Instant Canva & Figma Access',
      '100+ Unique Grid & Story Layouts',
      'Neutral Earthy Palette',
      'Commercial License Included'
    ],
    status: 'active',
    downloadUrl: '/downloads/social-media-templates.zip',
    downloadFileName: 'Social_Media_Templates_Canva_Pack.zip',
    fileSize: '18.5 MB',
    isTrending: true,
    createdAt: '2025-08-05T12:00:00Z'
  },
  {
    id: 'prod-3',
    title: 'The Productivity Planner',
    handle: 'the-productivity-planner',
    subtitle: 'Achieve your top 3 daily priorities without burnout.',
    description: 'Designed around the Rule of 3 and Pomodoro technique, this planner cuts through digital noise so you can prioritize deeply impactful work every morning.',
    category: 'Planners',
    subCategory: 'Daily',
    price: 299,
    compareAtPrice: 499,
    rating: 4.7,
    reviewsCount: 1900,
    imageUrl: '/images/planner.jpg',
    gallery: [
      '/images/planner.jpg',
      '/images/hero.jpg'
    ],
    features: [
      'Instant Download (PDF)',
      'Time-Blocking Daily Schedules',
      'Habit & Focus Trackers',
      'Interactive Hyperlinks'
    ],
    status: 'active',
    downloadUrl: '/downloads/productivity-planner.pdf',
    downloadFileName: 'The_Productivity_Planner.pdf',
    fileSize: '3.8 MB',
    isTrending: true,
    createdAt: '2025-08-02T09:30:00Z'
  },
  {
    id: 'prod-4',
    title: 'Wellness Planner',
    handle: 'wellness-planner',
    subtitle: 'Nourish your body, calm your mind, and track routines.',
    description: 'Mindful tracking for daily hydration, nutritious meals, sleep cycles, gentle workouts, and gratitude affirmations. Your calming sanctuary in a busy world.',
    category: 'Planners',
    subCategory: 'Daily',
    price: 349,
    compareAtPrice: 549,
    rating: 4.7,
    reviewsCount: 1800,
    imageUrl: '/images/wellness_planner.jpg',
    gallery: [
      '/images/wellness_planner.jpg',
      '/images/planner.jpg'
    ],
    features: [
      'Instant Download (PDF)',
      'Daily Gratitude & Mindfulness',
      'Meal & Hydration Tracking',
      'Sleep & Mood Logs'
    ],
    status: 'active',
    downloadUrl: '/downloads/wellness-planner.pdf',
    downloadFileName: 'Wellness_Mindfulness_Journal.pdf',
    fileSize: '5.1 MB',
    isTrending: false,
    createdAt: '2025-08-08T15:00:00Z'
  },
  {
    id: 'prod-5',
    title: 'Student Planner',
    handle: 'student-planner',
    subtitle: 'Ace your semesters, deadlines, and exams stress-free.',
    description: 'Comprehensive academic planner covering course schedules, assignment deadlines, reading trackers, grade calculators, and group project organizers.',
    category: 'Planners',
    subCategory: 'Weekly',
    price: 249,
    compareAtPrice: 399,
    rating: 4.6,
    reviewsCount: 1100,
    imageUrl: '/images/planner.jpg',
    gallery: [
      '/images/planner.jpg',
      '/images/wellness_planner.jpg'
    ],
    features: [
      'Instant Download (PDF)',
      'Semester Timetable & Syllabi',
      'Assignment & Exam Trackers',
      'Budget & Study Logs'
    ],
    status: 'active',
    downloadUrl: '/downloads/student-planner.pdf',
    downloadFileName: 'Ultimate_Student_Academic_Planner.pdf',
    fileSize: '6.4 MB',
    isTrending: false,
    createdAt: '2025-08-10T11:00:00Z'
  },
  {
    id: 'prod-6',
    title: 'Budget Planner',
    handle: 'budget-planner',
    subtitle: 'Take control of your finances, savings, and investments.',
    description: 'Empowering personal finance system with zero-based budgeting, debt snowball tracking, sinking funds, annual income overviews, and monthly expense sheets.',
    category: 'Planners',
    subCategory: 'Monthly',
    price: 299,
    compareAtPrice: 499,
    rating: 4.9,
    reviewsCount: 3200,
    imageUrl: '/images/planner.jpg',
    gallery: [
      '/images/planner.jpg',
      '/images/templates.jpg'
    ],
    features: [
      'Instant Download (PDF & Excel/Sheets)',
      'Zero-based Monthly Budgeting',
      'Debt Payoff Calculators',
      'Sinking Funds & Savings Goals'
    ],
    status: 'active',
    downloadUrl: '/downloads/budget-planner.pdf',
    downloadFileName: 'Budget_Financial_Planner.pdf',
    fileSize: '4.9 MB',
    isTrending: false,
    createdAt: '2025-08-11T14:30:00Z'
  },
  {
    id: 'prod-7',
    title: 'Self Care Guide E-Book',
    handle: 'self-care-guide-ebook',
    subtitle: 'A nurturing companion for mind, body, & soul.',
    description: 'An insightful 120-page handbook on building slow rituals, setting emotional boundaries, cultivating inner stillness, and reconnecting with what brings genuine joy.',
    category: 'Ebooks',
    subCategory: 'Wellness',
    price: 199,
    compareAtPrice: 349,
    rating: 4.8,
    reviewsCount: 950,
    imageUrl: '/images/ebook_cover.jpg',
    gallery: [
      '/images/ebook_cover.jpg',
      '/images/wellness_planner.jpg'
    ],
    features: [
      'Instant Download (EPUB & PDF)',
      '120 Pages of Thoughtful Essays',
      'Reflective Prompts & Exercises',
      'Audio Affirmations Bonus'
    ],
    status: 'active',
    downloadUrl: '/downloads/self-care-guide.pdf',
    downloadFileName: 'Self_Care_Guide_Eleanor_Vance.pdf',
    fileSize: '8.7 MB',
    isTrending: false,
    createdAt: '2025-08-03T16:00:00Z'
  },
  {
    id: 'prod-8',
    title: 'Minimalist Lightroom Presets',
    handle: 'minimalist-lightroom-presets',
    subtitle: 'Soft warmth, organic tones, and dreamy natural light.',
    description: '12 professional Lightroom presets for mobile and desktop. Transforms iPhone and camera photos into cozy, warm-toned editorial memories in just one click.',
    category: 'Presets',
    subCategory: 'Mobile',
    price: 249,
    compareAtPrice: 449,
    rating: 4.7,
    reviewsCount: 680,
    imageUrl: '/images/templates.jpg',
    gallery: [
      '/images/templates.jpg',
      '/images/hero.jpg'
    ],
    features: [
      '12 Mobile (DNG) & Desktop (XMP) Presets',
      'One-Click Installation Guide',
      'Compatible with Free Lightroom App',
      'Skin-Tone Friendly Tones'
    ],
    status: 'active',
    downloadUrl: '/downloads/presets-pack.zip',
    downloadFileName: 'PixelNest_Lightroom_Presets.zip',
    fileSize: '12.1 MB',
    isTrending: false,
    createdAt: '2025-08-04T18:00:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'DN24876',
    customerName: 'Aesthetic Girl',
    customerEmail: 'aestheticgirl@gmail.com',
    shippingAddress: '742 Evergreen Terrace, Digital Studio 4B',
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Minimal Daily Planner
        quantity: 1
      }
    ],
    subtotal: 299,
    discount: 0,
    total: 299,
    paymentMethod: 'upi',
    status: 'Completed',
    date: '2025-08-12T14:20:00Z',
    deliveryDate: 'Delivered on 12 Aug 2025'
  },
  {
    id: 'order-2',
    orderNumber: 'DN24875',
    customerName: 'Aesthetic Girl',
    customerEmail: 'aestheticgirl@gmail.com',
    shippingAddress: '742 Evergreen Terrace, Digital Studio 4B',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Social Media Templates
        quantity: 1
      }
    ],
    subtotal: 399,
    discount: 100,
    discountCode: 'WELCOME100',
    total: 299,
    paymentMethod: 'card',
    status: 'Completed',
    date: '2025-08-08T11:45:00Z',
    deliveryDate: 'Delivered on 8 Aug 2025'
  },
  {
    id: 'order-3',
    orderNumber: 'DN24860',
    customerName: 'Aesthetic Girl',
    customerEmail: 'aestheticgirl@gmail.com',
    shippingAddress: '742 Evergreen Terrace, Digital Studio 4B',
    items: [
      {
        product: INITIAL_PRODUCTS[6], // Self Care E-Book
        quantity: 1
      }
    ],
    subtotal: 199,
    discount: 0,
    total: 199,
    paymentMethod: 'upi',
    status: 'Completed',
    date: '2025-08-02T16:10:00Z',
    deliveryDate: 'Delivered on 2 Aug 2025'
  },
  {
    id: 'order-4',
    orderNumber: 'DN24889',
    customerName: 'Sophia Miller',
    customerEmail: 'sophia.m@designstudio.co',
    shippingAddress: '12 West Kensington, London',
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Minimal Daily Planner
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[3], // Wellness Planner
        quantity: 1
      }
    ],
    subtotal: 648,
    discount: 65,
    discountCode: 'FIRST10',
    total: 583,
    paymentMethod: 'paypal',
    status: 'Processing',
    date: '2025-09-10T09:15:00Z',
    deliveryDate: 'Processing fulfillment'
  }
];

export const INITIAL_SHOPIFY_CONFIG: ShopifyConfig = {
  shopDomain: 'pixelnest-digital.myshopify.com',
  storefrontAccessToken: '9f8b7c6d5e4a3b2c1d0e',
  adminAccessToken: 'shpat_demo_admin_token_123456',
  apiVersion: '2024-01',
  isConnected: true,
  liveMode: false,
  lastSyncTime: 'Just now'
};

export const CATEGORIES_META = [
  { name: 'Planners', count: 12, icon: 'Calendar', desc: 'Daily, weekly, and monthly life planners' },
  { name: 'Ebooks', count: 18, icon: 'BookOpen', desc: 'Guides for mindfulness, growth, and habits' },
  { name: 'Templates', count: 20, icon: 'Layout', desc: 'Canva & Notion aesthetic social layouts' },
  { name: 'Presets', count: 11, icon: 'Sparkles', desc: 'Lightroom filters for natural tones' },
  { name: 'Courses', count: 8, icon: 'GraduationCap', desc: 'Self-paced creative masterclasses' },
  { name: 'Others', count: 6, icon: 'FolderHeart', desc: 'Wallpapers, printables, and icons' }
];
