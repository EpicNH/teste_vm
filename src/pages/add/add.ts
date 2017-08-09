import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { RESTService } from "../../app/services/REST/rest.service";

@Component({
    selector: 'page-add',
    templateUrl: 'add.html',
    providers: [RESTService]
})

export class AddPage {


    private template = {
        "name": {
            "type": "text",
            "data": "",
            "placeholder": "Give me a name!"
        },
        "phone": {
            "type": "text",
            "data": "",
            "placeholder": "Ask for nudes!"
        },
        "adress": {
            "type": "text",
            "data": "",
            "placeholder": "Home adress?"
        },
        "email": {
            "type": "text",
            "data": "",
            "placeholder": "Send spam!"
        },
        "birthdate": {
            "type": "date",
            "data": "2017-01-01"
        }
    }

    private connectionAlert;

    constructor(
        public navCtrl: NavController,
        private rest: RESTService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController
    ) { }


    // INITIALIZATION
    ionViewDidLoad() {
        this.connectionAlert = {
            title: 'Connection!',
            subTitle: 'Cannot do this action. Try again later!',
            buttons: [{
                text: 'OK!',
                // handler: () => { }
            }]
        };
    }

    handleAddClick() {
        this.rest
            .addContact(this.template)
            .subscribe(
                res => {
                    this.navCtrl.popToRoot();
                },
                err => {
                    this.alertCtrl.create(this.connectionAlert).present();
                }
            )
    }




}