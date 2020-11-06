import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BrandManage } from '../../Model/brand.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  // ng serve --proxy-config src/proxy.conf.json
  // public API : string ='http://localhost:8881/brand/api/';
  public API: string = '/api/brand/api/';
  public readonly ROOT_URL: string = 'http://localhost:8881/';

  constructor(public httpClient: HttpClient) {}

  getAllBrand(): Observable<BrandManage[]> {
    let url = this.API + 'findAllBrand';
    console.log('url-getAll', url);
    return this.httpClient.get<BrandManage[]>(url);
  }

  //nếu err thuộc kiểu error
  handleError(err) {
    if (err.error instanceof Error) {
      console.log(`Client side error : ${err.error.message}`);
    } else {
      console.log(`Sever side error : ${err.status} - ${err.error}`);
    }
  }

  onUpdateTodo(brandE: BrandManage): Observable<BrandManage> {
    console.log('brandE :', brandE);
    let url = this.API + 'updateA';
    console.log('url-update', url);
    return this.httpClient.put<BrandManage>(url, brandE);
  }

  onDelete(id: number): Observable<BrandManage> {
    let url = this.API + 'delete';
    console.log(url);
    return this.httpClient.delete<BrandManage>(url + `/${id}`);
  }

  //edit brand
  uploadImage(brandE: BrandManage) {
    console.log('file up service truoc khi goi xuong : ', brandE);
    console.log('kiểu :', typeof brandE.brandId);
    const endpoint = this.API + 'update';
    const formData: FormData = new FormData();
    formData.append('brandId', brandE.brandId.toString());
    formData.append('brandName', brandE.brandName.toString());
    formData.append('description', brandE.description.toString());
    formData.append('logo', brandE.logo.toString());
    formData.append('logoFiles', brandE.logoFiles);
    return this.httpClient.post(endpoint, formData);
  }
  //add brand 

  addBrand(brandE : BrandManage){
    const endpoint = this.API + 'add';
    const formData: FormData = new FormData();
    formData.append('brandName', brandE.brandName.toString());
    formData.append('description', brandE.description.toString());
    formData.append('logo', "" );
    formData.append('logoFiles', brandE.logoFiles);
    return this.httpClient.post(endpoint, formData);
  }
}
