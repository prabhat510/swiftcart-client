import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTileComponent } from './image-tile.component';

describe('ImageTileComponent', () => {
  let component: ImageTileComponent;
  let fixture: ComponentFixture<ImageTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTileComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
