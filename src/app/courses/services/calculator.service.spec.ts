import { CalculatorService } from "./calculator.service"
import { LoggerService } from "./logger.service";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";

/**
 * UNIT TEST
 * 
 * Notes:
 * 
 * Instead of TestBed.get() you should use the new .inject() method:
 * coursesService = TestBed.inject(CoursesService)
 *
 *
 * When **unit testing** a service, we want to mock all of it's other dependencies (logger service) 
 * but test a *real* instance of the service itself in order to isolate it
 * 
 * When **Integration Testing** a service, we want to use all real instances so we not mock the logger service
 *
 * So here we are mocking the LoggerService with a fake one
 * but using a real instance of CalculatorService
 * 
 */
 

describe('CalculatorService', () => {
    let calculatorService: CalculatorService;
    let fakeLoggerSpy: any;

    beforeEach(() => {
        fakeLoggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
        // calculatorService = new CalculatorService(fakeLoggerSpy);

        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                {provide: LoggerService, useValue: fakeLoggerSpy}
            ]
        })

        calculatorService = TestBed.inject(CalculatorService);
    });


    // Single Example Test
    // it('should add two numbers', () => {
    //     const logger = new LoggerService();

    //     // spy on how many times the log() function is called by the logger instance
    //     // not necessary once a SpyObject has been created ^
    //     spyOn(logger, 'log');

    //     const calculatorService = new CalculatorService(logger);
    //     const result = calculatorService.add(2, 2);

    //     expect(result).toBe(4);
    //     expect(logger.log).toHaveBeenCalledTimes(1);
    // });


    // refactored tests

    it('should add two numbers', () => {
        const result = calculatorService.add(2, 2);

        expect(result).toBe(4);
        expect(fakeLoggerSpy.log).toHaveBeenCalledTimes(1);
    });

    it('should subtract two numbers', () => {
        const result = calculatorService.subtract(2, 2);

        expect(result).toBe(0);
        expect(fakeLoggerSpy.log).toHaveBeenCalledTimes(1);
    })
});