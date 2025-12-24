
import { Store, Category, Coupon, CouponType } from './types';

export const INITIAL_STORES: Store[] = [
  { id: '1', name: 'Nike', logoUrl: 'https://picsum.photos/seed/nike/200/200', websiteUrl: 'https://nike.com', slug: 'nike', description: 'Global leader in athletic footwear and apparel.' },
  { id: '2', name: 'Amazon', logoUrl: 'https://picsum.photos/seed/amazon/200/200', websiteUrl: 'https://amazon.com', slug: 'amazon', description: 'Everything you need, delivered.' },
  { id: '3', name: 'Sephora', logoUrl: 'https://picsum.photos/seed/sephora/200/200', websiteUrl: 'https://sephora.com', slug: 'sephora', description: 'Beauty, cosmetics and skincare destination.' },
  { id: '4', name: 'Best Buy', logoUrl: 'https://picsum.photos/seed/bestbuy/200/200', websiteUrl: 'https://bestbuy.com', slug: 'best-buy', description: 'Consumer electronics and home appliances.' },
  { id: '5', name: 'Target', logoUrl: 'https://picsum.photos/seed/target/200/200', websiteUrl: 'https://target.com', slug: 'target', description: 'Shop all your daily essentials.' },
  { id: '6', name: 'Walmart', logoUrl: 'https://picsum.photos/seed/walmart/200/200', websiteUrl: 'https://walmart.com', slug: 'walmart', description: 'Save money. Live better.' },
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Electronics', icon: 'devices', slug: 'electronics' },
  { id: 'cat2', name: 'Fashion', icon: 'apparel', slug: 'fashion' },
  { id: 'cat3', name: 'Beauty', icon: 'face', slug: 'beauty' },
  { id: 'cat4', name: 'Home & Kitchen', icon: 'kitchen', slug: 'home-kitchen' },
  { id: 'cat5', name: 'Travel', icon: 'flight', slug: 'travel' },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c1',
    title: '20% Off Entire Order',
    type: CouponType.CODE,
    code: 'NIKE20',
    discountValue: '20%',
    storeId: '1',
    categoryId: 'cat2',
    expiryDate: '2025-12-31',
    description: 'Get 20% off all regular priced items.',
    terms: 'Valid on regular priced items only. Not applicable on limited editions.',
    affiliateUrl: 'https://nike.com/shop',
    isActive: true,
    isFeatured: true,
    clickCount: 1240,
    copyCount: 450,
    verifiedDate: new Date().toISOString()
  },
  {
    id: 'c2',
    title: 'Free Shipping Over $50',
    type: CouponType.DEAL,
    discountValue: 'FREE',
    storeId: '2',
    categoryId: 'cat1',
    expiryDate: '2025-06-15',
    description: 'Enjoy free standard shipping on eligible orders over $50.',
    terms: 'Minimum spend of $50 required.',
    affiliateUrl: 'https://amazon.com/shipping',
    isActive: true,
    isFeatured: true,
    clickCount: 3500,
    copyCount: 0,
    verifiedDate: new Date().toISOString()
  },
  {
    id: 'c3',
    title: '$10 Off First Order',
    type: CouponType.CODE,
    code: 'WELCOME10',
    discountValue: '$10',
    storeId: '3',
    categoryId: 'cat3',
    expiryDate: '2025-03-01',
    description: 'Exclusive discount for new customers.',
    terms: 'Valid for new accounts only. Minimum spend $50.',
    affiliateUrl: 'https://sephora.com',
    isActive: true,
    isFeatured: false,
    clickCount: 890,
    copyCount: 300,
    verifiedDate: new Date().toISOString()
  },
  {
    id: 'c4',
    title: '$200 Off MacBook Pro',
    type: CouponType.DEAL,
    discountValue: '$200',
    storeId: '4',
    categoryId: 'cat1',
    expiryDate: '2025-01-20',
    description: 'Massive savings on latest MacBook Pro models.',
    terms: 'While stocks last. Selected models only.',
    affiliateUrl: 'https://bestbuy.com/macbook',
    isActive: true,
    isFeatured: true,
    clickCount: 520,
    copyCount: 0,
    verifiedDate: new Date().toISOString()
  }
];
