import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '../model/Project';
import { Location } from '@angular/common';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  public createProjectForm: FormGroup;
  private project:Project;
  inputReadonly:boolean;

  constructor(private location: Location,private projectService:ProjectService) { }

  ngOnInit(): void {
    this.inputReadonly=false;
    this.createProjectForm = new FormGroup({
      project: new FormControl('', [Validators.required]),
      startDate: new FormControl({value :'',disabled:true}),
      endDate:new FormControl({value :'',disabled:true}),
      priority:new FormControl()
      // address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  public getErrorMessage = (controlName,errorName) =>{
    return this.createProjectForm.controls[controlName].hasError(errorName);
  }
 
  public onCancel = () => {
    // this.location.back();
  }
 
  public createProject = (projectFormValue) => {
   if (this.createProjectForm.valid) {
      this.executeProjectCreation(projectFormValue);
   }
  }
 
  private executeProjectCreation = (projectForm) => {
    let projectFormValue =projectForm.value;
    let project: Project = {
      project: projectFormValue.project,
      startDate: new Date(projectFormValue.startDate),
      endDate: new Date(projectFormValue.endDate),
      priority: projectFormValue.priority
    }
   console.log(project);
    this.projectService.saveOrUpdate(project)
    .subscribe(res => {
      console.log(res);
    });
    // this.projectService.getProjectById('1')
    // .subscribe(res => {
    //   console.log(res);
    // });
    // let apiUrl = 'api/owner';
    // this.repository.create(apiUrl, owner)
    //   .subscribe(res => {
    //     //this is temporary, until we create our dialogs
    //     this.location.back();
    //   },
    //   (error => {
    //     //temporary as well
    //     this.location.back();
    //   })
    // )
  }
  setDates(event){
    let startDt=this.createProjectForm.get('startDate');
    let endDt=this.createProjectForm.get('endDate');
    if(event.target.checked){
      startDt.enable();
      startDt.setValue(new Date().toISOString().substr(0, 10));
      endDt.enable();
      endDt.setValue(new Date().toISOString().substr(0, 10));
    }else{
      startDt.disable();
      startDt.setValue('');
      endDt.disable();
      endDt.setValue('');
    }
  }

}
