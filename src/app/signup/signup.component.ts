import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup
  constructor(private FormBuilder: FormBuilder, private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.FormBuilder.group({
      fullName: ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      email: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9@.-_]*')]],
      password: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9@.-_]*')]],
      mobile: ['',[Validators.required,Validators.pattern('[0-9]*')]]
    })
  }
  signUp(){
    this.http.post<any>('http://localhost:3000/signupUsers',this.signupForm.value)
    .subscribe(res=>{
      alert("Signup Successful");
      this.signupForm.reset()
      this.router.navigate(['login'])
    },err=>{
      alert('Something went wrong')
    })
  }

}
