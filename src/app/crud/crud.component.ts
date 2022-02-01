import { EmployeesModel } from './crud.model';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

    formValue !: FormGroup;
    EmployeesModelObj :EmployeesModel = new EmployeesModel();
    EmployeeData! :any;
    showAdd!: boolean;
    showUpdate! : boolean;
    constructor(private formbuilber: FormBuilder, private api: ApiService){ }
  
 

  ngOnInit(): void {
  
  this.formValue = this.formbuilber.group({
     
      email:[' '],
      firstName:[' '],
      lastName:[' '],
      Image:[' ']
  
})

this.getAllEmployee();
  }


clickAddEmployee(){
    this.formValue.reset()
    this.showAdd = true;
    this.showUpdate= false;
}
postEmployeeDetails(){
    this.EmployeesModelObj.email = this.formValue.value.email;
    this.EmployeesModelObj.firstName = this.formValue.value.firstName;
    this.EmployeesModelObj.lastName = this.formValue.value.lastName;
    this.EmployeesModelObj.Image = this.formValue.value.Image;

    this.api.postEmployee(this.EmployeesModelObj)
     .subscribe(res=>{
        console.log(res);
        alert("user added succesfull")
        let ref = document.getElementById('cancel')
        res?.click();
        this.formValue.reset();
        this.getAllEmployee();
    },
    err=>{
        alert("somthing went wrong")
    }

    )}
    
    getAllEmployee(){
        this.api.getEmployee()
        .subscribe(res=>{
            this.EmployeeData = res;
            this.getAllEmployee()
        })

    }
    deleteEmployee(row : any){
        this.api.deleteEmployee(row.id)
        .subscribe(res=>{
            alert("Emplloyee deleted");
            this.getAllEmployee()

        })
    }
    onEdit(row: any){
        this.showAdd = false;
        this.showUpdate= true;
        this.EmployeesModelObj.id = row.id;
        this.formValue.controls['email'].setValue(row.email)
        this.formValue.controls['firstName'].setValue(row.firstName)
        this.formValue.controls['lastName'].setValue(row.lastName)
        this.formValue.controls['Image'].setValue(row.Image)
    }
    updateEmployeeDetails(){
        this.EmployeesModelObj.email = this.formValue.value.email;
        this.EmployeesModelObj.firstName = this.formValue.value.firstName;
        this.EmployeesModelObj.lastName = this.formValue.value.lastName;
        this.EmployeesModelObj.Image = this.formValue.value.Image;
      
        this.api.updateEmployee(this.EmployeesModelObj,this.EmployeesModelObj.id)
        .subscribe(res=>{
            alert("updated successful");

            let ref = document.getElementById('cancel')
        ref?.click();
        
        this.formValue.reset();
        this.getAllEmployee();
        })
    }
}
 
 