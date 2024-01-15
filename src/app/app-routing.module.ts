import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DirectionComponent } from './direction/direction.component';
import { DocumentComponent } from './document/document.component';
import { ProfileComponent } from './profile/profile.component';
import { DocumentChartComponent } from './document-chart/document-chart.component';
import { OtpComponent } from './otp/otp.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { SetupPasswordComponent } from './setup-password/setup-password.component';
import { HomeAgentComponent } from './home-agent/home-agent.component';
import { DocumentAdminComponent } from './document-admin/document-admin.component';
import { AgentComponent } from './agent/agent.component';
import { GerantComponent } from './gerant/gerant.component';
import { UpdateAgentComponent } from './update-agent/update-agent.component';
import { UpdateGerantComponent } from './update-gerant/update-gerant.component';
import { HomeManagerComponent } from './home-manager/home-manager.component';
import { ArchiveComponent } from './archive/archive.component';
import { AvisComponent } from './avis/avis.component';
import { ProcedurComponent } from './procedur/procedur.component';
import { NoteComponent } from './note/note.component';
import { DesisionComponent } from './desision/desision.component';
import { TexteGouvernanceComponent } from './texte-gouvernance/texte-gouvernance.component';
import { PolitiqueBanqueComponent } from './politique-banque/politique-banque.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'verify-otp', component: VerifyOtpComponent },
  { path: 'setup-password', component: SetupPasswordComponent },
  { path: 'update/:id', component: UpdateAgentComponent },
  { path: 'update-gerant/:id', component: UpdateGerantComponent },
  { path: 'update-direction/:id', component: UpdateGerantComponent },

  {
    path: 'home-admin', // Incluez "home" dans le chemin
    component: HomeComponent,
    children: [
      { path: 'direction-admin', component: DirectionComponent },
      { path: 'chart-banque-admin', component: DocumentAdminComponent },
      { path: 'note-admin', component: NoteComponent },
      { path: 'decision-admin', component: DesisionComponent },
      { path: 'Texte-gouvernance-admin', component: TexteGouvernanceComponent },
      { path: 'politique-banque-admin', component: PolitiqueBanqueComponent },
      { path: 'profile-admin', component: ProfileComponent },
      { path: 'agents', component: AgentComponent },
      { path: 'gerants', component: GerantComponent },
      { path: 'Archive-admin', component: ArchiveComponent },
      { path: 'Avis', component: AvisComponent },
      { path: 'Procedure', component: ProcedurComponent },

    ],
  },
  {
    path: 'home-agent', // Incluez "home" dans le chemin
    component: HomeAgentComponent,
    children: [
      { path: 'direction', component: DirectionComponent },
      { path: 'document', component: DocumentComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'archive-agent', component: ArchiveComponent },
    ],
  },
  {
    path: 'home-gerant', // Incluez "home" dans le chemin
    component: HomeManagerComponent,
    children: [
      { path: 'direction-admin', component: DirectionComponent },
      { path: 'document-admin', component: DocumentAdminComponent },
      { path: 'profile-admin', component: ProfileComponent },
      { path: 'agents', component: AgentComponent },
      { path: 'gerants', component: GerantComponent },
      { path: 'arcive-gerant', component: ArchiveComponent },
    ],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
