import { base44 } from '@/api/base44Client';

const PASSPHRASE_KEY = 'admin_passphrase';

const listeners = new Set();

export const adminAuth = {
  getPassphrase() {
    return sessionStorage.getItem(PASSPHRASE_KEY) || '';
  },
  isUnlocked() {
    return Boolean(sessionStorage.getItem(PASSPHRASE_KEY));
  },
  unlock(passphrase) {
    sessionStorage.setItem(PASSPHRASE_KEY, passphrase);
    listeners.forEach((l) => l(true));
  },
  lock() {
    sessionStorage.removeItem(PASSPHRASE_KEY);
    listeners.forEach((l) => l(false));
  },
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export async function blogAdminCall(action, extra = {}) {
  const passphrase = extra.passphrase || adminAuth.getPassphrase();
  const response = await base44.functions.invoke('blogAdmin', { action, ...extra, passphrase });
  return response.data;
}