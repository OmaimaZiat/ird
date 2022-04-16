package com.ird.faa.service.admin.impl;

import java.util.List;
import java.util.Date;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.Tag;
import com.ird.faa.dao.TagDao;
import com.ird.faa.service.admin.facade.TagAdminService;

import com.ird.faa.ws.rest.provided.vo.TagVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class TagAdminServiceImpl extends AbstractServiceImpl<Tag> implements TagAdminService {

@Autowired
private TagDao tagDao;

@Autowired
private ArchivableService<Tag> archivableService;


@Autowired
private EntityManager entityManager;


@Override
public List<Tag> findAll(){
    String query = "SELECT o FROM Tag o where 1=1 ";
    query+= " AND o.archive != true";
    return entityManager.createQuery(query).getResultList();
}
    @Override
    public Tag findByReference(String reference){
    if( reference==null) return null;
    return tagDao.findByReference(reference);
    }

    @Override
    @Transactional
    public int deleteByReference(String  reference) {
    return tagDao.deleteByReference(reference);
    }
    @Override
    public Tag findByIdOrReference(Tag tag){
        Tag resultat=null;
        if(tag != null){
            if(StringUtil.isNotEmpty(tag.getId())){
            resultat= tagDao.getOne(tag.getId());
            }else if(StringUtil.isNotEmpty(tag.getReference())) {
            resultat= tagDao.findByReference(tag.getReference());
            }
        }
    return resultat;
    }

@Override
public Tag findById(Long id){
if(id==null) return null;
return tagDao.getOne(id);
}

@Override
public Tag findByIdWithAssociatedList(Long id){
return findById(id);
}
     @Override
    public Tag archiver(Tag tag) {
        if (tag.getArchive() == null) {
        tag.setArchive(false);
        }
        tag.setArchive(true);
        tag.setDateArchivage(new Date());
        tagDao.save(tag);
        return tag;

    }

    @Override
    public Tag desarchiver(Tag tag) {
    if (tag.getArchive() == null) {
    tag.setArchive(false);
    }
    tag.setArchive(false);
    tag.setDateArchivage(null);
    tagDao.save(tag);
    return tag;
    }



@Transactional
public int deleteById(Long id){
int res=0;
if(tagDao.findById(id).isPresent())  {
tagDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public Tag update(Tag tag){
Tag foundedTag = findById(tag.getId());
if(foundedTag==null) return null;
else{
    archivableService.prepare(tag);
return  tagDao.save(tag);
}
}


@Override
public Tag save (Tag tag){
Tag result =null;
    Tag foundedTag = findByReference(tag.getReference());
   if(foundedTag == null){



Tag savedTag = tagDao.save(tag);

result = savedTag;
   }

return result;
}

@Override
public List<Tag> save(List<Tag> tags){
List<Tag> list = new ArrayList<>();
for(Tag tag: tags){
list.add(save(tag));
}
return list;
}



@Override
@Transactional
public int delete(Tag tag){
    if(tag.getReference()==null) return -1;

    Tag foundedTag = findByReference(tag.getReference());
    if(foundedTag==null) return -1;
tagDao.delete(foundedTag);
return 1;
}


public List<Tag> findByCriteria(TagVo tagVo){

String query = "SELECT o FROM Tag o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",tagVo.getId());
            query += SearchUtil.addConstraint( "o", "reference","LIKE",tagVo.getReference());
            query += SearchUtil.addConstraint( "o", "libelle","LIKE",tagVo.getLibelle());
            query += SearchUtil.addConstraint( "o", "archive","=",tagVo.getArchive());
        query += SearchUtil.addConstraintDate( "o", "dateArchivage","=",tagVo.getDateArchivage());
            query += SearchUtil.addConstraintMinMaxDate("o","dateArchivage",tagVo.getDateArchivageMin(),tagVo.getDateArchivageMax());
return entityManager.createQuery(query).getResultList();
}


@Override
@Transactional
public void delete(List<Tag> tags){
        if(ListUtil.isNotEmpty(tags)){
        tags.forEach(e->tagDao.delete(e));
        }
}
@Override
public void update(List<Tag> tags){
if(ListUtil.isNotEmpty(tags)){
tags.forEach(e->tagDao.save(e));
}
}



}
