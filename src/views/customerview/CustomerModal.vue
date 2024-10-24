<template>
    <div>
        <a-modal v-model:open="visible" :title="!isEdit ? 'Create a new accout' : 'Edit account'" @cancel="onCancel"
            ok-text="Save" cancel-text="Cancel" @ok="onOk">
            <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
                <div class="input-box">
                    <a-form-item name="number" label="Number" :rules="[{ required: true, validator: validateNumber }]">
                        <a-input type="number" min="1" v-model:value="formState.number" />
                    </a-form-item>
                    <a-form-item name="deposit" label="D€posit" :rules="[{ validator: validateDeposit }]">
                        <a-input type="number" min="1" v-model:value="formState.deposit" />
                    </a-form-item>
                </div>
                <a-form-item name="name" label="Name" :rules="[{ required: true, message: 'Please input the name!' }]">
                    <a-input v-model:value="formState.name" />
                </a-form-item>
                <a-form-item name="phoneNumber" label="Phone number"
                    :rules="[{ required: true, validator: validatePhoneNumber }]">
                    <a-input min="10" type="number" v-model:value="formState.phoneNumber" />
                </a-form-item>
                <a-form-item name="address" label="Address"
                    :rules="[{ required: true, message: 'Please input the address' }]">
                    <a-input v-model:value="formState.address" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup>
import { reactive, ref, watch, watchEffect } from 'vue';

const emit = defineEmits(['closeModal', 'accountEdited', 'accountCreated']);
const props = defineProps({
    bookData: {
        type: Object,
        default: () => ({}),
    },
    openModal: {
        type: Boolean,
        required: true
    },
    isEdit: {
        type: Boolean,
        default: () => (false)
    }
});

const formRef = ref();
const visible = ref(false);
const formState = reactive({
    number: null,
    name: '',
    phoneNumber: null,
    address: '',
});

const validateNumber = async (_rule, value) => validateField('account number', _rule, value);

const validateDeposit = async (_rule, value) => {
    if (!value) {
        return Promise.resolve();
    }
    if (value <= 0) {
        return Promise.reject(`Depost must be greater than 0`);
    }
}

const validatePhoneNumber = async (_rule, value) => {
    if (!value) {
        return Promise.reject(`Please input the phone number`);
    }
    if (value.length < 10) {
        return Promise.reject('Number must be greater than or equal then 10!');
    } else {
        return Promise.resolve();
    }
}

const onCancel = () => {
    formRef.value.resetFields();
    emit('closeModal');
    return true;
}
const onOk = () => {
    formRef.value
        .validateFields()
        .then(values => {
            // console.log('Received values of form: ', values);
            // console.log('formState: ', toRaw(formState));
            visible.value = false;
            emit('closeModal');
            if (props.isEdit) {
                emit('accountEdited');
            } else {
                emit('accountCreated');
            }
            formRef.value.resetFields();
            formState.name = '';
            formState.number = null;
            formState.deposit = null;
            formState.address = '';
            formState.phoneNumber = null;
            // console.log('reset formState: ', toRaw(formState));
        })
        .catch(info => {
            // console.log('Validate Failed:', info);
        });
};

function validateField(fieldLabel, _rule, value) {
    if (!value) {
        return Promise.reject(`Please input the ${fieldLabel}!`);
    }
    if (value <= 0) {
        return Promise.reject('Number must be greater than 0!');
    } else {
        return Promise.resolve();
    }
};

watchEffect(() => {
    if (Object.keys(props.bookData).length > 0 && props.isEdit === true) {
        formState.name = props.bookData[0].name;
        formState.deposit = props.bookData[0].deposit;
        formState.address = props.bookData[0].address;
        formState.phoneNumber = props.bookData[0].phoneNumber;
        formState.number = props.bookData[0].number;
    } else {
        formState.name = '';
        formState.deposit = '';
        formState.address = '';
        formState.phoneNumber = null;
        formState.number = null;
    }
});

watch(() => props.openModal, (newVal) => {
    visible.value = newVal;
});

</script>
<style scoped>
.collection-create-form_last-form-item {
    margin-bottom: 0;
}

.input-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}
</style>