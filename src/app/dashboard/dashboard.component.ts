import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms'
import { ReminderModel } from './dashboard.model';
import {ApiService } from '../shared/api.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   formValue !: FormGroup
   reminderModelObj : ReminderModel = new ReminderModel()
  reminderData !: any
showAdd!: boolean;
showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue  = this.formbuilder.group({
      reminderName: [''],
      date: [''],
      time: ['']


    })
    this.getAllReminder()

  }
clickAddReminder(){
  this.formValue.reset()
  this.showAdd = true
  this.showUpdate = false;
}

  postReminderDetails(){
    this.reminderModelObj.reminderName = this.formValue.value.reminderName
    this.reminderModelObj.date = this.formValue.value.date
    this.reminderModelObj.time = this.formValue.value.time
   


    this.api.postReminder(this.reminderModelObj)
    .subscribe(res=>{
      console.log(res);
      alert('Reminder Added Successfully')
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllReminder()
      
    },
    err=>{
      alert("Something Went Wrong")
    }
    )
  }

  getAllReminder(){
    this.api.getReminder()
    .subscribe(res=>{
      this.reminderData = res
    })

  }
  deleteReminder(row:any){
    this.api.deleteReminder(row.id)
    .subscribe(res=>{
      alert('Reminder Deleted')
      this.getAllReminder()
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.reminderModelObj.id = row.id
    this.formValue.controls['reminderName'].setValue(row.reminderName)
    this.formValue.controls['date'].setValue(row.date)
    this.formValue.controls['time'].setValue(row.time)
   

  }
  updateReminderDetails(){
    this.reminderModelObj.reminderName = this.formValue.value.reminderName
    this.reminderModelObj.date = this.formValue.value.date
    this.reminderModelObj.time = this.formValue.value.time
   
    this.api.updateReminder(this.reminderModelObj,this.reminderModelObj.id)
    .subscribe(res=>{
      alert('Updated Successfully')
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllReminder()
    })
  }
}
