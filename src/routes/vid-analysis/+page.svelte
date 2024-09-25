<script lang="ts">
	import Canvas from '../../Components/Canvas.svelte';
	import { Fileupload, Label, Button } from 'flowbite-svelte'
	import { PauseOutline, PlayOutline, TrashBinOutline, RefreshOutline } from 'flowbite-svelte-icons';
	import { Stage, Layer, Line, Circle, Arrow, Image} from 'svelte-konva';
	import {onMount, tick} from 'svelte';
	import Konva from 'konva';

	import Video from './Components/Video.svelte';

	let btn:Button;
	let stage:Konva.Stage;
	let video:HTMLVideoElement;
	let height: number = 500;
	let width: number = 500;

	let innerWidth: number;
	let innerHeight: number;

</script>

<svelte:window bind:innerWidth bind:innerHeight />

<main class='flex flex-col items-center h-3/4'>
	<div id='button-container' class='flex-row'>
	<Button on:click={() => {video.currentTime = 0; video.pause();}} bind:this={btn}>
		<RefreshOutline />
	</Button>
	<Button on:click={() => {video.play(); }} bind:this={btn}>
		<PlayOutline />
	</Button>
		<Button on:click={() =>  {video.pause(); }} bind:this={btn}>
			<PauseOutline />
		</Button>
	</div>
	<Stage config={{height, width}} bind:handle={stage}>
		<Video bind:video={video} />
	</Stage>

</main>