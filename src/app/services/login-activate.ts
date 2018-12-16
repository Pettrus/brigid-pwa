import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoginActivate implements CanActivate {
    constructor(private router: Router, private api: ApiService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        return new Promise((resolve, reject) => {
            this.api.validarToken().subscribe(valido => {
                this.router.navigate(['login']);
                resolve(true);
            }, err => {
                resolve(true);
            });
        });
    }
}