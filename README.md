
## Angular Testing Course

This repository contains the code of the [Angular Testing Course](https://angular-university.io/course/angular-testing-course).

<br>
<br>
<br>
<br>

- ## Unit Testing
    - ### Services
        - When **`Unit Testing a Service`**, we **`DO`** want to isolate that Service so that we are testing only that Service and nothing else.
        - If the Service we are testing has any dependencies, like another service, then we always want to `mock` those services in our service unit test
        - This ensures that our tests are isolated and not being affected by outside influences - which is exactly what you want in a Unit Test
        - #### Code Examples
            - `src/courses/services`
            - `calculator.service.spec.ts`
            - `courses.service.spec.ts`

            `Service Unit Test Example
            
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
            });`

    - ### UI Components
        -  Steps for testing UI Components
            - 1. First we want to create the component and pass it some data so it can be displayed in the UI
            - 2. Then, we want to make sure that the correct data is actually getting displayed in the DOM by querying the DOM and asserting that the data is there

            `UI Component Test Example
            
                it("should display the course list", () => {

                    component.courses = setupCourses(); // helper function in 'courses/common/test-utils.ts'

                    // trigger component change to update DOM
                    fixture.detectChanges();

                    // console log the native DOM element so we can inspect it in Browser Dev Tools
                    console.log(el.nativeElement.outerHTML);

                    // return all DOM elements with a css class called "course-card"
                    const cardsList = el.queryAll(By.css(".course-card"));
                    expect(cardsList).toBeTruthy("could not find cards");
                    expect(cardsList.length).toBe(12, "unexpected number of courses displayed");

            });
            `


- ## Integration Testing
    - ### Services
        - When **`Integration Testing a Service`**, we **`DO NOT`** want to isolate. **Instead**, we want to test **`real instances`** of every dependency for the service in test.
        - This allows us to make sure all the Services in the test are behaving properly. We cannot do this with mock services.
    

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

- #### Installation pre-requisites

    - Please install Node 18 Long Term Support Edition (LTE).

- #### Installing the Angular CLI

    - With the following command the angular-cli will be installed globally in your machine:

        - npm install -g @angular/cli 


- #### How To install this repository

    -   git clone https://github.com/angular-university/angular-testing-course.git
    -   cd angular-testing-course
    -   npm install

- #### To Run the Development Backend Server

    -   npm run server

    - This is a small Node REST API server.

- #### To run the Development UI Server

    - To run the frontend part of our code, we will use the Angular CLI:

    -   npm start 

    - The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)


- #### Angular Security Masterclass

    - If you are looking for the [Angular Security Masterclass](https://angular-university.io/course/angular-security-course), the repo with the full code can be found here:

    - [Angular Security Masterclass](https://github.com/angular-university/angular-security-course).
