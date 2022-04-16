package com.ird.faa.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.ird.faa.bean.CommandeTag;


@Repository
public interface CommandeTagDao extends JpaRepository<CommandeTag,Long> {





    List<CommandeTag> findByCommandeReference(String reference);
    int deleteByCommandeReference(String reference);

    List<CommandeTag> findByCommandeId(Long id);

    int deleteByCommandeId(Long id);
    List<CommandeTag> findByTagReference(String reference);
    int deleteByTagReference(String reference);

    List<CommandeTag> findByTagId(Long id);

    int deleteByTagId(Long id);


}
