import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'NonPrivateKeys',  pure: false })

export class NonPrivateKeysPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {        
        let keys = [];
        for (let key in value) {
            let arr = key.split('');
            if(arr[0] !== '_') keys.push(key);            
        }       
        return keys; 
    }
}
