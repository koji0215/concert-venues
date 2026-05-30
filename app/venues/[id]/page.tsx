import { Venue } from '@/types/venue';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 全会場データを取得
async function getVenues(): Promise<Venue[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'venues.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// 特定の会場を取得
async function getVenue(id: string): Promise<Venue | null> {
  const venues = await getVenues();
  return venues.find((v) => v.id === id) || null;
}

// 静的パスを生成（ビルド時に全ページを生成）
export async function generateStaticParams() {
  const venues = await getVenues();
  return venues.map((venue) => ({
    id: venue.id,
  }));
}

export default async function VenuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const venue = await getVenue(id);

  if (!venue) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
          >
            ← 一覧に戻る
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{venue.name}</h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* 基本情報 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">基本情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">住所</p>
                <p className="font-medium">{venue.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">最寄駅</p>
                <p className="font-medium">
                  {venue.station}から徒歩{venue.stationWalkMinutes}分
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">収容人数</p>
                <p className="font-medium">{venue.capacity}名</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">料金</p>
                <p className="font-medium">¥{venue.price.toLocaleString()}</p>
                {venue.priceNote && (
                  <p className="text-sm text-gray-500 mt-1">{venue.priceNote}</p>
                )}
              </div>
            </div>
          </section>

          {/* 設備情報 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">設備</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎹</span>
                <div>
                  <p className="text-sm text-gray-600">ピアノ</p>
                  <p className="font-medium">
                    {venue.facilities.piano === 'grand'
                      ? 'グランドピアノ'
                      : venue.facilities.piano === 'upright'
                      ? 'アップライトピアノ'
                      : 'なし'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔊</span>
                <div>
                  <p className="text-sm text-gray-600">音響設備</p>
                  <p className="font-medium">
                    {venue.facilities.soundSystem ? 'あり' : 'なし'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="text-sm text-gray-600">照明設備</p>
                  <p className="font-medium">
                    {venue.facilities.lighting ? 'あり' : 'なし'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">❄️</span>
                <div>
                  <p className="text-sm text-gray-600">空調</p>
                  <p className="font-medium">
                    {venue.facilities.airConditioning ? 'あり' : 'なし'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚗</span>
                <div>
                  <p className="text-sm text-gray-600">駐車場</p>
                  <p className="font-medium">
                    {venue.facilities.parking ? 'あり' : 'なし'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 利用条件 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">利用条件</h2>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-xl">
                  {venue.conditions.residentOnly ? '✓' : '○'}
                </span>
                <div>
                  <p className="font-medium">
                    {venue.conditions.residentOnly
                      ? '区民・市民限定'
                      : '誰でも利用可能'}
                  </p>
                </div>
              </div>
              {venue.conditions.residentDiscount && (
                <div className="flex items-start gap-2">
                  <span className="text-xl">💰</span>
                  <div>
                    <p className="font-medium">区民・市民割引あり</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-2">
                <span className="text-xl">📅</span>
                <div>
                  <p className="font-medium">
                    {venue.conditions.advanceBookingDays}日前から予約可能
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 説明 */}
          {venue.description && (
            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">説明</h2>
              <p className="text-gray-700 leading-relaxed">{venue.description}</p>
            </section>
          )}

          {/* リンク */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">リンク</h2>
            <div className="flex flex-col gap-3">
              {venue.reservationUrl && (
                <a
                  href={venue.reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  🔗 予約ページ
                </a>
              )}
              {venue.officialUrl && (
                <a
                  href={venue.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  🔗 公式サイト
                </a>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
