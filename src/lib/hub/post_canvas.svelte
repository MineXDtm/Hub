<script lang="ts">
    import { is_post_editor } from "$lib/app";
    import { target, is_editing } from "$lib/hub/editor";
    import { onMount, type SvelteComponent } from "svelte/internal";
    import { portal } from "svelte-portal/src/Portal.svelte";
    import { fade } from 'svelte/transition';
    import { writable } from "svelte/store";
    is_post_editor.set(true);
    var canvas: any = undefined;
    var aspectRatio = 1;
    var created: any;
    var created_anchor: any;
    var target_anchor: any;
    function create_instance(anchor: string) {
        if ($target != null) {
            if (anchor == "") {
                anchor = "up";
            }

            created = new component_object[$target]({
                target: canvas.querySelector("#anchor"),
            });
        }
    }
    var hover = false;
    function mouse_move(event: TouchEvent) {
        const element: any = document.elementFromPoint(
            event.touches[0].clientX,
            event.touches[0].clientY
        );
        if (
            element.classList.contains("editor_hover") ||
            element == edit_hoverE
        ) {
            if (!hover) {
                hover = true;
                create_instance(element.id);
                created_anchor = element.id;
                return;
            }
            if (created != null) {
                var rect = element.getBoundingClientRect();
                var x = (event.touches[0].clientX - rect.left) / aspectRatio;
                var y = (event.touches[0].clientY - rect.top) / aspectRatio;
                created.$set({ X: x, Y: y });
                if (created_anchor != element.id) {
                    created.root.remove();
                    canvas
                        .querySelector("#anchor")
                        .appendChild(created.root);
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
            if (hover) target_anchor = created_anchor;
            created.is_placed = true;
            created = null;
            created_anchor = null;

            aspect = (main.clientWidth / canvas.clientHeight) * aspectRatio;
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

    var scale = 1;
    onMount(async () => {
        function scaleContent() {
            const wrapperWidth = main.offsetWidth;
            const wrapperHeight = main.offsetHeight;
            aspectRatio = wrapperWidth / 590;

            scale = aspectRatio;
        }
        function loop() {
            if (main != null && canvas != null) {
                aspect = (main.clientWidth / canvas.clientHeight) * aspectRatio;
            }
            setTimeout(loop, 1);
        }
        window.addEventListener("resize", scaleContent);
        scaleContent();
        loop();
        image.subscribe((value) => {
            image_height = null;
        });
        return () => {
            window.removeEventListener("resize", scaleContent);
        };
    });
    var aspect = 1 / 1;
    function limitNumberWithinRange(num: any, min: any, max: any) {
        const MIN = min || 1;
        const MAX = max || 20;
        const parsed = parseInt(num);
        return Math.min(Math.max(parsed, MIN), MAX);
    }

    export var image = writable("");
    export var background = writable("red");
    var image_element: any;
    var image_height: any;

    var max_height = 720;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div
    bind:this={main}
    class="max-w-[590px] w-full relative transition-all flex justify-center items-center overflow-hidden"
    style=" height:{canvas != null
        ? limitNumberWithinRange(
              canvas.clientHeight * aspectRatio,
              0,
              max_height * aspectRatio
          ) + 'px'
        : '0'}; {$target != null ? '' : 'aspect-ratio: ' + aspect + ';'} "
>
    {#if $image == ""}
        <div  
            class="bg-cover rounded-[15px] w-full h-full absolute top-0 left-0"
            style="
            background-image: url(/canvas_backgrounds/canvas_background_{$background}.png);"
        />
    {/if}
    <div class="w-full h-full overflow-hidden">
        {#if $image != ""}
            <img 
                on:load={() => {
                    console.log(image_element.clientWidth);
                    image_height = image_element.clientHeight;
                }}
                bind:this={image_element}
                alt=""
                src={$image}
                width="590"
                class="min-w-[590px] object-cover object-center absolute"
                style="
            transform: scale({aspectRatio});
            transform-origin: top left;
            height:{max_height}px;"
            />
        {/if}

        <div
            bind:this={canvas}
            style="
                transform: scale({aspectRatio});
                transform-origin: top left;
                {image_height != null
                ? ' height:' +
                  limitNumberWithinRange(image_height, 0, max_height) +
                  'px;'
                : ''}
            "
            class="relative w-[590px] px-[30px] py-[30px] flex items-center flex-col"
        >
            <div
                class=" w-full editor_anchor 
                {
                    target_anchor == 'midle' ||
                    created_anchor == 'midle'
                        ? 'justify-center '
                        : ''
                }
                {
                    target_anchor == 'bottom' ||
                    created_anchor == 'bottom'
                        ? 'justify-end '
                        : ''
                }
                "
                id="anchor"
            />
        </div>
    </div>
    {#if $is_editing && $target != null}
        <div
            bind:this={edit_hover}
            class=" w-full h-full top-0 left-0 absolute flex flex-col"
        >
            {#if $image != ""}
                <div
                    class="{target_anchor == 'up' || target_anchor == null
                        ? 'editor_hover'
                        : ''} {created_anchor == 'up' && target_anchor == null
                        ? 'editor_hover_target'
                        : ''}"
                    id="up"
                />
                <div
                    class="{target_anchor == 'midle' || target_anchor == null
                        ? 'editor_hover'
                        : ''}  {created_anchor == 'midle' &&
                    target_anchor == null
                        ? 'editor_hover_target'
                        : ''}"
                    id="midle"
                />
                <div
                    class="{target_anchor == 'bottom' || target_anchor == null
                        ? 'editor_hover'
                        : ''}  {created_anchor == 'bottom' &&
                    target_anchor == null
                        ? 'editor_hover_target'
                        : ''}"
                    id="bottom"
                />
            {/if}
        </div>
    {/if}
</div>
