interface StorageKeySet {
  profile: string;
  jwtToken: string;
  accessToken: string;
  expiresAt: string;
  registrationType: string;
}

/**
 * Keys into the Storage; placed here to avoid repeating across services.
 * @type {StorageKeySet} object defining the keys shared across services.
 */

export const STORAGE_KEYS: StorageKeySet = {
  profile: 'profile',
  jwtToken: 'id_token',
  accessToken: 'access_token',
  expiresAt: 'expires_at',
  registrationType: 'registration_type',
};
