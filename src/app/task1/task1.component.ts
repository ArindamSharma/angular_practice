import { Component } from '@angular/core';
import { GetService } from './get.service';

@Component({
	selector: 'app-task1',
	templateUrl: './task1.component.html',
	styleUrls: ['./task1.component.scss']
})
export class Task1Component {
	title = 'http_client_get';
	newdata: any;
	constructor(private _apiservice: GetService) { }

	ngOnInit(){
		this._apiservice.getdata().subscribe(res =>{
			this.newdata=res;
			console.log(this.newdata);
		});
	}
}