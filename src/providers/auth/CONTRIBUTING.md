# Testing

When this code is run from `ionic serve`, the browser that is provided does
not support making calls out to the 3rd-party Identity Provider to obtain 
an access token -- which includes much of the code within this component.

To provide this support, you can use `ionic cordova emulate`, but this taxes
the resources of a machine -- both memory and CPU. It may not perform well.

To provide a less demanding alternative, a configurable account can be used 
to bypass calls to the 3rd-party Identity Provider.



Diagram: http://bikehighways.wikidot.com/testing-auth0
