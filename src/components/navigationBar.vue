<template>
    <div class="bg-dark-subtle">
        <div class="container">
            <nav class="navbar navbar-expand-md">
                <div class="container-fluid">
                    <router-link to="/" class="navbar-brand">
                        <img src="../assets/img/lekkerSicko.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
                        Lekker Speuren
                    </router-link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <router-link class="nav-link" to="/" active-class="active">Home</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/series" active-class="active">Series</router-link>
                            </li>
                        </ul>
                        <div class="nav-item me-3">
                            <a class="nav-link position-relative" href="https://github.com/lekkersicko/lekker-speuren" target="_blank" title="Bekijk project op GitHub"><i class="bi bi-github"></i></a>
                        </div>
                        <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-sun-fill"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><button class="dropdown-item" :class="{active: store.theme === 'light'}" type="button" @click="switchTheme('light')">Licht</button></li>
                                <li><button class="dropdown-item" :class="{active: store.theme === 'dark'}" type="button" @click="switchTheme('dark')">Donker</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script setup>
import {useGeneralStore} from "@/stores/general.js";

const store = useGeneralStore()

function switchTheme(theme) {
    store.setTheme(theme)
}
</script>

<style scoped></style>