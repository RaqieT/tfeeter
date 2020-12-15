package pl.michalowski.tfeeter.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pl.michalowski.tfeeter.datastore.Tfeet;
import pl.michalowski.tfeeter.datastore.TfeetRepo;
import pl.michalowski.tfeeter.dto.TfeetDto;
import pl.michalowski.tfeeter.integration.keycloak.KeycloakContextHolder;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TfeetService {
    private final TfeetRepo tfeetRepo;

    public UUID add(TfeetDto tfeetDto) {
        var keycloakSecurityContext = KeycloakContextHolder.getKeycloakPrincipal()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        tfeetDto.setAuthor(keycloakSecurityContext.getToken().getPreferredUsername());

        return tfeetRepo.save(Tfeet.builder()
                .accountId(UUID.fromString(keycloakSecurityContext.getToken().getSubject()))
                .author(tfeetDto.getAuthor())
                .description(tfeetDto.getDescription())
                .title(tfeetDto.getTitle())
                .build()).getId();
    }

    public void delete(UUID id) {
        var keycloakSecurityContext = KeycloakContextHolder.getKeycloakPrincipal()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        if (keycloakSecurityContext.getToken().getRealmAccess().isUserInRole("ADMIN")) {
            tfeetRepo.deleteById(id);
            return;
        }

        var tfeet = tfeetRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN));

        if (!tfeet.getAccountId().equals(UUID.fromString(keycloakSecurityContext.getToken().getSubject()))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        tfeetRepo.delete(tfeet);
    }

    public TfeetDto get(UUID id) {
        var tfeet = tfeetRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return TfeetDto.builder()
                .id(tfeet.getId())
                .author(tfeet.getAuthor())
                .title(tfeet.getTitle())
                .description(tfeet.getDescription())
                .date(tfeet.getCreatedDate().toString())
                .build();
    }

    public List<TfeetDto> all() {
        return tfeetRepo.findAllByOrderByCreatedDateDesc().stream().map(tfeet -> TfeetDto.builder()
                .id(tfeet.getId())
                .author(tfeet.getAuthor())
                .title(tfeet.getTitle())
                .description(tfeet.getDescription())
                .date(tfeet.getCreatedDate().toString())
                .build()).collect(Collectors.toList());
    }

}
