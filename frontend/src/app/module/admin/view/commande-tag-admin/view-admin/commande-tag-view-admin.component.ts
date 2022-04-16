import {Component, OnInit} from '@angular/core';
import {CommandeTagService} from '../../../../../controller/service/CommandeTag.service';
import {CommandeTagVo} from '../../../../../controller/model/CommandeTag.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TagVo} from '../../../../../controller/model/Tag.model';
import {TagService} from '../../../../../controller/service/Tag.service';
import {CommandeVo} from '../../../../../controller/model/Commande.model';
import {CommandeService} from '../../../../../controller/service/Commande.service';

@Component({
  selector: 'app-commande-tag-view-admin',
  templateUrl: './commande-tag-view-admin.component.html',
  styleUrls: ['./commande-tag-view-admin.component.css']
})
export class CommandeTagViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private commandeTagService: CommandeTagService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private tagService :TagService
    ,private commandeService :CommandeService
) {
}

// methods
ngOnInit(): void {
    this.selectedCommande = new CommandeVo();
    this.commandeService.findAll().subscribe((data) => this.commandes = data);
    this.selectedTag = new TagVo();
    this.tagService.findAll().subscribe((data) => this.tags = data);
}

hideViewDialog(){
    this.viewCommandeTagDialog  = false;
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

   get viewCommandeTagDialog():boolean {
           return this.commandeTagService.viewCommandeTagDialog;

       }
    set viewCommandeTagDialog(value: boolean) {
        this.commandeTagService.viewCommandeTagDialog= value;
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
       get selectedCommande():CommandeVo {
           return this.commandeService.selectedCommande;
       }
      set selectedCommande(value: CommandeVo) {
        this.commandeService.selectedCommande = value;
       }
       get commandes():Array<CommandeVo> {
           return this.commandeService.commandes;
       }
       set commandes(value: Array<CommandeVo>) {
        this.commandeService.commandes = value;
       }
       get editCommandeDialog():boolean {
           return this.commandeService.editCommandeDialog;
       }
      set editCommandeDialog(value: boolean) {
        this.commandeService.editCommandeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
