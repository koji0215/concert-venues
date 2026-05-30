// 会場情報の型定義

export interface Venue {
  id: string;
  name: string;
  address: string;
  prefecture: string;
  city: string;
  ward?: string; // 区（東京23区など）
  station: string;
  stationWalkMinutes?: number; // 駅から徒歩何分
  capacity: number; // 収容人数
  price: number; // 料金（円）
  priceNote?: string; // 料金の補足（区民割引など）
  
  // 設備情報
  facilities: {
    piano?: 'grand' | 'upright' | 'none'; // ピアノの種類
    soundSystem: boolean; // 音響設備
    lighting: boolean; // 照明設備
    airConditioning: boolean; // 空調
    parking: boolean; // 駐車場
  };
  
  // 利用条件
  conditions: {
    residentOnly: boolean; // 区民・市民限定か
    residentDiscount: boolean; // 区民・市民割引があるか
    advanceBookingDays: number; // 何日前から予約可能か
  };
  
  // その他
  reservationUrl?: string; // 予約ページURL
  officialUrl?: string; // 公式サイトURL
  imageUrl?: string; // 画像URL
  description?: string; // 説明
  
  createdAt: string;
  updatedAt: string;
}

// フィルタ用の型
export interface VenueFilter {
  prefecture?: string;
  city?: string;
  ward?: string;
  minCapacity?: number;
  maxCapacity?: number;
  minPrice?: number;
  maxPrice?: number;
  hasPiano?: boolean;
  pianoType?: 'grand' | 'upright';
  hasSoundSystem?: boolean;
  hasParking?: boolean;
  residentOnly?: boolean;
}

// ソート用の型
export type VenueSortKey = 'name' | 'capacity' | 'price' | 'stationWalkMinutes';
export type VenueSortOrder = 'asc' | 'desc';
