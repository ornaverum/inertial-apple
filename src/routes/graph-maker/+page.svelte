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
		labels: {x:string, y:string};
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
		let newGraph:Graph = {title: 'List', graphID:(++graphIDIncrement), groupID: groupID, pathList:[], labels: {x:'Time', y:'Position'}};
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

	const labelGroupTitle = (groupID:number) => {
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
	};

	const labelGroupYAxis = (groupID:number, yaxis:string) => {
		console.log('Label Y axes', groupID, yaxis);

		let tempGraphs = [...graphs];
		let n = 0;
		tempGraphs.forEach((graph) => {
			console.log(graph);
			if(graph.groupID === groupID){
				graph.labels.y = yaxis;
			}
		});
		graphs = [...tempGraphs];
	};

	const yLabelOptions = [
		{value: 'Position', name: 'Position', color:'blue'},
		{value: 'Velocity', name: 'Velocity', color:'green'},
		{value: 'Acceleration', name: 'Acceleration', color:'red'},
	];

	const svgPathXpYp:string = 'M 2 2 V 13 H 13';
	const svgPathXpYn:string = 'M 2 2 V 13 M 2 8 H 13';
	const svgPathXnYp:string = 'M 2 13 H 13 M 8 2 V 13';
	const svgPathXnYn:string = 'M 8 2 V 14 M 2 8 H 14';

	const axisSets = [
		{svg: svgPathXpYp, x: false, y: false},
		{svg: svgPathXpYn, x: false, y: true},
		{svg: svgPathXnYp, x: true, y: false},
		{svg: svgPathXnYn, x: true, y: true},
	];

	let ylabel:string = 'Position';

	addNewGraph(0);

</script>

<main class="flex flex-col justify-center" >
	<div id='button-group' class = 'flex flex-row p-4'>
		<Button on:click={resetAll} class='mx-1'><RefreshOutline/></Button>
		<Button on:click={prepSaveDivAsImage} class='mx-1'><FileExportOutline/></Button>
		<Toggle bind:checked={showControlButtons}>Show Control Buttons</Toggle>
	</div>

	<div id="capture" bind:this={divToCapture} class='bg-black-200 w-max mx-auto'>

			<!-- <EditLabel text='Graph Group' size='xl2' {showControlButtons}/> -->
			<div class="flex flex-col flex-wrap">
				{#each groupIDs as group (group)}
				<div class="flex flex-row flex-wrap p-2">
					{#if showControlButtons && groupIDs.length > 0}

						<div class='flex flex-col m-1'>
							<Button class='my-1' on:click={()=>{groupIDs = groupIDs.filter(g => g !== group)}}><TrashBinOutline/></Button>
							<Button class='my-1' on:click={()=>labelGroupTitle(group)}>Label A-...</Button>
							<div class='flex flex-col mr-2'>
								<Label for="select-y-label" class="">Select y-label for group</Label>
								<Select on:change={()=>labelGroupYAxis(group, ylabel)} id='select-y-label' class="" size="sm" items={yLabelOptions} bind:value={ylabel} />
							</div>
							<Button class='my-1'>Set axis type for group</Button>
						</div>
					{/if}
					{#each graphs as graph (graph.graphID)}
						{#if graph.groupID == group}
							<QualGraph bind:title={graph.title} id={graph.graphID} on:deleteMe={handleDelete} bind:pathList={graph.pathList} width={200} height={200} bind:labels={graph.labels} color='green' {showControlButtons}/>
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