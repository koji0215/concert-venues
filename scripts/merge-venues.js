const fs = require('fs');
const path = require('path');

// すべてのJSONファイルを読み込む
const venues1 = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/venues.json'), 'utf8'));
const venues2 = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/venues-additional.json'), 'utf8'));
const venues3 = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/venues-additional2.json'), 'utf8'));
const venues4 = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/venues-additional3.json'), 'utf8'));
const venues5 = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/venues-additional4.json'), 'utf8'));

// すべてを統合
const allVenues = [...venues1, ...venues2, ...venues3, ...venues4, ...venues5];

// 統合したデータを保存
fs.writeFileSync(
  path.join(__dirname, '../public/data/venues.json'),
  JSON.stringify(allVenues, null, 2),
  'utf8'
);

console.log(`✅ 統合完了: ${allVenues.length}施設のデータを作成しました`);

// 追加ファイルを削除
fs.unlinkSync(path.join(__dirname, '../public/data/venues-additional.json'));
fs.unlinkSync(path.join(__dirname, '../public/data/venues-additional2.json'));
fs.unlinkSync(path.join(__dirname, '../public/data/venues-additional3.json'));
fs.unlinkSync(path.join(__dirname, '../public/data/venues-additional4.json'));

console.log('✅ 一時ファイルを削除しました');
