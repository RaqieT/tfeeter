# Tfeeter
## Spring boot + Keycloak + Docker sample integration
- tfeeter-backend: java code for backend
- realm-export.json: file exported from Keycloak web
- docker-compose.yml: docker-compose configuration

## Sample  install
- docker-compose build
- docker-compose up -d
- go to keycloak UI (http://localhost:8080/auth) and import provided config
- set password for default users (user(USER),fiufiu(ADMIN))
- login to app through http://localhost:8090/
