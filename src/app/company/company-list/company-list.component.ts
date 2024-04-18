import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { EMPTY, Observable } from 'rxjs';
import { Company } from '../../models/company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  public companies$: Observable<Company[]>;

  constructor(private companyService: CompanyService) {
    this.companies$ = EMPTY;
  }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companies$ = this.companyService.getCompaniesObservable();
  }

}
