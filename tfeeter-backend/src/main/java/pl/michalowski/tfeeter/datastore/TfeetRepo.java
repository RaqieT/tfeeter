package pl.michalowski.tfeeter.datastore;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TfeetRepo extends JpaRepository<Tfeet, UUID> {
    List<Tfeet> findAllByOrderByCreatedDateDesc();
}
