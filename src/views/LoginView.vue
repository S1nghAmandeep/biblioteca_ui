<template>
    <img class="logo" src="../../public/favicon.png" alt="">
    <a-form layout="vertical" :model="formState" name="normal_login" class="login-form" @finish="onFinish"
        @finishFailed="onFinishFailed">
        <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Please input your email!' }]">
            <a-input type="email" v-model:value="formState.email">
                <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>

        <a-form-item label="Password" name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password v-model:value="formState.password">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>

        <a-form-item>
            <a-button style="width: 100%" :disabled="disabled" type="primary" html-type="submit"
                class="login-form-button">
                Log in
            </a-button>
        </a-form-item>
    </a-form>
</template>


<script setup>
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useMainStore } from '@/stores/mainStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const mainStore = useMainStore();
const formState = reactive({
    email: '',
    password: '',
    remember: true,
});
const onFinish = values => {
    mainStore.isLoged = true;
    console.log('Success:', values, 'loged', mainStore.isLoged);
    router.push('/');
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
    return !(formState.email.includes('@') && formState.password.length > 4);
});
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
    max-width: 300px;
}

#components-form-demo-normal-login .login-form-button {
    width: 100%;
}

.logo {
    width: 180px;
    align-self: center;
    margin-bottom: 1rem;
}
</style>