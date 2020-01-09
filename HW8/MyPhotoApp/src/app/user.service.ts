import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiBaseUrl = "http://ec2-54-218-206-93.us-west-2.compute.amazonaws.com:7000/api"

  idToken = localStorage.getItem('idToken');

  constructor(private http: HttpClient) { }

  public getHeaders(){
    var headers = {
      'idToken': this.idToken
    };

  return headers;

}

public registerUser(emailAddress, name){

  var user: User = {

    emailAddress: emailAddress,
    id: "",
    name: name,
    profilePhotoUrl: "",
    
  };

  console.log("This api gpt called: ", user);

  var headers = this.getHeaders();
  return this.http.post(this.apiBaseUrl + "/api/users/register", user);

}

public updateProfilePhoto(profilePhotoUrl) {

    
  var headers = this.getHeaders();

  const params = new HttpParams()
  .set('photoUrl', profilePhotoUrl);

  return this.http.put(this.apiBaseUrl + "/users/me/profilePhoto", params, {headers});    

}


public getUser(userName){

  var headers = this.getHeaders();

  if(userName == "me"){
    return this.http.put(this.apiBaseUrl + "/users/me", {headers});    
  }

  else {
    const params = new HttpParams()
    .set('email', userName);

    return this.http.put(this.apiBaseUrl + "/users", {headers: headers, params: params});  
  }


}

}
