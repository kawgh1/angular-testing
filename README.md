
## Angular Testing Course

This repository contains the code of the [Angular Testing Course](https://angular-university.io/course/angular-testing-course).


# Notes:

- # Unit Testing
- ## Services
    - When **Unit Testing** a Service, we `DO` want to isolate that Service so that we are testing only that Service and nothing else.
    - If the Service we are testing has any dependencies, like another service, then we always want to `mock` those services in our service unit test
    - This ensures that are tests are isolated and not being affected by outside influences - which is exactly what you want in a Unit Test


- # Integration Testing
- ## Services
    - When **Integration Testing** a Service, we `DO NOT` want to isolate that Service so that we are testing only that Service and nothing else. Instead, we want to test real instances of every dependency for the service in test.
    - This allows us to make sure all the Services in the test are behaving properly. We cannot do this with mock services.
   



# Installation pre-requisites

Please install Node 18 Long Term Support Edition (LTE).

# Installing the Angular CLI

With the following command the angular-cli will be installed globally in your machine:

    npm install -g @angular/cli 


# How To install this repository

    git clone https://github.com/angular-university/angular-testing-course.git
       
    cd angular-testing-course
    npm install

# To Run the Development Backend Server

    npm run server

This is a small Node REST API server.

# To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm start 

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)





# Other Courses

# Angular Security Masterclass

If you are looking for the [Angular Security Masterclass](https://angular-university.io/course/angular-security-course), the repo with the full code can be found here:

[Angular Security Masterclass](https://github.com/angular-university/angular-security-course).
