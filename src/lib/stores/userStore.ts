// src/lib/stores/counter.ts
import type { User } from 'firebase/auth';
import { persistStore } from './localStore';
import type { UserType } from './userStoreType';

export const user = persistStore<UserType | null>('user', null);
