package pl.michalowski.tfeeter.service;

import org.springframework.stereotype.Service;
import pl.michalowski.tfeeter.dto.RegisterFormDto;

@Service
public class RegisterService {
    public void register(RegisterFormDto registerForm) {
        // TODO: send user to keycloak with role USER
    }
}
