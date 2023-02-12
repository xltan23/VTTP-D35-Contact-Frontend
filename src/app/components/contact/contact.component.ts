import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/contact.service';
import { Contact } from 'src/app/models';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  // VARIABLES
  contactForm!:FormGroup

  // SUBSCRIPTION
  value$!:Subscription
  state$!:Subscription

  // CONSTRUCTOR
  constructor(private fb:FormBuilder, private contactSvc:ContactService) {}

  // ON INITIALIZATION
  ngOnInit(): void {
      this.initForm()
  }

  // ON SUBMIT
  processContact() {
    const contact:Contact = this.contactForm.value
    this.contactSvc.saveContact(contact)
                    .then(result => {
                      console.info('>>> Result: ', result)
                      // For successful return in results, initialize form again
                      this.initForm()
                    })
                    .catch(error => {
                      console.error('>>> Error: ', error)
                    })
  }

  private initForm() {
    this.contactForm = this.createForm()
    // If value is not null, unsubscribe 
    if (this.value$) {
      this.value$.unsubscribe()
      this.state$.unsubscribe()
    }
    // If value is null, subscribe to the event (Value change)
    // Everytime form value changes, console updates
    this.value$ = this.contactForm.valueChanges.subscribe(
      (value) => {
        console.info('>>> Value: ', value)
      }
    )
    // Subscribe to event: Change in status (Form is incomplete => invalid)
    this.state$ = this.contactForm.statusChanges.subscribe(
      (state) => {
        console.info('>>> State: ', state)
      }
    )
  }

  // FORM CREATION (Linking control names)
  private createForm():FormGroup {
    return this.fb.group({
      name:this.fb.control('', [Validators.required]),
      phone:this.fb.control('', [Validators.required]),
      email:this.fb.control('', [Validators.required])
    })
  }
}
