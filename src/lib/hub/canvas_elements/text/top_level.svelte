<svelte:options accessors/>
<script lang="ts">
    import Options_button from "$lib/hub/editor/options_button.svelte";
    import { portal } from "svelte-portal/src/Portal.svelte";
    export var options = false;
    export var edit = false;
    export var top_options_size_y = 0;
    export var top_options_size_x = 0;
    export var bottom_options_size_y = 0;
    export var bottom_options_size_x = 0;
    export var rect: any = null;
    export var root: any = null;
    export var content: string = ""; 
    export var root_top;
</script>

{#if root != null && root != null}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div bind:this={root_top} use:portal={"body"}>
        {#if options == true}
            <div
                bind:clientHeight={top_options_size_y}
                bind:clientWidth={top_options_size_x}
                class="fixed z-10 left-0 -top-10 flex flex-row space-x-2"
                style="top left; left: {rect.left + 'px'}; top:{rect.top -
                    top_options_size_y +
                    'px'};"
            >
                <div
                    on:click={() => {
                        options = false;
                        edit = true; 
                    }}
                    class="options_button ml-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="25"
                        viewBox="0 -960 960 960"
                        width="25"
                        ><path
                            d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
                        /></svg
                    >
                </div>

                <div
                    on:click={() => {
                        root.remove();
                        root_top.remove();
                    }}
                    class="options_button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="25"
                        viewBox="0 -960 960 960"
                        width="25"
                        ><path
                            d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"
                        /></svg
                    >
                </div>
            </div>
        {/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        {#if edit == true}
            <div
                class="fixed z-20 top-0 left-0 w-screen h-screen bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center"
            >
                <div
                    class=" max-w-[580px] p-7 w-full h-full flex justify-center items-center flex-col space-y-8"
                >
                    <div class="max-w-[580px] w-full flex justify-end">
                        <div
                            on:click={() => {
                                content = " ";
                            }}
                            class=" w-[35px] h-[35px] active:scale-x-125 transition-transform"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                viewBox="0 -960 960 960"
                                ><path
                                    fill="white"
                                    d="M600-230v-60h145v60H600Zm0-368v-60h280v60H600Zm0 184v-60h235v60H600ZM125-675H80v-60h170v-45h135v45h170v60h-45v415q0 24-18 42t-42 18H185q-24 0-42-18t-18-42v-415Zm60 0v415h265v-415H185Zm0 0v415-415Z"
                                /></svg
                            >
                        </div>
                    </div>
                    <p
                        bind:innerHTML={content}
                        class="text-white bg-white/10 p-4 rounded-[15px] max-w-full max-h-[60%] overflow-auto text-[20px] hover:outline-none"
                        contenteditable="plaintext-only"
                    >
                        Cats are making headlines for various reasons, from
                        being shaved in attacks to being rescued from car
                        engines and recycling plants. Some cats are also helping
                        children read stories and boosting campus wellbeing.
                        Cats are truly amazing animals!😻
                    </p>
                    <Options_button
                        onclick={() => {
                            edit = false; 
                        }}
                        title="Done"
                    />
                </div>
            </div>
        {/if}

        <!-- <div
    use:portal={"body"} 
    bind:clientHeight={bottom_options_size_y}
    bind:clientWidth={bottom_options_size_x}
    class="fixed z-10 left-0 -top-10 flex flex-row space-x-4"
    style="left: {rect.left + 'px'}; top:{rect.bottom + 10 + 'px'};"
    >
 
    </div> -->
    </div>
{/if}
