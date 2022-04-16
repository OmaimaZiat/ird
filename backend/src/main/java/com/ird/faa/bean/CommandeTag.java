package com.ird.faa.bean;

import java.util.Objects;



import javax.persistence.*;



@Entity
@Table(name = "commande_tag")
public class CommandeTag   {

@Id
    @SequenceGenerator(name="commande_tag_seq",sequenceName="commande_tag_seq",
    allocationSize=1, initialValue = 10000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="commande_tag_seq")
private Long id;


    @ManyToOne
    private Commande commande ;
    @ManyToOne
    private Tag tag ;


public CommandeTag(){
super();
}


            public Long getId(){
            return this.id;
            }
            public void setId(Long id){
            this.id = id;
            }
            public Commande getCommande(){
            return this.commande;
            }
            public void setCommande(Commande commande){
            this.commande = commande;
            }
            public Tag getTag(){
            return this.tag;
            }
            public void setTag(Tag tag){
            this.tag = tag;
            }

        @Override
        public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommandeTag commandeTag = (CommandeTag) o;
        return id != null && id.equals(commandeTag.id);
        }

        @Override
        public int hashCode() {
        return Objects.hash(id);
        }

}

