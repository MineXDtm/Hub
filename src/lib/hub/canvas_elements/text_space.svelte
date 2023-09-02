<svelte:options accessors />

<script lang="ts">
    import { onMount } from "svelte";
    import { target, currect_options, is_editing } from "$lib/hub/editor";
    import Top_level from "$lib/hub/canvas_elements/text/top_level.svelte";
    
    import { v4 as uuidv4 } from "uuid";
 
    export var X = 0;
    export var Y = 0;

    export var is_placed = false;
    export var edit = false;
    export var options = false;
    export var id = uuidv4();
    export var content = "Cats Are Cool!";
    function onclick(event) {
        if (edit || !$is_editing ) return;
        options = !options;
        if (options) currect_options.set(id);
        else currect_options.set(null);
    }
 
    var rect_;
    onMount(() => {
        function loop() {
            if (main != undefined) {
                rect_ = root.getBoundingClientRect();
               
            }
            setTimeout(loop, 10);
        }
        loop();
    });
    currect_options.subscribe((value) => {
        if (value != id && options) {
            options = false;
        }
    });
    target.subscribe((value) => {
        if (target != null && options) {
            options = false;
        }
    });
    export var main :any = undefined;
    export var root :any = undefined;
 
    $: {
        if (main != undefined) {
            if (content.length == 0 && !edit) {
                root.remove();
            } else {
                main.innerText = content;
            }
        }
    }
</script>
 

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    style="left: {X + 'px'}; top:{Y + 'px'};"
    class="!m-0  max-w-full" 
    bind:this={root}
>
    <p
        bind:this={main}
        on:click={onclick}
        contenteditable={edit}
        class="  max-w-full w-fit h-auto
          text-[64px] SegoeUI_Black bg-cover drop-shadow-[0_2px_8px_rgb(0,0,0,0.15)] outline-2 rounded-[15px] break-words {edit
            ? '   outline-white '
            : '   select-none outline-none'}
               {options ? ' !outline-black  ' : ''}
            {is_placed ? ' ' : 'pointer-events-none opacity-50'}"
        style="outline-style: solid; background-image: url(/canvas_elements/space/noise_blue_space_text.png);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;"
    >
       
    </p>
 
</div>
 
<Top_level bind:content={content} rect={rect_} bind:edit={edit} bind:options={options} {root} />