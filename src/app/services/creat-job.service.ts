import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Job {
  username:string;
  job: string;
  cost: number;
}

@Injectable({
  providedIn: 'root'
})

export class CreateJobService {
  private JobDataCollection: AngularFirestoreCollection<Job>;
  private jobs: Observable<Job[]>;

  constructor(db: AngularFirestore) { 
    this.JobDataCollection = db.collection<Job>('jobs');

    this.jobs = this.JobDataCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

getJobs(){
  return this.jobs;
}

getJob(id) {
  return this.JobDataCollection.doc<Job>(id).valueChanges();
}

updateJob(job: Job, id: string) {
  return this.JobDataCollection.doc(id).update(job);
}

addJob(job: Job){
  return this.JobDataCollection.add(job);
}

removeJob(id) {
  return this.JobDataCollection.doc(id).delete();
}

}
