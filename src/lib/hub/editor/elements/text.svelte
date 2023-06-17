<script lang="ts">
    import text from "$lib/hub/editor/elements/text.svelte";
    import { target } from "$lib/hub/editor.js";
    export var X = 0;
    export var Y = 0;
    export var dragged = false;
    function is_dragged(event : any) {
        
        if (dragged) return;
        document.getSelection().removeAllRanges();
        const component = new text({
            target: document.body,
            props: { X: event.clientX, Y: event.clientY, dragged: true },
        });
        target.set("text");
        document.addEventListener("touchend", () => {
            component.$destroy();
            target.set(null);
        });
    }
    function mouse_move(event : TouchEvent) {
 
        X = event.touches[0].clientX;
        Y = event.touches[0].clientY;
    }
    if (dragged) {
        
        document.addEventListener("touchmove", mouse_move);
    }
</script>

<div
    draggable="false"
    on:touchstart={is_dragged}
    class="w-[100px] transition-transform h-[45px] bg-white flex justify-center items-center rounded-md {dragged
        ? 'fixed scale-75 shadow-xl pointer-events-none select-none'
        : 'active:scale-125'}"
    style="left: {dragged ? X - 50 + 'px' : '0'}; top: {dragged
        ? Y - 22.5 + 'px'
        : '0'};"
>
    <p
    draggable="false"
        style="
            background: linear-gradient(258.83deg, #00C2FF 0%, #1AA4CF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
    "
        class=" text-[20px] SegoeUI_Bold select-none pointer-events-none"
    >
        TEXT
    </p>
</div>
