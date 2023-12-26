import { Component } from '@angular/core';
import { DocumentService } from '../document.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_BASE_URL } from '../base/base_url';

@Component({
  selector: 'app-procedur',
  templateUrl: './procedur.component.html',
  styleUrls: ['./procedur.component.css']
})
export class ProcedurComponent {
  avisList: any[] = [
    {  isSelected: false },
  ];
  constructor(private documentService: DocumentService,private sanitizer: DomSanitizer,public dialog: MatDialog,private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.fetchProcedur();
  }
  fetchProcedur(searchTerm: string = '') {
    // Utilisez l'URL de votre API avec le token d'authentification
    
    this.http.get<any[]>(`${API_BASE_URL}procedure-by-admin/${localStorage.getItem('id')}/` + searchTerm, {
      headers: {
        'Authorization': 'JWT '+localStorage.getItem('access')
      }
    }).subscribe(
      data => {
        this.avisList = data;
        // Désinfecter les URLs
        this.avisList.forEach(avis => {
          avis.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://127.0.0.1:8000${avis.file}`);
        });
        console.log(data);
      },
      error => {
        console.error('Erreur lors de la récupération des avis:', error);
      }
    );
  }
}
