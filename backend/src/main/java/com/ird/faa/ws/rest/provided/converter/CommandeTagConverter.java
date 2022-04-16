package  com.ird.faa.ws.rest.provided.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ird.faa.service.util.*;


import com.ird.faa.bean.CommandeTag;
import com.ird.faa.ws.rest.provided.vo.CommandeTagVo;

@Component
public class CommandeTagConverter extends AbstractConverter<CommandeTag,CommandeTagVo>{

        @Autowired
        private TagConverter tagConverter ;
        @Autowired
        private CommandeConverter commandeConverter ;
    private Boolean commande;
    private Boolean tag;

public  CommandeTagConverter(){
init(true);
}

@Override
public CommandeTag toItem(CommandeTagVo vo) {
if (vo == null) {
return null;
} else {
CommandeTag item = new CommandeTag();
        if(StringUtil.isNotEmpty(vo.getId()))
        item.setId(NumberUtil.toLong(vo.getId()));
    if(vo.getCommandeVo()!=null && this.commande)
        item.setCommande(commandeConverter.toItem(vo.getCommandeVo())) ;
    if(vo.getTagVo()!=null && this.tag)
        item.setTag(tagConverter.toItem(vo.getTagVo())) ;


return item;
}
}

@Override
public CommandeTagVo toVo(CommandeTag item) {
if (item == null) {
return null;
} else {
CommandeTagVo vo = new CommandeTagVo();
        if(item.getId()!=null)
        vo.setId(NumberUtil.toString(item.getId()));

    if(item.getCommande()!=null && this.commande) {
        vo.setCommandeVo(commandeConverter.toVo(item.getCommande())) ;
    }
    if(item.getTag()!=null && this.tag) {
        vo.setTagVo(tagConverter.toVo(item.getTag())) ;
    }

return vo;
}
}

public void init(Boolean value) {
    commande = value;
    tag = value;
}


        public TagConverter getTagConverter(){
        return this.tagConverter;
        }
        public void setTagConverter(TagConverter tagConverter ){
        this.tagConverter = tagConverter;
        }
        public CommandeConverter getCommandeConverter(){
        return this.commandeConverter;
        }
        public void setCommandeConverter(CommandeConverter commandeConverter ){
        this.commandeConverter = commandeConverter;
        }

    public boolean  isCommande(){
    return this.commande;
    }
    public void  setCommande(boolean commande){
    this.commande = commande;
    }
    public boolean  isTag(){
    return this.tag;
    }
    public void  setTag(boolean tag){
    this.tag = tag;
    }






}
