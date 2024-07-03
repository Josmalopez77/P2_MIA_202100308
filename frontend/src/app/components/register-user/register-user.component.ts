import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup,FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
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
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegistroComponent2 {

  constructor(
    private http: UsuarioService, 
    private router: Router) {}
    imagen: any = '';
    imagen_path: any = '';
    ruta_aws:any = '';    
    

form_registro = new FormGroup({
  nombre: new FormControl('', Validators.required),
  apellido: new FormControl('', Validators.required),
  usuario: new FormControl('', Validators.required),
  correo: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required),
  confirm_password: new FormControl('', Validators.required),
  path: new FormControl(''),
  imagen: new FormControl(''),
});




registrar(){
  if(this.form_registro.valid){
    if(this.form_registro.value.password === this.form_registro.value.confirm_password){
      const index = this.imagen_path.indexOf(",");
      this.imagen_path = this.imagen_path.slice(index + 1);
      this.form_registro.value.imagen = this.imagen_path;
      this.form_registro.value.path = this.imagen.name;
      this.http.consult_post('/usuario/registro', this.form_registro.value).subscribe({
        next: (data: any) => {
          if(data.status){
            console.log('Usuario registrado');
            Swal.fire({
              title: 'Usuario registrado',
              text: 'Usuario registrado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.router.navigate(['/login']);
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
onFileSelected(event: any){
  // Seleccionar el archivo y convertirlo a base64
  this.imagen = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (event:any) => {
    this.imagen_path = event.target.result;
  }
  reader.readAsDataURL(this.imagen);
}

encodeFileAsBase64(file:any){
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', () =>{
      resolve(reader.result);
    });
    reader.readAsDataURL(file);
  });
}

}