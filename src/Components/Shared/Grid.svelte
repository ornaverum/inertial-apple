<script lang='ts'>

    import { Stage, Layer, Line, Circle, Arrow, Text, Group, Rect} from 'svelte-konva';

    export let width:number = 800;
	export let gridNum: {x:number, y:number} = {x: 30, y:30};
	export let gridList: any[] = [];
    export let height:number = 100;
    export let margin: {x:number, y:number} = {x: 5, y:5};
	export let active:boolean = false;

	export let label:string = 'x';
    let id_num: number = 0;
	let gridSize : {w:number, h:number} = {w: width, h:height};;//Math.min(height, width);
	let cellSize : {x:number, y:number} = {x: gridSize.w/(gridNum.x + 1), y:gridSize.h/(gridNum.y + 1)};
	let gridCenter: {x:number, y:number} = {x: gridSize.w/2, y:gridSize.h/2};
	let yValue = cellSize.y;

	for (let j = -gridNum.y/2; j <= gridNum.y/2; j++) {
		let gridSpace = Math.max(gridNum.x,1)/2;

		let startParallel = -gridSpace * cellSize.x + gridCenter.x;
		let endParallel = gridSpace * cellSize.x + gridCenter.x;
		let startPerp = j * cellSize.y + gridCenter.y;
		let endPerp = j * cellSize.y + gridCenter.y;
		gridList.push({
			id: id_num++,
			x0: startParallel,
			y0: startPerp,
			x1: endParallel,
			y1: endPerp,
			strokeWidth: j%5==0 ? 4 : 2,
			strokeColor: 'grey',
		});
	}

	for (let i = -gridNum.x/2; i <= gridNum.x/2; i++) {
		let gridSpace = Math.max(gridNum.y,1)/2;
		let startParallel = -gridSpace * cellSize.y + gridCenter.y;
		let endParallel = gridSpace * cellSize.y + gridCenter.y;
		let startPerp = i * cellSize.x + gridCenter.x;
		let endPerp = i * cellSize.x + gridCenter.x;
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

	let gridSpace = Math.max(gridNum.x,1)/2;
	gridList.push({
		id: id_num++,
		x0: -gridSpace * cellSize.x + gridCenter.x,
		y0: gridCenter.y,
		x1: gridSpace * cellSize.x + gridCenter.x,
		y1: gridCenter.y,
		strokeWidth:  5,
		strokeColor: 'black',
	});

	gridSpace = Math.max(gridNum.y,1)/2;
	gridList.push({
		id: id_num++,
		x0: gridCenter.x,
		y0:  -gridSpace * cellSize.y + gridCenter.y,
		x1: gridCenter.x,
		y1: gridSpace * cellSize.y + gridCenter.y,
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
			y: 0.5*cellSize.y,
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