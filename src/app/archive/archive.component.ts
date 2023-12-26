import { ChangeDetectorRef, Component } from '@angular/core';
import { DocumentService } from '../document.service';

import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { AddArchiveComponent } from '../add-archive/add-archive.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../base/base_url';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  providers: [DatePipe],
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent {
  archives: any[] = [];
  searchTerm: string = '';
  dataSource = new MatTableDataSource<any>();
  selectedArchiveId: number | null = null;
  documents: any[] = [];

  constructor(private documentService: DocumentService,public dialog: MatDialog,private http: HttpClient,private datePipe: DatePipe, private cdr: ChangeDetectorRef ) {}
  ngOnInit(): void {
    this.documentService.getArchives().subscribe((data: any) => {
      this.archives = data;
      this.dataSource.data = this.archives; 
    });
  }

toggleFolder(archiveId: number) {
  console.log(archiveId);
  // Toggle the selectedArchiveId
  this.selectedArchiveId = this.selectedArchiveId === archiveId ? null : archiveId;

  if (this.selectedArchiveId !== null) {
    
    // Load documents only if an archive is selected
    setTimeout(() => {
      this.loadDocuments();
      console.log('gooooo');
    }, 2000); 
  } else {
    // Reset the documents list if no archive is selected
    this.documents = [];
    console.log('hoooo');
  }
}


loadDocuments() {
  console.log('Loading documents...');
  const apiUrl = `${API_BASE_URL}archives/${this.selectedArchiveId}/documents/`;
  const headers = new HttpHeaders({
    Authorization: 'JWT ' + localStorage.getItem('access')
  });

  this.http.get<any[]>(apiUrl, { headers }).subscribe(
    (data) => {
      console.log('Documents loaded:', data);
      this.documents = data;
      // this.cdr.detectChanges();  // Manually trigger change detection
    },
    (error) => {
      console.error('Error loading documents:', error);
    }
  );
}
  

  formatArchiveDate(dateString: string): string {
    const formattedDate = new DatePipe('en-US').transform(dateString, 'dd-MM-yyyy HH:mm:ss');
    return formattedDate || dateString;
  }

  applyFilter() {
    // Apply the filter directly to the MatTableDataSource
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }
  
  openAddArchiveDialog() {
    const dialogRef = this.dialog.open(AddArchiveComponent, {
      width: '1200px',
      panelClass: 'custom-dialog-container',
      position: {
        left: '227px', // Ajoutez la valeur de padding-left que vous souhaitez
      },
      disableClose: true // To prevent closing by clicking outside the dialog
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      // Handle any result or perform actions after the dialog is closed
    });
  }
}
