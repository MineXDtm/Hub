<script lang="ts">
    
    import "./style.css";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import {is_post_editor} from "$lib/app";
    import { onMount } from "svelte";
    import { target,is_editing } from "$lib/hub/editor"; 
    import {
        token,
        token_id,
        account_id,
        getAccountData,
        logout,
        update_data,
    } from "$lib/session";
  
    update_data();
    let pagename = $page.url.pathname.substr(
        $page.url.pathname.lastIndexOf("/")
    );
    $: pagename = $page.url.pathname.substr(
        $page.url.pathname.lastIndexOf("/")
    );
    var IsLoggedIn = false;
    if (token != undefined) IsLoggedIn = true;
    var popup_acc = false;
    var userdata : any = undefined;
    onMount(async () => {
        userdata = await getAccountData(account_id);
    });
    var NavMenu_Visible = false;

    onMount(() => {
        document.addEventListener("keydown", (event) => {
            if (event.keyCode === 81) {
                NavMenu_Visible = !NavMenu_Visible;
            }
        });
    });

    function navigate(path : any) {
        goto(path);
        NavMenu_Visible = false;
        
    }
    
 

</script>

<svelte:head>
    <title>А?</title>
</svelte:head>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class=" h-screen w-full flex flex-col">
    <div
        class="relative w-screen h-screen py-[10px] items-center flex flex-col space-y-[10px] text-white overflow-hidden"
        style="background: conic-gradient(from 0deg at 50% 110.73%, #EBEBEB -60deg, #EBE6FF 48.24deg, #EBEBEB 300deg, #EBE6FF 408.24deg);"
    >
        <div class="flex-grow overflow-y-auto w-full flex justify-center">
            <div class="  w-full space-y-[10px]">
                <slot />
            </div>
        </div>
        {#if $is_post_editor == false}
        <div
            class="group absolute rounded-[28px] overflow-hidden bottom-5 h-[45px] w-fit"
            style="background-image: conic-gradient(from 240deg at 76.59% 35.56%, rgba(68, 68, 68, 0.45) -26.25deg, rgba(68, 68, 68, 0.45) 20.63deg, #8000FF 120deg, #BBEBFF 240deg, rgba(68, 68, 68, 0.45) 333.75deg, rgba(68, 68, 68, 0.45) 380.62deg);"
        >
            <div
                class="absolute  backdrop-blur-[10px] w-full h-full  left-0"
            />
            <img src="/noise.png" class="w-full h-full absolute left-0 object-cover opacity-[0.20]"/>
            <div
                class="relative h-full space-x-[10px] px-[16px] flex items-center cursor-pointer"
                on:click={() => {
                    NavMenu_Visible = true;
                }}
            >
                <div
                    class=" rounded-[4px] flex justify-center items-center border-white/[0.75] border-[2.5px] w-[24px] h-[24px] opacity-[0.25]"
                >
                    <p
                        class=" select-none text-white/[0.75]  pointer-events-none"
                    >
                        Q
                    </p>
                </div>
                <p
                    class="SegoeUI_Semibold  text-white/[0.75]  select-none pointer-events-none"
                >
                    Navigate
                </p>
                {#if userdata != null}
                    <img
                        draggable={false}
                        src={"data:image/png;base64," + userdata.icon}
                        class="  rounded-full select-none transition-transform border-white border-2 hover:scale-125 "
                        alt=""
                        width={29}
                        height={29}
                    />
                {/if}
            </div>
        </div>

        <div
            class=" absolute bottom-0 bg-black/70 w-[830px] backdrop-blur-[60px] rounded-t-[25px] flex flex-col space-y-[10px]"
            style="transition: all 0.2s ease-in-out; overflow: hidden; 
                height:{NavMenu_Visible ? '490px' : '0'}; 
                padding:{NavMenu_Visible ? '20px' : '0'}; "
        >
            <div
                class="flex flex-row space-x-[10px] opacity-50 cursor-pointer"
                on:click={() => {
                    NavMenu_Visible = false;
                }}
            >
                <div
                    class="rounded-[4px] flex justify-center items-center border-white border-[2.5px] w-[24px] h-[24px] opacity-[0.25]"
                >
                    <p class="text-[20px]">Q</p>
                </div>
                <p class=" opacity-[0.25]">To Hide Navigation</p>
            </div>
            
            <div class="w-full flex-grow px-[15px] py-[10px] space-y-[25px]">
                <div class="w-full h-[170px] flex flex-col">
                    <p class="text-[20px]">Categories</p>
                    <div
                        class="w-full flex-grow pt-[25px] flex flex-row space-x-[10px]"
                    >
 
                    </div>
                </div>
            </div>
        </div>
 
        {/if}
    </div>
</div>
