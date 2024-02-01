<template>
    <div>
        <div class="stream card">
        <!-- <div class="card-thumbnail" :style="`background-image: require(url(${GetThumbnail(data)})), url(../images/thumbnails/default_320px/default.webp);`"> -->
            <div class="card-thumbnail" :style="{'background-image': 'url(' + GetThumbnail(data) + '), url(' + require('../../images/thumbnails/default_320px/default.webp') +')'}">

            
            <span class="card-date card-thumbnail-info">{{ data.date }}</span>
            <span class="card-media-type">{{ GetMediaType(data) }} </span>
            <span class="card-duration card-thumbnail-info">{{ GetDuration(data) }}</span>
            <div class="card-media-icons">
                <a class="card-media-link" target="_blank" :href="data.type == 'stream' ? data.twitch : data.youtube">
                    <img class="card-media-icon" :src="require(`../../images/icons/${getName(data)}.png`)" alt="">
                </a>
            </div>
        </div>
        <div class="card-info">
            <!-- <p>{{ data }}</p> -->
            <p class="card-title">{{ data.title }}</p>
        </div>
    </div>
    </div>
</template>
  
<script >
export default {
    name: 'CardComponent',
    props: ['data']
}


</script>
<script setup>
function GetMediaType(data) {
    return data.type.toUpperCase();
}
function GetDuration(data) {
    if (data.type == 'stream') {
        return ConvertMinutesToTime(data.total_duration);
    } else if (data.type == 'video') {
        return data.duration;
    } else if (data.type == 'podcast') {
        return data.duration;
    }
}
function getName(data){
    if(data.twitch){
        return 'twitch'
    }
    if(data.youtube){
        return 'youtube'
    }
    if(data.url?.includes('podcasts.apple.com')){
        return 'apple_podcast'
    }
    return 'youtube'

}
// function GetMediaIcons(data) {
//     let html = '';
//     const base = `<a class="card-media-link" target="_blank" href="{URL}"><img class="card-media-icon" :src="'../../images/icons/{NAME}.png'" alt=""></img></a>`
//     if (data.type == 'stream') {
//         if (data.twitch) {
//             html += base.replace('{NAME}', 'twitch').replace('{URL}', data.twitch);
//         }

//         if (data.youtube) {
//             html += base.replace('{NAME}', 'youtube').replace('{URL}', data.youtube);
//         }
//     } else {
//         html += base.replace('{NAME}', data.url.includes('podcasts.apple.com') ? 'apple_podcast' : 'youtube').replace('{URL}', data.url);
//     }
//     return html;
// }
function ConvertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const seconds = 0

    return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// eslint-disable-next-line no-unused-vars
function GetThumbnail(data) {
    let url = '../../images/thumbnails/'

    if (data.type == 'stream') {
        if (data.twitch) {
            const id = data.twitch.split('/')[4];
            url += `stream_twitch_320px/${id}.webp`;
        } else if (data.youtube) {
            url += `stream_youtube_320px/${GetYoutubeIDFromURL(data.youtube)}.webp`;
        } else {
            url += 'default_320px/no_video.webp';
        }
    } else {
        url += `video_youtube_320px/${GetYoutubeIDFromURL(data.url)}.webp`;
    }
    // console.log(require(url))
    try {
        return(require(url))
    }
    catch (e) {
        console.log(e)
   return null;
    }
    // return url;
}

function GetYoutubeIDFromURL(url) {
    let id = url.split('=')[1];

    if (id.includes('&')) {
        id = id.split('&')[0];
    }

    return id;
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

/* ---------------------- */

.card {
    margin: 10px;
    /* color: #fff; */
    /* background-size: cover; */
    width: 320px;
    height: 210px;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 60px;
    text-align: left;
}

.card-thumbnail {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    border-radius: 5px;

    /* Text border black */
    /* text-shadow:
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000; */

    border: 2px solid var(--stream);
    position: relative;
}

.video .card-thumbnail {
    border-color: var(--video);
}

.stream .card-thumbnail {
    border-color: var(--stream);
}

.podcast .card-thumbnail {
    border-color: var(--podcast);
}

.card-media-type {
    background-color: red;

    position: absolute;

    font-size: 16px;
    font-weight: 700;

    padding-left: 2px;
    padding-right: 2px;

    right: 0;

    border-bottom-left-radius: 5px;
    color: white;
}

.video .card-media-type {
    background-color: var(--video);
}

.stream .card-media-type {
    background-color: var(--stream);
}

.podcast .card-media-type {
    background-color: var(--podcast);
}

.card-thumbnail-info {
    font-weight: 500;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 2px;
}

.card-date {
    padding: 2px;
    border-bottom-right-radius: 5px;
}

.card-duration {
    position: absolute;
    right: 0;
    bottom: 0;
    border-top-left-radius: 5px;
    padding: 2px
}

.card-media-icons {
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 14px;
    border-radius: 2px;
    display: flex;
}

.card-media-link {
    margin: 0;
}

.card-media-icon {
    display: block;
}

.card-media-link:last-child .card-media-icon {
    border-top-right-radius: 5px;
}

.card-info {
    margin: 0
}

.card-title {
    font-size: 16px;
    font-weight: 700;
    margin-top: 8px;
    margin-bottom: 8px;
}

.card-description {
    font-family: "Roboto", "Arial", sans-serif;
    font-size: 14px;
    margin-top: 8px;
    height: 62px
}


</style>
  