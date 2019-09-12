import { Injectable } from "@angular/core";
import { Dish, DishStatus } from "../models/Dish";
import { Observable, of } from "rxjs";
import { Course } from "../models/Course";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

const httpOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("token")
  })
};

@Injectable({
  providedIn: "root"
})
export class DishService {
  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(
      `${environment.serverUrl}/courses/`,
      httpOption
    );
  }
}
