import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'test-project';
  featureSelected: string = 'Recipe';

  constructor() {
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCbY0w0JwWU34IVTPb52HgbvtOc4K_XWcA",
      authDomain: "angular-recipe-abb1e.firebaseapp.com",
      databaseURL: "https://angular-recipe-abb1e.firebaseio.com",
      projectId: "angular-recipe-abb1e",
      storageBucket: "angular-recipe-abb1e.appspot.com",
      messagingSenderId: "941559935087",
      appId: "1:941559935087:web:eddb2ddfaa9b812f339d9a",
      measurementId: "G-RHRWF6VY33"
    });
  }

  onHeaderClicked(event) {
    this.featureSelected = event.name;
  }

}
