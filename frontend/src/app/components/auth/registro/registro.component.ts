import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup,FormControl } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  constructor(
    private http: UsuarioService, 
    private router: Router) {}

form_registro = new FormGroup({
  nombre: new FormControl('', Validators.required),
  apellido: new FormControl('', Validators.required),
  usuario: new FormControl('', Validators.required),
  correo: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required),
  confirm_password: new FormControl('', Validators.required),
  tipo: new FormControl('', Validators.required)
});
registrar(){
  if(this.form_registro.valid){
    if(this.form_registro.value.password === this.form_registro.value.confirm_password){
      this.http.consult_post('/admin/registro', this.form_registro.value).subscribe({
        next: (data: any) => {
          if(data.status){
            console.log('Usuario registrado');
            Swal.fire({
              title: 'Usuario registrado',
              text: 'Usuario registrado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });

            // this.router.navigate(['']);
          }else{
            console.log('error al registrar1');
            Swal.fire({
              title: 'Error al registrar usuario',
              text: 'Error al registrar usuario',
              icon: 'error',
              confirmButtonText: 'Ok'});

            }},
            error: (error: any) => {
              console.log('error al registrar1');
            Swal.fire({
              title: 'Error al registrar usuario',
              text: 'La base de datos no responde',
              icon: 'error',
              confirmButtonText: 'Ok'});
              console.log('Error respecto a backens2');
            }
          }
      );
        
    }else{
      alert('Las contraseñas no coinciden');
      console.log('Las contraseñas no coinciden');
    }
  }else{
    alert('Formulario incompleto');
    console.log('Formulario incompleto');
  }
}
}