import { Injectable } from '@angular/core';
import { Album } from './Album';

import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  apiBaseUrl = "http://ec2-54-218-206-93.us-west-2.compute.amazonaws.com:7000/api/"

  idToken = localStorage.getItem('idToken');

  constructor(private http: HttpClient) { }

  public getMyAlbums() {
  console.log('Id token inside Album service', this.idToken);
  var headers = this.getHeaders();
  return this.http.get(this.apiBaseUrl + "/albums", {headers});
  }

  public getAllAlbums() {
    console.log('Id token inside Album service', this.idToken);
    var headers = this.getHeaders();
    return this.http.get(this.apiBaseUrl + "/albums/all", {headers});
    }



  public getHeaders(){
  var headers = {
    'idToken': this.idToken
  };

  return headers;

}

  public getAlbumDetails(id) {

    
    var headers = this.getHeaders();
    return this.http.get(this.apiBaseUrl + "/albums/"+id+"/photos", {headers});                                                                  
  }
  

  public createAlbum(fileId, albumTitle) {

    var fileUrl = this.apiBaseUrl + '/files/show/'+fileId;

    console.log("Inside album serive");
    console.log("album title:", albumTitle);
    console.log("file Id:", fileId);

    var album: Album = {

        id: "",
        title: albumTitle,
        coverPhotoUrl: fileUrl,
        creationDate: "",
        createdBy: "",
      };
  
      var headers = this.getHeaders();
      return this.http.post(this.apiBaseUrl + "/albums", album, {headers});
    }

      public updateCoverPhoto(albumId, coverPhotoUrl) {

    
        var headers = this.getHeaders();
      
        const params = new HttpParams()
        .set('id', albumId)
        .set('photoUrl', coverPhotoUrl);

        return this.http.put(this.apiBaseUrl + "/albums/coverPhoto", params, {headers});    
  
      }

}
