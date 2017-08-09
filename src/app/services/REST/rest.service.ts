import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()

export class RESTService {

    private url: string = `https://rest-teste-vm.herokuapp.com/contacts`;
    private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getContacts() {
        return this.http.get(this.url).map((res: Response) => res.json());
    }

    addContact(obj) {
        return this.http.post(this.url, obj, this.options).map((res: Response) => res.json());
    }

    deleteContact(obj) {
        let options = new RequestOptions({
            headers: this.headers,
            body: obj
        });
        return this.http.delete(this.url, options).map((res: Response) => res.json());
    }

    updateContact(obj) {        
        return this.http.put(this.url, obj, this.options).map((res: Response) => res.json());
    }

}