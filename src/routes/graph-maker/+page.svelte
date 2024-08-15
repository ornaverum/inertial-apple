<script lang="ts">
	import { Stage, Layer, Line, Circle, Path} from 'svelte-konva';
  	import DragArrow from '../../Components/QualGraph.svelte';
	import EditLabel from '../../Components/EditLabel.svelte';
	import type {GraphPath, Point} from '../../Components/kinematicsTypes';

    import { Label, Select, Input, Button, Checkbox, Toggle} from 'flowbite-svelte';
    import {TrashBinOutline, FileExportOutline, ChevronDownOutline, CirclePlusOutline, RefreshOutline} from 'flowbite-svelte-icons';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';

	import QualGraph from '../../Components/QualGraph.svelte';

	import html2canvas from 'html2canvas';

	let name: string = 'graph-maker';

	let divToCapture: HTMLDivElement;
	let showControlButtons:boolean = true;

	let idIncrement = 0;

	const prepSaveDivAsImage = ()=>
	{
		showControlButtons = false;
		saveDivAsImage();
	}
	let groupIDIncrement = 0;
	let graphIDIncrement = 0;

	type Graph = {
		title: string;
		graphID: number;
		groupID: number;
		pathList: GraphPath[];
	}

	type Group = {
		id: number;
		graphsIDs: number[];
	}

	let graphs: Graph[] = [];
	let groupIDs: number[] = [0];

	const addNewGraph = (groupID: number) =>{
		let newGraph:Graph = {title: 'Graph Title', graphID:(++graphIDIncrement), groupID: groupID, pathList:[]};
		graphs = [...graphs, newGraph];
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

	const handleDelete = (e:CustomEvent) => {
		graphs = graphs.filter(graph => graph.graphID !== e.detail.id);
	}

	const resetAll = () =>{
		graphs = [];
		groupIDs = [0];
		graphIDIncrement = 0;
		groupIDIncrement = 0;
		addNewGraph(0);
	}

	const labelGroup = (groupID:number) => {
		console.log(groupID);

		let tempGraphs = [...graphs];
		let n = 0;
		tempGraphs.forEach((graph) => {
			console.log(graph);
			if(graph.groupID === groupID){
				graph.title = String.fromCharCode(65 + n++);
			}
		});
		graphs = [...tempGraphs];
	}

	addNewGraph(0);

</script>

<main class="flex flex-col justify-center" >
	<div id='button-group' class = 'flex flex-row p-4'>
		<Button on:click={resetAll}><RefreshOutline/></Button>
		<Button on:click={prepSaveDivAsImage}><FileExportOutline/></Button>
		<Toggle bind:checked={showControlButtons}>Show Control Buttons</Toggle>
	</div>

	<div id="capture" bind:this={divToCapture} class='bg-black-200 w-max mx-auto'>

			<!-- <EditLabel text='Graph Group' size='xl2' {showControlButtons}/> -->
			<div class="flex flex-col flex-wrap">
				{#each groupIDs as group (group)}
				<div class="flex flex-row flex-wrap p-2">
					{#if showControlButtons}
						<Button on:click={()=>{groupIDs = groupIDs.filter(g => g !== group)}}><TrashBinOutline/></Button>
						<Button on:click={()=>labelGroup(group)}>Label A-...</Button>
					{/if}
					{#each graphs as graph (graph.graphID)}
						{#if graph.groupID == group}
							<QualGraph bind:title={graph.title} id={graph.graphID} on:deleteMe={handleDelete} bind:pathList={graph.pathList} width={200} height={200} labels={{x:'Time', y:'Velocity'}} color='green' {showControlButtons}/>
						{/if}
					{/each}
					{#if showControlButtons}
						<Button on:click={()=>addNewGraph(group)}><CirclePlusOutline/></Button>
					{/if}
					</div>

				{/each}
				
				
			{#if showControlButtons}
			<Button on:click={()=>{groupIDs=[...groupIDs, ++groupIDIncrement]}}>
				<CirclePlusOutline class='mx-2'/> Add New Group
			</Button>
			{/if}
		<div id='given' class='justify-center'>
		</div>

	</div>
</main>