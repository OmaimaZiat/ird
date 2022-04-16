import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CommandeTagVo} from '../model/CommandeTag.model';
import {TagVo} from '../model/Tag.model';
import {CommandeVo} from '../model/Commande.model';


@Injectable({
  providedIn: 'root'
})
export class CommandeTagService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/commandeTag/';
        })
    }
     private _commandeTags: Array<CommandeTagVo> ;
     private _selectedCommandeTag: CommandeTagVo;
     private _commandeTagSelections: Array<CommandeTagVo>;
     private _createCommandeTagDialog: boolean;
     private _editCommandeTagDialog: boolean;
     private _viewCommandeTagDialog: boolean;
     public editCommandeTag$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCommandeTag:CommandeTagVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CommandeTagVo>>(this.API);
    }

    public save(): Observable<CommandeTagVo> {
         return this.http.post<CommandeTagVo>(this.API, this.selectedCommandeTag);
    }

    delete(commandeTag: CommandeTagVo) {
         return this.http.delete<number>(this.API + 'id/' + commandeTag.id);
    }


    public edit(): Observable<CommandeTagVo> {
        return this.http.put<CommandeTagVo>(this.API, this.selectedCommandeTag);
    }


     public findByCriteria(commandeTag:CommandeTagVo):Observable<Array<CommandeTagVo>>{
           return this.http.post<Array<CommandeTagVo>>(this.API +'search', commandeTag);
    }

   public findByIdWithAssociatedList(commandeTag:CommandeTagVo):Observable<CommandeTagVo>{
         return this.http.get<CommandeTagVo>(this.API + 'detail/id/' +commandeTag.id);
    }

    // getters and setters


    get commandeTags(): Array<CommandeTagVo> {
    if(this._commandeTags==null){
    this._commandeTags=new Array<CommandeTagVo>();
    }
return this._commandeTags;
       }

    set commandeTags(value: Array<CommandeTagVo>) {
        this._commandeTags = value;
       }

    get selectedCommandeTag(): CommandeTagVo {
    if(this._selectedCommandeTag==null){
    this._selectedCommandeTag=new CommandeTagVo();
    }
           return this._selectedCommandeTag;
       }

    set selectedCommandeTag(value: CommandeTagVo) {
        this._selectedCommandeTag = value;
       }

    get commandeTagSelections(): Array<CommandeTagVo> {
    if(this._commandeTagSelections==null){
    this._commandeTagSelections=new Array<CommandeTagVo>();
    }
        return this._commandeTagSelections;
       }


    set commandeTagSelections(value: Array<CommandeTagVo>) {
        this._commandeTagSelections = value;
       }

    get createCommandeTagDialog(): boolean {
        return this._createCommandeTagDialog;
       }

    set createCommandeTagDialog(value: boolean) {
        this._createCommandeTagDialog = value;
       }

    get editCommandeTagDialog(): boolean {
        return this._editCommandeTagDialog;
       }

    set editCommandeTagDialog(value: boolean) {
        this._editCommandeTagDialog = value;
       }

    get viewCommandeTagDialog(): boolean {
        return this._viewCommandeTagDialog;
       }

    set viewCommandeTagDialog(value: boolean) {
        this._viewCommandeTagDialog = value;
       }

     get searchCommandeTag(): CommandeTagVo {
     if(this._searchCommandeTag==null){
    this._searchCommandeTag=new CommandeTagVo();
    }
        return this._searchCommandeTag;
    }

    set searchCommandeTag(value: CommandeTagVo) {
        this._searchCommandeTag = value;
       }

}
