import {Component, OnInit, Input} from '@angular/core';
import {CommandeTagService} from '../../../../../controller/service/CommandeTag.service';
import {CommandeTagVo} from '../../../../../controller/model/CommandeTag.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {CommandeService} from '../../../../../controller/service/Commande.service';
import {TagVo} from '../../../../../controller/model/Tag.model';
import {TagService} from '../../../../../controller/service/Tag.service';
@Component({
  selector: 'app-commande-tag-create-admin',
  templateUrl: './commande-tag-create-admin.component.html',
  styleUrls: ['./commande-tag-create-admin.component.css']
})
export class CommandeTagCreateAdminComponent implements OnInit {

    _submitted = false;

constructor(private datePipe: DatePipe, private commandeTagService: CommandeTagService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private commandeService :CommandeService
,       private tagService :TagService
) {

}


// methods
ngOnInit(): void {

    this.selectedCommande = new CommandeVo();
    this.commandeService.findAll().subscribe((data) => this.commandes = data);
    this.selectedTag = new TagVo();
    this.tagService.findAll().subscribe((data) => this.tags = data);
}


public save(){
  this.submitted = true;
        if (this.validateForm()) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
}
private validateForm(): boolean{
    return true;
}
public saveWithShowOption(showList: boolean){
     this.commandeTagService.save().subscribe(commandeTag=>{
       this.commandeTags.push({...commandeTag});
       this.createCommandeTagDialog = false;
       this.submitted = false;
       this.selectedCommandeTag = new CommandeTagVo();


    } , error =>{
        console.log(error);
    });

}

//openPopup
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
              public async openCreatecommande(commande: string) {
                      const isPermistted = await this.roleService.isPermitted('Commande', 'add');
                       if(isPermistted){
         this.selectedCommande = new CommandeVo();
        this.createCommandeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createCommandeTagDialog  = false;
}

// getters and setters

get commandeTags(): Array<CommandeTagVo> {
    return this.commandeTagService.commandeTags;
       }
set commandeTags(value: Array<CommandeTagVo>) {
        this.commandeTagService.commandeTags = value;
       }

 get selectedCommandeTag():CommandeTagVo {
           return this.commandeTagService.selectedCommandeTag;
       }
    set selectedCommandeTag(value: CommandeTagVo) {
        this.commandeTagService.selectedCommandeTag = value;
       }

   get createCommandeTagDialog(): boolean {
           return this.commandeTagService.createCommandeTagDialog;

       }
    set createCommandeTagDialog(value: boolean) {
        this.commandeTagService.createCommandeTagDialog= value;
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
       get selectedCommande(): CommandeVo {
           return this.commandeService.selectedCommande;
       }
      set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
       }
       get commandes(): Array<CommandeVo> {
           return this.commandeService.commandes;
       }
       set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
       }
       get createCommandeDialog(): boolean {
           return this.commandeService.createCommandeDialog;
       }
      set createCommandeDialog(value: boolean) {
        this.commandeService.createCommandeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

}
