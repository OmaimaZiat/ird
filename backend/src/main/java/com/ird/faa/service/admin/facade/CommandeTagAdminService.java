package com.ird.faa.service.admin.facade;

import java.util.List;
import com.ird.faa.bean.CommandeTag;
import com.ird.faa.ws.rest.provided.vo.CommandeTagVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface CommandeTagAdminService extends AbstractService<CommandeTag,Long,CommandeTagVo>{




/**
    * delete CommandeTag from database
    * @param id - id of CommandeTag to be deleted
    *
    */
    int deleteById(Long id);


    List<CommandeTag> findByCommandeReference(String reference);

    int deleteByCommandeReference(String reference);

    List<CommandeTag> findByCommandeId(Long id);

    int deleteByCommandeId(Long id);
    List<CommandeTag> findByTagReference(String reference);

    int deleteByTagReference(String reference);

    List<CommandeTag> findByTagId(Long id);

    int deleteByTagId(Long id);







}
