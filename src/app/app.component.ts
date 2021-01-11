import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {ResourceService} from "./services/resource.service.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public bricks;
  items = []

  constructor(
    private db: AngularFirestore,
    private resourceService: ResourceService
  ) { }



  ngOnInit(): void {
    this.resourceService.getBricks('Bricks').subscribe(serverItems => {
      if (!serverItems.length) {
        this.setBricksRndColors('Bricks').then(bricks => this.items = bricks)
      } else {
        this.items = serverItems[0]['bricks']
      }
    });
  }

  changeColor(id) {
    const idx = this.items.findIndex(b => b.id === id);
    this.items[idx].color = this.getRandomColor();
    this.updateBricksColors(this.items, 'Bricks');
  }


  private setBricksRndColors(collectionName: string): Promise<any> {
    const bricks = new Array(9)
      .fill(null)
      .map(_ => ({ id: Math.floor(Math.random() * 1000), color: this.getRandomColor() }));

    return new Promise(resolve => {
      this.updateBricksColors(bricks, collectionName).then(_ => resolve(bricks))
    })
  }

  updateBricksColors(bricks, collectionName): Promise<any> {
    return new Promise(resolve => {
      this.db.collection(collectionName)
        .doc(collectionName)
        .set({bricks}).then(_ => resolve(bricks));
    })
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
