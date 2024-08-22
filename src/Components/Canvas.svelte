<script lang="ts">
    import {onMount} from 'svelte';

    export let name:string = 'Canvas'

    export let width:number = 300
	export let height:number = 300
	export let background:string = '#fff'
	
	let canvas;
	let context


</script>


<div>
    <canvas bind:this={canvas} width={width} height={height} class='bg-primary-200'></canvas>
</div>