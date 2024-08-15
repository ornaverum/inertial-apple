<script lang='ts'>

    import { Label, Input, Button } from 'flowbite-svelte';
    import { EditOutline } from 'flowbite-svelte-icons';

    import {onMount} from 'svelte';
    export let text: string = 'Title';
    export let size = 'xl';
    export let showControlButtons: boolean = true;
    let editing: boolean = false;

    let sizes = {
        xl2: {text: 'text-3xl', btn: 'lg'},
        xl: {text: 'text-2xl', btn: 'lg'},
        lg: {text: 'text-xl', btn: 'md'},
        md: {text: 'text-lg', btn: 'sm'},
        sm: {text: 'text-md', btn: 'xs'},
        xs: {text: 'text-sm', btn: 'xs'},
    };


    let fontSize:string;
    let btnSize:string;

    onMount(() => {
        fontSize = sizes[size]['text'];
        btnSize = sizes[size]['btn'];
    });



</script>

<div id='fbd-label' class='{fontSize} font-bold flex flex-row rounded-xl border-1'

    >
    {#if showControlButtons}
        <Button color='light' class='p-0 mx-1' size='xs' on:click={()=>{editing = !editing}}>
            <EditOutline size='xs'/>
        </Button>
    {/if}
    {#if editing && showControlButtons}
        <Input bind:value={text} placeholder="Free Body Diagram" size={fontSize}
            on:keydown={(evt) => { if (evt.key == 'Enter') { editing = false;}}}
        />
    {:else}
        <p on:dblclick={()=>{editing = true;}}>{text}</p>
    {/if}
</div>
