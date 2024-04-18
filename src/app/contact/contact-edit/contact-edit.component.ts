import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact$: Observable<Contact | undefined>;
  companies$: Observable<Company[]>;

  constructor(
    private contactService: ContactService,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.companies$ = companyService.getCompaniesObservable();
    if (!this.isNew) {
      this.contact$ = contactService.getContactObservable(this.id);
    } else {
      this.contact$ = of({}) as Observable<Contact>;
    }
  }

  ngOnInit() { }

  editContact(contact: Contact) {
    this.contactService.editContact({
      name: contact.name,
      phone: '123-456-7890',
      id: this.id,
      companyKey: contact.companyKey
    }).then(_ => this.router.navigate(['/contact/all']));
  }

  saveContact(contact: Contact) {
    this.contactService.saveContact({
      name: contact.name,
      companyKey: contact.companyKey
    }).then(_ => this.router.navigate(['/contact/all']));
  }

  deleteContact() {
    this.contactService.deleteContact(this.id)
      .then(_ => this.router.navigate(['/contact/all']));
  }

  get id(): string {
    if (!this.activatedRoute.snapshot.paramMap.has('id')) {
      return 'new';
    }
    return this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  get isNew(): boolean {
    return this.id === 'new';
  }

}
