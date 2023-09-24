import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { COURSES, findLessonsForCourse } from "../../../../server/db-data";
import { Course } from "../model/course";
import { HttpErrorResponse } from "@angular/common/http";

// HTTPClientTestingModule is a way to unit test HTTP requests so that our tests are NOT
// making actual HTTP requests

// Courses Data is located in /server/db-data.ts

describe("CoursesService", () => {
  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // Tests

  it("should return all courses", () => {

    // 1.) the method test "findAllCourses()"
    coursesService.findAllCourses().subscribe((courses) => {

      expect(courses).toBeTruthy("No courses returned");
      expect(courses.length).toBe(12, "incorrect number of courses");

      const course = courses.find((course) => course.id == 12);

      expect(course.titles.description).toBe("Angular Testing Course");

    });

    // 2.) the HTTP request test - has to be written **after** the method we want to test

    // expect this route to be called only once
    const request = httpTestingController.expectOne('/api/courses');

    expect(request.request.method).toEqual("GET");

    // here we are providing mock data 'COURSES' to be returned by our mock HTTP request
    request.flush({payload: Object.values(COURSES)});
  });


  it("should return course by id", () => {

    // 1.) the method test "findCourseById()"
    coursesService.findCourseById(12).subscribe((course) => {

      expect(course).toBeTruthy();
      expect(course.id).toBe(12);

    });

    // 2.) the HTTP request test - has to be written **after** the method we want to test

    // expect this route to be called only once
    const request = httpTestingController.expectOne('/api/courses/12');

    expect(request.request.method).toEqual("GET");

    // here we are providing mock data 'COURSES' to be returned by our mock HTTP request
    request.flush(COURSES[12]);
  });

  it('should save the course data', () => {

    // new course we want to save 
    const changes: Partial<Course> = {titles:{description: 'React Testing'}}

    coursesService.saveCourse(12, changes).subscribe(course => {
        expect(course).toBeTruthy();
        expect(course.id).toBe(12);
        expect(course.titles.description).toBe('React Testing');
        });

    // expect this route to be called only once
    const request = httpTestingController.expectOne('/api/courses/12');

    // UPDATE / PUT
    expect(request.request.method).toEqual("PUT");

    // expect that the data we are sending is the data actually sent in the request
    expect(request.request.body.titles.description).toBe(changes.titles.description);

    // here we are providing mock data 'COURSES' to be returned by our mock HTTP request
    request.flush({
        ...COURSES[12], // original course object
        ...changes // new course object
    });
  })

  it('should give an ERROR if saveCourse() fails', () => {

    // new course we want to save 
    const changes: Partial<Course> = {titles:{description: 'React Testing'}}

    coursesService.saveCourse(12, changes).subscribe(
        () => {
            fail('the saveCourse() method should have failed')
        },

        (error: HttpErrorResponse) => {
            // database error
            expect(error.status).toBe(500);
        }
    );

    // mock API request we are making
    const request = httpTestingController.expectOne('/api/courses/12');
    expect(request.request.method).toEqual("PUT");
    // mock error we returning
    request.flush('saveCourse() failed', {status:500, statusText: 'Internal Server Error'});
  })

  it('should return a list of lessons', () => {

    coursesService.findLessons(12).subscribe((lessons) => {
        expect(lessons).toBeTruthy();
        expect(lessons.length).toBe(3);
    });


       // expect this route to be called only once
       const request = httpTestingController.expectOne(request => request.url == '/api/lessons');

       expect(request.request.method).toEqual("GET");
   
       // expect that the params we are sending are actually sent in the request
       expect(request.request.params.get("courseId")).toEqual("12");
       expect(request.request.params.get("filter")).toEqual("");
       expect(request.request.params.get("sortOrder")).toEqual("asc");
       expect(request.request.params.get("pageNumber")).toEqual("0");
       expect(request.request.params.get("pageSize")).toEqual("3");

   
       // here we are providing mock data 'COURSES' to be returned by our mock HTTP request
       request.flush({
           payload: findLessonsForCourse(12).slice(0, 3)
       });
  })

  
  // call .verify() to ensure that only the HTTP requests asserted in the test is called, and no other requests
  afterEach(() => {
    httpTestingController.verify();
  });

});
