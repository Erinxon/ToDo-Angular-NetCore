import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { LoandingService } from './core/services/loanding.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked {
  isLoanding: boolean = false;

  constructor(private loandingService: LoandingService,
    private cdref: ChangeDetectorRef){
    this.getLoanding();
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  getLoanding(){
    this.loandingService.getLoanding.subscribe({
      next: res => this.isLoanding = res,
      error: error => this.isLoanding = false
    });
  }
}