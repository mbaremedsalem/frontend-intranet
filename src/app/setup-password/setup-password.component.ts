import { Component } from '@angular/core';
import { DocumentService } from '../document.service';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../base/base_url';
import { Router } from '@angular/router';
import { ChangePass } from '../models/change_pass_model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  message: string | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;
  showPassword: boolean = false;
  showPassword1: boolean = false;


  constructor(
    private apiService:DocumentService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router) { }


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
          (response: any) => {
            if (response.status === 200) {
                this.message = response.message;
                this.router.navigate(['/login']);
            } else {
                this.message = response.message;
                this.showErrorMessage = true;
                if (this.message) {
                    this.showErrorAlert(this.message);
                }
            }
            // You can also store other information in localStorage here if necessary
        },
          (error) => {
            // Login error
            this.message = 'Informations invalides';
          }
        ).add(() => {
          this.loginInProgress = false; // Set to false after login completes (whether success or error)
        });
    }

  togglePasswordVisibility(inputField: HTMLInputElement): void {
      const type = inputField.type;
      inputField.type = type === 'password' ? 'text' : 'password';
      this.showPassword = !this.showPassword;
  }
  togglePasswordVisibility1(inputField: HTMLInputElement): void {
    const type1 = inputField.type;
    inputField.type = type1 === 'password' ? 'text' : 'password';
    this.showPassword1 = !this.showPassword1;
}

    showErrorAlert(message: string) {
      this.errorMessage = message;
      this._snackBar.open(message, 'Fermer', {
        duration: 8000, // Durée d'affichage de l'alerte (8 secondes)
      });
    }
    
}
