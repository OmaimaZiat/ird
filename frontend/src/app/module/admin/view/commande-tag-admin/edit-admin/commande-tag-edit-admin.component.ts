import {Component, OnInit} from '@angular/core';
import {CommandeTagService} from '../../../../../controller/service/CommandeTag.service';
import {CommandeTagVo} from '../../../../../controller/model/CommandeTag.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TagVo} from '../../../../../controller/model/Tag.model';
import {TagService} from '../../../../../controller/service/Tag.service';
import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {CommandeService} from '../../../../../controller/service/Commande.service';

@Component({
  selector: 'app-commande-tag-edit-admin',
  templateUrl: './commande-tag-edit-admin.component.html',
  styleUrls: ['./commande-tag-edit-admin.component.css']
})
export class CommandeTagEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private commandeTagService: CommandeTagService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private tagService: TagService
 ,       private commandeService: CommandeService
) {
}

// methods
ngOnInit(): void {
    this.selectedCommande = new CommandeVo();
    this.commandeService.findAll().subscribe((data) => this.commandes = data);
    this.selectedTag = new TagVo();
    this.tagService.findAll().subscribe((data) => this.tags = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.commandeTagService.edit().subscribe(commandeTag=>{
    const myIndex = this.commandeTags.findIndex(e => e.id === this.selectedCommandeTag.id);
    this.commandeTags[myIndex] = this.selectedCommandeTag;
    this.editCommandeTagDialog = false;
    this.selectedCommandeTag = new CommandeTagVo();


    }, error => {
        console.log(error);
    });

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

hideEditDialog(){
    this.editCommandeTagDialog  = false;
}

// getters and setters

get commandeTags(): Array<CommandeTagVo> {
    return this.commandeTagService.commandeTags;
       }
set commandeTags(value: Array<CommandeTagVo>) {
        this.commandeTagService.commandeTags = value;
       }

 get selectedCommandeTag(): CommandeTagVo {
           return this.commandeTagService.selectedCommandeTag;
       }
    set selectedCommandeTag(value: CommandeTagVo) {
        this.commandeTagService.selectedCommandeTag = value;
       }

   get editCommandeTagDialog(): boolean {
           return this.commandeTagService.editCommandeTagDialog;

       }
    set editCommandeTagDialog(value: boolean) {
        this.commandeTagService.editCommandeTagDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
