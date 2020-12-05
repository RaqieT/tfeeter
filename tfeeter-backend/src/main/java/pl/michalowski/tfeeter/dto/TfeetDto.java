package pl.michalowski.tfeeter.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TfeetDto implements Serializable {
    private UUID id;
    private String author;
    private String title;
    private String description;
    private String date;
}
