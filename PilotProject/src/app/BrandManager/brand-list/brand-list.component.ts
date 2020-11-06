import { Component, OnInit, ViewChild } from '@angular/core';
import { BrandManage } from '../../Model/brand.class';
import { BrandService } from '../BrandService/BrandService.service';
import { from, Subscription } from 'rxjs';
import { ModalComponent } from '../../Dialog/modal/modal.component';
import { PopupDeleteComponent } from '../../Dialog/Dialog Delete/popup-delete/popup-delete.component';
// import { FormBuilder , FormGroup , Validators } from '@angular/forms';

//notifica
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
})
export class BrandListComponent implements OnInit {
  //form 
  // public formBrand : FormGroup;

  public subscription: Subscription;
  public brandList: BrandManage[];
  public totalRecord: number;
  public page: number = 1;
  public brandEdit: BrandManage = new BrandManage();
  public check: boolean = false;
  // thg instance của 1 class phải new 
  public nameFilter : string ='';
  public idBrand : number ;

  public stageSubmit : boolean;

  public fileToUpload: File = null;

  @ViewChild('modal') modal: ModalComponent;
  @ViewChild('formDelete') formDelete : PopupDeleteComponent;

  public sortBy : string = 'brandId';
  public sortValue : number = 1;
  public responseMsgError : string = null ;
  public checkDuplicate : boolean = null;


  constructor(
    public brandService: BrandService,
    // private _formBuider : FormBuilder ,
   
    
    ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadData() {
    this.subscription = this.brandService.getAllBrand().subscribe(
      (data: any) => {
        this.brandList = data.data.brandsList;
        this.totalRecord = this.brandList.length;
      },
      (error) => {
       
        this.brandService.handleError(error);
      }
    );
  }
  
  onFormDelete(id){
    
    this.idBrand = id ;
    this.formDelete.show();
  }

  //open form edit
  onEdit(item) {
    this.check = false;
    this.brandEdit = item;
    this.stageSubmit = false ;

    this.modal.show();
    // this.createForm();
  }
  cancel() {
    this.modal.hide();
  }

  cancelFormDelete(){
    this.formDelete.hide();
  }

  imageChange(files : FileList) {
    this.fileToUpload = files.item(0);
    this.brandEdit.logoFiles = this.fileToUpload;
 
    // let tmp = $event.split('\\');
    // let newUrl = tmp[tmp.length - 1];
    // this.brandEdit.logoFiles = newUrl;

  }

  getIndex(id : number) : number {
    let result = 0;
    this.brandList.forEach((item,index) => {
      if(item.brandId == id)
        result = index ;
    });
    return result;
  }

  // onUpdate() {
  //   console.log('update: ',this.brandEdit);
  //   this.subscription = this.brandService.onUpdateTodo(this.brandEdit).subscribe(data => {
  //   }, error => {
  //     console.log(error);
  //     this.brandService.handleError(error);
  //   });
  //   this.cancel();
  // }

  onDelete(){
    
    this.subscription = this.brandService.onDelete(this.idBrand).subscribe(data => {
      // console.log('data :',data);
      // let index = this.getIndex(id);
      // this.brandList.splice(index , 1);
      this.loadData();
    }, error => {
     
      this.brandService.handleError(error);
    });
    this.cancel();
  }

  sortOn(col){
    this.sortBy = col;
    this.sortValue = -this.sortValue;
    this.check = !this.check;
  }

  //stack
  //edit 
  uploadFileToActivity() {
    this.brandService.uploadImage(this.brandEdit).subscribe((data:any) => {
      this.loadData();
      let msg = data.responseMsg;
      if(data.responseCode == 1){
        this.checkDuplicate = true;
        this.showErrorsAlert(msg);
      }else{
        this.showSuccessAlert(msg);
        this.cancel();
      }
      }, error => {
        this.brandService.handleError(error);
      });
  }

  openFormAdd() {
    this.stageSubmit = true;
    this.check = true;
    this.brandEdit =  new BrandManage();
    this.modal.show();
  }

  //add
  addFileBrand(){
    console.log('add :', this.brandEdit);
    this.brandService.addBrand(this.brandEdit).subscribe((data : any) => {
      console.log('phan hoi add : ' , data);
      console.log('phan hoi mess : ' , data.responseCode);
      console.log('phan hoi mess : ' , data.responseMsg);
      let msg = data.responseMsg;
      if(data.responseCode == 1){
        this.checkDuplicate = true;
        this.showErrorsAlert(msg);
      }else{
        this.showSuccessAlert(msg);
        this.cancel();
      }
      this.loadData();
    },error => {
      this.brandService.handleError(error);
    });

  }

  // createForm(){
  //   this.formBrand = this._formBuider.group({
  //     username : ['0', [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20)
  //     ]],
  //     password : ['', [Validators.required]],
  //     fullname : ['', [Validators.required]],
  //    
  //     sdt : ['', [Validators.required]]
  //   });
  // }

  onSubmitForm(formBrand){
    if(this.stageSubmit){
      this.addFileBrand();
    }else{
      this.uploadFileToActivity();
    }

  }

  setStageEdit(){
    
    this.stageSubmit = false ;
  
  }

  // notifie(){
  //   this.showSuccessAlert();
  // }

  showSuccessAlert(msg : string ) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1000
    })
  }

  showErrorsAlert(msg : string ){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: msg,
      showConfirmButton: false,
      timer: 1000
    })
  }

}
