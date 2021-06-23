import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

// method in script.js
declare var setUpVideo: any;

@Component({
	selector: 'app-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {


	constructor(
		private _renderer2: Renderer2,
		@Inject(DOCUMENT) private _document: Document
	) { }

	ngOnInit(): void {
		// Add JS file
		var s = this._renderer2.createElement('script');
		s.type = 'text/javascript';
		s.src = '../assets/video-script.js';
		s.text = ``;
		this._renderer2.appendChild(this._document.body, s);
	}

}
