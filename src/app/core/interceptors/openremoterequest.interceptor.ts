import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import openremote from "@openremote/core/dist";


  /*------------------------------------------------------------------------*/
  //    Explanation of an Interceptor:                                      //
  //                                                                        //
  //    An interceptor is a class EVERY http call goes through,             //
  //    which you can use for editing URL's, parameters, or checking        //
  //    data that gets sent for example                                     //
  /*------------------------------------------------------------------------*/


@Injectable()
export class OpenremoterequestInterceptor implements HttpInterceptor {

  // Basic constructor
  constructor() {}

  // Override HTTP intercept
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let auth = openremote.getAuthorizationHeader();
    if(auth == null) { auth = "unknown"; }
    request = request.clone({
      url: 'http://martinaeytesting.nl:8080' + request.url,
      headers: request.headers
        .append("Authorization", auth)
        .append("Access-Control-Allow-Origin", '*')
    });
    console.log("Going to execute the following request:")
    console.log(request);
    return next.handle(request);
  }
}
