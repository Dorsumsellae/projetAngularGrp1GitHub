import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

import { GoogleMapsModule } from '@angular/google-maps';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';

import { StagiaireComponent } from './components/stagiaire/stagiaire.component';
import { StagiaireDetailsComponent } from './components/stagiaire-details/stagiaire-details.component';
import { EvenementAfficherComponent } from './components/evenement-afficher/evenement-afficher.component';
import { EvenementAjouterComponent } from './components/evenement-ajouter/evenement-ajouter.component';
import { EvenementModifierComponent } from './components/evenement-modifier/evenement-modifier.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { EvenementComponent } from './components/evenement/evenement.component';
import { StagiaireAjouterComponent } from './components/stagiaire-ajouter/stagiaire-ajouter.component';
import { StagiaireUpdateComponent } from './components/stagiaire-update/stagiaire-update.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AProposComponent } from './components/a-propos/a-propos.component';
import { LieuxComponent } from './components/lieux/lieux.component';
import { EvennementDetailsComponent } from './components/evennement-details/evennement-details.component';
import { LieuAjouterComponent } from './components/lieu-ajouter/lieu-ajouter.component';
import { LieuModifierComponent } from './components/lieu-modifier/lieu-modifier.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StartComponent } from './components/start/start.component';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { LoggedComponent } from './components/logged/logged.component';
import { LANGUAGE_CODE, USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { SigninComponent } from './components/signin/signin.component';


@NgModule({
  declarations: [
    AppComponent,
    StagiaireComponent,
    ContactComponent,
    StagiaireDetailsComponent,
    MenuComponent,
    HomeComponent,
    EvenementComponent,
    EvenementAfficherComponent,
    EvenementAjouterComponent,
    EvenementModifierComponent,
    StagiaireAjouterComponent,
    EvenementAfficherComponent,
    EvenementAjouterComponent,
    EvenementModifierComponent,
    StagiaireUpdateComponent,
    FooterComponent,
    HeaderComponent,
    AProposComponent,
    LieuxComponent,
    EvennementDetailsComponent,
    LieuAjouterComponent,
    LieuModifierComponent,
    StartComponent,
    LoggedComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatSortModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    { provide: LANGUAGE_CODE, useValue: 'fr' },
    { provide: USE_DEVICE_LANGUAGE, useValue: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
