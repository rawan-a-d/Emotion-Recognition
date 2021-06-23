import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

// method in script.js
declare var setUpCamera: any;

@Component({
	selector: 'app-camera',
	templateUrl: './camera.component.html',
	styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
	// webcam snapshot trigger
	private trigger: Subject<void> = new Subject<void>();
	public webcamImage!: WebcamImage;

	constructor(
		private _renderer2: Renderer2,
		@Inject(DOCUMENT) private _document: Document
	) { }

	ngOnInit(): void {
		// add JS file
		var s = this._renderer2.createElement('script');
		s.type = 'text/javascript';
		s.src = '../assets/script.js';
		s.text = ``;
		this._renderer2.appendChild(this._document.body, s);
	}


	// Camera
	triggerSnapshot(): void {
		this.trigger.next();

		setUpCamera();
	}

	handleImage(webcamImage: WebcamImage): void {
		console.info('received webcam image', webcamImage);
		this.webcamImage = webcamImage;
	}

	public get triggerObservable(): Observable<void> {
		return this.trigger.asObservable();
	}
}
