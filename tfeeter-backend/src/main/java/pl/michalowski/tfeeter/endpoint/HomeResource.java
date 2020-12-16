package pl.michalowski.tfeeter.endpoint;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

@RestController
@Slf4j
@RequiredArgsConstructor
public class HomeResource {

    @GetMapping("/")
    public String hi() {
        return "hi";
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
