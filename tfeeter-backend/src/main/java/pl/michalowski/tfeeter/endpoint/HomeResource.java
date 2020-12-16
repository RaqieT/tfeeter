package pl.michalowski.tfeeter.endpoint;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.michalowski.tfeeter.dto.RegisterDto;
import pl.michalowski.tfeeter.service.RegisterService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

@RestController
@Slf4j
@RequiredArgsConstructor
public class HomeResource {
    private final RegisterService registerService;

    @GetMapping("/")
    public String hi() {
        return "hi";
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterDto registerDto) {
        registerService.register(registerDto);
    }

    @GetMapping("/logout")
    public void logout(HttpServletRequest request) {
        try {
            request.logout();
        } catch (ServletException e) {
            log.error("Cannot logout", e);
        }
    }
}
