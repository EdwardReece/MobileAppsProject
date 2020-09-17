import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { CreateJobService, Job } from '../services/creat-job.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  jobs:Job[];

  constructor(private jobService: CreateJobService) {}

  ngOnInit() {
    

  this.jobService.getJobs().subscribe(res => {
  this.jobs = res;
  });
}

remove(item: { id: any; }) {
this.jobService.removeJob(item.id);
}

loadData(event: { target: { complete: () => void; disabled: boolean; }; }) {
setTimeout(() => {
console.log('Done');
event.target.complete();

if (this.jobs.length == 1000) {
  event.target.disabled = true;
}
}, 500);
}

}
