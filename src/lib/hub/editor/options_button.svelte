
<script>
    export var onclick = ()=>{};
    export var title = "Title";
 
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    on:click={onclick}
class=" px-5 py-3 bg-white cursor-pointer rounded-[15px] shadow-xl flex justify-center items-center transition-transform hover:scale-110 active:scale-75"
>
    <p class="pointer-events-none select-none">{title}</p>
</div>