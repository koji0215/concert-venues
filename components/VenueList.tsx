'use client';

import { useState, useMemo } from 'react';
import VenueCard from './VenueCard';
import { Venue, VenueFilter } from '@/types/venue';

interface VenueListProps {
  venues: Venue[];
}

export default function VenueList({ venues }: VenueListProps) {
  const [filter, setFilter] = useState<VenueFilter>({});
  const [searchQuery, setSearchQuery] = useState('');

  // フィルタリングされた会場リスト
  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      // 検索クエリでフィルタ
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          venue.name.toLowerCase().includes(query) ||
          venue.station.toLowerCase().includes(query) ||
          venue.ward?.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }

      // 収容人数でフィルタ
      if (filter.minCapacity && venue.capacity < filter.minCapacity) return false;
      if (filter.maxCapacity && venue.capacity > filter.maxCapacity) return false;

      // 料金でフィルタ
      if (filter.minPrice && venue.price < filter.minPrice) return false;
      if (filter.maxPrice && venue.price > filter.maxPrice) return false;

      // ピアノでフィルタ
      if (filter.hasPiano && (!venue.facilities.piano || venue.facilities.piano === 'none')) {
        return false;
      }
      if (filter.pianoType && venue.facilities.piano !== filter.pianoType) {
        return false;
      }

      // 音響設備でフィルタ
      if (filter.hasSoundSystem && !venue.facilities.soundSystem) return false;

      // 駐車場でフィルタ
      if (filter.hasParking && !venue.facilities.parking) return false;

      // 区民限定でフィルタ
      if (filter.residentOnly !== undefined && venue.conditions.residentOnly !== filter.residentOnly) {
        return false;
      }

      return true;
    });
  }, [venues, filter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* 検索バー */}
      <div className="bg-white p-6 rounded-lg shadow">
        <input
          type="text"
          placeholder="会場名、駅名、区名で検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* フィルタパネル */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">フィルタ</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 収容人数 */}
          <div>
            <label className="block text-sm font-medium mb-2">最小収容人数</label>
            <input
              type="number"
              placeholder="例: 100"
              value={filter.minCapacity || ''}
              onChange={(e) => setFilter({ ...filter, minCapacity: Number(e.target.value) || undefined })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">最大収容人数</label>
            <input
              type="number"
              placeholder="例: 500"
              value={filter.maxCapacity || ''}
              onChange={(e) => setFilter({ ...filter, maxCapacity: Number(e.target.value) || undefined })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 料金 */}
          <div>
            <label className="block text-sm font-medium mb-2">最大料金（円）</label>
            <input
              type="number"
              placeholder="例: 20000"
              value={filter.maxPrice || ''}
              onChange={(e) => setFilter({ ...filter, maxPrice: Number(e.target.value) || undefined })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ピアノ */}
          <div>
            <label className="block text-sm font-medium mb-2">ピアノ</label>
            <select
              value={filter.pianoType || ''}
              onChange={(e) => setFilter({ 
                ...filter, 
                pianoType: e.target.value ? e.target.value as 'grand' | 'upright' : undefined,
                hasPiano: e.target.value ? true : undefined
              })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">指定なし</option>
              <option value="grand">グランドピアノ</option>
              <option value="upright">アップライトピアノ</option>
            </select>
          </div>

          {/* チェックボックス */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="soundSystem"
              checked={filter.hasSoundSystem || false}
              onChange={(e) => setFilter({ ...filter, hasSoundSystem: e.target.checked || undefined })}
              className="mr-2"
            />
            <label htmlFor="soundSystem" className="text-sm">音響設備あり</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="parking"
              checked={filter.hasParking || false}
              onChange={(e) => setFilter({ ...filter, hasParking: e.target.checked || undefined })}
              className="mr-2"
            />
            <label htmlFor="parking" className="text-sm">駐車場あり</label>
          </div>
        </div>

        {/* フィルタリセット */}
        <button
          onClick={() => {
            setFilter({});
            setSearchQuery('');
          }}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          フィルタをリセット
        </button>
      </div>

      {/* 結果表示 */}
      <div>
        <p className="text-sm text-gray-600 mb-4">
          {filteredVenues.length}件の会場が見つかりました
        </p>

        {filteredVenues.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">条件に一致する会場が見つかりませんでした</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
