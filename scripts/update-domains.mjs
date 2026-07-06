#!/usr/bin/env node

import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../data');
const filePath = path.join(dataDir, 'disposable_domains.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const GITHUB_URL =
  'https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/main/disposable_email_blocklist.conf';

console.log('🔄 Fetching latest disposable email domains...');

https
  .get(GITHUB_URL, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        // Parse the data
        const domains = data
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0 && !line.startsWith('#'));

        // Read old data to check if there are changes
        let oldDomains = [];
        if (fs.existsSync(filePath)) {
          const oldData = fs.readFileSync(filePath, 'utf-8');
          oldDomains = JSON.parse(oldData);
        }

        // Check if data changed
        const changed =
          domains.length !== oldDomains.length ||
          !domains.every((d, i) => d === oldDomains[i]);

        if (changed) {
          // Write new data as JSON
          fs.writeFileSync(filePath, JSON.stringify(domains, null, 2));
          console.log(`✅ Updated ${domains.length} disposable domains`);
          console.log(`📊 Previous count: ${oldDomains.length}`);
          console.log(`📈 New count: ${domains.length}`);
          process.exit(0);
        } else {
          console.log('✔️ No changes detected in disposable domains list');
          process.exit(0);
        }
      } else {
        console.error(
          `❌ Failed to fetch domains. Status: ${res.statusCode}`
        );
        process.exit(1);
      }
    });
  })
  .on('error', (err) => {
    console.error('❌ Error fetching domains:', err);
    process.exit(1);
  });
