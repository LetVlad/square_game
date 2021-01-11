import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  constructor(private db: AngularFirestore) { }
  getBricks(collectionName: string): Observable<any> {
    return this.db.collection(collectionName).valueChanges();
  }
}
