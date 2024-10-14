<script lang='ts'>

    import { Stage, Layer, Line, Circle, Arrow, Text, Group, Rect} from 'svelte-konva';

    export let width:number = 800;
    export let gridNumX:number = 30; // Number of grid intervals
	export let gridNumY:number = 30; // Number of grid intervals
	export let gridList: any[] = [];
    export let height:number = 100;
    export let marginY:number = 5;
	export let active:boolean = false;

	export let label:string = 'x';
    let id_num: number = 0;
	let gridSize = width;//Math.min(height, width);
	let cellSizeX = gridSize/(gridNumX + 1);
	let cellSizeY = gridSize/(gridNumY + 1);
	let gridCenter = gridSize/2.0;
	let yValue = cellSizeY;




	for (let j = -gridNumY/2; j <= gridNumY/2; j++) {
		let startParallel = -gridNumX/2 * cellSizeX + gridCenter;
		let endParallel = gridNumX/2 * cellSizeX + gridCenter;
		let startPerp = j * cellSizeY + gridCenter;
		let endPerp = j * cellSizeY + gridCenter;
		gridList.push({
			id: id_num++,
			x0: startParallel,
			y0: startPerp,
			x1: endParallel,
			y1: endPerp,
			strokeWidth: j%5==0 ? 4 : 2,
			strokeColor: 'gray',
		});
	}

	for (let i = -gridNumX/2; i <= gridNumX/2; i++) {
		let startParallel = -gridNumY/2 * cellSizeY + gridCenter;
		let endParallel = gridNumY/2 * cellSizeY + gridCenter;
		let startPerp = i * cellSizeX + gridCenter;
		let endPerp = i * cellSizeX + gridCenter;
		gridList.push({
			id: id_num++,
			x0: startPerp,
			y0: startParallel,
			x1: endPerp,
			y1: endParallel,
			strokeWidth: i%5==0 ? 4 : 2,
			strokeColor: 'gray',
		});
	}
	// for (let i = -gridNumX/2; i <= gridNumX/2; i++) {
	// 	let startParallel = i * cellSizeX + gridCenter;
	// 	let startPerp = -5 * cellSizeX + gridCenter;
	// 	let endPerp = 5 * cellSizeX + gridCenter;
	// 	gridList.push({
	// 		id: id_num++,
	// 		x0: startParallel,
	// 		y0: startPerp,
	// 		x1: startParallel,
	// 		y1: endPerp,
	// 		strokeWidth: i==0 ? 4 : 2,
	// 	});
	// 	gridList.push({
	// 		id: id_num++,
	// 		x0: startPerp,
	// 		y0: startParallel,
	// 		x1: endPerp,
	// 		y1: startParallel,
	// 		strokeWidth: i==0 ? 5 : 2,
	// 	});
	// }

	gridList.push({
		id: id_num++,
		x0: -gridNumY/2 * cellSizeY + gridCenter,
		y0: gridCenter,
		x1: gridNumY/2 * cellSizeY + gridCenter,
		y1: gridCenter,
		strokeWidth:  5,
		strokeColor: 'black',
	});

	gridList.push({
		id: id_num++,
		x0: gridCenter,
		y0:  -gridNumX/2 * cellSizeX + gridCenter,
		x1: gridCenter,
		y1: gridNumX/2 * cellSizeX + gridCenter,
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
			y: 0.5*cellSizeY,
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