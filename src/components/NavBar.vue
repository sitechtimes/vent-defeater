<template>
    <header>
        <RouterLink class="logo" to="/">
            <img src="/vent.svg" alt="Vent Defeater logo">
            <h1 class="nerko">Vent Defeater</h1>
        </RouterLink>
        <nav>
            <div class="outerNavButton" v-for="button in navButtons">
                <RouterLink :to="button.path" class="navButton">
                    {{ button.name }}
                    <img v-if="button.dropdown" src="/dropdownArrow.svg" aria-hidden="true">
                </RouterLink>
                <div class="hoverDropdown" v-if="button.dropdown">
                    <RouterLink class="dropdownButton" v-for="option in button.dropdown" :to="option.path"><h4>{{ option.name }}</h4></RouterLink>
                </div>
            </div>
        </nav>
        <div class="logins">
            <RouterLink class="loginButton" to="/"><h3>Log in</h3></RouterLink>
            <RouterLink class="loginButton signup" to="/"><h3>Sign up</h3></RouterLink>
        </div>
    </header>
</template>

<script setup>

import { ref } from 'vue';

const navButtons = [{
    name: "Work",
    path: "/",
    dropdown: [{
        name: "Overview",
        path: "/"
    }, {
        name: "Employee Training",
        path: "/"
    }, {
        name: "Team Meetings",
        path: "/"
    }, {
        name: "Team Buildng",
        path: "/"
    }, {
        name: "Workshops",
        path: "/"
    }, {
        name: "Events & Conferences",
        path: "/"
    }, {
        name: "Evaluations & Retros",
        path: "/"
    }, {
        name: "Stage Presentations",
        path: "/"
    }, {
        name: "All Hands Meeting",
        path: "/"
    }, {
        name: "Hybrid Work",
        path: "/"
    }, {
        name: "Brainstorming",
        path: "/"
    }]
}, {
    name: "Education",
    path: "/",
    dropdown: [{
        name: "Overview",
        path: "/"
    }, {
        name: "Lectures",
        path: "/"
    }, {
        name: "Assessments",
        path: "/"
    }, {
        name: "Seminars",
        path: "/"
    }, {
        name: "Student Events",
        path: "/"
    }, {
        name: "Classroom Lessons",
        path: "/"
    }, {
        name: "Hybrid Learning",
        path: "/"
    }]
}, {
    name: "Features",
    path: "/",
    dropdown: [{
        name: "Overview",
        path: "/"
    }, {
        name: "AI Menti Builder",
        path: "/"
    }, {
        name: "Live Polling",
        path: "/"
    }, {
        name: "Word Cloud",
        path: "/"
    }, {
        name: "Quiz",
        path: "/"
    }, {
        name: "Q&A",
        path: "/"
    }, {
        name: "Survey",
        path: "/"
    }, {
        name: "Presentation",
        path: "/"
    }]
}, {
    name: "Resources",
    path: "/",
    dropdown: [{
        name: "How To",
        path: "/"
    }, {
        name: "MentiAcademy",
        path: "/"
    }, {
        name: "Templates",
        path: "/"
    }, {
        name: "Webinars",
        path: "/"
    }, {
        name: "Blog",
        path: "/"
    }, {
        name: "Integrations",
        path: "/"
    }, {
        name: "Stories",
        path: "/"
    }, {
        name: "Help Center",
        path: "/"
    }, ]
}, {
    name: "Pricing",
    path: "/"
}, {
    name: "Talk to Sales",
    path: "/"
}, ]

</script>

<style scoped lang="scss">

header {
    position: fixed;
    top: 0;
    height: 4em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 0.125em solid rgb(230, 230, 230);
    border-top: 0;
    border-left: 0;
    border-right: 0;
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    text-decoration: none;
    color: black;

    img {
        height: 4em;
    }

    h1 {
        margin: 0;
    }
}

nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75em;
}

.navButton {
    position: relative;
    text-decoration: none;
    color: black;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        transition: all 0.5s;
        height: 1em;
    }
}

.hoverDropdown {
    position: absolute;
    display: flex;
    pointer-events: none;
    opacity: 0;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.25em;
    background-color: white;
    box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.2);
    padding: 1em;
    border-radius: 0.25em;
    transition: all 0.5s;

    .dropdownButton {
        text-decoration: none;
        color: black;

        h4 {
            font-weight: 500;
            margin: 0.25em;
        }
    }
}

.logins {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75em;

    .loginButton {
        text-decoration: none;
        color: black;
        h3 {
            font-weight: bold;
            margin: 0;
        }
    }

    .signup {
        color: white;
        background-color: rgb(25, 108, 255);
        padding: 0.5em 1.25em;
        border-radius: 5em;
        transition-timing-function: cubic-bezier(.4,0,.2,1);
        transition-duration: .3s;
    }
}

@media (hover: hover) and (pointer: fine) {
    .outerNavButton:hover {
        .navButton {
            img {
                transform: rotate(-180deg);
            }
        }

        .hoverDropdown {
            opacity: 1;
            pointer-events: auto;
        }
    }

    .logins {
        .signup:hover {
            background-color: rgb(22, 93, 219);
        }
    }
}

</style>