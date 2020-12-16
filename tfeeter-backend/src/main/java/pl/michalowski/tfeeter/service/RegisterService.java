package pl.michalowski.tfeeter.service;

import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pl.michalowski.tfeeter.dto.RegisterDto;

import javax.ws.rs.core.Response;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class RegisterService {
    private final Keycloak keycloakClient;
    @Value("${keycloak.realm}")
    private String realm;

    public void register(RegisterDto registerForm) {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setUsername(registerForm.getUsername());
        userRepresentation.setEnabled(true);
        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setTemporary(false);
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
        credentialRepresentation.setValue(registerForm.getPassword());
        userRepresentation.setCredentials(Collections.singletonList(
                credentialRepresentation
        ));
        Response response = keycloakClient.realm(realm).users().create(userRepresentation);

        if (!HttpStatus.valueOf(response.getStatus()).is2xxSuccessful()) {
            throw new RuntimeException("Keycloak request error");
        }
    }


}
