import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})

export class ImageComponent implements OnInit {

  images:any = [];

  @Input() imageData:any = { url: '', tag: ''};

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getImages()
  }

  getImages() {
    this.images = [];
    this.rest.getImages().subscribe((data: {}) => {
      console.log(data);
      this.images = data;
    });
  }

  add(){
    this.rest.addImage(this.imageData.uri, this.imageData.tag).subscribe(
      data => {
        this.getImages()
    
      },error => {
        console.log("Error");
    
      }
    );
  }

  stop(id){
    this.rest.removeImage(id).subscribe(
      data => {
        this.getImages()
    
      },error => {
        console.log("Error");
    
      }
    );
  }
}

