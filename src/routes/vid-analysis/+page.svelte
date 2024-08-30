<script lang="ts">
	import Canvas from '../../Components/Canvas.svelte';
	import { Video, Fileupload, Label } from 'flowbite-svelte'
	import { Stage, Layer, Line, Circle, Arrow, Image} from 'svelte-konva';
	import {onMount} from 'svelte';
	import Konva from 'konva';
	let videoFile:string = '/assets/RunningShort.mp4';
	let canvas;
	let height:number = 480;
	let width:number = 840;
	let image:Element;
	let video:Element;

    onMount(() => {
    
 	    var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
      });

      var layer = new Konva.Layer();
      stage.add(layer);

      var video = document.createElement('video');
      video.src = videoFile;
        // 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.vp9.webm';

      var image = new Konva.Image({
        image: video,
        draggable: true,
        x: 0,
        y: 0,
		width: width,
		height: height,
      });
      layer.add(image);

    //   var text = new Konva.Text({
    //     text: 'Loading video...',
    //     width: stage.width(),
    //     height: stage.height(),
    //     align: 'center',
    //     verticalAlign: 'middle',
    //   });
    //   layer.add(text);

      var anim = new Konva.Animation(function () {
        // do nothing, animation just need to update the layer
      }, layer);

      // update Konva.Image size when meta is loaded
      video.addEventListener('loadedmetadata', function (e) {
        // text.text('Press PLAY...');
        image.width(width);
        image.height(height);
      });

      document.getElementById('play').addEventListener('click', function () {
        // text.destroy();
        video.play();
        anim.start();
      });
      document.getElementById('pause').addEventListener('click', function () {
        video.pause();
        anim.stop();
      });
    });




	
</script>

<main class='flex flex-col items-center h-3/4'>

	<button id="play">Play</button><button id="pause">Pause</button>
	<div id="container" class="w-8/12 bg-gray-500 mx-auto my-4 relative">

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