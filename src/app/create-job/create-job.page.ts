import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Job, CreateJobService } from '../services/creat-job.service';


@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.page.html',
  styleUrls: ['./create-job.page.scss'],
})
export class CreateJobPage implements OnInit {

  job: Job = {
    username:'',
    job:'',
    cost: null ,
  }

  ionicForm: FormGroup;
  isSubmitted = false;

  employId = null;

  constructor(public formBuilder: FormBuilder,
    private jobService: CreateJobService,
    private route: ActivatedRoute, 
    private loadingController: LoadingController,
    private nav: NavController) { }

  ngOnInit() {
    
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      job: ['', [Validators.required, Validators.minLength(2)]],
      cost: ['$', [Validators.required, Validators.pattern('[0-9]')]],
    })
  

  this.employId = this.route.snapshot.params['id'];
  if(this.employId){
    this.loadJob();
  }
}

async loadJob(){
  const loading = await this.loadingController.create({
   message: 'Loading Employ Job..'
  });
  await loading.present();

  this.jobService.getJob(this.ionicForm.value).subscribe(res => {
    this.job = res;
  });
}

async saveJob(){
  const loading = await this.loadingController.create({
    message: 'Saving Employ Job..'
  });
  await loading.present();
    if (this.employId){
      this.jobService.updateJob(this.ionicForm.value, this.employId).then(async () => {
        await loading.dismiss();
        this.nav.back();
      });
    } else {
        this.jobService.addJob(this.ionicForm.value).then(async () => {
          await loading.dismiss();
          this.nav.back();
            });
          }
}

  get errorControl() {
    return this.ionicForm.controls;
  }


  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
    }
  }
}

