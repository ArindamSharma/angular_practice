import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "./employee.service";

@Component({
	selector: 'app-task3help',
	templateUrl: './task3help.component.html',
	styleUrls: ['./task3help.component.scss'],
	providers: [EmployeeService],
})

export class Task3helpComponent implements OnInit {
	title = "http-interceptor-fakebackend";
	employes: any[] = [];
	selEmployee: any = {};
	employeeName = "";
	selectedDepart = "";
	editemployeeName = "";
	editselectedDepart = "";
	showLoading = false;

	constructor(private employeService: EmployeeService) { }

	ngOnInit(): void {
		this.getAllEmployesFromServer();
	}



	//#regionactions
	/**
   * Delete Action
   * @param empId employee unique id
   */
	onDeleteAction(empId: any) {
		this.deleteEmployeeFromServer(empId);
	}



	/**
   * Create a new employee object and send to the server to save.
   */
	onAddEmployeeAction() {
		// create new employee object
		let newEmployee = {
			id: "", // generate uuid on server.
			full_name: this.employeeName,
			unit: this.selectedDepart,
			emp_avatar:
				'https://ui-avatars.com/api/?name=' +
				this.employeeName.toLowerCase().trim().replace(/\s/g, "") + '&color=7F9CF5&background=EBF4FF',
			/*emp_avatar:
			 "https://robohash.org/" +
			 this.employeeName.toLowerCase().trim().replace(/\s/g, "") +
			 ".jpg?size=36x36&set=set1",*/
		};



		// validate inputs
		if (!this.isValid(newEmployee)) return;



		// add employee
		this.addEmployeeToServer(newEmployee);
	}



	onUpdateEmployeeAction() {
		// create new employee object
		let editEmployee = {
			id: this.selEmployee.id, // generate uuid on server.
			full_name: this.editemployeeName,
			unit: this.editselectedDepart,
			emp_avatar:
				'https://ui-avatars.com/api/?name=' +
				this.editemployeeName.toLowerCase().trim().replace(/\s/g, "") + '&color=7F9CF5&background=EBF4FF',
			/*emp_avatar:
			 "https://robohash.org/" +
			 this.employeeName.toLowerCase().trim().replace(/\s/g, "") +
			 ".jpg?size=36x36&set=set1",*/
		};



		// validate inputs
		if (!this.isValid(editEmployee)) return;



		// add employee
		this.updateEmployeeToServer(editEmployee);
	}







	//#endregion actions



	onEditAction(selEmployee: any) {
		console.log(selEmployee);
		console.log(this.employes);
		this.selEmployee = selEmployee;
		this.editemployeeName = selEmployee.full_name;
		this.editselectedDepart = selEmployee.unit;
	}




	//#regionCommunication between fake backend and UI methods.
	/**
   * Add a new employee object to server with http post.
   * @param newEmployee
   */
	addEmployeeToServer(newEmployee: {
		id: string;
		full_name: string;
		unit: string;
		emp_avatar: string;
	}) {



		// show spinner
		this.showLoading = true;



		this.employeService.addEmployee(newEmployee).subscribe(
			(resp) => {
				if (resp.status == 200) {
					// add to list
					this.employes.push(resp.body);
					this.selectedDepart = "";
					this.employeeName = "";
				}
			},
			(err) => console.error("Error Occured When Add A New Employee " + err),
			() => (this.showLoading = false) // close spinner
		);
	}




	updateEmployeeToServer(editEmployee: {
		id: string;
		full_name: string;
		unit: string;
		emp_avatar: string;
	}) {



		// show spinner
		this.showLoading = true;
		console.log(editEmployee);
		console.log(this.selEmployee);
		this.employeService.updateEmployee(editEmployee).subscribe(
			(resp) => {
				if (resp.status == 200) {
					// add to list
					let findIndex = this.employes.findIndex(e => e.id == editEmployee.id);
					console.log(findIndex);
					if (findIndex > -1) {
						console.log(editEmployee);
						this.employes[findIndex] = editEmployee;
						console.log(this.employes);
					}
					//this.employes.push(resp.body);
				}
			},
			(err) => console.error("Error Occured When Add A New Employee " + err),
			() => (this.showLoading = false) // close spinner
		);
	}



	/**
   * Get All Employes from local .json file for a first time.
   */
	getAllEmployesFromServer() {
		this.showLoading = true;
		this.employeService.getAllEmployes().subscribe(
			(resp) => {
				if (resp.status == 200) {
					this.employes = resp.body;
				}
			},
			(err) => console.error("Error Occured When Get All Employes " + err),
			() => (this.showLoading = false)
		);
	}



	/**
   * Delete an employee from server with given employee uuid.
   * @param empId user public uuid
   */
	deleteEmployeeFromServer(empId: any) {
		this.showLoading = true;
		this.employeService.deleteEmployee(empId).subscribe(
			(resp) => {
				if (resp.status == 200) {
					const deletedEmpId = resp.body;
					// delete from array.
					this.employes = this.employes.filter((f) => f.id !== deletedEmpId);
				}
			},
			(err) => console.error("Error Occured When Delete An Employee " + err),
			() => (this.showLoading = false)
		);
	}
	//#endregionCommunication between fake backend and UI methods.

	/**
   * Validate employee object taken from form.
   * @param emp
   */
	isValid(emp: any): boolean {
		if (
			emp.full_name == undefined ||
			emp.full_name == null ||
			emp.full_name == ""
		) {
			alert("Please Enter Full Name");
			return false;
		}
		if (emp.unit == undefined || emp.unit == null || emp.unit == "") {
			alert("Please Select A Department");
			return false;
		}
		return true;
	}

}