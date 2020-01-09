import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo.service';
import { UserService } from '../user.service';
import { User } from '../User';


@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {


  private photoId: string;
  private photoUrl: string;


  private comment: string;
  private comments: Comment[];
  private user: User;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private userService: UserService,
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.photoId = params.get('photoId');
      this.photoUrl = params.get('photoUrl');

      this.pullComments();
    });


    this.userService.getUser("me")
    .subscribe(
      result => this.user = <User>result,
      err => console.error('Got an error: ' + err),
      () => console.log('Got a complete notification')
    );
  }

  makeComment(){
    console.log("Found the comment here:", this.comment);
    console.log("Found the user here:", this.user);

    this.photoService.saveComment(this.photoId, this.comment, this.user.emailAddress)
    .subscribe(
      result => this.pullComments(),
      err => console.error('Got an error:' + err),
      () => console.log('Got a complete notification')
    );

  }

  pullComments() {

    this.photoService.getAllComments(this.photoId)
      .subscribe(
        result => this.initializeComments(<Comment[]>result),
        err => console.error('Got an error: ' + err),
        () => console.log('Got a complete notification')
      );

  }

  initializeComments(comments){
    this.comments = comments;
    this.comment = "";

  }


}
