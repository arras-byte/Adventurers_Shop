import { useState, useEffect } from 'react';
import { adminAuth } from '@/lib/adminAuth';

export function useAdminAuth() {
  const [isUnlocked, setIsUnlocked] = useState(adminAuth.isUnlocked());

  useEffect(() => {
    const unsubscribe = adminAuth.subscribe(setIsUnlocked);
    return unsubscribe;
  }, []);

  return {
    isUnlocked,
    unlock: adminAuth.unlock,
    lock: adminAuth.lock,
    getPassphrase: adminAuth.getPassphrase,
  };
}