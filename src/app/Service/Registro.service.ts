import { Injectable } from '@angular/core';

interface RegistroUsuario {
  email: string;
  password: string;
  username: string;
  birthdate: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private usuarios: RegistroUsuario[] = [];

  constructor() {
    if (this.isLocalStorageAvailable()) {
      const usuariosGuardados = localStorage.getItem('usuarios');
      this.usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
    } else {
      this.usuarios = [];
    }
  }

  registrarUsuario(email: string, password: string, username: string, birthdate: string): boolean {
    console.log('Intentando registrar usuario:', { email, name, username, birthdate });
    const usuarioExistente = this.usuarios.find(user => user.email === email || user.username === username);
    if (usuarioExistente) {
      this.mostrarAlerta('El usuario ya existe.', 'danger');
      console.log('El usuario ya existe.');
      return false;
    }

    const nuevoUsuario: RegistroUsuario = { email, password, username, birthdate };
    this.usuarios.push(nuevoUsuario);
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
    this.mostrarAlerta('RegistroUsuario registrado exitosamente.', 'success');
    console.log('RegistroUsuario registrado exitosamente:', nuevoUsuario);
    return true;
  }

  iniciarSesion(username: string, password: string): boolean {
    console.log('Intentando iniciar sesión:', { username, password });
    const usuario = this.usuarios.find(user => (user.username === username) && user.password === password);
    if (usuario) {
      console.log('Inicio de sesión exitoso:', usuario);
      return true;
    } else {
      this.mostrarAlerta('Usuario o contraseña incorrectos.', 'danger');
      console.log('Usuario o contraseña incorrectos.');
      return false;
    }
  }

  private mostrarAlerta(mensaje: string, tipo: string): void {
    const alertaDiv = document.createElement('div');
    alertaDiv.className = `alert alert-${tipo}`;
    alertaDiv.appendChild(document.createTextNode(mensaje));
    const container = document.querySelector('.container');
    if (container) {
      const firstChild = container.firstChild;
      if (firstChild) {
        container.insertBefore(alertaDiv, firstChild);
      } else {
        container.appendChild(alertaDiv);
      }

      setTimeout(() => {
        const alerta = document.querySelector('.alert');
        if (alerta) {
          alerta.remove();
        }
      }, 6000);
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}