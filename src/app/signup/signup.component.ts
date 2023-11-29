import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import { response } from 'express';

@Component({ 
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
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
  errorCheckConfirmPassword(){

    confirmPassword:['',[Validators.required]]
    const pass = this.myForm.get('password')?.value;
    const conpass = this.myForm.get('confirmPassword')?.value
    if (this.myForm.get('password')?.hasError('required')){
      this.error = "** password is required";
      this.submitted = true;
      console.log(this.error);
    }    
    else if (pass!==null && conpass !== null && this.myForm.get('password')?.value !== this.myForm.get('confirmPassword')?.value){
      this.error = "** password don't match";
      this.submitted = true;
      console.log(this.error);
    }
    else{ 
      this.error = "";
      console.log("come here");
      this.submitted = false;
    }
  
  }

  errorCheckPassword(){

    password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(14)]]
    
    if (this.myForm.get('password')?.hasError('minlength') || this.myForm.get('password')?.hasError('maxlength') ){
      this.error = "** Please enter valid password. must be min of 8 char and max 16.";
      console.log(this.error);
      this.submitted = true;
    }
    else if (this.myForm.get('password')?.hasError('required')){
      this.error = "** password is required";
      this.submitted = true;
      console.log(this.error);
    }
    else{ 
      this.error = "";
      this.submitted = false;
    }
  
  }

  errorCheckEmail(){

    email:['',[Validators.required, Validators.pattern('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$')]]
    
    if (this.myForm.get('email')?.hasError('pattern')){
      this.error = "** Please enter valid email address";
      console.log(this.error);
      this.submitted = true;
    }
    else if (this.myForm.get('email')?.hasError('required')){
      this.error = "** Email is required";
      this.submitted = true;
      console.log(this.error);
    }
    else{ 
      this.error = "";
      this.submitted = false;
    }
  
  }
  errorCheckUserName(){

    userName:['',[Validators.required, Validators.minLength(8), Validators.maxLength(14)]]
    
    if (this.myForm.get('userName')?.hasError('minlength') || this.myForm.get('userName')?.hasError('maxlength') ){
      this.error = "** Please enter valid UserName. must be min of 8 char and max 16.";
      console.log(this.error);
      this.submitted = true;
    }
    else if (this.myForm.get('userName')?.hasError('required')){
      this.error = "** User Name is required";
      this.submitted = true;
      console.log(this.error);
    }
    else{ 
      this.error = "";
      this.submitted = false;
    }
  
  }
   errorCheckFirstName(){

    firstName:['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]]
    
    if (this.myForm.get('firstName')?.hasError('pattern')){
      this.error = "** Please enter a valid name with no numbers.";
      console.log(this.error);
      this.submitted = true;
    }
    else if (this.myForm.get('firstName')?.hasError('required')){
      this.error = "** First Name is required";
      this.submitted = true;
      console.log(this.error);
    }
    else{ 
      this.error = "";
      this.submitted = false;
    }
  
  }
  errorCheckLastName(){

    lastName:['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]]
    
    if (this.myForm.get('lastName')?.hasError('pattern')){
      this.error = "** Please enter a valid name with no numbers and no special characters.";
      console.log(this.error);
      this.submitted = true;
    }
    else if (this.myForm.get('lastName')?.hasError('required')){
      this.error = "** Last Name is required";
      this.submitted = true;
      console.log(this.error);
    }
    else{ 
      this.error = "";
      this.submitted = false;
    }
  
  }

  registerUser(){

    const data = {
      firstName: this.myForm.controls['firstName'].value,
      lastName: this.myForm.controls['lastName'].value,
      username: this.myForm.controls['userName'].value,
      email: this.myForm.controls['email'].value,
      password: this.myForm.controls['password'].value,
      role: "admin",
      //role: this.myForm.controls['role'].value,
    };

    let url = 'http://localhost:8080/auth/register';

    return this.http.post(url, data).subscribe((response) =>{
      console.log("post successful: ", response);
    })

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