import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TagVo} from '../model/Tag.model';


@Injectable({
  providedIn: 'root'
})
export class TagService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/tag/';
        })
    }
     private _tags: Array<TagVo> ;
     private _selectedTag: TagVo;
     private _tagSelections: Array<TagVo>;
     private _createTagDialog: boolean;
     private _editTagDialog: boolean;
     private _viewTagDialog: boolean;
     public editTag$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTag:TagVo ;

    // methods
    public archiver(tag: TagVo): Observable<TagVo> {
        return this.http.put<TagVo>(this.API + 'archiver/' ,tag);
    }
    public desarchiver(tag: TagVo): Observable<TagVo> {
    return this.http.put<TagVo>(this.API + 'desarchiver/' ,tag);
    }

    public findAll(){
     return this.http.get<Array<TagVo>>(this.API);
    }

    public save(): Observable<TagVo> {
           return this.http.post<TagVo>(this.API, {...this.selectedTag,dateArchivage: moment(this.selectedTag.dateArchivage).format("YYYY-MM-DD")});
    }

    delete(tag: TagVo) {
         return this.http.delete<number>(this.API + 'id/' + tag.id);
    }


    public edit(): Observable<TagVo> {
        return this.http.put<TagVo>(this.API, this.selectedTag);
    }


     public findByCriteria(tag:TagVo):Observable<Array<TagVo>>{
           return this.http.post<Array<TagVo>>(this.API +'search', tag);
    }

   public findByIdWithAssociatedList(tag:TagVo):Observable<TagVo>{
         return this.http.get<TagVo>(this.API + 'detail/id/' +tag.id);
    }

    // getters and setters


    get tags(): Array<TagVo> {
    if(this._tags==null){
    this._tags=new Array<TagVo>();
    }
return this._tags;
       }

    set tags(value: Array<TagVo>) {
        this._tags = value;
       }

    get selectedTag(): TagVo {
    if(this._selectedTag==null){
    this._selectedTag=new TagVo();
    }
           return this._selectedTag;
       }

    set selectedTag(value: TagVo) {
        this._selectedTag = value;
       }

    get tagSelections(): Array<TagVo> {
    if(this._tagSelections==null){
    this._tagSelections=new Array<TagVo>();
    }
        return this._tagSelections;
       }


    set tagSelections(value: Array<TagVo>) {
        this._tagSelections = value;
       }

    get createTagDialog(): boolean {
        return this._createTagDialog;
       }

    set createTagDialog(value: boolean) {
        this._createTagDialog = value;
       }

    get editTagDialog(): boolean {
        return this._editTagDialog;
       }

    set editTagDialog(value: boolean) {
        this._editTagDialog = value;
       }

    get viewTagDialog(): boolean {
        return this._viewTagDialog;
       }

    set viewTagDialog(value: boolean) {
        this._viewTagDialog = value;
       }

     get searchTag(): TagVo {
     if(this._searchTag==null){
    this._searchTag=new TagVo();
    }
        return this._searchTag;
    }

    set searchTag(value: TagVo) {
        this._searchTag = value;
       }

}
