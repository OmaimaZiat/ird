package  com.ird.faa.ws.rest.provided.vo;


public class CommandeTagVo {

    private String id ;



        private CommandeVo commandeVo ;
        private TagVo tagVo ;


    public CommandeTagVo(){
    super();
    }

        public String getId(){
        return this.id;
        }

        public void setId(String id){
        this.id = id;
        }



        public CommandeVo getCommandeVo(){
        return this.commandeVo;
        }

        public void setCommandeVo(CommandeVo commandeVo){
        this.commandeVo = commandeVo;
        }
        public TagVo getTagVo(){
        return this.tagVo;
        }

        public void setTagVo(TagVo tagVo){
        this.tagVo = tagVo;
        }


            }
