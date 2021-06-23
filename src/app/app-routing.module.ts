import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmotionDetectionComponent } from './emotion-detection/emotion-detection.component';
import { VideoComponent } from './emotion-detection/video/video.component';
import { ImageComponent } from './emotion-detection/image/image.component';
import { CameraComponent } from './emotion-detection/camera/camera.component';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/emotion-recognition/video',
		pathMatch: 'full'
	},
	{
		path: 'emotion-recognition',
		component: EmotionDetectionComponent,
		children: [
			{
				path: 'video',
				component: VideoComponent,
			},
			{
				path: 'image',
				component: ImageComponent,
			},
			{
				path: 'camera',
				component: CameraComponent,
			},
		]
	}
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}