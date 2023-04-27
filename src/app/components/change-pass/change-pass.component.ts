import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/service/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnChanges {
  login: boolean = false
  Error: string = ''
  Human: boolean = false
  resetcode: boolean = false
  userEmail!:string
  constructor(
    private _fb: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,

  ) {
    this.ChangePass.get('email')?.disable()
    this.userEmail=JSON.parse(localStorage.getItem('userEmail') || '{}')
  }
  ngOnChanges(changes: SimpleChanges): void {
    localStorage.removeItem('userEmail')
  }




  ChangePass = this._fb.group({
    email: [JSON.parse(localStorage.getItem('userEmail') || '{}'),],
    newPassword:['',[Validators.required,Validators.required,Validators.pattern(/^[a-zA-Z0-9@-_$%#@!*.]{8,15}$/)]]
  })


  Change(){
    if(this.ChangePass.valid){
      this.login=true
      this.ChangePass.get('email')?.enable()
      this._AuthService.Changepassword(this.ChangePass.value).subscribe({
        next:(Response)=>{
          Swal.fire({
            icon: 'success',
          });
          this.login=false
          this._Router.navigate(['/login'])
        },
        error:(error)=>{
          this.login=false
          Swal.fire({
            icon: 'error',
            title:error.error.message
          });
          if(error.error.message=="reset code not verified"){
            this._Router.navigate(['/ForgetPassword'])
          }else{
            this._Router.navigate(['/register'])
          }
        }
      })
    }
  }



}
