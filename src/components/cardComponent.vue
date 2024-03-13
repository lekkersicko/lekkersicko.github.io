<template>
    <div class="card h-100 border-0 bg-transparent">
        <div type="button" @click="goToCard" @click.middle="goToCard('middle')" class="img-wrapper position-relative"
             :class="card.type === 'podcast' ? 'border-success' :
            card.type === 'video' ? 'border-yt' : 'border-tw'">
            <div class="corner-top"></div>
            <div class="corner-bottom"></div>
            <div class="edge-left"></div>
            <div class="edge-bottom"></div>


            <div class="transform-wrapper position-relative">
                <img v-lazy="{ src: imgScr, loading: images['320'][`default`]}" class="w-100" alt="thumbnail">
                <span class="badge rounded-0 bg-black position-absolute top-0 start-0 m-1"
                      style="--bs-bg-opacity: .75;">{{ card.date }}</span>
                <span class="badge rounded-0 bg-black position-absolute bottom-0 end-0 m-1"
                      style="--bs-bg-opacity: .75;">{{ duration }}</span>
                <span class="badge rounded-0 text-uppercase fw-bold position-absolute top-0 end-0 m-1" :class="card.type === 'podcast' ? 'bg-success' :
                    card.type === 'video' ? 'bg-yt' : 'bg-tw'">{{ card.type }}</span>
                <!--                <div class="position-absolute bottom-0 start-0">-->
                <!--                    <a :href="'https://www.twitch.tv/videos/' + card['twitch_id']" class="platform-link" v-if="card['twitch_id']"><img src="../assets/img/twitch.png" alt="logo"></a>-->
                <!--                    <a :href="'https://youtube.com/watch?v=' + card['youtube_id']" class="platform-link" v-if="card['youtube_id']"><img src="../assets/img/youtube.png" alt="logo"></a>-->
                <!--                </div>-->
            </div>
        </div>
        <div class="card-body py-2 px-0">
            <h3 type="button" @click="goToCard" @click.middle="goToCard('middle')"
                class="card-title fs-6 fw-semibold m-0 text-truncate">{{ title }}</h3>
            <span v-if="card.activities?.length === 1" class="small">{{ card.activities?.[0].title }}</span>
            <div v-else-if="card.activities?.length > 1" class="dropup mt-1">
                <button class="btn btn-sm" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                    <i class="bi bi-list me-1"></i>Activiteiten<span class="ms-2 badge rounded-pill text-bg-light">{{card.activities?.length}}</span>
                </button>
                <div class="dropdown-menu">
                    <div v-for="act in card.activities" class="p-2">
                        <div>{{ act.title }}</div>
                        <div class="small">{{ convertStoMs(act.duration) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed} from "vue";
import {useContentStore} from "@/stores/content.js";
import {storeToRefs} from "pinia";
import router from "@/router/index.js";

const props = defineProps({
    card: {type: Object, required: true},
})
const contentStore = useContentStore()
const {images} = storeToRefs(contentStore)

const imgScr = computed(() => {
    return images.value['320'][`${props.card['twitch_id']}`] ||
        images.value['320'][`${props.card['youtube_id']}`] ||
        (!props.card['twitch_id'] && !props.card['youtube_id'] ? images.value['320'][`no_video`] : images.value['320'][`default`])
})

const duration = computed(() => {
    return secondsToHms()
})
const title = computed(() => {
    return setMainTitle()
})

function secondsToHms() {
    let d = Number(props.card.duration);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}

function convertStoMs(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);
    return h ? h + " uur " + m + " minuten" : m + " minuten" + (s ? ` ${s} seconden` : "")
}

function setMainTitle() {
    if (['podcast', 'video'].includes(props.card['type']))
        return props.card['title']
    else {
        if (props.card['custom_title'])
            return props.card['custom_title']
        else if (props.card['title_main'])
            return props.card['titles'][props.card['title_main']]
        else
            return props.card['titles'][0]
    }
}

function goToCard(type = 'left') {
    if (type === 'middle') {
        const routeData = router.resolve({path: `/item/${props.card['id']}`});
        window.open(routeData.href, '_blank');
    } else
        router.push({path: `/item/${props.card['id']}`})
}
</script>

<style scoped lang="sass">
.img-wrapper
    *
        transition-property: transform
        transition-timing-function: ease
        transition-duration: 100ms

    &.border-success
        .corner-top
            border-right-color: rgb(25, 135, 84)

        .corner-bottom
            border-top-color: rgb(25, 135, 84)

        .edge-left, .edge-bottom
            background: rgb(25, 135, 84)

    &.border-yt
        .corner-top
            border-right-color: #FF0000

        .corner-bottom
            border-top-color: #FF0000

        .edge-left, .edge-bottom
            background: #FF0000

    &.border-tw
        .corner-top
            border-right-color: #6441A5

        .corner-bottom
            border-top-color: #6441A5

        .edge-left, .edge-bottom
            background: #6441A5

    &:hover
        .corner-top, .corner-bottom,
        .edge-left, .edge-bottom
            transition-delay: 75ms

        .corner-top
            transform: translateY(-0.4rem) scale(1)

        .corner-bottom
            transform: translateX(0.4rem) scale(1)

        .edge-left
            transform: scaleX(1)

        .edge-bottom
            transform: scaleY(1)

        .transform-wrapper
            transform: translate3d(0.4rem, -0.4rem, 0px)
            transition-delay: 75ms

.corner-top
    position: absolute
    top: 0
    left: 0
    width: 0
    height: 0
    border-top: 0.4rem solid transparent
    border-bottom: 0.4rem solid transparent
    border-right: 0.4rem solid
    transform-origin: left center
    transform: translateY(-0.4rem) scale(0)
.corner-bottom
    position: absolute
    bottom: 0
    right: 0
    width: 0
    height: 0
    border-left: 0.4rem solid transparent
    border-right: 0.4rem solid transparent
    border-top: 0.4rem solid
    transform-origin: center bottom
    transform: translateX(0.4rem) scale(0)
.edge-left
    position: absolute
    top: 0
    bottom: 0
    left: 0
    transform-origin: 0 100%
    width: 0.4rem
    transform: scaleX(0)
.edge-bottom
    position: absolute
    bottom: 0
    left: 0
    right: 0
    transform-origin: 0 100%
    height: 0.4rem
    transform: scaleY(0)

.dropdown-menu
    min-width: 280px
    max-height: 140px
    overflow-y: auto

.platform-link img
    height: 24px
    width: 24px
</style>
