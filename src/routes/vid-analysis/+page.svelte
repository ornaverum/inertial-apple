<script lang="ts">
	import Canvas from '../../Components/Canvas.svelte';
	import { Fileupload, Label } from 'flowbite-svelte'
	import { Stage, Layer, Line, Circle, Arrow, Image} from 'svelte-konva';
	import {onMount, tick} from 'svelte';
	import Konva from 'konva';

	import Video from './Components/Video.svelte';

	let videoFile:string = '/assets/RunningShort.mp4';
	let canvas;
	let height:number = 480;
	let width:number = 840;
	let image:Element;
	let video:Element;
	let stage:Stage;
	let line;
	let vidLayer:Layer;

    
	
</script>

<main class='flex flex-col items-center h-3/4'>

	<button id="play">Play</button><button id="pause">Pause</button>
	<div id="container" class="w-8/12 bg-gray-500 mx-auto my-4 relative">
		<Stage config={{width, height}}>
			<Video layerConfig={{width, height}} videoURL={videoFile} />
		</Stage>
	</div>

	<div>
		<Label class="space-y-2 mb-2">
			<span>Upload file</span>
			<Fileupload bind:value={videoFile} 
				on:change={()=>{console.log(videoFile)}}
			/>
		</Label>
		<Label>File: {videoFile}</Label>
	</div>
	
</main>