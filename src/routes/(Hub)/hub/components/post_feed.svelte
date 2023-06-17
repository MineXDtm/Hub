<script>
    export var subcontext = ` Cats are making headlines for various reasons, from being shaved in
            attacks to being rescued from car engines and recycling plants. Some
            cats are also helping children read stories and boosting campus
            wellbeing. Cats are truly amazing animals!😻`;
    export var content = "";
    export var image = "";
</script>

<div
    class="w-fit h-fit shrink-0 rounded-[15px] overflow-hidden py-[10px] space-y-[5px] flex flex-col"
    style=""
>
    <div class="w-full h-fit space-y-[5px] flex flex-row">
        <div class=" space-x-[10px] flex flex-row items-center flex-grow">
            <img
                alt="icon"
                draggable="false"
                src="/andreu.png"
                class="bg-slate-500 w-[42px] h-[42px] rounded-[15px]"
            />
            <p class=" SegoeUI_Semibold">Andreu</p>
        </div>
        <p
            class="text-white/45 shrink-0 text-[13px] flex justify-center items-center"
        >
            (created) today at 15:39
        </p>
    </div>
    <div class="space-y-[15px]">
        <div class="space-y-[10px]">
            <div
                alt="content"
                draggable="false"
                class="w-[398px] h-[398px] rounded-[15px] overflow-hidden bg-slate-500"
            />
            <p class=" w-[560px] SegoeUI_Semibold">
                {subcontext}
            </p>
        </div>
        <div class="w-full flex flex-row">
            <div class="w-full h-fit grow space-x-[10px] flex flex-row">
                <div
                    class="w-fit h-[40px] rounded-[15px] px-[15px] py-[5px] space-x-[8px] bg-[#BF0095]/25 flex items-center opacity-40 cursor-pointer"
                >
                    <p class="text-[#BF0095] SegoeUI_Bold">22</p>
                    <img src="/hub/icons/heart.svg" alt="like" />
                </div>
            </div>
            <div
                class="w-full h-fit grow space-x-[5px] py-[5px] flex flex-row justify-end"
            >
                <div
                    class="px-[15px] py-[5px] space-x-[2px] bg-black/[0.10] rounded-[10px] flex flex-row cursor-pointer"
                >
                    <p class="SegoeUI_Bold text-white/[0.65]">#</p>
                    <p class="SegoeUI_Semibold text-white/[0.80]">CATS</p>
                </div>
            </div>
        </div>
    </div>
</div>
