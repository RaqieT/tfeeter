package pl.michalowski.tfeeter.datastore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tfeet")
public class Tfeet {
    @Id
    @GeneratedValue
    private UUID id;

    @NonNull
    @Column(nullable = false, name = "account_id")
    private UUID accountId;

    @NonNull
    @Column(nullable = false)
    private String author;

    @NonNull
    @Column(nullable = false)
    private String title;

    @NonNull
    @Column(nullable = false)
    private String description;

    @CreationTimestamp
    @Column(nullable = false,  name = "created_date")
    private LocalDateTime createdDate;

}
