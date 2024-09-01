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

    onMount(async () => {       
        const img = document.createElement("img");
        img.src = "https://konvajs.org/assets/yoda.jpg";
        img.onload = () => {
            image = img;
        };

        // Add the image to the layer after the layer is initialized
        if (layer) {
            console.log('Adding image to layer');
            console.log(layer);
            layer.add(image);
            // layer.add(video);
            layer.draw();
        }
    });

    // anim = new Konva.Animation(function () {
    //     // The animation is just here to keep the layer updating
    //     // layer.batchDraw();
    //     layer.draw();
    // }, layer);

    // anim.start();
</script>

<!-- <Button on:click={() => video.play()}>
    <PlayOutline />
</Button>
<Button on:click={() => video.pause()}>
    <PauseOutline />
</Button> -->

<Layer bind:handle={layer} on:click={()=>{
    console.log('Layer clicked');
    console.log(layer);
}}
>
</Layer>
