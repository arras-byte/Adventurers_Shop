import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// In production (incl. external hosting), omit serverUrl/appBaseUrl so the SDK
// routes API requests to Base44's hosted backend automatically.
// In local dev, point them at the local Base44 dev server.
const isDev = import.meta.env.DEV;

export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  requiresAuth: false,
  ...(isDev && { serverUrl: appBaseUrl, appBaseUrl })
});