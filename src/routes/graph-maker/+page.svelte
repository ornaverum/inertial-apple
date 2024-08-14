<script lang="ts">
	import { Stage, Layer, Line, Circle, Path} from 'svelte-konva';
  	import DragArrow from '../../Components/QualGraph.svelte';
	import EditLabel from '../../Components/EditLabel.svelte';

    import { Label, Select, Input, Button, Checkbox, Toggle} from 'flowbite-svelte';
    import {TrashBinOutline, FileExportOutline, ChevronDownOutline, CirclePlusOutline, RefreshOutline} from 'flowbite-svelte-icons';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';

	import QualGraph from '../../Components/QualGraph.svelte';

	import html2canvas from 'html2canvas';

	let name: string = 'graph-maker';

	let divToCapture: HTMLDivElement;
	let showControlButtons:boolean = true;

	let idIncrement = 0;
	$: graphGroups = [{id:idIncrement++, graphs:[]}];

	const prepSaveDivAsImage = ()=>
	{
		showControlButtons = false;
		saveDivAsImage();
	}

	type Graph = {id:number};
	type GraphGroup = {id:number, graphs: Graph[]};

	const addNewGroup = () =>
	{
		graphGroups = [...graphGroups, {id:idIncrement++, graphs:[]}];
		console.log(graphGroups);
	}

	const addNewGraphToGroup = (group:GraphGroup) =>
	{
		// group = [...group, 1]
		let newGraph:Graph = {id:idIncrement++};
		group.graphs = [...(group.graphs), newGraph];
		console.log(group);
	}

	const saveDivAsImage = async () => {
		const canvas = await html2canvas(divToCapture);
		const dataUrl = canvas.toDataURL('image/png');
		const link = document.createElement('a');
		link.href = dataUrl;
		link.download = 'div-image.png';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
</script>

<main class="flex flex-col justify-center" >
	<div id='button-group' class = 'flex flex-row p-4'>
		<Button on:click={prepSaveDivAsImage}><FileExportOutline/></Button>
		<Toggle bind:checked={showControlButtons}>Show Control Buttons</Toggle>
	</div>

	<div id="capture" bind:this={divToCapture} class='bg-black-200 w-max mx-auto'>
		{#each graphGroups as group}

			<div class='flex flex-col w-max'>
				<EditLabel text='Graph' size='xl2' {showControlButtons}/>
				<div class="flex flex-row flex-wrap m-4 bg-blue-100">
					<QualGraph width={200} height={200} labels={{x:'Time', y:'Velocity'}} color='green' {showControlButtons}/>

					<!-- {#each group.graphs as graph (graph.id)}
						{console.log(graph)}
						<QualGraph width={200} height={200} labels={{x:'Time', y:'Velocity'}} color='green' {showControlButtons}/>
					{/each}
					{#if showControlButtons}
						<Button on:click={()=>{addNewGraphToGroup(group)}}><CirclePlusOutline/></Button>
					{/if} -->
				</div>
			</div>
		{/each}
			{#if showControlButtons}
			<Button on:click={()=>{addNewGroup}}>
				<CirclePlusOutline class='mx-2'/> Add New Group
			</Button>
			{/if}
		<div id='given' class='justify-center'>
		</div>

	</div>
</main>