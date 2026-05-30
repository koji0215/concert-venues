import VenueList from '@/components/VenueList';
import { Venue } from '@/types/venue';
import fs from 'fs';
import path from 'path';

// サーバーサイドでデータを読み込む
async function getVenues(): Promise<Venue[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'venues.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Home() {
  const venues = await getVenues();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            🎵 公共コンサート会場検索
          </h1>
          <p className="mt-2 text-gray-600">
            東京都内の公共ホール・文化施設を検索できます
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <VenueList venues={venues} />
      </main>

      {/* フッター */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2026 公共コンサート会場検索
          </p>
        </div>
      </footer>
    </div>
  );
}
