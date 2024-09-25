<script lang="ts">
	import { Fileupload, Label, Button } from 'flowbite-svelte'
	import { PauseOutline, PlayOutline, TrashBinOutline, RefreshOutline } from 'flowbite-svelte-icons';
	import { Stage, Layer, Line, Circle, Arrow, Image} from 'svelte-konva';
	import {onMount, tick} from 'svelte';
	import Konva from 'konva';

	// import cv from 'opencv.js';

	let layer:Konva.Layer;
	export let video:HTMLVideoElement;
	let height: number = 500;
	let width: number = 500;

	let innerWidth: number;
	let innerHeight: number;
	let cap: any;


    onMount(async () => {
		console.log('Mounted');

		let cv: any;

		// Function to load OpenCV.js dynamically
		function loadOpenCV() {
			return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = '/lib/opencv.js'; // Path to the OpenCV.js file in the static folder
			script.async = true;
			script.onload = () => {
				console.log('OpenCV.js loaded successfully');
				resolve();
			};
			script.onerror = () => {
				console.error('Failed to load OpenCV.js');
				reject();
			};
			document.head.appendChild(script);
			});
		}

		// Wait for OpenCV to be ready
		async function waitForOpenCV() {
			return new Promise((resolve) => {
			const check = setInterval(() => {
				if (typeof cv !== 'undefined') {
				clearInterval(check);
				resolve(cv);
				}
			}, 100);
			});
		}

		// Example function to process video once OpenCV is ready
		async function processVideo() {
			await loadOpenCV(); // Dynamically load OpenCV.js
			await waitForOpenCV(); // Wait for OpenCV to initialize

			console.log('OpenCV.js is ready');
			// Now you can use OpenCV.js (cv)
		}

		processVideo();
		
	  	video = document.createElement('video');
		video.src = 'assets/Running.MOV';

		async function loadVideo() {
			return new Promise((resolve) => {
				if (video.readyState >= 1) {
					// Metadata already loaded
					resolve(1);
				} else {
					video.addEventListener('loadedmetadata', () => {
					resolve(1);
					});
				}
    		});
		}
		
		await loadVideo();
		// video.play();
		// video.pause();

		height = video.videoHeight || 500;
		width = video.videoWidth || 500;

		if (height > window.innerHeight || width > window.innerWidth) {
			let ratio = Math.min(window.innerHeight / height, window.innerWidth / width);
			height *= ratio;
			width *= ratio;
			let canvas=layer.canvas;
			canvas.width = width;
			canvas.height = height;
            layer.getStage().width(width);
            layer.getStage().height(height);
		}

		 // Wait for OpenCV.js to be fully loaded
		//  function loadOpenCV() {
		// 	return new Promise((resolve, reject) => {
		// 		const script = document.createElement('script');
		// 		script.src = 'https://docs.opencv.org/4.x/opencv.js';
		// 		script.async = true;
		// 		console.log(script);
		// 		script.onload = () => {
		// 			let cvLoaded = true;
		// 			resolve(1);
		// 		};
		// 		script.onerror = reject;
		// 		document.head.appendChild(script);
		// 	});
		// }

		// await loadOpenCV();
		// console.log('OpenCV.js is ready:', cv);

		// cap = new cv.VideoCapture(video);

		const drawFrame = ()=>{
			let canvas=layer.canvas;
			let ctx = canvas.context;
			ctx.drawImage(video, 0, 0, width, height);
			let frame = ctx.getImageData(0, 0, width, height);
			gray(ctx, frame);
		}
		drawFrame();

		video.addEventListener("play", () => {
			function step() {
				drawFrame();
				requestAnimationFrame(step);
			}
			requestAnimationFrame(step);
		});
		video.muted = true;
	});


	const gray = (ctx, frame)=>{
		let imageData = ctx.getImageData(0, 0, frame.width, frame.height);
		let data = imageData.data;
		for (let i = 0; i < data.length; i += 4) {
			let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
			data[i] = avg;
			data[i + 1] = avg;
			data[i + 2] = avg;
		}
		ctx.putImageData(imageData, 0, 0);
	}

</script>


<Layer bind:handle={layer} />