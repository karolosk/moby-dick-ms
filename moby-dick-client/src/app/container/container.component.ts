import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-containers',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent implements OnInit {

  containers:any = [];

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getContainers();
  }

  getContainers() {
    this.containers = [];
    this.rest.getContainers().subscribe((data: {}) => {
      console.log(data);
      this.containers = data;
    });
  }

  add() {
    this.rest.addContainer().subscribe(
      data => {
        this.getContainers()
    
      },error => {
        console.log("Error");
    
      }
    );
  }

  start(short_id) {
    this.rest.startContainer(short_id).subscribe(
      data => {
        this.getContainers()
    
      },error => {
        console.log("Error");
      }
    );
  }

  stop(short_id) {
    this.rest.stopContainer(short_id).subscribe(
      data => {
        this.getContainers()
    
      },error => {
        console.log("Error");
      }
    );
  }

  remove(short_id) {
    this.rest.removeContainer(short_id).subscribe(
      data => {
        this.getContainers()
    
      },error => {
        console.log("Error");
      }
    );
  }
}
