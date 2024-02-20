<template>
    <div :style="style2" class="feedback-background" @click="makeNavVisible"></div>
    <CrudButton v-on:click="makeNavVisible" class="nav-button" :color="'#1f7a8c'" :text="'☰'" />
    <nav :style="style">
        <div class="nav-container">
            <CrudButton 
                class="map-toggle" 
                :color="mapStatus ? 'green' : 'red'" 
                :text="'🗺️'"
                v-on:click="updateMapStatus(!mapStatus, apiKey ?? '')" 
            />
            <CrudButton 
                class="password-button" 
                type="button" 
                v-on:click="togglePassword" 
                :color="'#1f7a8c'" 
                :text="passwordVisibility ? '😀' : '😄'" />
            <input 
                v-model="apiKey" 
                placeholder="API key" 
                :type="passwordVisibility ? 'text' : 'password'"
            />
            <h1>OSALEVAD FIRMAD:</h1>
            <ul class="list-container">
                <li 
                    v-for="firm1 in firms" :key="firm1.id" 
                    v-on:click="emit('on-toggle', firm1.id); makeNavVisible()"
                    :style="firm1.name == currentFirm?.name ? 'background-color: #ff0063' : ''"
                >
                    {{ firm1.name }}
                </li>
                <li 
                    v-on:click="emit('on-toggle'); makeNavVisible()"
                    :style="currentFirm == undefined ? 'background: #ff0063' : ''"
                >
                    New firm
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup lang="ts">
import useFirms from '@/Stores/FirmsStore'
import CrudButton from './CrudButton.vue'
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['on-toggle'])
let { apiKey, currentFirm, firms, mapStatus, updateMapStatus } = useFirms();

let style = ref<string>();
let style2 = ref<string>();
let status = ref(false);

let passwordVisibility = ref(false)
function togglePassword() { passwordVisibility.value = !passwordVisibility.value }

function makeNavVisible() 
{
    if (window.innerWidth <= 850) {
        status.value = !status.value
        if (status.value)
        {
            style.value = "left: 0;"
            style2.value = "display: block;"
        } else {
            style.value = ''
            style2.value = ''
        }
    }
}
addEventListener("resize", () => {''});
onresize = () => {
    if (window.innerWidth > 850) {
        status.value = false;
        style.value = ''
        style2.value = ''
    }
};
</script>

<style scoped>
.list-container {
    color: white;
}
.feedback-background {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 150%;
    z-index: 300;
    background-color: rgba(0, 0, 0, 0.478);
    overflow-y: hidden;
}
nav {
    position: sticky;
    top: 10px;
    position: -webkit-sticky;
    height: auto;
    width: 200px;
    z-index: 1000;
}
.nav-container {
    position: relative;
    height: 100vh;
    padding-left: 10px;
}
.nav-container h1 {
    margin: 0;
}
ul {
    width: auto;
    list-style-type: none;
    padding: 0;
    margin: 0;
}
li {
    line-height: 25px;
    cursor: pointer;
}
li:hover {
    background-color: #ff0063;
}
.nav-button {
    display: none;
    position: fixed;
    left: 10px;
    margin: 0;
    z-index: 1100;
}
input {
    z-index: 1;
    border: 3px solid transparent;
    color: #000000;
    border-radius: 5px;
    transition: 0.25s;
    font-weight: 1000;
    outline: none;
    padding: 2px 5px;
    min-height: 30px;
    width: 143px;
    height: 30px;
}
input:focus {
    border: 3px solid #c3c3c3;
}
input:hover {
    border: 3px solid #c3c3c3;
}
.map-toggle {
    position: absolute;
    top: -3px;
    left: 126px;
    z-index: 2;
}
.password-button {
    z-index: 2;
    position: absolute;
    margin: 2px 2px 0 83px;
}

@media only screen and (max-width: 850px) {
    .nav-button {
        display: block;
    }
    .nav-container h1 {
        padding-top: 50px;
    }
    nav {
        position: fixed;
        background: linear-gradient(90deg,#170954 9%,#312ebd 95%);
        top: 0;
        left: -200px;
        transition: left 0.2s;
        height: 150%;
        overflow-y: hidden;
    }
    ul {
        width: 190px;
        position: absolute;
        overflow-y: scroll;
        top: 115px;
        bottom: 110px;
    }
    ul::-webkit-scrollbar {
        width: 5px;
    }
    ul::-webkit-scrollbar-thumb {
        background: #ff0063;
        border-radius: 5px;
    }
    ul::-webkit-scrollbar-track {
        background: #170954;
    }
    .map-toggle {
        top: 5px;
        left: 133px;
    }
    input {
        position: absolute;
        top: 8px;
        left: 49px;
        width: 135px;
    }
    .map-toggle {
        top: 5px;
        left: 157px;
    }
    .password-button {
        margin-left: 114px;
        top: 8px;
    }
}
</style>