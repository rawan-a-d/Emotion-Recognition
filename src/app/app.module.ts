import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmotionDetectionComponent } from './emotion-detection/emotion-detection.component';
import { ImageComponent } from './emotion-detection/image/image.component';

import {MatTabsModule} from '@angular/material/tabs';
import { VideoComponent } from './emotion-detection/video/video.component';
import { AppRoutingModule } from './app-routing.module';
import { CameraComponent } from './emotion-detection/camera/camera.component';


@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    EmotionDetectionComponent,
    ImageComponent,
    CameraComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
