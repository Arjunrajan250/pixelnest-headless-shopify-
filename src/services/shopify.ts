import { Product, ShopifyConfig } from '../types';

/**
 * GraphQL Query for Shopify Storefront API
 */
const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          tags
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

const CHECKOUT_CREATE_MUTATION = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export async function testShopifyConnection(config: ShopifyConfig): Promise<{ success: boolean; message: string; shopName?: string }> {
  if (!config.shopDomain || !config.storefrontAccessToken) {
    return {
      success: false,
      message: 'Shop domain and Storefront Access Token are required.'
    };
  }

  // Clean domain string
  const cleanDomain = config.shopDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const endpoint = `https://${cleanDomain}/api/${config.apiVersion || '2024-01'}/graphql.json`;

  const query = `
    query {
      shop {
        name
        primaryDomain {
          url
        }
      }
    }
  `;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      return {
        success: false,
        message: `HTTP ${response.status}: Failed to reach Shopify Storefront API.`
      };
    }

    const json = await response.json();
    if (json.errors && json.errors.length > 0) {
      return {
        success: false,
        message: json.errors[0].message || 'Shopify GraphQL query returned errors.'
      };
    }

    const shopName = json.data?.shop?.name || cleanDomain;
    return {
      success: true,
      message: `Successfully connected to ${shopName}!`,
      shopName
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Network error connecting to Shopify. Please verify CORS and credentials.'
    };
  }
}

export async function fetchShopifyProducts(config: ShopifyConfig): Promise<{ success: boolean; products?: Product[]; error?: string }> {
  if (!config.shopDomain || !config.storefrontAccessToken) {
    return { success: false, error: 'Shopify credentials missing' };
  }

  const cleanDomain = config.shopDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const endpoint = `https://${cleanDomain}/api/${config.apiVersion || '2024-01'}/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken
      },
      body: JSON.stringify({
        query: PRODUCTS_QUERY,
        variables: { first: 20 }
      })
    });

    const json = await response.json();
    if (json.errors) {
      return { success: false, error: json.errors[0]?.message };
    }

    const edges = json.data?.products?.edges || [];
    const products: Product[] = edges.map((edge: any) => {
      const node = edge.node;
      const variant = node.variants?.edges?.[0]?.node;
      const images = (node.images?.edges || []).map((e: any) => e.node.url);
      const price = parseFloat(variant?.price?.amount || '299');
      const comparePrice = variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : undefined;

      let category: Product['category'] = 'Peripherals';
      const type = (node.productType || '').toLowerCase();
      if (type.includes('display') || type.includes('monitor') || type.includes('screen')) category = 'Displays';
      else if (type.includes('charge') || type.includes('power') || type.includes('cable')) category = 'Power & Charging';
      else if (type.includes('home') || type.includes('lamp') || type.includes('hook') || type.includes('living')) category = 'Home & Living';
      else if (type.includes('desk') || type.includes('mount') || type.includes('light')) category = 'Desk Setup';
      else if (type.includes('mouse') || type.includes('keyboard') || type.includes('peripheral')) category = 'Peripherals';
      else category = 'Others';

      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        description: node.description,
        subtitle: 'Hardware Gear from Shopify Store',
        category,
        price,
        compareAtPrice: comparePrice,
        rating: 4.8,
        reviewsCount: 150,
        imageUrl: images[0] || '/images/planner.jpg',
        gallery: images.length ? images : ['/images/planner.jpg'],
        features: [
          'Instant Download File',
          'Compatible with Mobile & Tablet',
          'Lifetime Access'
        ],
        status: 'active',
        shopifyId: node.id,
        createdAt: new Date().toISOString()
      };
    });

    return { success: true, products };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}

export async function createShopifyCheckout(
  config: ShopifyConfig,
  items: { variantId: string; quantity: number }[]
): Promise<{ success: boolean; webUrl?: string; error?: string }> {
  if (!config.shopDomain || !config.storefrontAccessToken) {
    return { success: false, error: 'Shopify credentials missing' };
  }

  const cleanDomain = config.shopDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const endpoint = `https://${cleanDomain}/api/${config.apiVersion || '2024-01'}/graphql.json`;

  const lineItems = items.map(item => ({
    variantId: item.variantId,
    quantity: item.quantity
  }));

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken
      },
      body: JSON.stringify({
        query: CHECKOUT_CREATE_MUTATION,
        variables: { input: { lineItems } }
      })
    });

    const json = await response.json();
    const webUrl = json.data?.checkoutCreate?.checkout?.webUrl;
    if (webUrl) {
      return { success: true, webUrl };
    }
    return { success: false, error: json.data?.checkoutCreate?.checkoutUserErrors?.[0]?.message || 'Checkout creation failed' };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}
