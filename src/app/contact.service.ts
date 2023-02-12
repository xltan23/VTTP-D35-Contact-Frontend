import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Contact } from "./models";

@Injectable()
export class ContactService {
    
    // CONSTRUCTOR
    constructor(private http:HttpClient) {}

    // METHODS
    saveContact(contact:Contact):Promise<Contact> {
        // Create payload to send 
        const payload = new HttpParams()
                            .set("name", contact.name)
                            .set("phone", contact.phone)
                            .set("email", contact.email)
        const headers = new HttpHeaders()
                            .set("Content-Type", "application/x-www-form-urlencoded")
                            .set("Accept", "application/json")
        console.info('Payload: ', payload)
        console.info('Headers: ', headers)
        // POST payload to server
        return firstValueFrom(this.http.post<Contact>('http://localhost:8080/contact', payload.toString(), { headers }))            
    }
}