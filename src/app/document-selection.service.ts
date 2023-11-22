import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentSelectionService {

  private selectedDocumentIdSource = new BehaviorSubject<number>(-1);
  selectedDocumentId$ = this.selectedDocumentIdSource.asObservable();

  setSelectedDocumentId(documentId: number) {
    this.selectedDocumentIdSource.next(documentId);
  }
}
