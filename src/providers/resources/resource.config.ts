/**
 * Configuration of the REST API provider.
 * @param RestangularProvider
 */
export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider.setBaseUrl('https://player-test.clueride.com/rest');

  /* The actual token is issued by registering the device. */
  RestangularProvider.setDefaultHeaders({
    'Authorization': 'Bearer {empty-token}'
  });

}
