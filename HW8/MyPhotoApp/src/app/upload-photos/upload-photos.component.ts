import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo.service';


@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.css']
})
export class UploadPhotosComponent implements OnInit {

  private albumId: String;
  private albumTitle: String;

  afuConfig = {
    uploadAPI: {
      url:"http://ec2-54-218-206-93.us-west-2.compute.amazonaws.com:7000/api/files/upload"
    }
};

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.albumId = params.get('albumId');
      this.albumTitle = params.get('albumTitle');

    });
  }

  fileUploaded(uploadEvent){
    var uploadedFile = JSON.parse(uploadEvent.responseText);
    console.log("Upload fileId:", uploadedFile.fileId);
    //this.photoService.savePhoto(uploadedFile.fileid, this.albumId);

    this.photoService.savePhoto(uploadedFile.fileid, this.albumId)
    .subscribe(
      result => console.log("Photo upload response", result),
      err => console.error('Got an error:' + err),
      () => console.log('Got a complete notification')
    );

  }

}
