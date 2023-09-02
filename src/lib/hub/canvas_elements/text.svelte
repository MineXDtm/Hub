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
    export var content = `Cats are making headlines for various reasons, from being shaved in attacks to being rescued from car engines and recycling plants. Some cats are also helping children read stories and boosting campus wellbeing. Cats are truly amazing animals!😻`;
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
    export var main: any = undefined;
    export var root: any = undefined;

    $: {
        if (main != undefined) {
            if (content.length == 0 && !edit) {
                root.remove();
            } else {
                main.innerText = content;
            }
        }
    }
    export var main_size_x = 0;
    export var main_size_y = 0;
    var is_absolute = false;
    var root_top : any;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    bind:clientHeight={main_size_y}
    bind:clientWidth={main_size_x}
    style="left: {is_absolute?  X - (main_size_x / 2) + 'px':"0"}; top:{is_absolute? Y -
        (main_size_y / 2) +
        'px':"0"};"
    class="max-w-full  !m-0"
    bind:this={root}
>
    <p
        bind:this={main}
        on:click={onclick}
        class="  max-w-full w-fit h-auto

           text-[24px] drop-shadow-[0_2px_8px_rgb(0,0,0,0.25)] text-white font-semibold SegoeUI_Semibold p-2 rounded-[15px] break-words {edit
            ? '   outline-white '
            : '   select-none outline-none'}
               {options ? ' !outline-black  ' : ''}
            {is_placed ? ' ' : 'pointer-events-none opacity-50'}"
        style="outline-style: solid;"
    />
    
</div>
<Top_level bind:root_top={root_top} bind:content rect={rect_} bind:edit bind:options {root} />

 