import {Component, OnInit} from '@angular/core';
import {CommandeService} from '../../../../../controller/service/Commande.service';
import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
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
  selector: 'app-commande-view-chercheur',
  templateUrl: './commande-view-chercheur.component.html',
  styleUrls: ['./commande-view-chercheur.component.css']
})
export class CommandeViewChercheurComponent implements OnInit {

        selectedPaiements: PaiementVo = new PaiementVo();
        paiementsListe: Array<PaiementVo> = [];


        selectedCommandeItems: CommandeItemVo = new CommandeItemVo();
        commandeItemsListe: Array<CommandeItemVo> = [];

        myProduits: Array<ProduitVo> = [];

        selectedCommandeTags: CommandeTagVo = new CommandeTagVo();
        commandeTagsListe: Array<CommandeTagVo> = [];

        myTags: Array<TagVo> = [];


constructor(private datePipe: DatePipe, private commandeService: CommandeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private paiementService :PaiementService
    ,private produitService :ProduitService
    ,private commandeTagService :CommandeTagService
    ,private tagService :TagService
    ,private commandeItemService :CommandeItemService
    ,private clientService :ClientService
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

hideViewDialog(){
    this.viewCommandeDialog  = false;
}

// getters and setters

get commandes(): Array<CommandeVo> {
    return this.commandeService.commandes;
       }
set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
       }

 get selectedCommande():CommandeVo {
           return this.commandeService.selectedCommande;
       }
    set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
       }

   get viewCommandeDialog():boolean {
           return this.commandeService.viewCommandeDialog;

       }
    set viewCommandeDialog(value: boolean) {
        this.commandeService.viewCommandeDialog= value;
       }

       get selectedProduit():ProduitVo {
           return this.produitService.selectedProduit;
       }
      set selectedProduit(value: ProduitVo) {
        this.produitService.selectedProduit = value;
       }
       get produits():Array<ProduitVo> {
           return this.produitService.produits;
       }
       set produits(value: Array<ProduitVo>) {
        this.produitService.produits = value;
       }
       get editProduitDialog():boolean {
           return this.produitService.editProduitDialog;
       }
      set editProduitDialog(value: boolean) {
        this.produitService.editProduitDialog= value;
       }
       get selectedClient():ClientVo {
           return this.clientService.selectedClient;
       }
      set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
       get clients():Array<ClientVo> {
           return this.clientService.clients;
       }
       set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }
       get editClientDialog():boolean {
           return this.clientService.editClientDialog;
       }
      set editClientDialog(value: boolean) {
        this.clientService.editClientDialog= value;
       }
       get selectedTag():TagVo {
           return this.tagService.selectedTag;
       }
      set selectedTag(value: TagVo) {
        this.tagService.selectedTag = value;
       }
       get tags():Array<TagVo> {
           return this.tagService.tags;
       }
       set tags(value: Array<TagVo>) {
        this.tagService.tags = value;
       }
       get editTagDialog():boolean {
           return this.tagService.editTagDialog;
       }
      set editTagDialog(value: boolean) {
        this.tagService.editTagDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
