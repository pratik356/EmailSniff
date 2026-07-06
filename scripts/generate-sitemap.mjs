import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_DIR = path.join(__dirname, '../app');
const PUBLIC_DIR = path.join(__dirname, '../public');
const BASE_URL = 'https://emailsniff.com';

function getRoutes(dir, baseRoute = '') {
  let routes = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip api routes, layouts, and route groups starting with _ or parenthesis/brackets
      if (
        file === 'api' || 
        file.startsWith('_') || 
        file.startsWith('[') || 
        file.startsWith('(')
      ) {
        continue;
      }
      routes = routes.concat(getRoutes(fullPath, `${baseRoute}/${file}`));
    } else if (file === 'page.tsx' || file === 'page.js') {
      routes.push(baseRoute || '/');
    }
  }
  return routes;
}

const routes = getRoutes(APP_DIR);
console.log('Found routes for sitemap:', routes);

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${BASE_URL}${route === '/' ? '' : route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml.trim());
console.log('Successfully generated public/sitemap.xml!');
