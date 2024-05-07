import { Component } from '@angular/core';
import { DocumentService } from '../document.service';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../base/base_url';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup-password',
  templateUrl: './setup-password.component.html',
  styleUrls: ['./setup-password.component.css']
})
export class SetupPasswordComponent {
  loginInProgress = false;
  selectedRole: number |null =null;
  email: string = '';
  old_password: string = '';
  new_password: string = '';

  constructor(
    private apiService:DocumentService,
    private http: HttpClient
    ,private router: Router) { }


    onSave() {
      this.loginInProgress = true;
      // Appel de l'API pour enregistrer le mot de passe et le rôle
      const user = {
        email: this.email,
        old_password: this.old_password,
        new_password: this.new_password,
      };
      console.log(user);
      // Remplacez l'URL par l'URL réelle de votre API
      this.http.post(`${API_BASE_URL}change-password/`, user)
        .subscribe(
          (response) => {
            console.log('Enregistrement réussi:', response);
            // Vous pouvez également stocker les autres informations dans le localStorage ici si nécessaire
            
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Erreur lors de l\'enregistrement:', error);
          }
        ).add(() => {
          this.loginInProgress = false; // Set to false after login completes (whether success or error)
        });
    }
}
