import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

export const AuthGuard = () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    return authService.isAutehticated().pipe(
    tap((value: any) => {
      return !value ? router.navigate(['/auth', 'login']) : true
    }
  ))
}

export const NoAuthGuard = () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    return authService.isAutehticated().pipe(
        map(isAuthenticated => isAuthenticated ? router.navigate(['/tasks']) : true)
    );
}