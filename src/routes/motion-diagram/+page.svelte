<script lang="ts">
	import MotionDiagram from './../../Components/MotionDiagram.svelte';
	import type { Dot, VectorArrow, MD } from '../../Components/kinematicsTypes';

	import { Stage, Layer, Line, Circle, Arrow} from 'svelte-konva';
	import html2canvas from 'html2canvas';

    import { Label, Select, Input, Button, Toggle } from 'flowbite-svelte';
    import {TrashBinOutline, FileExportOutline, CirclePlusOutline} from 'flowbite-svelte-icons';

	export let name: string = 'Motion Diagram';
	let showControlButtons: boolean = true;

	let width = 800;
    let height = 100;

	let mdArray: MD[] = [];
	let id_ind = 0;

	const defaultMD: MD = {
		id: id_ind,
		width: width,
		height: height,
		title: 'MD',
		gridNum: 30,
		marginY: 5,
		posList: [],
		velList: [],
		accList: [],
	};


	const addNewMD = () => {
		let md = {...defaultMD, id: id_ind++};
		mdArray = [...mdArray, md];
	}

	let divToCapture: HTMLDivElement;

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
		mdArray = mdArray.filter(md => md.id !== e.detail.id);
	}

	addNewMD();

</script>

<main class="flex flex-col justify-center p-4">
	<div id='button-group' class = 'flex flex-row p-4'>
		<Button on:click={saveDivAsImage}><FileExportOutline/></Button>
		<Toggle bind:checked={showControlButtons}>Show Control Buttons</Toggle>
	</div>
	<div id='capture' bind:this={divToCapture} class='w-max mx-auto'>
		<ul class='list-none'>
			{#each mdArray as md}
				<li>
					<MotionDiagram on:deleteMe={handleDelete} {...md} bind:posList={md.posList} bind:accList={md.accList} {showControlButtons}/>
				</li>
			{/each}
		</ul>
	</div>
	<Button on:click={()=>addNewMD()}><CirclePlusOutline/>Add New Diagram</Button>	

</main>
