import { DOCUMENT } from '@angular/common';
import { Inject, Renderer2 } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';


declare var setUp: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'EmotionDetector';

	// webcam snapshot trigger
	private trigger: Subject<void> = new Subject<void>();
	public webcamImage!: WebcamImage; 

	// select image
	selectedImage: String = '';
  
	constructor(
		private _renderer2: Renderer2, 
		@Inject(DOCUMENT) private _document: Document
	) { }


	public ngOnInit() {
		// Add script tags
		// var s = this._renderer2.createElement('script');
		// s.type = 'text/javascript';
		// s.src = '../assets/face-api.min.js';
		// s.text = ``;
		// this._renderer2.appendChild(this._document.body, s);

		// s = this._renderer2.createElement('script');
		// s.type = 'text/javascript';
		// s.src = '../assets/script.js';
		// s.text = ``;
		// this._renderer2.appendChild(this._document.body, s);
	}


	// Camera
	triggerSnapshot(): void {
		console.log("triggerSnapshot")

		this.trigger.next();

		setUp();
	}
	
	handleImage(webcamImage: WebcamImage): void {
		console.log("Handle image")

		console.info('received webcam image', webcamImage);
		this.webcamImage = webcamImage;
	}
   
	public get triggerObservable(): Observable<void> {
		return this.trigger.asObservable();
	}


	// When an image is selected
	onFileSelect(event: any) {
		const file = event.target['files'][0]

		if (event.target.files.length > 0 && /\.(jpe?g|png|gif|bmp)$/i.test(file.name) ) {
			const file = event.target.files[0];
			
			this.selectedImage = 'assets/' + file.name;

			setUp()
		}
	}
}
