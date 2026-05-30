import Link from 'next/link';
import { Venue } from '@/types/venue';

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <Link href={`/venues/${venue.id}`}>
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{venue.name}</h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold">📍</span>
            <span>{venue.station}から徒歩{venue.stationWalkMinutes}分</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-semibold">👥</span>
            <span>収容人数: {venue.capacity}名</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-semibold">💰</span>
            <span>料金: ¥{venue.price.toLocaleString()}</span>
          </div>
          
          {venue.facilities.piano && venue.facilities.piano !== 'none' && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">🎹</span>
              <span>
                {venue.facilities.piano === 'grand' ? 'グランドピアノ' : 'アップライトピアノ'}
              </span>
            </div>
          )}
          
          {venue.conditions.residentDiscount && (
            <div className="mt-2">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                区民割引あり
              </span>
            </div>
          )}
        </div>
        
        {venue.description && (
          <p className="mt-4 text-sm text-gray-500 line-clamp-2">
            {venue.description}
          </p>
        )}
      </div>
    </Link>
  );
}
