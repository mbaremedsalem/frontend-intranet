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

  constructor(private _snackBar: MatSnackBar,private apiService: AuthService, private router: Router) {

    
  }
  login() {
    this.loginInProgress = true; 
    this.apiService.login(this.credentials).subscribe(
      (response: LoginResponse) => {
        if (response.status === 200) {
          // Login success
          this.message = response.message;
          // Store the access token in local storage or a cookie
          if(response.role==='Admin'){
            localStorage.setItem('username', response.username);   
            localStorage.setItem('access', response.access);  
            localStorage.setItem('id', response.id.toString());   
            localStorage.setItem('access', response.access);
            localStorage.setItem('nom', response.nom);
            localStorage.setItem('prenom', response.prenom);
            localStorage.setItem('email', response.email);
            localStorage.setItem('address', response.adress);
            localStorage.setItem('image', response.image);
            localStorage.setItem('post', response.post);
            this.token = localStorage.getItem('access');
            
            // Redirect to the home page
            this.router.navigate(['/home-admin']);
          }
          else if(response.role==='Agent')
          {
           // Redirect to the home manager page
           localStorage.setItem('access_token_agent', response.access);
           localStorage.setItem('nom', response.nom);
           localStorage.setItem('prenom', response.prenom);
           localStorage.setItem('username', response.username);   
           localStorage.setItem('email', response.email);
           localStorage.setItem('address', response.adress);
           localStorage.setItem('image', response.image);
           localStorage.setItem('post', response.post);
           this.token = localStorage.getItem('access_token_agent');
           this.router.navigate(['/home-agent']);
        }
          else if(response.role==='Gerant')
           {
            // Redirect to the home manager page
            
              localStorage.setItem('access', response.access);   
              localStorage.setItem('access', response.access);
              localStorage.setItem('nom', response.nom);
              localStorage.setItem('username', response.username);   
              localStorage.setItem('prenom', response.prenom);
              localStorage.setItem('email', response.email);
              localStorage.setItem('address', response.adress);
              localStorage.setItem('image', response.image);
              localStorage.setItem('post', response.post);
              localStorage.setItem('access_token', response.access);
              this.token = localStorage.getItem('access_token');
            
            this.router.navigate(['/home-gerant']);
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
          this.showErrorMessage = true;
          if (this.message) {
            this.showErrorAlert(this.message.slice(33, 56));
          }
        }
      },
      (error) => {
        // Login error
        this.message = 'Informations invalides';
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

  logout() {
    // Appel de la méthode de déconnexion du service d'authentification
    this.removeToken();
    // Redirigez l'utilisateur vers la page de connexion ou toute autre page appropriée après la déconnexion.
    // Vous pouvez utiliser le routeur Angular pour cela.
  }
}
