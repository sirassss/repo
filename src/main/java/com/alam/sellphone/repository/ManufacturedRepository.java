package com.alam.sellphone.repository;

import com.alam.sellphone.domain.Manufactured;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Manufactured entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ManufacturedRepository extends JpaRepository<Manufactured, Long> {}
