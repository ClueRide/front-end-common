/**
 * Enumerated constants representing the valid states of Registration for an app on
 * a given device.
 * @deprecated - Using the RegState instead.
 */
export enum AuthState {
  NO_NETWORK_CONNECTION,  // Unable to connect to back-end to perform check.
  UNREGISTERED,   // Never before registered or requiring a new registration
  REGISTERED,     // Valid registration that has not expired
  EXPIRED         // Valid registration that has expired and needs to be renewed
}
