package com.ird.faa.service.admin.facade;

import java.util.List;
import com.ird.faa.bean.Tag;
import com.ird.faa.ws.rest.provided.vo.TagVo;
import com.ird.faa.service.core.facade.AbstractService;

public interface TagAdminService extends AbstractService<Tag,Long,TagVo>{


    /**
    * find Tag from database by reference (reference)
    * @param reference - reference of Tag
    * @return the founded Tag , If no Tag were
    *         found in database return  null.
    */
    Tag findByReference(String reference);

    /**
    * find Tag from database by id (PK) or reference (reference)
    * @param id - id of Tag
    * @param reference - reference of Tag
    * @return the founded Tag , If no Tag were
    *         found in database return  null.
    */
    Tag findByIdOrReference(Tag tag);


/**
    * delete Tag from database
    * @param id - id of Tag to be deleted
    *
    */
    int deleteById(Long id);




    /**
    * delete Tag from database by reference (reference)
    *
    * @param reference - reference of Tag to be deleted
    * @return 1 if Tag deleted successfully
    */
    int deleteByReference(String reference);




    Tag archiver(Tag tag) ;
    Tag desarchiver(Tag tag);

}
