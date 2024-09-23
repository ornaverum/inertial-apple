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
	let stage:Konva.Stage;
	let layer:Konva.Layer;
	let video:HTMLVideoElement;
	let anim:Konva.Animation;
	let height: number = 500;
	let width: number = 500;

	onMount(async () => {
		console.log('Mounted');
		await tick();
		
	  	video = document.createElement('video');
		video.src = 'assets/Running.MOV';

		async function loadVideo() {
			await video.play();
			video.pause();
		}
		await loadVideo();
		height = video.videoHeight || 500;
		width = video.videoWidth || 500;

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

<main class='flex flex-col items-center h-3/4'>
	<Button on:click={() => {video.play(); }} bind:this={btn}>
		<PlayOutline />
	</Button>
	<Button on:click={() =>  {video.pause(); }} bind:this={btn}>
		<PauseOutline />
	</Button>
	<Stage config={{height:600, width:800}} bind:handle={stage}>
		<Layer bind:handle={layer}>
			<!-- <Image config={{image:image, draggable:true, x:50, y:100}} /> -->
		</Layer>
	</Stage>

</main>