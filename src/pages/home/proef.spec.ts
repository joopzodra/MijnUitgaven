import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule, DomController } from 'ionic-angular';
import { ConfigMock } from '../../mocks';

import { HomePage } from './home';

describe('HomePage', () => {

  let comp: HomePage;
  let fixture: ComponentFixture < HomePage > ;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [ DomController,
      {provide: App, useClass: ConfigMock},
      {provide: Config, useClass: ConfigMock},
      {provide: Keyboard, useClass: ConfigMock},
      {provide: MenuController, useClass: ConfigMock},
      {provide: NavController, useClass: ConfigMock},
      {provide: Platform, useClass: ConfigMock},
      {provide: DomController, useClass: ConfigMock}
      ],
      imports: [IonicModule],
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    comp = fixture.componentInstance;
  });

  it('should display original title', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('p'));
    expect(de.nativeElement.textContent).toContain('lost');
  });

  it('should display 0 as initial value', () => {
    fixture.detectChanges();
    const h2 = fixture.debugElement.query(By.css('h2'));
    expect(h2.nativeElement.textContent).toEqual('Value: 0');
  });

  it('should increment the value', () => {
    fixture.componentInstance.onIncrementClick();
    fixture.detectChanges();
    const h2 = fixture.debugElement.query(By.css('h2'));
    expect(h2.nativeElement.textContent).toEqual('Value: 1');
  });

  it('should invoke onIncrementClick when the user clicks the increment button', () => {
    spyOn(fixture.componentInstance, 'onIncrementClick');
    const button = fixture.debugElement.query(By.css('.increment'));
    button.triggerEventHandler('click', {});
    expect(fixture.componentInstance.onIncrementClick).toHaveBeenCalled();
  });

});

