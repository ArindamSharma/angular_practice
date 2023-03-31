import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "./employee.service";

@Component({
	selector: 'app-task3',
	templateUrl: './task3.component.html',
	styleUrls: ['./task3.component.scss'],
	providers: [EmployeeService],
})
export class Task3Component implements OnInit {
	title = "http-interceptor-fakebackend";
	employes: any[] = [];
	employeeName = "";
	selectedDepart = "";
	showLoading = false;
	addition = true;
	constructor(private employeService: EmployeeService) { }
	ngOnInit(): void {
		this.getAllEmployesFromServer();
	}
	//#regiactions
	/**
   * Delete Action
   * @param empId employee unique id
   */
	onDeleteAction(empId: any) {
		this.deleteEmployeeFromServer(empId);
	}

	/**
	* Put Action
	* @param empId employee unique id
	*/
	onEditAction(empId: any) {
		console.log(empId);
		let tmp = 0;
		if (empId != null) {
			for (let c = 0; c < this.employes.length; c++) {
				if (this.employes[c].id == empId) {
					tmp = c;
					break;
				}
			}
			console.log(tmp);
			this.employeeName = this.employes[tmp].full_name;
			this.selectedDepart = this.employes[tmp].unit;
			this.addition = false;
		}
		else {
			if (!this.isValid(this.employes[tmp])) return;
			this.employes[tmp].full_name = this.employeeName;
			this.employes[tmp].selectedDepart = this.selectedDepart;
			this.employeeName = "";
			this.selectedDepart = "";
			this.addition = true;
			console.log(this.employes[tmp]);
			this.putEmployeeToServer(this.employes[tmp]);
		}
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
			// https://ui-avatars.com/api/?name=Arindam Sharma&background=random&color=white&font-size=0.5&length=2&bold=1
			emp_avatar: 'https://ui-avatars.com/api/?name=' + this.employeeName.toLowerCase().trim().replace(/\s/g, "") + '&color=7F9CF5&background=EBF4FF',
			// emp_avatar: "https://robohash.org/" +this.employeeName.toLowerCase().trim().replace(/\s/g, "") +".jpg?size=36x36&set=set1",
		};

		// validate inputs
		if (!this.isValid(newEmployee)) return;

		// add employee
		this.addEmployeeToServer(newEmployee);
	}

	//#endregion actions

	//#regiCommunication between fake backend and UI methods.
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

	/**
	 * Update a new employee object to server with http post.
	 * @param editEmployee
	 */
	putEmployeeToServer(editEmployee: {
		id: string;
		full_name: string;
		unit: string;
		emp_avatar: string;
	}) {
		// show spinner
		this.showLoading = true;
		this.employeService.putEmployee(editEmployee).subscribe(
			(resp) => {
				if (resp.status == 200) {
					// add to list
					let tmp:number=-1;
					for (let c = 0; c < this.employes.length; c++) {
						if (this.employes[c].id == editEmployee.id) {
							tmp = c;
							break;
						}
					}
					if(tmp!=-1){
						this.employes[tmp]=editEmployee;
					}
					// this.employes.push(resp.body);
					// this.selectedDepart = "";
					// this.employeeName = "";
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
	//#endregiCommunication between fake backend and UI methods.

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