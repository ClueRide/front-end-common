# Responsibilities
Presents the profile of a User when it is available via Authentication.
- Email address which is used as the Principal.
- Image of user when available.

At this time, the Profile also tracks the state of whether the
email address has been authenticated by AuthService and also 
confirmed by the user agreeing to use the authenticated email.

# Collaborations
Profile Service works with:
- Token Service to retrieve the decoded payload data.
- Clients requesting Email Address or the URL of the user's image.
- Confirmation Page informs the profile of confirmation status.
