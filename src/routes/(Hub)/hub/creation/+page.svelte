<script lang="ts">
    import { is_post_editor } from "$lib/app";
    import { target, is_editing } from "$lib/hub/editor";
    import { onMount, type SvelteComponent } from "svelte/internal";
    import Text from "$lib/hub/editor/elements/text.svelte";
    import TextSpace from "$lib/hub/editor/elements/text_space.svelte";
    is_post_editor.set(true);
    var canvas: any = undefined;
    var aspectRatio = 1;
    var created: any;
    var created_anchor :any;
    function create_instance(anchor : string) {
      
        if ($target != null) {
            if(anchor == ""){
                anchor = "up";
            }
            created = new component_object[$target]({ target: canvas.querySelector("#"+anchor) }); 
        }
    }
    var hover = false;
    function mouse_move(event: TouchEvent) {
        const element : any = document.elementFromPoint(
            event.touches[0].clientX,
            event.touches[0].clientY
        ); 
        if (element.classList.contains("editor_hover") || element == edit_hover ) {
            if (!hover) {
                hover = true;
                create_instance(element.id);
                created_anchor=element.id;
                return;
            }
            if (created != null) {
                var rect = element.getBoundingClientRect();
                var x = (event.touches[0].clientX - rect.left) / aspectRatio;
                var y = (event.touches[0].clientY - rect.top) / aspectRatio;
                created.$set({ X: x, Y: y });
                if(created_anchor != element.id){
                    created.root.remove();
                    canvas.querySelector("#"+element.id).appendChild( created.root);
                    created_anchor = element.id;
                }
            }
        } else {
            mouse_leave();
            hover = false;
        }
    }
    function mouse_leave() {
        if (created != null) {
            created.$destroy();
            created_anchor = null;
        }
    }
    function place() {
        if (created != null) {
            created.is_placed = true;
            created = null;
            created_anchor = null;
            aspect = main.clientWidth/canvas.clientHeight*aspectRatio;
        }
    }
    var component_object: any = {};
    (async () => {
        const components = import.meta.glob(
            "$lib/hub/canvas_elements/*.svelte"
        );
        for (const componentPath in components) {
            const module: any = await components[componentPath]();
            const component = module.default;
            component_object[
                componentPath
                    .replace("/src/lib/hub/canvas_elements/", "")
                    .replace(".svelte", "")
            ] = component;
        }
    })();
    var main: any;
    var edit_hover: any;

    document.addEventListener("touchmove", mouse_move);
    document.addEventListener("touchend", place);
    $: {
        if (main != undefined) console.log(main.scrollTop);
    }
    onMount(async () => {
        function scaleContent() {
            const wrapperWidth = main.offsetWidth;
            const wrapperHeight = main.offsetHeight;
            aspectRatio = wrapperWidth / 590;

            canvas.style.transform = `scale(${aspectRatio})`;
        }
        function loop(){
            if(main != null && canvas != null){ 
                aspect = main.clientWidth/canvas.clientHeight*aspectRatio; 
            }
            setTimeout(loop,1);
        }
        window.addEventListener("resize", scaleContent);
        scaleContent();
        loop();
        return () => {
            window.removeEventListener("resize", scaleContent);
        };
    });
    var aspect = 1/1;
    function limitNumberWithinRange(num, min, max){
        const MIN = min || 1;
        const MAX = max || 20;
        const parsed = parseInt(num)
        return Math.min(Math.max(parsed, MIN), MAX)
    }
     
</script>

<div class="w-full  h-full flex justify-center items-center">
    <div
        bind:this={main}
        class="w-[590px] max-h-[760px] bg-cover   overflow-hidden relative rounded-[15px] transition-all"
        style="background-image: url(/canvas_backgrounds/canvas_background_red.png); height:{canvas != null? limitNumberWithinRange(canvas.clientHeight*aspectRatio,0,760*aspectRatio)+"px":"0"};
        {$target != null? "":"aspect-ratio: "+aspect+";"} 
        border-radius: 15px;"
    >
        <div
            bind:this={canvas}
            style="
        transform: scale(1);
        transform-origin: top left;
        "
            class="relative w-[590px]  space-y-[10px] px-[30px] py-[30px] flex items-center flex-col"
        >
            <div class="editor_anchor " id="up" />
            <div class="editor_anchor" id="midle" />
            <div class="editor_anchor" id="bottom" />
        </div>
        {#if $target != null}
            <div
                bind:this={edit_hover}
                class=" w-full h-full top-0 left-0 absolute flex flex-col"
            >
                <!-- <div class="editor_hover {created_anchor == "up"? "editor_hover_target":""}" id="up" />
                <div class="editor_hover {created_anchor == "midle"? "editor_hover_target":""}" id="midle" />
                <div class="editor_hover {created_anchor == "bottom"? "editor_hover_target":""}" id="bottom" /> -->
            </div>
        {/if}
    </div>
    <div class=" absolute rounded-[15px] overflow-hidden bottom-5 h-fit w-fit">
        <div
            class="max-w-[500px] space-x-3 bg-gray-500/80 backdrop-blur-lg flex flex-row items-center px-5 py-5"
        >
            <Text />
            <TextSpace />
        </div>
        {#if $is_editing == true}
            <div class="absolute w-full h-full z-10 top-0 left-0" />
        {/if}
    </div>
</div>
