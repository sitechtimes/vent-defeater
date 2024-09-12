<template>
    <div class="page">
        <div class="menu">
            <img class="logo" src="/logo/logoWithWords.svg" aria-hidden="true" @click="router.push('/app/dashboard')">
            <div class="navButtons">
                <RouterLink v-for="button in navButtons" :key="button.name" :to="button.route">
                    <img :src="button.img" aria-hidden="true">
                    {{ button.name }}
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navButtons = [{
    name: "Dashboard",
    img: "/ui/home.svg",
    route: "/app/dashboard"
}, {
    name: "My presentations",
    img: "/ui/user.svg",
    route: "/app/presentations"
}]

</script>

<style lang="scss" scoped>

.page {
    display: flex;
    align-items: center;
    justify-content: center;
}

.menu {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 17.5em;
    min-height: 100vh;
    padding: 2em;

    .logo {
        width: 100%;
    }
}

.navButtons {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: var(--text-color);
        width: 100%;

        img {
            height: 1.75em;
        }
    }
}

@media (hover: hover) and (pointer: fine) {
    .menu {
        .logo:hover {
            background-color: var(--faded-bg-color);
        }
    }
}

</style>