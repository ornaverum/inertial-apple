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
	let video;
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

		anim = new Konva.Animation(function () {
        // do nothing, animation just need to update the layer
			layer.draw();

		}, layer);

	  	video = document.createElement('video');
      	video.src =
        	'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.vp9.webm';
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
			<Image config={{image:video, draggable:true, x:0, y:0}} />
		</Layer>
	</Stage>

</main>