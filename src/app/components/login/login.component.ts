import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/Service/Registro.service';
import { Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // formularioLogin = new FormGroup({
  //   rut: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,2})\.(\d{3})\.(\d{3})-(\d|K)$/)]),
  //   contrasena: new FormControl('', [Validators.required])
  // });
  formularioLogin:FormGroup;
  respuesta!: boolean;

  constructor(
    private router: Router,
    private servicioReg: RegistroService,
    private el: ElementRef
  ) { }
 
  ngOnInit(): void {
    this.formularioLogin = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
 
  ingresar(): void {
    if (this.formularioLogin.valid) {

      const login = {
        nombreUsuario: this.formularioLogin.get('userName').value,
        password: this.formularioLogin.get('contrasena').value,
      };
      // Llamar al servicio de autenticación
      const InicioSesion = this.servicioReg.iniciarSesion(login.password, 
        login.nombreUsuario);
        this.respuesta = InicioSesion;
          if (InicioSesion) {
            console.log('Registro exitoso:', { login });
            // Redireccionar a la página principal
            this.router.navigate(['/inicio']);
          } else {
            console.log('Error en el registro.');
          }
    }
  }
 
  recuperarContrasena(): void {
    // Redireccionar a la página de recuperación de contraseña
    this.router.navigate(['recuperar-pass']);
  }

}

