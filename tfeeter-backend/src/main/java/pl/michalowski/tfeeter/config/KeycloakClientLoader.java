package pl.michalowski.tfeeter.config;

import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.keycloak.admin.client.Keycloak;

@Configuration
public class KeycloakClientLoader {
    @Bean
    public Keycloak keycloak(@Value("${keycloak.auth-server-url}") String authUrl,
                             @Value("${keycloak.realm}") String realm,
                             @Value("${keycloak.resource}") String clientId,
                             @Value("${keycloak.credentials.secret}") String secret) {
        return KeycloakBuilder.builder()
                .clientId(clientId)
                .clientSecret(secret)
                .realm(realm)
                .serverUrl(authUrl)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .build();
    }
}
