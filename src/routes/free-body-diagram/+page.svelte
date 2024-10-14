<script lang="ts">
	import { Stage, Layer, Line} from 'svelte-konva';
  	import DragArrow from '../../Components/DragArrow.svelte';
	import html2canvas from 'html2canvas';

    import { Button, Toggle, Label, Select, Input, Hr } from 'flowbite-svelte';
    import {TrashBinOutline, CirclePlusOutline, FileExportOutline, EditOutline, RefreshOutline} from 'flowbite-svelte-icons';
	import EditLabel from '../../Components/EditLabel.svelte';
	import Grid from '../../Components/Shared/Grid.svelte';
  import FreeBodyDiagram from '../../Components/FreeBodyDiagram.svelte';

	let name: string = 'Free Body Diagram';

	let width = 500;
    let height = 500;

	let showNetForce = false;
	let showControlButtons:boolean = true;

	let divToCapture: HTMLDivElement;

	const saveDivAsImage = async () => {
		let tempCtrl = showControlButtons;
		await setControlButtons(false);
		const canvas = await html2canvas(divToCapture);
		const dataUrl = canvas.toDataURL('image/png');
		const link = document.createElement('a');
		link.href = dataUrl;
		link.download = 'div-image.png';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		await setControlButtons(tempCtrl);
	};

	async function setControlButtons(ctrl:boolean){
		showControlButtons = ctrl;
	} 



</script>

<main class="flex flex-col bg-gray-50 justify-center">
	<div id='button-group' class = 'flex flex-row p-4'>
		<Button on:click={saveDivAsImage} class="mx-2"><FileExportOutline/></Button>
		<!-- <Button on:click={deleteAll} class="mx-2"><RefreshOutline/></Button> -->
		<Toggle class="mx-2" bind:checked={showNetForce}
			>Show Net Force</Toggle>
	</div >
	<div id='capture'  bind:this={divToCapture} class='mx-auto w-max'>
		<FreeBodyDiagram {width} {height} {showNetForce}/>
	</div>

	

</main>
