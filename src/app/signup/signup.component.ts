import { Component, Inject, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})



export class SignupComponent implements OnInit {
  //user!: User;  
  message = "";
  submitted = false;
  formerror = "";
  firstnameerror = "";
  lastNameError = "";
  userNameError = "";
  emailError = "";
  passwordError = "";
  confirmPasswordError = "";
  firstNameTooltip = "*Alphabets only\nMaximum 20 characters only";
  userNameTooltip = "*Alphanumeric\n8 to 16 characters."
  emailTooltip = "e.g. someone@gmail.com";
  passwordTooltip = "Alphanumeric, special characters. \n 8 to 16 characters."
  // firstNameBorderColor="";

  myForm!: FormGroup;
  private url = 'http://localhost:8080/auth/register';

  containsLetterValidator: ValidatorFn = (control: AbstractControl) => {
    const value = control.value as string;
    if (!/[a-zA-Z]/.test(value)) {
      return { containsLetter: true };
    }
    return null;
  };

  // passwordValidator: ValidatorFn = (control: AbstractControl) => {
  //   const value = control.value as string;
  //   const hasMinLength = value.length >= 8;
  //   const hasMaxLength = value.length <=16;
  //   const hasUppercase = /[A-Z]/.test(value);
  //   const hasLowercase = /[a-z]/.test(value);
  //   const hasDigit = /\d/.test(value);
  //   const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  //   const isValid = hasMinLength && hasUppercase && hasLowercase && hasDigit && hasSpecialCharacter && hasMaxLength;
  //   if (isValid) {
  //       return null;
  //   }
  //   return true;
  //   };


  ngOnInit(): void {
    this.myForm = this.fb.group({

      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$'), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]*$'), Validators.maxLength(20)]],
      userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$'), Validators.minLength(8), Validators.maxLength(16), this.containsLetterValidator]],
      //Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[com]{3,}$/)
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.a-zA-Z%+-]+@[a-zA-Z0-9-]+(?<!\.)\.[a-zA-Z]{2,}$/)])],

      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16),])],
      //password: ['',Validators.compose[Validators.required, this.passwordValidator]],
      confirmPassword: ['', [Validators.required]],
    });

  }
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, public dialog: MatDialog, private sanitizer: DomSanitizer) {

  }

  // showTooltip(fields: string) {
  //   switch(fields)
  //   {
  //     case "firstname":
  //       this.TooltipMessage = "Value should be alphanumeric!";
  //       this.isTooltipVisible=true;
  //       break;
  //     // case "lastname":
  //     //   this.TooltipMessage = "Value should be alphanumeric!";
  //     //   this.isTooltipVisible=true;
  //     //   break;
  //   }
  // }
  // hideTooltip(fields: string) {
  //   switch(fields)
  //   {
  //     case "firstname":
  //       this.isTooltipVisible=false;
  //       this.errorCheckFirstName();

  //       break;
  //     // case "lastname":
  //     //     this.isTooltipVisible=false;
  //     //     this.errorCheckLastName();
  //     //     break;
  //   }
  // }
  errorCheckConfirmPassword() {

    const pass = this.myForm.get('password')?.value;
    const conpass = this.myForm.get('confirmPassword')?.value
    if (this.myForm.get('confirmPassword')?.hasError('required')) {
      this.confirmPasswordError = "**Required";
      this.submitted = true;
      console.log(this.formerror);
    }
    else if (pass !== null && conpass !== null && this.myForm.get('password')?.value !== this.myForm.get('confirmPassword')?.value) {
      this.confirmPasswordError = "** password doesn't match";
      this.submitted = true;
      console.log(this.formerror);
    }
    else {
      this.confirmPasswordError = "";
      this.submitted = false;
    }

  }
  getTooltipFirstName(): string {
    // Function to sanitize HTML content for tooltip
    const content = '"Alphabets only"+ "<br>" +" Maximum of 20 characters"';
    return (this.sanitizer.sanitize(SecurityContext.HTML, content)) ?? '';

  }

  errorCheckPassword() {

    let value = this.myForm.controls['password'].value;
    let hasNoSpaces = /\s/.test(value);
    if (this.myForm.get('password')?.hasError('required')) {
      this.passwordError = "*Required";
      this.submitted = true;
      console.log(this.formerror);
    } else if (this.myForm.get('password')?.hasError('minlength') || (this.myForm.get('password')?.hasError('required'))) {
      this.passwordError = "Enter Valid Input";
      console.log(this.formerror);
      this.submitted = true;
    }

    else {
      this.passwordError = "";
      this.submitted = false;
    }

  }



  errorCheckEmail() {


    if (this.myForm.get('email')?.hasError('pattern')) {
      this.emailError = "** Please enter valid email address";
      console.log(this.formerror);
      this.submitted = true;
    }
    else if (this.myForm.get('email')?.hasError('required')) {
      this.emailError = "*Required";
      this.submitted = true;
      console.log(this.formerror);
    }
    else {
      this.emailError = "";
      this.submitted = false;
    }

  }

  errorCheckUserName() {


    if (this.myForm.get('userName')?.hasError('required')) {
      this.userNameError = "*Required";
      this.submitted = true;
      console.log(this.formerror);

    } else if (this.myForm.get('userName')?.hasError('minlength') || this.myForm.get('userName')?.hasError('maxlength') || (this.myForm.get('userName')?.hasError('pattern')) || (this.myForm.get('userName')?.hasError('containsLetter'))) {
      this.userNameError = "Enter Valid Input";
      console.log(this.formerror);
      this.submitted = true;
    } else {
      this.userNameError = "";
      this.submitted = false;
    }

  }
  errorCheckFirstName() {

    if (this.myForm.get('firstName')?.hasError('required')) {
      this.firstnameerror = "*Required";
      this.submitted = true;
    }else if (this.myForm.get('firstName')?.hasError('pattern') || this.myForm.get('firstName')?.hasError('maxlength')) {
      this.firstnameerror = "Enter valid input";
      this.submitted = true;

    }
    else {
      this.firstnameerror = "";
      this.submitted = false;
    }

  }
  errorCheckLastName() {

    if (this.myForm.get('lastName')?.hasError('pattern') || (this.myForm.get('lastName')?.hasError('maxlength'))) {
      this.lastNameError = "Enter valid input";
      console.log(this.formerror);
      this.submitted = true;
    }
    else if (this.myForm.get('lastName')?.hasError('required')) {
      this.lastNameError = "*Required";
      this.submitted = true;
      console.log(this.formerror);
    }
    else {
      this.lastNameError = "";
      this.submitted = false;
    }

  }

  registerUser() {

    const data = {
      firstName: this.myForm.controls['firstName'].value,
      lastName: this.myForm.controls['lastName'].value,
      username: this.myForm.controls['userName'].value,
      email: this.myForm.controls['email'].value,
      password: this.myForm.controls['password'].value,
      role: "user",
    };

    if (this.myForm.controls['firstName'].value !== "" && this.myForm.controls['lastName'].value !== "" && this.myForm.controls['userName'].value !== "" && this.myForm.controls['email'].value !== "" && this.myForm.controls['password'].value !== "" && this.myForm.controls['confirmPassword'].value !== "") {

      this.errorCheckFirstName();
      if (!this.submitted) {
        this.errorCheckLastName();
      }
      if (!this.submitted) {
        this.errorCheckUserName();
      }
      if (!this.submitted) {
        this.errorCheckEmail();
      }
      if (!this.submitted) {
        this.errorCheckPassword();
      }
      if (!this.submitted) {
        this.errorCheckConfirmPassword();
      }
      if (!this.submitted) {
        let url = 'http://localhost:8080/auth/register';
        this.http.post(url, data).subscribe((response) => {
          console.log("Come here");
          console.log("post successful: ", response);
          this.openDialog();
          //  this.dialogRef.open(PopUpComponent);
        },
          (error: any) => {
            console.log(" Error here:  ", error);
            this.submitted = true;
            console.error("Error during post: ", error.error.Message);
            this.formerror = error.error.Message;
          });
      }
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
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/login']);
    //Close the dialog
  }
}

function showTooltip(fields: any, string: any) {
  throw new Error('Function not implemented.');
}
