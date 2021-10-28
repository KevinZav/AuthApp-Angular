import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.formB.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private formB: FormBuilder,
    private registerS: RegisterService,
    private route: Router) { }

  ngOnInit(): void {
  }
  registro(){
    const { name, lastName, email } = this.miFormulario.value;
    const newUser: User = { name, lastName, email };
    this.registerS.createUser(newUser).subscribe((resp: boolean) => {
      if (resp) this.route.navigate(['/auth', 'create-auth']);
      else  Swal.fire('Algo salió mal', 'No se pudo crear el usuario, intente con otro correo', 'error');
    });
  }

}
