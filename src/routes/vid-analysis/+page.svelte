<script lang="ts">
	import Canvas from '../../Components/Canvas.svelte';
	import { Video, Fileupload, Label } from 'flowbite-svelte'
	import { Stage, Layer, Line, Circle, Arrow, Image} from 'svelte-konva';
	import {onMount} from 'svelte';
	let videoFile:string = '/assets/RunningShort.mp4';
	let canvas;
	let height:number = 640;
	let width:number = 480;
	let image = null;
	let video = null;

    onMount(() => {
        const img = document.createElement("img");
        img.src = "https://konvajs.org/assets/yoda.jpg";
        img.onload = () => {
            image = img;
        };
		const vid = document.createElement("vid");
		vid.src =  '/assets/RunningShort.mp4';
		vid.onload = () => {
			video = vid;
		};
    });
</script>

<main class='flex flex-col items-center h-3/4'>


	<div id="container" class="w-8/12 bg-gray-500 mx-auto my-4 relative">
		<Stage config={{width, height, id:'main_stage'}}>
			<Layer>
				<video
					id="videoInput"
					width="640"
					height="480"
					controls
					muted
					src={videoFile}
					class='mx-auto absolute top-0 left-0'
				></video>

			</Layer>
			<Layer>
				<Line config = {{
					points:[0, 0, width, height],
					stroke:"red",
					strokeWidth:10
					}}/>
			</Layer>
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