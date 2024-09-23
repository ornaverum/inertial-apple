<script lang="ts">
	import Canvas from '../../Components/Canvas.svelte';
	import { Fileupload, Label, Button } from 'flowbite-svelte'
	import { PauseOutline, PlayOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { Stage, Layer, Line, Circle, Arrow, Image} from 'svelte-konva';
	import {onMount, tick} from 'svelte';
	import Konva from 'konva';

	import Video from './Components/Video.svelte';
	import KonvaVidEx from './konvaVidEx.svelte';

	let btn:Button;
	console.log('script');
	console.log(btn);
	let stage:Konva.Stage;
	let layer:Konva.Layer;
	let image;
	let video:HTMLVideoElement;
	let anim:Konva.Animation;

	onMount(async () => {
		console.log('Mounted');
		console.log(btn);
		console.log(stage);
		await tick();
		console.log(layer);

		const img = document.createElement("img");
        img.src = "https://konvajs.org/assets/yoda.jpg";
        img.onload = () => {
            image = img;
        };


		
	  	video = document.createElement('video');

		video.src = 'assets/Running.MOV';
		const drawFrame = ()=>{
			let canvas=layer.canvas;
			let ctx = canvas.context;
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
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

<main class='flex flex-col items-center h-3/4'>
	<Button on:click={() => {video.play(); anim.start(); }} bind:this={btn}>
		<PlayOutline />
	</Button>
	<Button on:click={() =>  {video.pause(); anim.stop(); }} bind:this={btn}>
		<PauseOutline />
	</Button>
	<Stage config={{height: 500, width:500}} bind:handle={stage}>
		<Layer bind:handle={layer}>
			<!-- <Image config={{image:image, draggable:true, x:50, y:100}} /> -->
		</Layer>
	</Stage>

</main>