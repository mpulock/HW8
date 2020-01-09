import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {

  defaultTitle = "My Album Title";
  albumTitle = this.defaultTitle;

  afuConfig = {
    uploadAPI: {
      url:"http://ec2-54-218-206-93.us-west-2.compute.amazonaws.com:7000/api/files/upload"
    }
};

   constructor(
    private albumService: AlbumService,
  ) { 
  }

  ngOnInit() {
  }

  fileUploaded(uploadEvent){
    var uploadedFile = JSON.parse(uploadEvent.responseText);
    console.log("Upload fileId:", uploadedFile.fileId);
    console.log("New title:", this.albumTitle);

    this.albumService.createAlbum(uploadedFile.fileId, this.albumTitle)
    .subscribe(
      result => console.log("Album upload response", result),
      err => console.error('Got an error:' + err),
      () => console.log('Got a complete notification')
    );

    this.albumTitle = this.defaultTitle;


  }

}
