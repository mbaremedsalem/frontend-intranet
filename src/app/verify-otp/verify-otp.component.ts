import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from '../window.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { initializeApp } from 'firebase/app';
import { RecaptchaVerifier, getAuth } from 'firebase/auth';
@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent {
  windowRef: any;



  verificationCode!: string;


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

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( (result: { user: any; }) => {

                    this.user = result.user;
                    this.router.navigate(['/setup-password']);

    })
    .catch( (error: any) => console.log(error, "Incorrect code entered?"));
  }
}
