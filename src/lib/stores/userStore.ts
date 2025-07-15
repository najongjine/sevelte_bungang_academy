// src/lib/stores/counter.ts
import type { User } from "firebase/auth";
import { persistStore } from "./localStore";

export const user = persistStore<User | null>("user", null);
