import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {IContact} from '../models/IContact';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient:HttpClient) { }

  public getAllContacts():Observable<IContact[]>{
    let dataURL:string=`https://gist.githubusercontent.com/KOLAMANIKANTA/896ab1da4400c815704928e027d8cc98/raw/537784a2ed8b77a756a5bb74ccea4267a6fb8fef/employees.json`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  public handleError(error:HttpErrorResponse){
    let errorMessage:string = '';
    if(error.error instanceof ErrorEvent){
      // client Error
      errorMessage = `Error : ${error.error.message}`
    }
    else{
      // server error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

