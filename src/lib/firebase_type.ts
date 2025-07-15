export type FirebaseUser = {
  accessToken: string;
  auth: {
    app: any; // FirebaseAppImpl 타입을 쓰고 싶다면 정확한 firebase SDK에서 가져와도 됩니다
  };
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    createdAt: string;
    lastLoginAt: string;
    lastSignInTime: string;
    creationTime: string;
  };
  phoneNumber: string | null;
  photoURL: string | null;
  proactiveRefresh: {
    user: any;
    isRunning: boolean;
    _timerId: any;
  };
  providerData: Array<any>; // 실제로는 UserInfo[] 형태
  providerId: string;
  reloadListener: any;
  reloadUserInfo: {
    localId: string;
  };
  stsTokenManager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  tenantId: string | null;
  uid: string;
};
