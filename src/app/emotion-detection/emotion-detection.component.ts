import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
	selector: 'app-emotion-detection',
	templateUrl: './emotion-detection.component.html',
	styleUrls: ['./emotion-detection.component.css']
})
export class EmotionDetectionComponent implements OnInit, AfterViewInit {

	constructor(
		private _renderer2: Renderer2,
		@Inject(DOCUMENT) private _document: Document
	) { }

	ngAfterViewInit(): void {
		// Add script tags
		var s = this._renderer2.createElement('script');
		s.type = 'text/javascript';
		s.src = '../assets/face-api.min.js';
		s.text = ``;
		this._renderer2.appendChild(this._document.body, s);
	}


	public ngOnInit() {
	}
}
