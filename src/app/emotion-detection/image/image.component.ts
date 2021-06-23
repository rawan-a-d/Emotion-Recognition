import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

// method in script.js
declare var setUp: any;

@Component({
	selector: 'app-image',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
	// select image
	selectedImage: String = '';

	//url
	url: any;
	msg = "";

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

	// When an image is selected
	selectFile(event: any) {
		if (!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
		}

		// Process Image
		setUp()
	}
}
