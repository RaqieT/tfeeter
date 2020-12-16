# Tfeeter
## Spring boot + Keycloak + Docker + Angular sample integration
- tfeeter-backend: java code for backend
- tfeeter-frontend: ts code for frontend
- keycloak-config.json: file exported from Keycloak server, needed for autoconfig
- docker-compose.yml: docker-compose configuration
- tfeeter-backend.postman_collection.json: exported postman collection (v2.1)

## Setup
- docker-compose build
- docker-compose up -d

## Warning
- current CORS config is not for production usage!
- replace all 192.168.8.20 to your local ip; Why not localhost? Backend service keycloak adapter uses same 
KEYCLOAK_DOMAIN_ADDRESS for connection and checking origin, to prevent problems with backend ->
keycloak connection (for backend container localhost means 127.0.0.1 so instead of reaching kc, it will reach itself ) 
or user receiving 401, because of wrong origin, you can just set your local ip as domain address, your backend container
will reach keycloak and users will get proper origin header
