import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DocumentComponent } from './document/document.component';
import { DirectionComponent } from './direction/direction.component';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddDocumentDialogComponent } from './add-document-dialog/add-document-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { DocumentChartComponent } from './document-chart/document-chart.component';
import { ChartModule } from 'angular-highcharts';
import {MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { OtpComponent } from './otp/otp.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { environment } from '../environments/environment';
import { CodeInputModule } from 'angular-code-input';
import { SetupPasswordComponent } from './setup-password/setup-password.component';
import { HomeAgentComponent } from './home-agent/home-agent.component';
import { DocumentAdminComponent } from './document-admin/document-admin.component';
import { AddDirectionComponent } from './add-direction/add-direction.component';
import { ConfirmeDialogDirectionComponent } from './confirme-dialog-direction/confirme-dialog-direction.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTreeModule} from '@angular/material/tree';
import { UpdateDirectionComponent } from './update-direction/update-direction.component';
import { AgentComponent } from './agent/agent.component';
import { ConfirmAgentComponent } from './confirm-agent/confirm-agent.component';
import { ConfirmGerantComponent } from './confirm-gerant/confirm-gerant.component';
import { UpdateAgentComponent } from './update-agent/update-agent.component';
import { UpdateGerantComponent } from './update-gerant/update-gerant.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HomeManagerComponent } from './home-manager/home-manager.component';
import { ArchiveComponent } from './archive/archive.component';
import { CommonModule } from '@angular/common';
import { AddArchiveComponent } from './add-archive/add-archive.component';
import { AvisComponent } from './avis/avis.component';
import { AddAvisComponent } from './add-avis/add-avis.component';
import { ProcedurComponent } from './procedur/procedur.component';
import { AddProcedureComponent } from './add-procedure/add-procedure.component';
import {CdkTreeModule} from '@angular/cdk/tree';
import { NoteComponent } from './note/note.component';
import { DesisionComponent } from './desision/desision.component';
import { TexteGouvernanceComponent } from './texte-gouvernance/texte-gouvernance.component';
import { PolitiqueBanqueComponent } from './politique-banque/politique-banque.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { AddDecisionComponent } from './add-decision/add-decision.component';
import { AddPolitiqueComponent } from './add-politique/add-politique.component';
import { ProcedureAgentComponent } from './procedure-agent/procedure-agent.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    DocumentComponent,
    DirectionComponent,
    AddDocumentDialogComponent,
    ConfirmationDialogComponent,
    UpdateDialogComponent,
    DocumentChartComponent,
    OtpComponent,
    VerifyOtpComponent,
    SetupPasswordComponent,
    HomeAgentComponent,
    DocumentAdminComponent,
    AddDirectionComponent,
    ConfirmeDialogDirectionComponent,
    UpdateDirectionComponent,
    AgentComponent,
    ConfirmAgentComponent,
    ConfirmGerantComponent,
    UpdateAgentComponent,
    UpdateGerantComponent,
    HomeManagerComponent,
    ArchiveComponent,
    AddArchiveComponent,
    AvisComponent,
    AddAvisComponent,
    ProcedurComponent,
    AddProcedureComponent,
    NoteComponent,
    DesisionComponent,
    TexteGouvernanceComponent,
    PolitiqueBanqueComponent,
    AddNoteComponent,
    AddDecisionComponent,
    AddPolitiqueComponent,
    ProcedureAgentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    ChartModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireAuthModule, // Ajoutez ce module
    CodeInputModule,
    MatBadgeModule,
    MatTreeModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    CdkTreeModule,
    MatChipsModule,
    MatAutocompleteModule
   
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
