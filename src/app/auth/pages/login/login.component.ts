import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.formB.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private formB: FormBuilder, private router: Router, private authS: AuthService ) { }

  ngOnInit(): void {
  }

  login() {
    const { username, password } = this.miFormulario.value;

    this.authS.login(username, password).subscribe((valido: boolean) => {
      if(valido) this.router.navigate(['/dashboard']);
      else Swal.fire('Error', 'Contraseña o Usuario incorrectos', 'error');
    });

  }

}
