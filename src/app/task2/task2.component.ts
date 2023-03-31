import { Component } from '@angular/core';
import { GetService } from './get.service';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss']
})
export class Task2Component{
	title = 'http_client_get';
	p: number = 1;
	itemperpage: number = 5;
	newdata: any;
	constructor(private _apiservice: GetService) { }

	ngOnInit(){
	  this._apiservice.getdata().subscribe(res =>{
	    this.newdata=res;
	    console.log(this.newdata);
	  });
	}
}