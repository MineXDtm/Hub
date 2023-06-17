<script>
    import { isdragging } from "$lib/app.js";
    import PostFeed from "./post_feed.svelte";
 
    export var posts = [];
    let startX = 0;
    let startScrollLeft = 0;
    let lastScrollLeft = 0;
    let speed = 0;
    let rafId = null;
    var scollable = undefined;

    var ismoved = false;

    function handleMouseDown(event) {
        startX = event.clientX;
        startScrollLeft = scollable.scrollLeft;
        document.getSelection().removeAllRanges();
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    }

    function handleMouseMove(event) {
        const dx = event.clientX - startX;
        document.body.classList.add("isdragging");

        isdragging.set(true);
        scollable.scrollLeft = startScrollLeft - dx;
        ismoved = true;
        // Рассчитываем скорость перемещения мыши
        speed = dx - lastScrollLeft;
        lastScrollLeft = dx;
    }

    function handleMouseUp() {
        document.body.classList.remove("isdragging");
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        isdragging.set(false);

        if (!rafId && ismoved) {
            rafId = requestAnimationFrame(scrollWithSpeed);
            ismoved = false;
        }
    }

    function scrollWithSpeed() {
        if ($isdragging) {
            rafId = undefined;
            speed = 0;
            return;
        }
        const speedFactor = Math.min(Math.abs(speed), 5);
        scollable.scrollLeft -= speed * speedFactor;

        // Останавливаем скроллирование, когда скорость падает до нуля
        if (Math.abs(speed) > 1) {
            speed *= 0.65;
            rafId = requestAnimationFrame(scrollWithSpeed);
        } else {
            rafId = null;
        }
    }
</script>

<div
    class="relative flex flex-col shrink-0 space-y-[10px] p-[15px]"
    on:mousedown={handleMouseDown}
>
    <div class="w-full h-full absolute top-0 left-0 rounded-[15px]" />
    <div
        class="relative px-[25px] py-[10px] space-x-[25px] w-[300px] bg-[#00A45F]/25 rounded-[15px] h-fit flex flex-row items-center justify-center"
    >
         <div class="flex flex-row items-center space-x-[10px]">
            <img src="/hub/icons/popular_category.svg" />
            <p class="text-[20px] text-[#01F58F] SegoeUI_Bold">Popular</p>
         </div>
        <div class="flex-grow h-[25px] flex justify-end items-center">
            <div class="w-[25px] h-[25px] flex justify-center items-center ">
                <img src="/hub/icons/arrow_goto.svg" class="opacity-25" />
            </div>
        </div>
    </div>
    
    <div
        bind:this={scollable}
        class="relative inline-flex overflow-hidden space-x-[45px] w-full grow pr-[15px] pl-[15px] pt-[25px] pb-[25px]"
    >
      <PostFeed/>
      <PostFeed/>
      <PostFeed/>
      <PostFeed/>
      <PostFeed/>
      <PostFeed/>
    </div>
</div>
