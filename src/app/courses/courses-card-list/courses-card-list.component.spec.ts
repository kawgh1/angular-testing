import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

/**
 * UI Component Testing Steps
 * 
 * 1. First we want to create the component and pass it some data so it can be displayed in the UI
 * 2. Then, we want to make sure that the correct data is actually getting displayed in the DOM by querying the DOM
 *          and asserting that the data is there
 */


describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  // has to be 'async' here or the component will try to be tested before it is instantiated
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModule],
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(CoursesCardListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  });


  it("should create the component", () => {

   expect(component).toBeTruthy();

  });


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


  it("should display the first course", () => {

      pending();

  });


});


