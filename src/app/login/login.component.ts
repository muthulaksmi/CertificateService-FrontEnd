import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  myForm: FormGroup;
  submitted= false;
  formerror ="";
  
  constructor(private fb:FormBuilder){
    this.myForm = this.fb.group({ 
    
    userName:['',[Validators.required]],
      password:['',[Validators.required]],
    });
  }

  errorCheckUserName(){

    if (this.myForm.get('userName')?.hasError('required')){
      this.formerror = "** User Name is required";
      this.submitted = true;
      console.log(this.formerror);
    }  
  }
  errorCheckPassword(){

    if (this.myForm.get('password')?.hasError('required')){
      this.formerror = "** Password is required";
      this.submitted = true;
      console.log(this.formerror);
    }  
  }
}


     


