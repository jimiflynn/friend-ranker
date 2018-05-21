import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSlider } from '@angular/material/slider';
import { MatFormField } from '@angular/material/form-field';
import { MatGridList } from '@angular/material/grid-list';

import { COLORS, CRAYOLA_COLORS, ProvidedAvatarImages } from './data';

export interface AvatarParams {
  name?: string;
  background?: string;
  color?: string;
  rounded?: boolean;
  size?: number;
  imageURL?: string;
}

@Component({
  selector: 'app-avatar-generator',
  templateUrl: './avatar-generator.component.html',
  styleUrls: ['./avatar-generator.component.scss']
})
export class AvatarGeneratorComponent implements OnInit {
  @ViewChild(MatSlideToggle) matSlideToggle: MatSlideToggle;
  @ViewChild(MatSlider) matSlider: MatSlider;
  @ViewChild(MatFormField) matFormField: MatFormField;
  @ViewChild(MatGridList) matGridList: MatGridList;
  @Input('setName') set _name(name: string) {
    if (name) {
      let index: number = name.indexOf(' ');
      let lastName = name.slice(index).trim();
      let firstName = name.slice(0, index);
      let fullName = `${firstName}+${lastName}`;
      this.avatarName$.next(`${fullName}`);
      // console.log(`avatar name is set as: ${fullName}`);
    }
  }
  @Output('avatarGeneratorConfigured') onConfigured = new EventEmitter<AvatarParams>();
  @Output('avatarGeneratorClosed') onClose = new EventEmitter<any>();

  avatarSetupStream$: Observable<AvatarParams | any>;

  avatarName$: BehaviorSubject<string | null>;
  avatarBackground$: BehaviorSubject<string | null>;
  avatarColor$: BehaviorSubject<string | null>
  avatarRounded$: BehaviorSubject<boolean | null>
  avatarSize$: BehaviorSubject<number | null>
  avatarImage$: BehaviorSubject<string | null>

  avatarModel: AvatarParams;
  providedAvatarImagesList: string[] = ProvidedAvatarImages;
  avatarRounded: boolean = false;
  avatarBuildURL: any;
  colorOptions: any[] = CRAYOLA_COLORS;
  backgroundColorPanelOpened: boolean = false;
  fontColorPanelOpened: boolean = false;
  currentStep: number;
  stepStatusList: any = {};
  avatarReadyToSubmit: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AvatarParams>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: Http) {
    this.avatarName$ = new BehaviorSubject(null);
    this.avatarBackground$ = new BehaviorSubject(null);
    this.avatarColor$ = new BehaviorSubject(null);
    this.avatarRounded$ = new BehaviorSubject(null);
    this.avatarSize$ = new BehaviorSubject(null);
    this.avatarImage$ = new BehaviorSubject(null);
    this.avatarSetupStream$ = Observable.combineLatest(
      this.avatarName$,
      this.avatarBackground$,
      this.avatarColor$,
      this.avatarRounded$,
      this.avatarSize$,
      this.avatarImage$
    ).switchMap(([name, background, color, rounded, size, imageURL]) => {
      this.avatarModel = !imageURL ? {
        name: name,
        background: background ? background : this.colorOptions[15]['hex'].toLowerCase(),
        color: color ? color : this.colorOptions[19]['hex'].toLowerCase(),
        rounded: rounded ? rounded : false,
        size: size ? size : .40,
        imageURL: imageURL ? imageURL : null
      } : {imageURL: imageURL ? imageURL : null};
      return Observable.of(this.avatarModel);
    })
    this.setName(data.user.displayName);
  }

  setStep(step: number) {
    this.avatarReadyToSubmit = (step === -1) ? true : false;

    this.currentStep = step;
  }

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  setName(name: string): void {
    let index: number = name.indexOf(' '),
      lastName = name.slice(index).trim(),
      firstName = name.slice(0, index),
      fullName = `${firstName}+${lastName}`;
    this.avatarName$.next(`${fullName}`);
    // console.log(`avatar name is set as: ${fullName}`);
    this.buildAvatar();
  }

  setBackground(background: string): string {
    this.avatarBackground$.next(background);
    // console.log('avatar background is set as: ', background);
    return background;
  }

  setColor(color: string): string {
    this.avatarColor$.next(color);
    // console.log('avatar background is set as: ', color);
    return color;
  }

  setRounded(rounded: boolean): boolean {
    this.avatarRounded$.next(rounded);
    // console.log('avatar is rounded: ', rounded);
    return rounded;
  }

  setSize(size: number): number {
    this.avatarSize$.next(size);
    // console.log('avatar size in pixels: ', size);
    return size;
  }
  private _size: number;

  setAvatarImage(url: string) {
    this.avatarBuildURL = url;
    this.avatarImage$.next(url);
  }

  buildAvatar() {
    this.avatarSetupStream$.subscribe(filter => {
      this.avatarBuildURL = filter.imageURL ? filter.imageURL : `https://ui-avatars.com/api/?name=${filter.name}&background=${filter.background}&color=${filter.color}&rounded=${filter.rounded}&font-size=${filter.size}`;
      // console.log('avatar setup: ', this.avatarBuildURL);
      this.data.user.profile.avatarBuildURL = this.avatarBuildURL;
    });

  }


  reset() {
    this.avatarBackground$.next(null);
    this.avatarColor$.next(null);
    this.avatarRounded$.next(false);
    this.avatarSize$.next(null);
    this.avatarImage$.next(null);
    this.setStep(0);
  };


  ngOnInit() {
    // console.log(`slide toggle`, this.matSlideToggle);
    // console.log(`slider`, this.matSlider);
    // console.log(`form-field`, this.matFormField);
    // console.log(`grid`, this.matGridList);
  }

}
