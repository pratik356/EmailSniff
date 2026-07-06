import { NextResponse } from 'next/server';
import disposableDomains from '@/data/disposable_domains.json';

export async function GET() {
  return NextResponse.json({
    service: 'Disposable Email Detection API',
    version: '1.0.0',
    domains_count: disposableDomains.length,
    source_repo: 'https://github.com/disposable-email-domains/disposable-email-domains',
    last_updated: new Date().toISOString(),
    endpoints: {
      single: {
        method: 'GET',
        path: '/api/check?email=test@example.com',
        description: 'Check single email',
      },
      batch: {
        method: 'POST',
        path: '/api/batch-check',
        description: 'Check multiple emails (max 1000)',
        body: { emails: ['test@example.com', 'user@domain.com'] },
      },
      metadata: {
        method: 'GET',
        path: '/api/metadata',
        description: 'Get API metadata',
      },
    },
  });
}
