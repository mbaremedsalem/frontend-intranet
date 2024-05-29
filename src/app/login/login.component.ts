import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login_model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginInProgress = false;
  hide = true; 
  isCorrect: boolean = false;
  credentials = { username: '', password: '' };
  message: string | undefined;
  token: string | null | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;
  showPassword: boolean = false;
  
  constructor(private _snackBar: MatSnackBar,private apiService: AuthService, private router: Router) {
  }

  login() {
     this.loginInProgress = true; 
     this.apiService.login(this.credentials).subscribe(
      (response: LoginResponse) => {
        if (response.status === 200 && response.change_password==true) {
          this.router.navigate(['/setup-password']);
        }
        else if (response.status === 200) {
          
          // Login success
          this.message = response.message;
          // Store the access token in local storage or a cookie
          if(response.role==='Admin'){
            localStorage.setItem('username', response.username);   
            localStorage.setItem('access', response.access);  
            localStorage.setItem('role', response.role);  
            localStorage.setItem('id', response.id.toString());   
            localStorage.setItem('nom', response.nom);
            localStorage.setItem('prenom', response.prenom);
            localStorage.setItem('email', response.email);
            localStorage.setItem('address', response.address);
            localStorage.setItem('image', response.image);
            localStorage.setItem('post', response.post);
            localStorage.setItem('phone', response.phone);
            this.token = localStorage.getItem('access');
            this.router.navigate(['/home-admin']);
          }
          else if(response.role==='Agent')
          {
           // Redirect to the home manager page
           localStorage.setItem('id', response.id.toString());  
           localStorage.setItem('access', response.access);
           localStorage.setItem('nom', response.nom);
           localStorage.setItem('role', response.role);  
           localStorage.setItem('prenom', response.prenom);
           localStorage.setItem('username', response.username);   
           localStorage.setItem('email', response.email);
           localStorage.setItem('address', response.address);
           localStorage.setItem('image', response.image);
           localStorage.setItem('post', response.post);
           localStorage.setItem('phone', response.phone);
           this.token = localStorage.getItem('access');
           this.router.navigate(['/home-admin']);


          //  this.router.navigate(['/home-agent']);
        }
        else 
          {
            // Handle the case where response.access is undefined
            console.error('Access token is undefined.');
          }
        }
        else
        {
          this.message = response.message;
          console.log(response.message)
          this.showErrorMessage = true;
          if (this.message) {
            this.showErrorAlert(this.message);
          }
        }
      },
      (error) => {
        // Login error
        this.message = 'Informations invalide';
      }
    ).add(() => {
      this.loginInProgress = false; // Set to false after login completes (whether success or error)
    });
  }
  showErrorAlert(message: string) {
    this.errorMessage = message;
    this._snackBar.open(message, 'Fermer', {
      duration: 3000, // Durée d'affichage de l'alerte (3 secondes)
    });
  }
  removeToken() {
    this.token = null;
  }



  togglePasswordVisibility(inputField: HTMLInputElement): void {
      const type = inputField.type;
      inputField.type = type === 'password' ? 'text' : 'password';
      this.showPassword = !this.showPassword;
  }

  logout() {
    // Appel de la méthode de déconnexion du service d'authentification
    this.removeToken();
    // Redirigez l'utilisateur vers la page de connexion ou toute autre page appropriée après la déconnexion.
    // Vous pouvez utiliser le routeur Angular pour cela.
  }
}
