import { Routes } from '@angular/router';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { RegistroComponent2 } from './components/register-user/register-user.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TuristaComponent } from './components/turista/turista.component';
import { RecepcionComponent } from './components/recepcion/recepcion.component';

export const routes: Routes = [{
    path:'registerAdmin',
        component:RegistroComponent
    },{
    path:'registerUser',
        component:RegistroComponent2

},{
    path:'login',
        component:LoginComponent
    },{
        path: 'turista',
        component: TuristaComponent
    },{
        path: 'recepcion',
        component: RecepcionComponent
    }];
