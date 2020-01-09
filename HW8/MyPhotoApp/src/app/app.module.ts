import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';

/* Firebase services */
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

/* Auth service */
import { AuthenticationService } from './shared/authentication.service';
import { UploadPhotosComponent } from './upload-photos/upload-photos.component';


/* File-upload */
import { AngularFileUploaderModule } from "angular-file-uploader";
import { CreateAlbumComponent } from './create-album/create-album.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';
import { PhotoComponent } from './photo/photo.component';


@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    UploadPhotosComponent,
    CreateAlbumComponent,
    ProfileComponent,
    FeedComponent,
    PhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
