import { Component, Inject , OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({ 
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
  //user!: User;  
  submitted = false;
  formerror ="";
 
  myForm!: FormGroup; 
  private url = 'http://localhost:8080/auth/register';
   ngOnInit(): void {
    this.myForm = this.fb.group({ 
    
      firstName:['',[Validators.required, Validators.pattern('^[a-zA-Z]*$'), Validators.maxLength(20)]],
      lastName:['',[Validators.required, Validators.pattern('^[A-Za-z]*$'), Validators.maxLength(20)]],
      userName:['',[Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
      //'^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'
      ///^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      email:['',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/)])],
      password:['',Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(14)])],
      confirmPassword:['',[Validators.required]],
    });

  }
    constructor(private fb:FormBuilder, private router:Router, private http:HttpClient, public dialog: MatDialog ) {  
            
  }
  errorCheckConfirmPassword(){

    const pass = this.myForm.get('password')?.value;
    const conpass = this.myForm.get('confirmPassword')?.value
    if (this.myForm.get('password')?.hasError('required')){
      this.formerror = "** password is required";
      this.submitted = true;
      console.log(this.formerror);
    }    
    else if (pass!==null && conpass !== null && this.myForm.get('password')?.value !== this.myForm.get('confirmPassword')?.value){
      this.formerror = "** password don't match";
      this.submitted = true;
      console.log(this.formerror);
    }
    else{ 
      this.formerror = "";
      this.submitted = false;
    }
  
  }

  errorCheckPassword(){

    
    if (this.myForm.get('password')?.hasError('minlength') || this.myForm.get('password')?.hasError('maxlength') ){
      this.formerror = "** Please enter valid password. must be min of 8 char and max 16.";
      console.log(this.formerror);
      this.submitted = true;
    }
    else if (this.myForm.get('password')?.hasError('required')){
      this.formerror = "** password is required";
      this.submitted = true;
      console.log(this.formerror);
    }
    else{ 
      this.formerror = "";
      this.submitted = false;
    }
  
  }

  errorCheckEmail(){

    
    if (this.myForm.get('email')?.hasError('pattern')){
      this.formerror = "** Please enter valid email address";
      console.log(this.formerror);
      this.submitted = true;
    }
    else if (this.myForm.get('email')?.hasError('required')){
      this.formerror = "** Email is required";
      this.submitted = true;
      console.log(this.formerror);
    }
    else{ 
      this.formerror = "";
      this.submitted = false;
    }
  
  }
  errorCheckUserName(){

    
    if (this.myForm.get('userName')?.hasError('minlength') || this.myForm.get('userName')?.hasError('maxlength') ){
      this.formerror = "** Please enter valid UserName. must be min of 8 char and max 16.";
      console.log(this.formerror);
      this.submitted = true;
    }
    else if (this.myForm.get('userName')?.hasError('required')){
      this.formerror = "** User Name is required";
      this.submitted = true;
      console.log(this.formerror);
    }
    else{ 
      this.formerror = "";
      this.submitted = false;
    }
  
  }
   errorCheckFirstName(){

    
    if (this.myForm.get('firstName')?.hasError('pattern')){
      this.formerror = "** Please enter a valid name with no numbers and no special characters.";
      console.log(this.formerror);
      this.submitted = true;
    }
    else if (this.myForm.get('firstName')?.hasError('required')){
      this.formerror = "** First Name is required";
      this.submitted = true;
      console.log(this.formerror);
    }
    else if (this.myForm.get('firstName')?.hasError('maxlength')){
      this.formerror = "** First Name should not exceed 20 char in length";
      this.submitted = true;
      
    }
    else{ 
      this.formerror = "";
      this.submitted = false;
    }
  
  }
  errorCheckLastName(){

    
    if (this.myForm.get('lastName')?.hasError('pattern')){
      this.formerror = "** Please enter a valid name with no numbers and no special characters.";
      console.log(this.formerror);
      this.submitted = true;
    }
    else if (this.myForm.get('lastName')?.hasError('required')){
      this.formerror = "** Last Name is required";
      this.submitted = true;
      console.log(this.formerror);
    }
    else if (this.myForm.get('lastName')?.hasError('maxlength')){
      this.formerror = "** lastName should not exceed 20 char in length";
      this.submitted = true;
      
    }
    else{ 
      this.formerror = "";
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
      role:"user",
    };

    
    
   if (this.myForm.controls['firstName'].value !== "" && this.myForm.controls['lastName'].value !== "" && this.myForm.controls['userName'].value !== "" && this.myForm.controls['email'].value !== "" && this.myForm.controls['password'].value !== "" && this.myForm.controls['confirmPassword'].value !== "")
    {
      let url = 'http://localhost:8080/auth/register';
     this.http.post(url, data).subscribe((response) =>{
      console.log("Come here");
      console.log("post successful: ", response);
      this.openDialog();
    //  this.dialogRef.open(PopUpComponent);
    },
    (error: any) => {
      console.log("No here");
      console.error("Error during post: ", error);
      //this.formerror = error;
    });
  }
  else {
    this.submitted = true;
    this.formerror = "All Fields are mandatory.";
  }

    
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { message: 'Registration successful!' }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }


}


@Component({
  selector: 'app-dialog',
  template: `
    <h2 mat-dialog-title>Success</h2>
    <mat-dialog-content>
      Registration Successful
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">OK</button>
    </mat-dialog-actions>
  `
})
export class DialogComponent {
  
   constructor(
     public dialogRef: MatDialogRef<DialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/login']);
    //Close the dialog
  }
}