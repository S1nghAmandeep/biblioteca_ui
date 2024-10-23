<template>
    <header>
        <div class="wrapper">
            <div class="desktop-btn">
                <img class="logo" src="../../public/Logo.png" alt="logo">
                <nav>
                    <RouterLink to="/">Home</RouterLink>
                    <RouterLink to="/customer-account">Customer</RouterLink>
                    <RouterLink to="/books">Books</RouterLink>
                    <RouterLink to="/borrow-books">Borrow</RouterLink>
                </nav>
            </div>
            <div class="flex-display">
                <a-popover placement="bottom" trigger="click">
                    <template #content>
                        <a-button type="text" @click="logOut" danger>
                            <LogoutOutlined /> Logout
                        </a-button>
                    </template>
                    <a-avatar class="mouse-pointer" :size="35" style="background-color: #006BFF">
                        <template #icon>
                            <UserOutlined />
                        </template>
                    </a-avatar>
                </a-popover>
                <menu-outlined class="menu-icon" @click="showDrawer" />
            </div>
        </div>
    </header>
    <a-drawer placement="right" :closable="false" :open="open" @close="onClose"
        style="backdrop-filter: blur(8px); background-color: transparent;">
        <nav class="mobile-nav">
            <RouterLink @click="onClose" to="/">Home</RouterLink>
            <RouterLink @click="onClose" to="/customer-account">Customer</RouterLink>
            <RouterLink @click="onClose" to="/books">Books</RouterLink>
            <RouterLink @click="onClose" to="/borrow-books">Borrow</RouterLink>
        </nav>
    </a-drawer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { MenuOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue';
import { useMainStore } from '@/stores/mainStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const mainStore = useMainStore();
const open = ref(false);
const showDrawer = () => {
    open.value = true;
};
const onClose = () => {
    open.value = false;
};

const logOut = () => {
    mainStore.isLoged = false;
    router.push('/login');
}

</script>


<style scoped>
header {
    width: 100%;
    padding: 0.5rem 1rem;
    place-items: center;
}

nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.mobile-nav {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1.3rem;
    justify-content: center;
    height: 100%;
}

.mobile-nav a {
    border: 1px solid #add1fa;
    /* padding: 20px 80px;       */
    font-size: 1.4rem;
    color: white;
    border-radius: 0.7rem;
}

.logo {
    width: 100px;
    margin-right: 2rem;
}

nav a.router-link-exact-active {
    color: white;
    background-color: #006BFF;
    /* border: 1px solid #7CAEF5; */
}

nav a.router-link-exact-active:hover {
    background-color: #006aff72;
}

nav a {
    padding: 0.4rem 2rem;
    border-radius: 0.4rem;
}

header .wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

.menu-icon {
    display: block;
}

.desktop-btn {
    display: flex;
    align-items: center;
}

.desktop-btn nav {
    display: none;
}

@media (min-width: 790px) {
    .menu-icon {
        display: none;
    }

    .desktop-btn nav {
        display: flex;
    }

    header {
        padding: 1rem 2rem;

    }

}
</style>
