<script lang="ts">
	import { Stage, Layer, Line, Circle, Arrow, Text} from 'svelte-konva';
	import Acceleration from './MotionDiagramComponents/Acceleration.svelte';
	import Velocity from './MotionDiagramComponents/Velocity.svelte';
	import Position from './MotionDiagramComponents/Position.svelte';
	import Grid from './Shared/Grid.svelte';

	import type { Dot, VectorArrow, acceleration } from './kinematicsTypes';

 	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
	// import html2canvas from 'html2canvas';

    import { Label, Select, Input, Button, Toggle } from 'flowbite-svelte';
    import {TrashBinOutline, FileExportOutline, EditOutline, ArrowRightOutline, RefreshOutline} from 'flowbite-svelte-icons';
	// import { position } from 'html2canvas/dist/types/css/property-descriptors/position';

	let name: string = 'Motion Diagram Component';

	export let width:number = 800;
    export let height:number = 100;
    export let label:string = 'x';
	export let title:string = 'Title';

	export let gridNum:number = 30; // Number of grid intervals
	export let showControlButtons: boolean = true;

	let editTitle:boolean = false;

	let gridPointList: number[] = [];
	for (let i = -15; i <= 15; i++) {
		gridPointList.push(i);
	}

	export let id: number = 0;
	let gridSize:number = width;
	let cellSize:number = gridSize/(gridNum + 1);
	let gridCenter:number = gridSize/2.0;
	let yValue:number = cellSize;
	export let marginY:number = 5;

	let toggleChecked:boolean = false;
	let onStage:boolean = false;
	
	export let posList: Dot[] = [];
	export let velList: VectorArrow[] = [];
	export let accList: acceleration[] = [];

	let params = {
		width: width,
		height: height,
		cellSize: cellSize,
		gridCenter: gridCenter,
		yValue: yValue,
		gridNum: gridNum,
		marginY: marginY,
	}

	let gridComponent: Grid;
	let positionComponent: Position;
	let velocityComponent: Velocity;
	let accelerationComponent: Acceleration;
	let activeComponent:any = Position;


	let divToCapture: HTMLDivElement;

</script>

<main class="flex flex-col justify-center p-4 items-center">
	<div id='Title' class='m-4 p-2 text-2xl font-bold flex flex-row rounded-xl border-1'>
		<Button color='alternative' class='mr-3' size='xs' on:click={()=>{editTitle = !editTitle}}>
			<EditOutline/>
		</Button>
		{#if editTitle}
			<Input bind:value={title} placeholder="Free Body Diagram"
				on:keydown={(evt) => { if (evt.key == 'Enter') { editTitle = false;}}}
			/>
		{:else}
			{title}
		{/if}
		<!-- <div contenteditable="true">{title}</div> -->
	</div>
	<div class="flex flex-row">
		{#if (showControlButtons)}
			<div id='button-container flex flex-row m-4 p-4'>
				<Button class='bg-accent hover:bg-red-800' on:click={()=>{dispatch('deleteMe', {id: id})}
				}><TrashBinOutline/></Button>
				<Button class='bg-accent hover:bg-secondary-600' on:click={()=>{
					posList = [];
					velList = [];
					accList = [];
					yValue = cellSize;
					params.yValue = yValue;
				}}><RefreshOutline/></Button>
				<div class='flex flex-row text-sm'>
					Position
					<Toggle bind:checked={toggleChecked} class='ml-2'/>
					Acceleration
				</div>
			</div>
		{/if}
		<div id='capture' bind:this={divToCapture}>
			<div id='fbd' class='bg-gray-50 p-4'>
				<Stage config={{width, height, id:'main_stage'}}
					on:mouseleave={() => {onStage = false;}}
					on:mouseenter={() => {onStage = true;}}
					>
					<Grid bind:this={gridComponent} {width} {height} gridNum={{y:0, x:gridNum}}/>
					<Velocity bind:velList={velList} {posList}/>
					<Acceleration active={toggleChecked && onStage} bind:accList={accList} {...params} {posList}/>
					<Position active={!toggleChecked && onStage} bind:posList={posList} {...params}/>
				</Stage>
			</div>
		</div>
	</div>

</main>
