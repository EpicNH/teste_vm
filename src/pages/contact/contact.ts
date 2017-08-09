import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RESTService } from "../../app/services/REST/rest.service";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
    providers: [RESTService]
})

export class ContactPage implements OnInit {

    private item;
    private editing = false;

    private connectionAlert;
    private deleteAlert

    constructor(
        public navCtrl: NavController,
        private _params: NavParams,
        private rest: RESTService,
        private alertCtrl: AlertController
    ) { }

    ngOnInit() {
        this.item = this._params.get('item');

        this.connectionAlert = {
            title: 'Connection!',
            subTitle: 'Cannot do this action. Try again later!',
            buttons: [{
                text: 'OK!',
                // handler: () => { }
            }]
        };

        this.deleteAlert = {
            title: 'Are you sure?',
            buttons: [{
                text: 'CANCEL',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'DELETE',
                handler: () => {
                    this.deleteContact();
                }
            }]
        };
    }

    ionViewWillLeave() {
        this.updateContact();
    }

    updateContact() {
        this.rest
            .updateContact(this.item)
            .subscribe(
            res => {
                
            },
            err => {
                this.alertCtrl.create(this.connectionAlert).present();
            })
    }

    deleteContact() {
        this.rest
            .deleteContact(this.item)
            .subscribe(
                res => {
                    this.navCtrl.popToRoot();
                },
                err => {
                    this.alertCtrl.create(this.connectionAlert).present();
                }
            )
    }

    handleDeleteClick() {
        // this.navCtrl.popToRoot();
        this.alertCtrl.create(this.deleteAlert).present();
    }

    editToggle() {
        this.editing = !this.editing ? true : false;
    }



}