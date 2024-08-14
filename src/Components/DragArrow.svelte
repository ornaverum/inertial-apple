<script lang="ts">
    export let id: number = 0;
    export let snapToGrid: boolean = false;
    export let cellSize: number = 10;
    export let gridCenter: number = 0;
    export let strokeColor: string = 'black';
    export let draggable: boolean = true;
    export let comps: {x: number, y: number} = {x: 0, y: 0};
    export let strokeSize: number = 4;
    export let opacity: number = 0.8;
    import {onMount} from 'svelte';

    import { Group, Arrow, Circle} from 'svelte-konva';

    type Pt = {
        x: number,
        y: number,
    };

    let pos0: Pt = { x: gridCenter, y: gridCenter };
    let pos1: Pt = { x: 0, y: 0 };
    let snappedPos1: Pt = { x: 0, y: 0 };
    let arrowHead;

    function updatePositions() {
        pos1 = { x: comps.x * cellSize + gridCenter, y: -comps.y * cellSize + gridCenter };
        snappedPos1 = { x: Math.round(pos1.x), y: Math.round(pos1.y) };
    }

    function updateComponents(){
        comps = { x: Math.round((pos1.x - gridCenter) / cellSize), y: -Math.round((pos1.y - gridCenter) / cellSize) };
    }

    onMount(() => {
        console.log("DragArrow mounted with comps = " + JSON.stringify(comps) + " + pos1 = " +   JSON.stringify(pos1) + ' and snappedPos1 = ' + JSON.stringify(snappedPos1));
        updatePositions();
    });
    
    $: if (comps)
        updatePositions();

    $: arrowConfig = {
        points: [pos0.x, pos0.y, snappedPos1.x, snappedPos1.y],
        pointerLength: 10,
        pointerWidth: 10,
        fill: strokeColor,
        stroke: strokeColor,
        strokeWidth: strokeSize,
        opacity: opacity,
    };

    $: circlePointConfig = {
        x: snappedPos1.x,
        y: snappedPos1.y,
        radius: 8,
        fill: strokeColor,
        opacity: opacity,
    };

</script>

    <Group>
        <Circle config={{
            x: pos0.x,
            y: pos0.y,
            radius: 5,
            fill: 'black',
            opacity: 0.5
        }}/>

            {#if !(comps.x == 0 && comps.y == 0)}
                <Arrow config={arrowConfig}
                    bind:this={arrowHead}
                />
            {:else}
                <Circle config={circlePointConfig}
                    bind:this={arrowHead}
                />
            {/if}


        

        {#if draggable}
            <Circle config={{
                x: snappedPos1.x,
                y: snappedPos1.y,
                radius: cellSize,
                draggable: { draggable},
            }}
            
            on:dragmove={(event) => {
                const nd = event.detail.target;
                let pos = nd.getAbsolutePosition();
                const stg = event.detail.target.getStage();
                
                pos.x = Math.max(0, Math.min(stg.attrs.width-cellSize, pos.x));
                pos.y = Math.max(0, Math.min(stg.attrs.height-cellSize, pos.y));
                pos1= {...pos};
                updateComponents();
            }}
            />
        {/if}
    </Group>