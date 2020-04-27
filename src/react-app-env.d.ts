/// <reference types="react-scripts" />
import { AuthStore } from './stores/authStore';
import { CommonStore } from './stores/commonStore';
import { SessionsStore } from './stores/sessionsStore';
import { UserStore } from './stores/userStore';
import { ForgeStore } from './stores/forgeStore';
import { AdminStore } from './stores/adminStore';


export interface IStores {
  forgeStore: ForgeStore;
  authStore: AuthStore;
  commonStore: CommonStore;
  sessionsStore: SessionsStore;
  userStore: UserStore;
  adminStore: AdminStore;
}

export interface IForge {
  id: string;
  created_at: string;
  deleted_at: string;
  last_activity_at: string;
  email: string;
  language: string;
}

export interface IUser {
  id: string;
  created_at: string;
  deleted_at: string;
  last_activity_at: string;
  email: string;
  language: string;
}

export interface ISessionDto {
  id: string;
  created_at: string;
  expires_at: string;
  revoked_at: string;
  last_activity_at: string;
  ip: string;
  useragent: string;
}

export interface ISession {
  id: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt: Date;
  lastActivityAt: Date;
  ip: string;
  useragent: string;
}
