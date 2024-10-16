<script lang='ts'>

    import { Button, Toggle, Label, Select, Input, Hr } from 'flowbite-svelte';
    import {TrashBinOutline, CirclePlusOutline, FileExportOutline, EditOutline, RefreshOutline, FileImageOutline} from 'flowbite-svelte-icons';
	import EditLabel from './EditLabel.svelte';
	import Grid from './Shared/Grid.svelte';
    import {onMount} from 'svelte';

	import DragArrow from './DragArrow.svelte';
    import { Stage, Layer, Image} from 'svelte-konva';

    import type { TaoItem, VectorArrow, Force, Pt } from '$lib/forceTypes';

    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
    // import html2canvas from 'html2canvas';

    // import { position } from 'html2canvas/dist/types/css/property-descriptors/position';

    let name: string = 'Free Body Diagram Component';

    export let width:number = 500;
    export let height:number = 500;
    let gridCenter: number = width/2.0;
    let gridNum: number = 10;
    let cellSize: number = width/(gridNum + 1);

	export let showNetForce: boolean = false;
    export let showControlButtons: boolean = true;

    
    const colorList = ['red', 'green', 'blue', 'purple', 'orange', 'brown', 'pink', 'cyan', 'magenta', 'yellow'];
		// brown and magenta need work

        const colorVariants: { [key: string]: string } = {
		red: 'bg-red-500',
		green: 'bg-green-500',
		blue: 'bg-blue-500',
		purple: 'bg-purple-500',
		orange: 'bg-orange-500',
		black: 'bg-black-500',
		brown: 'bg-brown-500',
		pink: 'bg-pink-500',
		cyan: 'bg-cyan-500',
		magenta: 'bg-magenta-500',
		yellow: 'bg-yellow-200',
	};

    let fontColorList: string[] = [];
    for (let i = 0; i < colorList.length; i++) {
        fontColorList.push('bg-' + colorList[i] + '-500');
    } 

    let netForce: Force = {
		id: -1,
		symbol: 'F_net',
		type: 'Net Force',
		agent: '-',
		object: 'System',
		color: 'black',
		components: {
			x: 0,
			y: 0,
		},
		draggable: false,
		editText: false,
	};

    export let forceList: Force[] = [];
	let lastForceId:number = forceList.length;

	let addNewForce = (comps: Pt) => {
		console.log("Adding new force with components = " + JSON.stringify(comps));
		let newForce: Force = {
			id: lastForceId++,
			symbol: 'F',
			type: 'Enter Type',
			agent: 'Enter Agent',
			object: 'Enter Object',
			components: comps,
			color: colorList[(lastForceId-1) % colorList.length],
			draggable: true,
			editText: false,
		};
		forceList = [...forceList, newForce];

		forceList.forEach((force) => {
			console.log("Force id = " + force.id + " and components = " + JSON.stringify(force.components));
		});	
	}


	$: {
		netForce.components.x = 0;
		netForce.components.y = 0;
		forceList.forEach((force) => {
			netForce.components.x += force.components.x;
			netForce.components.y += force.components.y;
		});
	}


	function removeForce(forceId:number) {
		console.log("Removing force with id = " + forceId);
        forceList = forceList.filter(force => force.id !== forceId);
    }


	const deleteAll = () => {
		forceList = [];
		lastForceId = 0;
	}

    
	const getCompsFromEvt = (evt:CustomEvent) => {
		let comps = {
			x: Math.round((evt.detail.evt.layerX - gridCenter) / cellSize),
			y: -Math.round((evt.detail.evt.layerY - gridCenter) / cellSize),
		};
		return comps;
	};


	let FBDLabel:string = 'Free Body Diagram';
	let editFBDLabel: boolean = false;

	const handleCloseInput = (key:string, flag:boolean) => {
		console.log("Key pressed = " + key);
		if (key == 'Enter')
			flag = false;
	}

    let image:HTMLImageElement;
    onMount(() => {
        const img = document.createElement("img");
        img.src = "/jumper.jpg";
        img.onload = () => {
            image = img;
        };

        console.log(img);
    });

</script>


<div id='fbd-label' class='w-3/4 mx-auto text-2xl font-bold flex flex-col rounded-xl border-1 my-4'>
    <EditLabel text='FBD Title' size='xl2' {showControlButtons}/>
     <!-- <div contenteditable="true">{FBDLabel}</div> -->
</div>

<div class='flex flex-row flex-wrap'>
    <div id='fbd' class='px-4 flex flex-col'>
        <div id='fbd-label' class='w-full flex-row ml-4 text-lg font-bold flex flex-row rounded-xl border-1 space-around'>
            <span>Free Body Diagram</span>
            <Button><FileImageOutline/></Button>
        </div>
        <Stage config={{width, height, id:'main_stage'}}
            on:dblclick={(evt) => {
                let comps = getCompsFromEvt(evt);
                console.log(comps);
                addNewForce(comps);
            }}>
            <Layer>
                <Image config={{ image, draggable:true }} />
            </Layer>
            <Grid {width} {height} gridNum={{x:10, y:10}} label={''}></Grid>
            <Layer config={{id:'arrow_layer'}}>
                {#each forceList as force (force.id)}
                    <DragArrow
                        strokeColor={force.color}
                        draggable={force.draggable}
                        id={force.id}
                        cellSize={cellSize}
                        gridCenter={gridCenter}
                        snapToGrid={true}
                        bind:comps={force.components}
                    />
                {/each}
                {#if showNetForce}
                    <DragArrow
                        strokeColor={netForce.color}
                        strokeSize={6}
                        draggable={false}
                        id={netForce.id}
                        cellSize={cellSize}
                        gridCenter={gridCenter}
                        snapToGrid={true}
                        opacity={0.5}
                        bind:comps={netForce.components}
                    />
                {/if}
            </Layer>
        </Stage>
    </div>
    <div id="tao-chart" class='max-w-lg px-4 top-0 flex-auto'>
        <div id='fbd-label' class='mx-auto text-lg font-bold flex flex-row rounded-xl border-1'>
            <p>TAO Chart</p>
        </div>
        {#if forceList.length == 0}
            <div class='mx-auto my-4 p-2 text-xl font-bold rounded-xl border-1'>
                <p>No Forces Yet</p>
                <p class='text-sm'>Add a force by double clicking on the FBD or clicking the button below</p>
            </div>
        {:else}
        <div id='tao-title' class= " p-2.5 m-1 gap-2 font-bold rounded-xl my-auto grid grid-cols-[0.25fr_1fr_2fr_2fr_2fr_0.25fr]">
            <p></p>
            <p class='justify-center mx-auto'>Symbol</p>
            <p class='justify-center mx-auto'>Type</p>
            <p class='justify-center mx-auto'>Agent</p>
            <p class='justify-center mx-auto'>Object</p>
            <p></p>
        </div>
        {/if}
        <div id='tao-items' class=''>
            {#each forceList as force (force.id)}
            <div id='tao-item' class= {`${colorVariants[force.color]} p-2.5 m-1 gap-2 font-bold rounded-xl grid grid-cols-[0.25fr_1fr_2fr_2fr_2fr_0.25fr] w-full`}>
                <Button color="red" class="mb-0 p-0 w-0"
                        on:click={() => {
                            force.editText = !force.editText;
                        }}
                        size="xs"
                    >
                        <EditOutline/>
                    </Button>
                    {#if force.editText}
                        <Input id='tao-symbol' bind:value={force.symbol} placeholder="Symbol" class='my-auto'
                            on:keydown={(evt) => { if (evt.key == 'Enter') { force.editText = false;}}}
                        />
                        <Input id='tao-type' bind:value={force.type} class='my-auto'
                            on:keydown={(evt) => { if (evt.key == 'Enter') { force.editText = false;}}}
                        />

                        <Input id='tao-agent' bind:value={force.agent} class='my-auto'
                            on:keydown={(evt) => { if (evt.key == 'Enter') { force.editText = false;}}}

                        />
                        <Input id='tao-object' bind:value={force.object} class='my-auto'
                            on:keydown={(evt) => { if (evt.key == 'Enter') { force.editText = false;}}}
                        />
                    {:else}
                        <div class='mx-auto' on:dblclick={()=>{force.editText = true}}>{force.symbol}</div>
                        <div class='mx-auto' on:dblclick={()=>{force.editText = true}}>{force.type}</div>
                        <div class='mx-auto' on:dblclick={()=>{force.editText = true}}>{force.agent}</div>
                        <div class='mx-auto' on:dblclick={()=>{force.editText = true}}>{force.object}</div>
                        
                    {/if}
                    <Button color="red" class="mb-0 p-0 w-0"
                        on:click={() => removeForce(force.id)}
                    >
                        <TrashBinOutline/>
                    </Button>
                </div>
            {/each}
            <Button outline class='w-full'
                on:click={() => {
                    addNewForce({x:1, y:1});
                }}>
                <CirclePlusOutline/> Add New Force
            </Button>
            {#if showNetForce}
            <Hr classHr="w-48 h-1 mx-auto my-7 rounded md:my-10"> = </Hr>
            <div id='netForce-item' class='mt-4 p-4 w-full inline-flex flex-row justify-center font-bold text-xl mx-auto bg-gray-500 text-white rounded-xl'>
                    <div>Net Force
                        {#if (netForce.components.x == 0 && netForce.components.y == 0)}
                            = 0
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
