import https from 'https';

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrape() {
  const html = await fetchPage('https://unsplash.com/s/photos/austria');
  const matches = [...html.matchAll(/images\.unsplash\.com\/photo-([0-9a-fA-F-]+)\?/g)];
  console.log("Austria:", [...new Set(matches.map(m => m[1]))].slice(0, 5));
  
  const html2 = await fetchPage('https://unsplash.com/s/photos/norway');
  const matches2 = [...html2.matchAll(/images\.unsplash\.com\/photo-([0-9a-fA-F-]+)\?/g)];
  console.log("Norway:", [...new Set(matches2.map(m => m[1]))].slice(0, 5));
}

scrape();
