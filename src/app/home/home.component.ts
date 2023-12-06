import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private jsonfile = "assets/data.json";
  jsonData: any;
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    this.getJsonData().subscribe(data => {
      this.jsonData = data;
      console.log(this.jsonData); 
    });
  }
  
  getJsonData(): Observable<any> {
    return this.http.get(this.jsonfile);
  }

}
