import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { API_BASE_URL } from '../base/base_url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DocumentSelectionService } from '../document-selection.service';
import { DocumentService } from '../document.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tiles: any;
  token: string | null | undefined;
  isHomePage: boolean = true; // Par défaut, la page est la page d'accueil
  searchTerm: string | undefined;
  searchResults: any[] | undefined; // Remplacez "any[]" par le type de données de vos résultats
  isSearching: boolean = false;
  documents: any[] = [];
  useTraditionalTable = false;

  displayedColumns: string[] = ['sujet', 'code', 'description', 'file', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient,private documentService: DocumentService,private documentSelectionService: DocumentSelectionService,public dialog: MatDialog,) {
    // Utilisez le routeur pour surveiller les modifications de l'URL
 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/home-admin';
      }
    });
  }


  lineChart=new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Document'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Document admitted',
        data: [10, 2, 3,6,9,17,20,10,5,2,16]
      } as any
    ]

  })

  pieChart=new Chart({
    chart: {
      type: 'pie',
      plotShadow: false,
    },
  
    credits: {
      enabled: false,
    },
  
    plotOptions: {
      pie: {
        innerSize: '99%',
        borderWidth: 10,
        borderColor: '',
        slicedOffset: 10,
        dataLabels: {
          connectorWidth: 0,
        },
      },
    },
  
    title: {
      verticalAlign: 'middle',
      floating: true,
      text: 'AUB',
    },
  
    legend: {
      enabled: false,
    },
  
    series: [
      {
        type: 'pie',
        data: [
          { name: 'FORMATION/CBS', y: 1, color: '#eeeeee' },
  
          { name: 'AVIS/PROTECTION', y: 2, color: '#393e46' },

          { name: 'FETE INTER', y: 3, color: '#00adb5' },
          { name: 'MEET AUB', y: 4, color: '#eeeeee' },
          { name: 'AUB', y: 5, color: '#506ef9' },
        ],
      },
    ],
  })
  removeToken() {
    this.token = null;
    localStorage.removeItem('access');
  }

  logout() {
    // Appel de la méthode de déconnexion du service d'authentification
    this.removeToken();

    // Redirigez l'utilisateur vers la page de connexion ou toute autre page appropriée après la déconnexion.
    // Vous pouvez utiliser le routeur Angular pour cela.
    this.router.navigate(['/login']);
  }
  reloadPage(targetRoute: string) {
    const currentRoute = this.router.url;
  
    // Vérifiez si la route actuelle est la même que la cible
    if (currentRoute === targetRoute) {
      // Si la route est la même, rechargez la page
      window.location.reload();
    }
  }

 
 
  searchDocuments() {
    this.isSearching = true; // Définissez à true avant la requête

    if (this.searchTerm) {
      // Créez un en-tête avec le jeton d'authentification
      const headers = new HttpHeaders().set('Authorization', `JWT ${localStorage.getItem('access_token_agent')}`);
      this.http.post(`${API_BASE_URL}chercher-documents/`, { sujet: this.searchTerm } ,{ headers }).subscribe(
        (data: any) => {
          this.searchResults = data.documents;
          this.dataSource.data = this.documents; 
          this.isSearching = false; // Définissez à false après avoir reçu la réponse
        },
        (error) => {
          this.isSearching = false; // Définissez à false en cas d'erreur
          console.error('Erreur lors de la recherche :', error);
        }
      );
    }
  }

  deleteDocument(documentId: number) {
    const url = `${API_BASE_URL}delete-document/${documentId}`;

    // Set up headers with the authorization token
    const headers = new HttpHeaders({
      'Authorization': `JWT ${localStorage.getItem('access_token')}`
    });

    // Send a DELETE request to the API
    this.http.delete(url, { headers }).subscribe(
      () => {
        // Document deleted successfully, handle any further actions
        console.log('delete success')
         // Reload the current page by navigating to the same route
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([this.router.url]);
      },
      (error) => {
        console.error('Error deleting document:', error);
        // Handle the error, display a message, etc.
      }
    );
  }

  openConfirmationDialog(documentId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Call the API to delete the document when the user confirms
        this.deleteDocument(documentId);
      }
    });
  }
  
  openUpdateDialog(documentId: number) {
    this.documentSelectionService.setSelectedDocumentId(documentId);

    // Open the "showupdate-dialog" using MatDialog
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '600px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any actions after the dialog is closed (if needed).
    });
  }

}
