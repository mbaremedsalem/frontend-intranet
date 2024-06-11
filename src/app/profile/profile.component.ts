import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DocumentService } from '../document.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements AfterViewInit {
  selectedFile: File | null = null;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private profileService: DocumentService) {
    this.profileForm = this.fb.group({
      nom: [localStorage.getItem('nom') || '', Validators.required],
      prenom: [localStorage.getItem('prenom') || '', Validators.required],
      phone: [localStorage.getItem('phone') || '', Validators.required],
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      address: [localStorage.getItem('address') || '', Validators.required],
      post: [localStorage.getItem('post') || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.profileService.updateProfile(this.profileForm.value).subscribe(
        response => {
          console.log('Profile updated successfully', response);
          // Update the form with the response data
          this.profileForm.patchValue(response);
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngAfterViewInit(): void {
    // Set the image and other data directly in the component
    this.profileForm.patchValue({
      nom: localStorage.getItem('nom') || '',
      prenom: localStorage.getItem('prenom') || '',
      email: localStorage.getItem('email') || '',
      phone: localStorage.getItem('phone') || '',
      address: localStorage.getItem('address') || '',
      post: localStorage.getItem('post') || ''
    });

    // Update non-form inputs such as the image
    // this.image = localStorage.getItem('image') || '';
    this.cdr.detectChanges();
  }
}
