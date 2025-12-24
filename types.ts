
export interface Store {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  slug: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export enum CouponType {
  CODE = 'CODE',
  DEAL = 'DEAL'
}

export interface Coupon {
  id: string;
  title: string;
  type: CouponType;
  code?: string;
  discountValue: string;
  storeId: string;
  categoryId: string;
  expiryDate: string;
  description: string;
  terms: string;
  affiliateUrl: string;
  isActive: boolean;
  isFeatured: boolean;
  clickCount: number;
  copyCount: number;
  verifiedDate: string;
}

export interface SiteStats {
  totalClicks: number;
  totalCoupons: number;
  totalStores: number;
  featuredCoupons: number;
}
