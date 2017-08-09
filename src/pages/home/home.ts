import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

// SERVICES
import { RESTService } from "../../app/services/REST/rest.service";

// PAGES
import { ContactPage } from "../contact/contact";
import { AddPage } from "../add/add";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [RESTService]
})
export class HomePage {

    private src_items = []
    private items = [];

    private alert;
    private loader;

    private firstRun = true;

    constructor(
        public navCtrl: NavController,
        private rest: RESTService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController
    ) { }


    // LIFE CICLE EVENTS
    ionViewDidLoad() {
        // FIRES THE LOADING
        this.loader = this.loadingCtrl.create({
            content: "Loading contacts ..."
        });        
        this.loader.present();
        
        this.alert = this.alertCtrl.create({
            title: 'Connection error!',
            subTitle: 'Cannot connect to the server. Try again later!',
            buttons: [{
                text: 'Try again!',
                handler: () => {
                    this.reload();
                }
            }]
        });

        // UPDATE THE CONTACT LIST
        this.refreshContacts(() => this.loader.dismiss(), () => this.loader.dismiss());        
    }

    ionViewDidEnter() {
        if (!this.firstRun) {
            this.refreshContacts()
        } else {
            this.firstRun = false;
        }   
    }

    // REST INTERACTION
    refreshContacts(donefn?, errfn?) {
        this.rest
            .getContacts()
            .subscribe(res => {
                this.src_items = res;
                this.items = this.src_items;
                if (donefn) donefn();
            }, err => {
                if (errfn) errfn(err)
                this.alert.present();
            })
    }

    // ERROR HANDLING??
    reload() {
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }

    // USER INTERACTION
    search(ev: any) {
        this.items = this.src_items;
        let val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.src_items.filter(item => {
                return item.name.data.toLowerCase().includes(val.toLowerCase())
            })
        }
    }

    contactClickHandler(item) {
        this.navCtrl.push(ContactPage, { item: item })
    }

    addContactClickHandler () {
         this.navCtrl.push(AddPage)        
    }

    refresh(ev) {
        this.refreshContacts(() => ev.complete());
    }


}
