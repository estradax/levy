import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RedirectIfAuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        map(isAuthenticated => {
          if (isAuthenticated) {
            this.router.navigate(['']).catch(err => console.log(err));
            return false;
          }
          return true;
        })
      );
  }
}
