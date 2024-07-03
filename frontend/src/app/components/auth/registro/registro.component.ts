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
  vuelos: any[] = [];
  autos: any[] = [];
  usuarios: any[] = [];
  constructor(
    private http: UsuarioService, 
    private router: Router) {}

    ngOnInit(): void {
      this.mostrarAutos();
      this.mostrarVuelos();
      this.mostrarUsuarios();
    }

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
  tipo: new FormControl('', Validators.required),
  path: new FormControl(''),
  imagen: new FormControl(''),
});

form_registroVuelos = new FormGroup({
  nombre: new FormControl('', Validators.required),
  origen: new FormControl('', Validators.required),
  destino: new FormControl('', Validators.required),
  dias: new FormControl('', Validators.required),
  precio: new FormControl('', Validators.required)
});

form_registroAutos = new FormGroup({
  nombre: new FormControl('', Validators.required),
  marca: new FormControl('', Validators.required),
  placa: new FormControl('', Validators.required),
  modelo: new FormControl('', Validators.required),
  precio: new FormControl('', Validators.required),
  ciudad: new FormControl('', Validators.required)
});

form_eliminarUsuario = new FormGroup({
  usuario: new FormControl('', Validators.required)
});

form_eliminarAuto = new FormGroup({
  placa: new FormControl('', Validators.required)
});


mostrarAutos(): void {
  this.http.consult_get('/admin/mostrarAutos').subscribe({
    next: (data: any) => {
      console.log('RESULTADOS OBTENIDOS',data.data);
      if (data.status ) {
        console.log('RESULTADOS OBTENIDOS',data.data);
        this.autos = Array.isArray(data.data) ? data.data : [];
      } else {
        console.error('Error al obtener autos:', data.message);
        Swal.fire({
          title: 'Error al obtener autos',
          text: 'Hubo un problema al obtener los autos desde el servidor',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    },
    error: (error: any) => {
      console.error('Error al obtener autos', error);
      Swal.fire({
        title: 'Error al obtener autos',
        text: 'La base de datos no responde',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  });
}

mostrarVuelos(): void {
  this.http.consult_get('/admin/mostrarVuelos').subscribe({
    next: (data: any) => {
      console.log('RESULTADOS OBTENIDOS',data.data);
      if (data.status ) {
        console.log('RESULTADOS OBTENIDOS',data.data);
        this.vuelos = Array.isArray(data.data) ? data.data : [];
      } else {
        console.error('Error al obtener vuelos:', data.message);
        Swal.fire({
          title: 'Error al obtener vuelos',
          text: 'Hubo un problema al obtener los vuelos desde el servidor',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    },
    error: (error: any) => {
      console.error('Error al obtener vuelos', error);
      Swal.fire({
        title: 'Error al obtener vuelos',
        text: 'La base de datos no responde',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  });
}

mostrarUsuarios(): void {
  this.http.consult_get('/admin/mostrar').subscribe({
    next: (data: any) => {
      console.log('RESULTADOS OBTENIDOS',data.data);
      if (data.status ) {
        console.log('RESULTADOS OBTENIDOS',data.data);
        this.usuarios = Array.isArray(data.data) ? data.data : [];
      } else {
        console.error('Error al obtener vuelos:', data.message);
        Swal.fire({
          title: 'Error al obtener vuelos',
          text: 'Hubo un problema al obtener los vuelos desde el servidor',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    },
    error: (error: any) => {
      console.error('Error al obtener vuelos', error);
      Swal.fire({
        title: 'Error al obtener vuelos',
        text: 'La base de datos no responde',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  });
}

registrar(){
  if(this.form_registro.valid){
    if(this.form_registro.value.password === this.form_registro.value.confirm_password){
      const index = this.imagen_path.indexOf(",");
      this.imagen_path = this.imagen_path.slice(index + 1);
      this.form_registro.value.imagen = this.imagen_path;
      this.form_registro.value.path = this.imagen.name;
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

registrarVuelos(){
  if(this.form_registroVuelos.valid){
      this.http.consult_post('/admin/registroVuelos', this.form_registroVuelos.value).subscribe({
        next: (data: any) => {
          if(data.status){
            console.log('Vuelo Registrado');
            Swal.fire({
              title: 'Vuelos registrado',
              text: 'Vuelos registrado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });

            // this.router.navigate(['']);
          }else{
            console.log('error al registrar vuelo');
            Swal.fire({
              title: 'Error al registrar vuelo',
              text: 'Error al registrar vuelo',
              icon: 'error',
              confirmButtonText: 'Ok'});

            }},
            error: (error: any) => {
              console.log('error al registrar1');
            Swal.fire({
              title: 'Error al registrar vuelo',
              text: 'La base de datos no responde',
              icon: 'error',
              confirmButtonText: 'Ok'});
              console.log('Error respecto a backens2');
            }
          }
      );
  }else{
    alert('Formulario incompleto');
    console.log('Formulario incompleto');
  }
}

registrarAutos(){
  if(this.form_registroAutos.valid){
      this.http.consult_post('/admin/registroAutos', this.form_registroAutos.value).subscribe({
        next: (data: any) => {
          if(data.status){
            console.log('Auto Registrado');
            Swal.fire({
              title: 'Auto registrado',
              text: 'Auto registrado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });

            // this.router.navigate(['']);
          }else{
            console.log('error al registrar Auto');
            Swal.fire({
              title: 'Error al registrar Auto',
              text: 'Error al registrar Auto',
              icon: 'error',
              confirmButtonText: 'Ok'});

            }},
            error: (error: any) => {
              console.log('error al registrar1');
            Swal.fire({
              title: 'Error al registrar vuelo',
              text: 'La base de datos no responde',
              icon: 'error',
              confirmButtonText: 'Ok'});
              console.log('Error respecto a backens2');
            }
          }
      );
  }else{
    alert('Formulario incompleto');
    console.log('Formulario incompleto');
  }
}

eliminarUsuario(){
  if(this.form_eliminarUsuario.valid){
      this.http.consult_post('/admin/deleteUsuarios', this.form_eliminarUsuario.value).subscribe({
        next: (data: any) => {
          if(data.status){
            console.log('Usuario Eliminado');
            Swal.fire({
              title: 'Usuario eliminado',
              text: 'Usuario eliminado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });

            // this.router.navigate(['']);
          }else{
            console.log('error al eliminar usuario');
            Swal.fire({
              title: 'Error al eliminar usuario',
              text: 'Error al eliminar usuario',
              icon: 'error',
              confirmButtonText: 'Ok'});

            }},
            error: (error: any) => {
              console.log('error al eliminar usuario');
            Swal.fire({
              title: 'Error al eliminar usuario',
              text: 'La base de datos no responde',
              icon: 'error',
              confirmButtonText: 'Ok'});
              console.log('Error respecto a backens2');
            }
          }
      );
  }else{
    alert('Formulario incompleto');
    console.log('Formulario incompleto');
  }
}

eliminarAuto(){
  if(this.form_eliminarAuto.valid){
      this.http.consult_post('/admin/deleteAuto', this.form_eliminarAuto.value).subscribe({
        next: (data: any) => {
          if(data.status){
            console.log('Auto Eliminado');
            Swal.fire({
              title: 'Auto eliminado',
              text: 'Auto eliminado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });

            // this.router.navigate(['']);
          }else{
            console.log('error al eliminar Auto');
            Swal.fire({
              title: 'Placa no encontrada',
              text: 'Placa no encontrada',
              icon: 'error',
              confirmButtonText: 'Ok'});

            }},
            error: (error: any) => {
              console.log('error al eliminar Auto');
            Swal.fire({
              title: 'Error al eliminar Auto',
              text: 'La base de datos no responde',
              icon: 'error',
              confirmButtonText: 'Ok'});
              console.log('Error respecto a backens2');
            }
          }
      );
  }else{
    alert('Formulario incompleto');
    console.log('Formulario incompleto');
  }
}
}