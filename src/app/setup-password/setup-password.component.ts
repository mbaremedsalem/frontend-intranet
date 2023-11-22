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
  roles: any[] = ['Agent','Gerant','Admin']; 
  selectedRole: number |null =null;
  password: string = '';
  constructor(
    private apiService:DocumentService,
    private http: HttpClient
    ,private router: Router) { }

    onPasswordChange(newPassword: string) {
      // Update the password value when it changes
      this.password = newPassword;
    }
    onSave() {
      // Appel de l'API pour enregistrer le mot de passe et le rôle
   
      const user = {
        nom: localStorage.getItem('usernom'),
        prenom: localStorage.getItem('userprenom'),
        phone: localStorage.getItem('userphone'),
        email: localStorage.getItem('useremail'),
        address: localStorage.getItem('useraddress'),
        password: this.password,
        role: this.selectedRole,
      };
      console.log(user);
      // Remplacez l'URL par l'URL réelle de votre API
      this.http.post(`${API_BASE_URL}register/`, user)
        .subscribe(
          (response) => {
            console.log('Enregistrement réussi:', response);
            // Vous pouvez également stocker les autres informations dans le localStorage ici si nécessaire
            
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Erreur lors de l\'enregistrement:', error);
          }
        );
    }
}
