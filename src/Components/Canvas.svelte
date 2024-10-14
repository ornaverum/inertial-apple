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

<a href='https://svelte.dev/repl/434e0b14546747688401e8808c060a23?version=3.47.0'>Canvas as svelte component</a>
