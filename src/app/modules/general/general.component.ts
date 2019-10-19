import {Component} from '@angular/core';

@Component({
    template: `
        <p>general component content</p>
        <a [routerLink]="['dynamic']">
            <button>Navigate To Dynamic child page
            </button>
        </a>
        <a [routerLink]="['404']">
            <button>Navigate To 404 child page
            </button>
        </a>
        <hr>
        <router-outlet></router-outlet>
    `
})
export class GeneralComponent {
}
