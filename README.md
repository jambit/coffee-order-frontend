# Info
This frontend runs only together with
- [coffee-order-servie](https://github.com/jambit/coffee-order-service)
- [keycloak-service](https://github.com/jambit/keycloak-service)

checkout and build those projects as well.

# Build
Build project with `mvn clean install`. This builds the jar file and the docker image.

# Run
- **run locally (e.g. for debuging)** 
    - execute `mvn spring-boot:run` to startup the frontend

- **run all services on docker**
    - use the docker-compose file from `keycloak-service` project to startup *all* services.