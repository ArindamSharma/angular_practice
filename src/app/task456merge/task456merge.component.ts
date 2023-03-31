import { Component ,OnInit} from '@angular/core';
import { DatasimService } from './datasim.service';

@Component({
	selector: 'app-task456merge',
	templateUrl: './task456merge.component.html',
	styleUrls: ['./task456merge.component.scss'],
	providers: [DatasimService],
})
export class Task456mergeComponent implements OnInit {
	emplist:any;
	tmpemplist:any;
	//Toggle Variables
	showLoading:boolean=true;
	addition:boolean=true;
	showForm:boolean=false;
	searchStart:boolean=false;

	// Initial Variable
	_currentPage:number=1;
	_itemsPerPage=5;
	search_value="";
	empDept="";
	empName="";
	tmpindex:number=-1;
	sortOrder:any={};


	constructor(private employeService: DatasimService) { }
	ngOnInit(): void {
		this.getAllEmployesFromServer();
		// console.log(this.emplist);
	}

	avatarGenerator(name:string){
		let faceAvatar="https://robohash.org/"+name+".jpg?size=36x36&set=set"+Math.round(Math.random()*5);
		let simpleAvatar="https://ui-avatars.com/api/?name="+name+"&background=random&color=white&font-size=0.5&length=2&bold=1";
		// console.log(simpleAvatar);
		return simpleAvatar;
		// return faceAvatar;
	}

	getAllEmployesFromServer() {
		this.showLoading = true;
		this.employeService.getAllEmployes().subscribe(
			(resp) => {
				if (resp.status == 200) {
					this.emplist = resp.body;
				}
			},
			(err) => console.error("Error Occured When Get All Employes " + err),
			() => (this.showLoading = false)
		);
	}

	addValidation(emp:any):boolean{
		if (
			emp.name == undefined ||
			emp.name == null ||
			emp.name == ""
		) {
			alert("Please Enter Full Name");
			return false;
		}
		if (emp.dept == undefined || emp.dept == null || emp.dept == "") {
			alert("Please Select A Department");
			return false;
		}
		return true;
	}
	addTestEntry(){
		let things = ['Johny Walker', 'Kishor Kumar', 'Mahesh Bhat'];
		let thing = things[Math.floor(Math.random()*things.length)];
		let deptthings = ['Actor', 'Producer', 'Director'];
		let deptthing = deptthings[Math.floor(Math.random()*deptthings.length)];
		let newEmp={
			id:"",
			name:thing,
			dept:deptthing,
			emp_avatar:this.avatarGenerator(thing)
		};
		this.addEmployeeToServer(newEmp);
	}
	onAdditionStart(){
		this.showForm=true;
	}
	onSearchStart(){
		if(this.search_value.length==0){console.log("No search value entered.");this.onSearchStop(); return;}
		console.log(this.searchStart);
		if(this.searchStart==false){
			this.searchStart=true;
			this.tmpemplist=this.emplist;
			console.log("Update");
		}
		this.tmpemplist.forEach((element:any) => {
			console.log(element);
		});
		
		this.emplist=[];
		
		this.tmpemplist.forEach((element:any) => {
			if(element.name.search(this.search_value)!=-1){
				this.emplist.push(element);
			}
		});
	}
	onSearchStop(){
		this.searchStart=false;
		console.log(this.tmpemplist);
		this.emplist=this.tmpemplist;
		this.search_value="";
	}
	closeForm(){
		this.showForm=false;
		this.addition=true;
		this.empName="";
		this.empDept="";
	}
	onAdd(){
		let newEmp={
			id:"",
			name:this.empName,
			dept:this.empDept,
			emp_avatar:this.avatarGenerator(this.empName)
		};
		if(!this.addValidation(newEmp))return;
		this.addEmployeeToServer(newEmp);
		this.showForm=false;
	}
	onUpdate(empid:any){
		if(empid!=null){
			this.tmpindex=this.emplist.findIndex((e:any)=> e.id==empid);
			this.empName=this.emplist[this.tmpindex].name;
			this.empDept=this.emplist[this.tmpindex].dept;
			this.showForm=true;
			this.addition=false;
			console.log(this.tmpindex);
		}
		else{
			console.log("Hello",this.tmpindex);
			let updatedEmp={
				id:this.emplist[this.tmpindex].id,
				name:this.empName,
				dept:this.empDept,
				emp_avatar:this.emplist[this.tmpindex].emp_avatar,
			};
			console.log("Hello",updatedEmp);
			if (!this.addValidation(updatedEmp)) return;
			this.updateEmployeeToServer(updatedEmp);
		}
	}
	onDelete(empid:any){
		this.tmpindex=this.emplist.findIndex((e:any)=> e.id==empid);
		this.deleteEmployeeFromServer(this.emplist[this.tmpindex].id);
	}
	onSort(tag:string){
		if(this.sortOrder[tag]==undefined || this.sortOrder[tag]==false){
			this.sortOrder[tag]=true;
			this.emplist.sort((a:any,b:any)=>(a[tag] > b[tag]) ? 1 : ((b[tag] > a[tag]) ? -1 : 0));
		}
		else{
			this.sortOrder[tag]=false;
			this.emplist.sort((a:any,b:any)=>(a[tag] < b[tag]) ? 1 : ((b[tag] < a[tag]) ? -1 : 0));
		}
	}


	// Server
	addEmployeeToServer(newEmployee:any) {
		// show spinner
		// this.showLoading = true;
		this.employeService.addEmployee(newEmployee).subscribe(
			(resp) => {
				if (resp.status == 200) {
					// add to list
					this.emplist.push(resp.body);
					this.empDept = "";
					this.empName = "";
				}
			},
			(err) => console.error("Error Occured When Add A New Employee " + err),
			// () => (this.showLoading = false) // close spinner
		);
	}
	updateEmployeeToServer(editEmployee:any) {
		// show spinner
		// this.showLoading = true;
		// console.log(editEmployee);
		this.employeService.updateEmployee(editEmployee).subscribe(
			(resp) => {
				if (resp.status == 200) {
					let x = this.emplist.findIndex((e:any) => e.id == editEmployee.id);
					console.log(x,this.emplist);
					//update to list
					this.emplist[x] = editEmployee;
				}
			},
			(err) => console.error("Error Occured When Add A New Employee " + err),
			// () => (this.showLoading = false) // close spinner
		);
	}
	deleteEmployeeFromServer(empId: any) {
		// this.showLoading = true;
		// console.log(empId);
		this.employeService.deleteEmployee(empId).subscribe(
			(resp) => {
				if (resp.status == 200) {
					let deletedEmpId = resp.body;
					// delete from array.
					this.emplist = this.emplist.filter((f:any) => f.id !== deletedEmpId);
				}
			},
			(err) => console.error("Error Occured When Delete An Employee " + err),
			// () => (this.showLoading = false)
		);
	}
}