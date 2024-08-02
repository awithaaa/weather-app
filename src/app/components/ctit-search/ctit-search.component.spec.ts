import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtitSearchComponent } from './ctit-search.component';

describe('CtitSearchComponent', () => {
  let component: CtitSearchComponent;
  let fixture: ComponentFixture<CtitSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtitSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CtitSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
