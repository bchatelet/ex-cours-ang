import { Component,OnInit,Input,OnDestroy } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import {Observable, Subscription} from 'rxjs';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit,OnDestroy {
  created_at= new Date();
  isAuth = false;
  appareils: any[];
  @Input() id: number;
  secondes: number;
  counterSubscription: Subscription;

  constructor(private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }
  ngOnInit() {
    const counter=Observable.interval(1000);
    this.appareils = this.appareilService.appareils;
    this.counterSubscription=counter.subscribe(
      (value) =>{
        this.secondes=value;
      },
      (error) => {
        console.log(' An error occured'+error);
      },
      ()=> {
        console.log(' Observable finished');
      }
    )
}
ngOnDestroy(){
  this.counterSubscription.unsubscribe();
}

}
