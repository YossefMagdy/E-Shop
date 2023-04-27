import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/service/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  login: boolean = false
  Error: string = ''
  Human: boolean = false
  resetcode: boolean = false
  constructor(
    private _fb: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,

  ) {

  }



  ForgetForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
  })
  Resetform = this._fb.group({
    resetCode: ['', [Validators.required]],
  })

  Forget() {

    if (this.ForgetForm.valid && this.Human) {
      this.login = true
      this._AuthService.ResetPassword(this.ForgetForm.value).subscribe({
        next: (Response) => {
          localStorage.setItem('userEmail',JSON.stringify(this.ForgetForm.value.email))
          Swal.fire(Response.message);
          this.resetcode = true

          this.login = false


        },
        error: (error) => {
          this.login = false
          this.Error = error.error.message
        }
      })
    }

  }


  resolved(captchaResponse: string) {
    if (captchaResponse.length > 0) {
      this.Human = true
    }
    else {
      this.Human = false
    }

  }
  Reset() {

    if (this.Resetform.valid) {
      this.login = true
      this._AuthService.ResetCode(this.Resetform.value).subscribe({
        next: (Response) => {
          Swal.fire({
            icon: 'success',
            title: Response.status
          });

          this.login = false
          this._Router.navigate(['/ChangePass'])

        },
        error: (error) => {


          this.login = false
          this.Error = error.error.message
        }
      })
    }

  }

}
