import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { Observable, catchError, from, map, of, throwError } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyRef: AngularFirestoreDocument<Company>;
  private companiesRef: AngularFirestoreCollection<Company>;

  constructor(private db: AngularFirestore) {
    this.companyRef = this.db.doc<Company>('companies/company');
    this.companiesRef = this.db.collection<Company>('companies');
  }

  getCompaniesObservable(): Observable<Company[]> {
    return this.companiesRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Company>[]): Company[] => {
          return items.map((item: DocumentChangeAction<Company>): Company => {
            return {
              id: item.payload.doc.id,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone
            };
          });
        }),
        catchError(this.errorHandler)
      );
  }

  getCompanyObservable(id: string | null): Observable<Company | undefined> {
    return this.db.doc<Company>(`companies/${id}`).valueChanges()
      .pipe(                          // <-- new
        catchError(this.errorHandler) // <-- new
      );                              // <-- new;
  }

  saveCompany(company: Company) {
    console.log('company', company);
    return this.companiesRef.add(company)
      .then(_ => console.log('success on add'))
      .catch(error => console.log('add', error));
  }

  editCompany(company: Company) {
    console.log('company', company);
    return this.companiesRef.doc(company.id).update(company)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  deleteCompany(id: string) {
    return this.companiesRef.doc(id).delete()
      .then(_ => console.log('Success on delete'))
      .catch(error => console.log('delete', error));
  }

  private errorHandler(error: any) {
    console.log(error);
    return throwError(error);
  }

}

