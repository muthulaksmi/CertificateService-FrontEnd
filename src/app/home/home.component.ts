import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  username:string = "";
  private jsonfile = "assets/data.json";
  jsonData: any;
  constructor(private http: HttpClient, private router:Router) { }
  
  ngOnInit() {
   this.username = this.router.lastSuccessfulNavigation?.extras.state?.['name'];

    console.log("username ", this.username, this.router.lastSuccessfulNavigation);
    this.getJsonData().subscribe(data => {
      this.jsonData = data;
      console.log(this.jsonData); 
    });
  }
  
  getJsonData(): Observable<any> {
    return this.http.get(this.jsonfile);
  }

}
