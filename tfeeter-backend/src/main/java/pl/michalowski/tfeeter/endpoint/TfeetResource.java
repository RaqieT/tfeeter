package pl.michalowski.tfeeter.endpoint;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import pl.michalowski.tfeeter.dto.TfeetDto;
import pl.michalowski.tfeeter.service.TfeetService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tfeet")
@RequiredArgsConstructor
public class TfeetResource {
    private final TfeetService tfeetService;

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public TfeetDto get(@PathVariable("id") String id) {
        return tfeetService.get(UUID.fromString(id));
    }

    @PostMapping
    public UUID create(@RequestBody TfeetDto tfeet) {
        return tfeetService.add(tfeet);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        tfeetService.delete(UUID.fromString(id));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TfeetDto> all() {
        return tfeetService.all();
    }
}
