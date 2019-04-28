import { Injectable } from '@angular/core';

let CONFIG_KEY_NAME = "config";

@Injectable()
export class ConfigProvider {
    
    private config = {
        showSlide : false,
        name : "",
        username : ""
    }
    
    
    constructor() {
        console.log('Hello  Provider');
    }

    //recuperar os dados de configuração da localStorage
    getConfigData(): any{
        return localStorage.getItem("CONFIG_KEY_NAME");
    }

    //gravar os dados de configuração da localStorage
    setConfigData(showSlide?: boolean, name?: string, username?: string){
        let config = {
            showSlide : false,
            name : "",
            username : ""
        }

        if(showSlide){
            config.showSlide = showSlide;
        }

        if (name){
            config.name = name;
        }
    
        if(username){
            config.username = username;
        }

        localStorage.setItem(CONFIG_KEY_NAME, JSON.stringify(config));
    }

}
