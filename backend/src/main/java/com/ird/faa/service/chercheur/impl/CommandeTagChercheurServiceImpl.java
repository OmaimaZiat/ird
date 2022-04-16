package com.ird.faa.service.chercheur.impl;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.CommandeTag;
import com.ird.faa.bean.Commande;
import com.ird.faa.bean.Tag;
import com.ird.faa.dao.CommandeTagDao;
import com.ird.faa.service.chercheur.facade.CommandeTagChercheurService;
import com.ird.faa.service.chercheur.facade.TagChercheurService;
import com.ird.faa.service.chercheur.facade.CommandeChercheurService;

import com.ird.faa.ws.rest.provided.vo.CommandeTagVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class CommandeTagChercheurServiceImpl extends AbstractServiceImpl<CommandeTag> implements CommandeTagChercheurService {

@Autowired
private CommandeTagDao commandeTagDao;

        @Autowired
        private TagChercheurService tagService ;
        @Autowired
        private CommandeChercheurService commandeService ;


@Autowired
private EntityManager entityManager;


@Override
public List<CommandeTag> findAll(){
    String query = "SELECT o FROM CommandeTag o where 1=1 ";
    return entityManager.createQuery(query).getResultList();
}

        @Override
        public List<CommandeTag> findByCommandeReference(String reference){
        return commandeTagDao.findByCommandeReference(reference);
        }

        @Override
        @Transactional
        public int deleteByCommandeReference(String reference){
        return commandeTagDao.deleteByCommandeReference(reference);
        }

        @Override
        public List<CommandeTag> findByCommandeId(Long id){
        return commandeTagDao.findByCommandeId(id);
        }

        @Override
        @Transactional
        public int deleteByCommandeId(Long id){
        return commandeTagDao.deleteByCommandeId(id);
        }


        @Override
        public List<CommandeTag> findByTagReference(String reference){
        return commandeTagDao.findByTagReference(reference);
        }

        @Override
        @Transactional
        public int deleteByTagReference(String reference){
        return commandeTagDao.deleteByTagReference(reference);
        }

        @Override
        public List<CommandeTag> findByTagId(Long id){
        return commandeTagDao.findByTagId(id);
        }

        @Override
        @Transactional
        public int deleteByTagId(Long id){
        return commandeTagDao.deleteByTagId(id);
        }


@Override
public CommandeTag findById(Long id){
if(id==null) return null;
return commandeTagDao.getOne(id);
}

@Override
public CommandeTag findByIdWithAssociatedList(Long id){
return findById(id);
}


@Transactional
public int deleteById(Long id){
int res=0;
if(commandeTagDao.findById(id).isPresent())  {
commandeTagDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public CommandeTag update(CommandeTag commandeTag){
CommandeTag foundedCommandeTag = findById(commandeTag.getId());
if(foundedCommandeTag==null) return null;
else{
return  commandeTagDao.save(commandeTag);
}
}


@Override
public CommandeTag save (CommandeTag commandeTag){


    findCommande(commandeTag);
    findTag(commandeTag);

return commandeTagDao.save(commandeTag);


}

@Override
public List<CommandeTag> save(List<CommandeTag> commandeTags){
List<CommandeTag> list = new ArrayList<>();
for(CommandeTag commandeTag: commandeTags){
list.add(save(commandeTag));
}
return list;
}



@Override
@Transactional
public int delete(CommandeTag commandeTag){
    if(commandeTag.getId()==null) return -1;
    CommandeTag foundedCommandeTag = findById(commandeTag.getId());
    if(foundedCommandeTag==null) return -1;
commandeTagDao.delete(foundedCommandeTag);
return 1;
}


public List<CommandeTag> findByCriteria(CommandeTagVo commandeTagVo){

String query = "SELECT o FROM CommandeTag o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",commandeTagVo.getId());
    if(commandeTagVo.getCommandeVo()!=null){
        query += SearchUtil.addConstraint( "o", "commande.id","=",commandeTagVo.getCommandeVo().getId());
            query += SearchUtil.addConstraint( "o", "commande.reference","LIKE",commandeTagVo.getCommandeVo().getReference());
    }

    if(commandeTagVo.getTagVo()!=null){
        query += SearchUtil.addConstraint( "o", "tag.id","=",commandeTagVo.getTagVo().getId());
            query += SearchUtil.addConstraint( "o", "tag.reference","LIKE",commandeTagVo.getTagVo().getReference());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findCommande(CommandeTag commandeTag){
        Commande loadedCommande =commandeService.findByIdOrReference(commandeTag.getCommande());

    if(loadedCommande==null ) {
        return;
    }
    commandeTag.setCommande(loadedCommande);
    }
    private void findTag(CommandeTag commandeTag){
        Tag loadedTag =tagService.findByIdOrReference(commandeTag.getTag());

    if(loadedTag==null ) {
        return;
    }
    commandeTag.setTag(loadedTag);
    }

@Override
@Transactional
public void delete(List<CommandeTag> commandeTags){
        if(ListUtil.isNotEmpty(commandeTags)){
        commandeTags.forEach(e->commandeTagDao.delete(e));
        }
}
@Override
public void update(List<CommandeTag> commandeTags){
if(ListUtil.isNotEmpty(commandeTags)){
commandeTags.forEach(e->commandeTagDao.save(e));
}
}



}
