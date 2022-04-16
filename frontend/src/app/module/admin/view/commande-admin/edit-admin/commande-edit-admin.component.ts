import {Component, OnInit} from '@angular/core';
import {CommandeService} from '../../../../../controller/service/Commande.service';
import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {PaiementVo} from '../../../../../controller/model/Paiement.model';
import {PaiementService} from '../../../../../controller/service/Paiement.service';
import {ProduitVo} from '../../../../../controller/model/Produit.model';
import {ProduitService} from '../../../../../controller/service/Produit.service';
import {CommandeTagVo} from '../../../../../controller/model/CommandeTag.model';
import {CommandeTagService} from '../../../../../controller/service/CommandeTag.service';
import {TagVo} from '../../../../../controller/model/Tag.model';
import {TagService} from '../../../../../controller/service/Tag.service';
import {CommandeItemVo} from '../../../../../controller/model/CommandeItem.model';
import {CommandeItemService} from '../../../../../controller/service/CommandeItem.service';
import {ClientVo} from '../../../../../controller/model/Client.model';
import {ClientService} from '../../../../../controller/service/Client.service';

@Component({
  selector: 'app-commande-edit-admin',
  templateUrl: './commande-edit-admin.component.html',
  styleUrls: ['./commande-edit-admin.component.css']
})
export class CommandeEditAdminComponent implements OnInit {

        selectedPaiements: PaiementVo = new PaiementVo();
        paiementsListe: Array<PaiementVo> = [];


        selectedCommandeItems: CommandeItemVo = new CommandeItemVo();
        commandeItemsListe: Array<CommandeItemVo> = [];

        myProduits: Array<ProduitVo> = [];

        selectedCommandeTags: CommandeTagVo = new CommandeTagVo();
        commandeTagsListe: Array<CommandeTagVo> = [];

        myTags: Array<TagVo> = [];


constructor(private datePipe: DatePipe, private commandeService: CommandeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private paiementService: PaiementService
 ,       private produitService: ProduitService
 ,       private commandeTagService: CommandeTagService
 ,       private tagService: TagService
 ,       private commandeItemService: CommandeItemService
 ,       private clientService: ClientService
) {
}

// methods
ngOnInit(): void {
                this.selectedCommandeItems.produitVo = new ProduitVo();
                this.produitService.findAll().subscribe((data) => this.produits = data);
                this.selectedCommandeTags.tagVo = new TagVo();
                this.tagService.findAll().subscribe((data) => this.tags = data);
    this.selectedClient = new ClientVo();
    this.clientService.findAll().subscribe((data) => this.clients = data);
}
        addPaiements() {
        if( this.selectedCommande.paiementsVo == null ){
            this.selectedCommande.paiementsVo = new Array<PaiementVo>();
        }
        this.selectedCommande.paiementsVo.push(this.selectedPaiements);
        this.selectedPaiements = new PaiementVo();
        }

       deletePaiements(p: PaiementVo) {
        this.selectedCommande.paiementsVo.forEach((element, index) => {
            if (element === p) { this.selectedCommande.paiementsVo.splice(index, 1); }
        });
    }
        addCommandeItems() {
        if( this.selectedCommande.commandeItemsVo == null ){
            this.selectedCommande.commandeItemsVo = new Array<CommandeItemVo>();
        }
        this.selectedCommande.commandeItemsVo.push(this.selectedCommandeItems);
        this.selectedCommandeItems = new CommandeItemVo();
        }

       deleteCommandeItems(p: CommandeItemVo) {
        this.selectedCommande.commandeItemsVo.forEach((element, index) => {
            if (element === p) { this.selectedCommande.commandeItemsVo.splice(index, 1); }
        });
    }
        addCommandeTags() {
        if( this.selectedCommande.commandeTagsVo == null ){
            this.selectedCommande.commandeTagsVo = new Array<CommandeTagVo>();
        }
        this.selectedCommande.commandeTagsVo.push(this.selectedCommandeTags);
        this.selectedCommandeTags = new CommandeTagVo();
        }

       deleteCommandeTags(p: CommandeTagVo) {
        this.selectedCommande.commandeTagsVo.forEach((element, index) => {
            if (element === p) { this.selectedCommande.commandeTagsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedCommande.dateCommande = DateUtils.toDate(this.selectedCommande.dateCommande);
            this.selectedCommande.dateArchivage = DateUtils.toDate(this.selectedCommande.dateArchivage);
    this.commandeService.edit().subscribe(commande=>{
    const myIndex = this.commandes.findIndex(e => e.id === this.selectedCommande.id);
    this.commandes[myIndex] = this.selectedCommande;
    this.editCommandeDialog = false;
    this.selectedCommande = new CommandeVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateproduit(produit: string) {
                      const isPermistted = await this.roleService.isPermitted('Produit', 'add');
                       if(isPermistted){
         this.selectedProduit = new ProduitVo();
        this.createProduitDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateclient(client: string) {
                      const isPermistted = await this.roleService.isPermitted('Client', 'add');
                       if(isPermistted){
         this.selectedClient = new ClientVo();
        this.createClientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetag(tag: string) {
                      const isPermistted = await this.roleService.isPermitted('Tag', 'add');
                       if(isPermistted){
         this.selectedTag = new TagVo();
        this.createTagDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editCommandeDialog  = false;
}

// getters and setters

get commandes(): Array<CommandeVo> {
    return this.commandeService.commandes;
       }
set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
       }

 get selectedCommande(): CommandeVo {
           return this.commandeService.selectedCommande;
       }
    set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
       }

   get editCommandeDialog(): boolean {
           return this.commandeService.editCommandeDialog;

       }
    set editCommandeDialog(value: boolean) {
        this.commandeService.editCommandeDialog = value;
       }

       get selectedProduit(): ProduitVo {
           return this.produitService.selectedProduit;
       }
      set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
       }
       get produits(): Array<ProduitVo> {
           return this.produitService.produits;
       }
       set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
       }
       get createProduitDialog(): boolean {
           return this.produitService.createProduitDialog;
       }
      set createProduitDialog(value: boolean) {
        this.produitService.createProduitDialog= value;
       }
       get selectedClient(): ClientVo {
           return this.clientService.selectedClient;
       }
      set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
       get clients(): Array<ClientVo> {
           return this.clientService.clients;
       }
       set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }
       get createClientDialog(): boolean {
           return this.clientService.createClientDialog;
       }
      set createClientDialog(value: boolean) {
        this.clientService.createClientDialog= value;
       }
       get selectedTag(): TagVo {
           return this.tagService.selectedTag;
       }
      set selectedTag(value: TagVo) {
        this.tagService.selectedTag = value;
       }
       get tags(): Array<TagVo> {
           return this.tagService.tags;
       }
       set tags(value: Array<TagVo>) {
        this.tagService.tags = value;
       }
       get createTagDialog(): boolean {
           return this.tagService.createTagDialog;
       }
      set createTagDialog(value: boolean) {
        this.tagService.createTagDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
