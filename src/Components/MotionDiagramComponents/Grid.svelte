<script lang='ts'>

    import { Stage, Layer, Line, Circle, Arrow, Text, Group, Rect} from 'svelte-konva';

    export let width:number = 800;
    export let gridNum:number = 30; // Number of grid intervals
	export let gridList: any[] = [];
    export let height:number = 100;
    export let marginY:number = 5;
	export let active:boolean = false;

	let label:string = 'x';
    let id_num: number = 0;
	let gridSize = width;//Math.min(height, width);
	let cellSize = gridSize/(gridNum + 1);
	let gridCenter = gridSize/2.0;
	let yValue = cellSize;



    for (let i = -15; i <= 15; i++) {
		let startParallel = i * cellSize + gridCenter;
		let startPerp = marginY;
		let endPerp = height - marginY;
		gridList.push({
			id: id_num++,
			x0: startParallel,
			y0: startPerp,
			x1: startParallel,
			y1: endPerp,
			strokeWidth: i%5==0 ? 4 : 2,
			strokeColor: 'gray',
		});
	}

	gridList.push({
		id: id_num++,
		x0: gridCenter,
		y0: marginY,
		x1: gridCenter,
		y1: height-marginY,
		strokeWidth: 5,
		strokeColor: 'black',
	});

	gridList.push({
		id: id_num++,
		x0: -15 * cellSize + gridCenter,
		y0: cellSize,
		x1: 15 * cellSize + gridCenter,
		y1: cellSize,
		strokeWidth:  5,
		strokeColor: 'black',
	});
</script>


<Layer config={{id: 'grid_layer'}} >

		{#each gridList as item (item.id)}
			<Line config={{
				points: [item.x0, item.y0, item.x1, item.y1],
				stroke: item.strokeColor,
				strokeWidth: item.strokeWidth,
				}} />
		{/each}
		<Text config={{
			x: width-10,
			y: 0.5*cellSize,
			text: label,
			fontSize: 20,
			fill: 'black',
			align: 'center',
		}}/>
	<!-- </Layer> -->
	{#if active}
		<!-- <Layer config={{id: 'active_layer'}}> -->
		<Rect config={{
			x: 0,
			y: 0,
			height: height,
			width: width,
			fill: 'white',
			opacity: 0,
		}} 
		on:click={(e) => console.log(' grid click')}
		/>
		<!-- </Layer> -->
	{/if}
</Layer>