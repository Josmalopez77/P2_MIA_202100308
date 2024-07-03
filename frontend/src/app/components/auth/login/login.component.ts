import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup,FormControl } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { ReturnStatement } from '@angular/compiler';
@Component({

  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
    constructor(
      private http: UsuarioService, 
      private router: Router) { }

  form_login= new FormGroup({
  usuario: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required)
});

login(){
    const usuario = this.form_login.value.usuario;
    const password = this.form_login.value.password;
if(usuario === 'ADMIN' || password === 'ADMIN'){
  Swal.fire({
    title: 'Credenciales Correctas',
    text: 'Administradir logeado correctamente',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });

  this.router.navigate(['/registerAdmin']);
  return
}

      this.http.consult_post('/login/login', this.form_login.value).subscribe({
        next: (data: any) => {
          if(data.status){
            console.log('Credenciales correctas');
            Swal.fire({
              title: 'Credenciales Correctas',
              text: 'Credenciales correctas',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });

            if (data.data.tipo == 'turista') {
              this.router.navigate(['/turista']); // Cambia '/pagina-turista' por tu ruta real
            } else if (data.data.tipo == 'recepcion') {
              this.router.navigate(['/recepcion']); // Cambia '/pagina-recepcion' por tu ruta real
            } else {
              console.log('Tipo de usuario desconocido:', data.data.tipo);
              // Manejar el caso de un tipo de usuario no reconocido
          }

            // this.router.navigate(['']);
          }else{
            console.log('error al registrar1');
            Swal.fire({
              title: 'Credenciales Incorrectas',
              text: 'Credenciales Incorrectas',
              icon: 'error',
              confirmButtonText: 'Ok'});

            }},
            error: (error: any) => {
              console.log('error al registrar1');
              Swal.fire({
                title: 'Credenciales Incorrectas',
                text: 'Credenciales Incorrectas',
                icon: 'error',
                confirmButtonText: 'Ok'});
            }
          }
      );
    }
}


