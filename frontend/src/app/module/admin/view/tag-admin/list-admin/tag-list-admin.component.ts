import {Component, OnInit} from '@angular/core';
import {TagService} from '../../../../../controller/service/Tag.service';
import {TagVo} from '../../../../../controller/model/Tag.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
@Component({
  selector: 'app-tag-list-admin',
  templateUrl: './tag-list-admin.component.html',
  styleUrls: ['./tag-list-admin.component.css']
})
export class TagListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    fileName = 'Tag';
    yesno :any[] =[];


    constructor(private datePipe: DatePipe, private tagService: TagService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService
) { }

    ngOnInit(): void {
      this.loadTags();
      this.initExport();
      this.initCol();
      this.yesno =  [
      {label: '------', value: null},
      {label: 'Oui', value: 1},
      {label: 'Non', value: 0}];
    } 
    
    // methods
      public async loadTags(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Tag', 'list');
        isPermistted ? this.tagService.findAll().subscribe(tags => this.tags = tags,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.tagService.findByCriteria(this.searchTag).subscribe(tags=>{
            
            this.tags = tags;
           // this.searchTag = new TagVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
        ];
    }
    
    public async editTag(tag:TagVo){
        const isPermistted = await this.roleService.isPermitted('Tag', 'edit');
         if(isPermistted){
          this.tagService.findByIdWithAssociatedList(tag).subscribe(res => {
           this.selectedTag = res;
            this.selectedTag.dateArchivage = new Date(tag.dateArchivage);
            this.editTagDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTag(tag:TagVo){
        const isPermistted = await this.roleService.isPermitted('Tag', 'view');
        if(isPermistted){
           this.tagService.findByIdWithAssociatedList(tag).subscribe(res => {
           this.selectedTag = res;
            this.selectedTag.dateArchivage = new Date(tag.dateArchivage);
            this.viewTagDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTag(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTag = new TagVo();
            this.createTagDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverTag(tag:TagVo){
const isPermistted = await this.roleService.isPermitted('Tag', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Tag) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.tagService.archiver(tag).subscribe(status=>{
const myIndex = this.tags.indexOf(tag);
this.tags[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Tag archivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}

public async desarchiverTag(tag:TagVo){
const isPermistted = await this.roleService.isPermitted('Tag', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Tag) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.tagService.desarchiver(tag).subscribe(status=>{
const myIndex = this.tags.indexOf(tag);
this.tags[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Tag désarchivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}


    public async deleteTag(tag:TagVo){
       const isPermistted = await this.roleService.isPermitted('Tag', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Tag) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.tagService.delete(tag).subscribe(status=>{
                          if(status > 0){
                          const position = this.tags.indexOf(tag);
                          position > -1 ? this.tags.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Tag Supprimé',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }


public async duplicateTag(tag: TagVo) {

     this.tagService.findByIdWithAssociatedList(tag).subscribe(
	 res => {
	       this.initDuplicateTag(res);
	       this.selectedTag = res;
	       this.selectedTag.id = null;
            this.createTagDialog = true;

});

	}

	initDuplicateTag(res: TagVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.exportCSV();}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.exportExcel();}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.exportPdf();}}
    ];
  }

    exportExcel(): void {
        import('xlsx').then(async xlsx => {this.prepareColumnExport();
        const worksheet = xlsx.utils.json_to_sheet(this.exportData);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.fileName);
     });
 }

    saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '.xlsx');
    });
     }

    exportPdf(): void {
        this.prepareColumnExport();
        const doc = new jsPDF();
        autoTable(doc, {columns: [
        {header: 'Reference', dataKey: 'Reference' },
        {header: 'Libelle', dataKey: 'Libelle' },
        {header: 'Archive', dataKey: 'Archive' },
        {header: 'Date archivage', dataKey: 'Date archivage' },
        ],
        body: this.exportData,styles : {fontSize: 5}});
        doc.save(this.fileName + '.pdf');
    }

    exportCSV() {
    this.prepareColumnExport();
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(this.exportData[0]);
    let csv = this.exportData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
    csv.unshift(header.join(';'));
    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, this.fileName+".csv");
  }

    prepareColumnExport(): void {
    this.exportData = this.tags.map(e => {
    return {
                    'Reference': e.reference ,
                    'Libelle': e.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
     }
      });
      }

    // getters and setters

    get tags(): Array<TagVo> {
           return this.tagService.tags;
       }
    set tags(value: Array<TagVo>) {
        this.tagService.tags = value;
       }

    get tagSelections(): Array<TagVo> {
           return this.tagService.tagSelections;
       }
    set tagSelections(value: Array<TagVo>) {
        this.tagService.tagSelections = value;
       }
   
     


    get selectedTag():TagVo {
           return this.tagService.selectedTag;
       }
    set selectedTag(value: TagVo) {
        this.tagService.selectedTag = value;
       }
    
    get createTagDialog():boolean {
           return this.tagService.createTagDialog;
       }
    set createTagDialog(value: boolean) {
        this.tagService.createTagDialog= value;
       }
    
    get editTagDialog():boolean {
           return this.tagService.editTagDialog;
       }
    set editTagDialog(value: boolean) {
        this.tagService.editTagDialog= value;
       }
    get viewTagDialog():boolean {
           return this.tagService.viewTagDialog;
       }
    set viewTagDialog(value: boolean) {
        this.tagService.viewTagDialog = value;
       }
       
     get searchTag(): TagVo {
        return this.tagService.searchTag;
       }
    set searchTag(value: TagVo) {
        this.tagService.searchTag = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}
