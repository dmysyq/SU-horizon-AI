import { Metadata } from 'next';

interface PageMetadata {
  title: string;
  description: string;
  path: string;
}

const SITE_NAME = 'CodeHorizon AI';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const createMetadata = ({ title, description, path }: PageMetadata): Metadata => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = `${BASE_URL}${path === '/' ? '' : path}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'ru_RU',
      type: 'website',
    },
    alternates: { canonical: canonicalUrl },
  };
};
