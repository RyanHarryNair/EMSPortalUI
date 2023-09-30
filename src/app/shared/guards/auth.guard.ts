import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


;
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  if (auth.isUserLogin()) {
    return true;
  }
  else {
    router.navigate(['login']);
    alert(`PLease login to continue!!!`)
    return false;
  }
};
