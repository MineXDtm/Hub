<script lang="ts">
    import { is_post_editor } from "$lib/app";
    import { target, currect_options, is_editing } from "$lib/hub/editor";
    import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
    import { onMount, type SvelteComponent } from "svelte/internal";
    import Text from "$lib/hub/editor/elements/text.svelte";
    import TextSpace from "$lib/hub/editor/elements/text_space.svelte";
    import PostCanvas from "$lib/hub/post_canvas.svelte";
    import { writable } from "svelte/store";
    
    var image = writable("");
    var background = writable("red");
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="w-full h-full flex justify-end items-center flex-col space-y-5">
    <div
        class="flex justify-center items-center max-w-[590px] w-full min-h-0 overflow-hidden rounded-[15px]"
    >
        <PostCanvas bind:image={image} bind:background={background} />
    </div>
    <div class="shrink-0 h-[100px] w-fit flex justify-center items-center">
        {#if $is_editing == true}
            <div
                class="rounded-[15px] max-w-[500px] space-x-3 bg-gray-500/80 backdrop-blur-lg flex flex-row items-center p-3"
            >
                <div
                    on:click={() => {
                        is_editing.set(false);
                        currect_options.set(null);
                    }}
                    class=" w-[45px] h-[45px] bg-white rounded-[15px] flex justify-center items-center transition-transform hover:scale-110 active:scale-75 shrink-0"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="32"
                        viewBox="0 -960 960 960"
                        width="32"
                        ><path
                            d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
                        />
                    </svg>
                </div>
                <TextSpace />
                <Text />
            </div>
        {:else}
            <div class="w-fit flex flex-row space-x-4 justify-center items-center">
                <div
                    on:click={() => {
                        is_editing.set(true);
                    }}
                    class=" w-[45px] h-[45px] bg-white rounded-[15px] flex justify-center items-center transition-transform hover:scale-110 active:scale-75 shrink-0"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="32"
                        viewBox="0 -960 960 960"
                        width="32"
                        ><path
                            d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
                        /></svg
                    >
                </div>
                <div
                    on:click={async ()=>{
                    
                        const image_ = await Camera.getPhoto({
                            quality: 100,   
                            resultType: CameraResultType.Uri
                        });
                        var imageUrl = image_.webPath;
                        if(imageUrl!= null) image.set(imageUrl);
                     
                    }}
                    class="option_background"
                    style="background-image: url(/nevaadaa.png);"
                />
                <div
                    on:click={()=>{image.set("");background.set("red");}}
                    class="option_background"
                    style="background-image: url(/canvas_backgrounds/canvas_background_red.png);"
                />
                <div
                    on:click={()=>{image.set("");background.set("pink");}}
                    class="option_background"
                    style="background-image: url(/canvas_backgrounds/canvas_background_pink.png);"
                />
            </div>
        {/if}
    </div>
</div>
