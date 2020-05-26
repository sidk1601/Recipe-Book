import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() headerClick: EventEmitter<{name: string}> = new EventEmitter();

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  onHeaderClicked(event: any) {
    this.headerClick.emit({
      name: event.target.textContent
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe((response: any) => {
      console.log(response);
    });
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

}
