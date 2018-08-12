# REST API
_The services in this directory were originally modeled after the Angular 1.x ngResource for REST APIs within Angular._

Because Angular 2/4 doesn't supply an ngResource, a 3rd-party library is used:
http://ngx-restangular.com/

# Approach
The first cut at sorting out retrieving asynchronous data from the back-end intends to answer the following questions:

- What libraries support this?
- Where do the resources fall in the source tree?
- How is AUTH handled?
- Define an initial set of interfaces and objects to serve as a pattern
- Test-Driven Development (TDD)

Ticket LE-24 covers the original work under the MobiLoc module.

## Library Support
- The library ngx-restangular (http://ngx-restangular.com/) appears to meet these needs:
  - Configure adding the Auth headers.
  - Works well with Observables.
  - Customize the GET, POST, PUT, DELETE methods
  - Rich language for REST paths

### Including the library in the app
To use the module in the app, the following command was executed:

`npm install ngx-restangular --save`

Then, adding the module to the `app.module.ts`:

under the `imports`:

`RestangularModule.forRoot(<RestangularConfigFactory>)`

where the `RestangularConfigFactory` is an optional factory for the config
information.

## Resource Location
- Providers appear to be the location for any application-wide services.
- The sub-directory/package for REST API resources is being called resources 
as implied by the examples given in the README.md for ngx-resource.

## Handling Authorization
- Using Auth Tokens as provided by Auth0
  - Original approach: https://stackoverflow.com/questions/26777083/best-practice-for-rest-token-based-authentication-with-jax-rs-and-jersey
  - Moved toward use of what Auth0 provides for Native apps (even though much work is within browser)
- Further detail under the README.md for login (page).

## Initial set of interfaces and objects

_Modeled after examples in "Starter Guide" for http://ngx-restangular.com/ _

- Created a separate service which is configured inside a 
service.provider file.

# Testing
Resources fall under the category of "Services". Along with Pipes, Services are generally
tested in "isolation" instead of part of a TestBed.

I mention Injectors below because I didn't have another place to put these right now.

## Injectors

    const injector = ReflectiveInjector.resolveAndCreate([
      locationTypeServiceProvider
    ]);
    
## Using the Injector

      beforeEach(() => {
        toTest = new LocationTypeService(
          injector.get(LOCATION_TYPE_REST)
        );
      });
