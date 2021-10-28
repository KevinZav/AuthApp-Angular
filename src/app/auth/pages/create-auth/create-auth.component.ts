import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-auth',
  templateUrl: './create-auth.component.html',
  styleUrls: ['./create-auth.component.css']
})
export class CreateAuthComponent implements OnInit {
  miFormulario: FormGroup = this.formB.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  constructor(
    private formB: FormBuilder,
    private registerS: RegisterService,
    private router: Router) { }

  ngOnInit(): void {
  }
  registerAuth() {
    const {username, password} = this.miFormulario.value;

    this.registerS.createAuth(username, password)
      .subscribe(async (resp) => {
        if(resp){
          await Swal.fire('¡Excelente!', 'Usuario registrado correctamente, redireccionando a login', 'success');
          this.router.navigate(['/auth', 'login']);
        } else {
          await Swal.fire('¡Ha ocurrido un error!', 'Usuario ya existente, ingrese otro diferente', 'error');
        }
      });
  }

}
