import { Component, NgZone, OnInit } from '@angular/core';
import 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/firestore';
import { WindowService } from '../window.service';
import { PhoneNumber } from '../models/phone_number';
import { Auth, RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { initializeApp } from 'firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  windowRef: any;

  phoneNumber = new PhoneNumber()

  verificationCode!: string;
  showRegistrationForm: boolean = true;

  credentials = {nom: '',prenom:'' ,phone: '',email:'',address:'' };
  user: any;

  constructor(private win: WindowService,public firebaseAuth : AngularFireAuth,private router: Router) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef
    const firebaseConfig = {
      apiKey: "AIzaSyBsy1iIAp3y_ZpLpKIpUC4jTKOb2QOpWlI",
      authDomain: "intranet-c6295.firebaseapp.com",
      projectId: "intranet-c6295",
      storageBucket: "intranet-c6295.appspot.com",
      messagingSenderId: "702389802351",
      appId: "1:702389802351:web:7e417754a9ad619804449a",
      measurementId: "G-R1YYJ08QJD"
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container')

    this.windowRef.recaptchaVerifier.render()
  }


  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    const countryCode = '+222';
    const phoneNumberWithoutCountryCode = this.phoneNumber.e164.slice(countryCode.length);
    this.firebaseAuth.signInWithPhoneNumber(num, appVerifier)
            .then((result: any) => {

                this.windowRef.confirmationResult = result;
                localStorage.setItem('usernom', this.credentials.nom);
                localStorage.setItem('userprenom', this.credentials.prenom);
                localStorage.setItem('userphone', phoneNumberWithoutCountryCode);
                localStorage.setItem('useremail', this.credentials.email);
                localStorage.setItem('useraddress', this.credentials.address);
                setTimeout(() => {
                  this.router.navigate(['/verify-otp']);
              }, 2000);
                
            })
            .catch( (error: any) => console.log(error) );

  }
//   getdata() {
//     localStorage.setItem('nom', this.credentials.nom);
//     localStorage.setItem('prenom', this.credentials.prenom);
//     localStorage.setItem('phone', this.phoneNumber.e164);
//     localStorage.setItem('email', this.credentials.email);
//     localStorage.setItem('address', this.credentials.address);

//     // Ajoutez un délai de 2 secondes (2000 millisecondes)
//     setTimeout(() => {
//         this.router.navigate(['/verify-otp']);
//     }, 2000);
// }

  // verifyLoginCode() {
  //   this.windowRef.confirmationResult
  //                 .confirm(this.verificationCode)
  //                 .then( (result: { user: any; }) => {

  //                   this.user = result.user;


  //   })
  //   .catch( (error: any) => console.log(error, "Incorrect code entered?"));
  // }

  onCodeChanged(value: string) {
    // this.verificationCode= value;

  }

  // this called only if user entered full code
  onCodeCompleted(value: string) {
    
  }

}
