<script lang="ts">
	import { Fileupload, Label, Button } from 'flowbite-svelte'
	import { PauseOutline, PlayOutline, TrashBinOutline, RefreshOutline } from 'flowbite-svelte-icons';
	import { Stage, Layer, Line, Circle, Arrow, Image} from 'svelte-konva';
	import {onMount, tick} from 'svelte';
	import Konva from 'konva';

	let layer:Konva.Layer;
	export let video:HTMLVideoElement;
	let height: number = 500;
	let width: number = 500;

	let innerWidth: number;
	let innerHeight: number;


    onMount(async () => {
		console.log('Mounted');
		await tick();
		
	  	video = document.createElement('video');
		video.src = 'assets/Running.MOV';

		async function loadVideo() {
			return new Promise((resolve) => {
				if (video.readyState >= 1) {
					// Metadata already loaded
					resolve();
				} else {
					video.addEventListener('loadedmetadata', () => {
					resolve();
					});
				}
    		});
		}
		
		await loadVideo();
        console.log('Video loaded', video.videoHeight, video.videoWidth, innerHeight, innerWidth);
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

		const drawFrame = ()=>{
			let canvas=layer.canvas;
			let ctx = canvas.context;
			ctx.drawImage(video, 0, 0, width, height);
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
</script>


<Layer bind:handle={layer} />