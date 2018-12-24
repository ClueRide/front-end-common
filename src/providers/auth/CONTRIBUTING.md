# Testing

When this code is run from `ionic serve`, the browser that is provided does
not support making calls out to the 3rd-party Identity Provider to obtain 
an access token. The access token is key to running against the API.

To provide this support, you can use `ionic cordova emulate`, but this taxes
the resources of a machine -- both memory and CPU. It may not perform well.

To provide a less demanding alternative, a configurable account can be used 
to bypass calls to the 3rd-party Identity Provider. This would supply an access
token that corresponds to a "session" that the back-end is configured to 
recognize specifically for testing.

Jasmine tests are able to mock the responses from third-party services.

Diagram: http://bikehighways.wikidot.com/testing-auth0
