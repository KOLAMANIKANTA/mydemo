import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contacts: IContact[] = [];
  @Output() sendContact = new EventEmitter();
  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe((data)=>{
      this.contacts=data;

    });
  }
  public selectedContact(contact:IContact){
    this.sendContact.emit(contact)
  }
}
