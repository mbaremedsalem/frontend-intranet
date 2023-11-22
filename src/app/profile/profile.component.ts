import { Component ,AfterViewInit, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements AfterViewInit{
  selectedFile: File | null = null;
  nom: string | null = null;
  email: string | null = null;
  prenom: string | null = null;
  image: string | null = null;
  post: string |null = null;
  
  constructor(private cdr: ChangeDetectorRef) {}

  onSubmit() {

  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  ngAfterViewInit(): void {
    // Votre code à l'intérieur de l'événement
    const nameInput = document.getElementById('nameInput') as HTMLInputElement;
    const emailInput = document.getElementById('emailInput') as HTMLInputElement;

    this.nom = localStorage.getItem('nom') || '';
    this.prenom = localStorage.getItem('prenom') || '';
    this.image = localStorage.getItem('image') || '';
    this.post = localStorage.getItem('post') || '';

    if (nameInput) {
      nameInput.value = this.nom;
    }
    if (emailInput) {
      emailInput.value = localStorage.getItem('email') || '';
    }

    // Marquer la vue pour une vérification manuelle
    this.cdr.detectChanges();
  }
}
