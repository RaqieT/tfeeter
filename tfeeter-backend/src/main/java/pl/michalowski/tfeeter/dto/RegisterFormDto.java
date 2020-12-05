package pl.michalowski.tfeeter.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterFormDto implements Serializable {
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
}
