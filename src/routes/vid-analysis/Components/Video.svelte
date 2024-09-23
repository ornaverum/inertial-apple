<script lang="ts">
    import {Layer} from 'svelte-konva';
    import {onMount, tick} from 'svelte';
    import {Button} from 'flowbite-svelte';
    import {PlayOutline, PauseOutline} from 'flowbite-svelte-icons';
    import Konva from 'konva';
    
    export let layerConfig;
    export let videoURL;
    let layer: Konva.Layer;
    let video: HTMLVideoElement;
    let image;
    let anim: Konva.Animation;
    let cnv: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    onMount(async () => {       
        const img = document.createElement("img");
        img.src = "https://konvajs.org/assets/yoda.jpg";
        img.onload = () => {
            image = img;
        };

        video = document.createElement('video');
        // video.src = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.vp9.webm';
        video.src='/assets/Running.MOV';
        video.loop = true;

        image = new Konva.Image({
            image: video,
            draggable: true,
            x: 0,
            y: 0,
        });

        // Add the image to the layer after the layer is initialized
        if (layer) {
            console.log('Adding image to layer');
            console.log(layer);
            layer.add(image);
            // layer.add(video);
            layer.draw();
            cnv = layer?.getCanvas()._canvas;
            ctx = cnv?.getContext('2d');

        }
    });
</script>

<Stage>
    
    <Layer bind:handle={layer} on:click={()=>{
        console.log('Layer clicked');
        console.log(layer);
    }}
    >
    </Layer>
</Stage>
