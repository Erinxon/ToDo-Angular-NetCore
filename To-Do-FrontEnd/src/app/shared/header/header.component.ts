import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private readonly authService: AuthService) {

  }

  logout(){
    Swal.fire({
      title: 'Cerrar Sesión',
      text: "¿Estás seguro de que quieres cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3f51b5',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, Cerrar'
    }).then((result: { isConfirmed: boolean}) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    })

  }


}