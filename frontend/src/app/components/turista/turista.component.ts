import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-turista',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './turista.component.html',
  styleUrls: ['./turista.component.scss']
})
export class TuristaComponent implements OnInit {
  vuelos: any[] = [];
  autos: any[] = [];
  

  constructor(
    private http: UsuarioService, 
    private router: Router) {}
  

  ngOnInit(): void {
    this.mostrarAutos();
    this.mostrarVuelos();
  }

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
}

