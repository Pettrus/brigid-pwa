import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router, private api: ApiService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        return new Promise((resolve, reject) => {
            this.api.validarToken().subscribe(valido => {
                resolve(true);
            }, err => {
                this.router.navigate(['login']);
                resolve(true);
            });
        });
    }
}