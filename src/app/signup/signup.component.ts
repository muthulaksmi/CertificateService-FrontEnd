import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({ 
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})


export class SignupComponent implements OnInit{
  user!: User;  
  submitted = false;
  firstName="";
  error ="";
  myForm: FormGroup;

   ngOnInit(): void {

  }
    constructor(private fb:FormBuilder, private router:Router, private http:HttpClient) {  
      
      this.myForm = this.fb.group({ 
    
      firstName:['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      lastName:['',[Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      userName:['',[Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
      email:['',Validators.compose([Validators.required,Validators.pattern('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$')])],
      password:['',Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(14)])],
      confirmPassword:['',[Validators.required]],
    });
 
  }
   errorCheckFirstName(){

    firstName:['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]]
    {
    if (this.myForm.get('firstName')?.hasError('pattern')){
      this.error = "Please enter a valid name with no numbers.";
      console.log(this.error);
      this.submitted = true;
    }
    else if (this.myForm.get('firstName')?.hasError('required')){
      this.error = "FirstName is required";
      this.submitted = true;
      console.log(this.error);
    }
    else{ 
      this.error = "";
      this.submitted = false;
    }
   }
  }
  registerUser(){
    const data = {
      fname: this.myForm.controls['firstName'].value,
      lname: this.myForm.controls['lasttName'].value,
      uname: this.myForm.controls['userName'].value,
      email: this.myForm.controls['email'].value,
      password: this.myForm.controls['password'].value,
      role: this.myForm.controls['role'].value,
    };
    let url = 'localhost:8080/auth/register';
    return this.http.post(url, data).subscribe
  }

  onSubmit() {
      this.registerUser().subscribe((Response));

     }
}

class User{

  fname!: string;
  lname!: string;
  uname!: string;
  email!:string;
  password!: string;
  role!:string;

}