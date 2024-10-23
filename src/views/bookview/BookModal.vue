<template>
    <div>
        <!-- <a-button type="primary" @click="visible = true">Add Book</a-button> -->
        <a-modal v-model:open="visible" :title="!isEdit ? 'Add a new book' : 'Edit book'" @cancel="onCancel"
            ok-text="Save" cancel-text="Cancel" @ok="onOk">
            <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
                <div class="input-box">
                    <a-form-item name="number" label="Number" :rules="[{ required: true, validator: validateNumber }]">
                        <a-input type="number" min="1" v-model:value="formState.number" />
                    </a-form-item>
                    <a-form-item name="copies" label="Copie/s" :rules="[{ required: true, validator: validateCopies }]">
                        <a-input min="1" type="number" v-model:value="formState.copies" />
                    </a-form-item>
                </div>
                <a-form-item name="name" label="Name"
                    :rules="[{ required: true, message: 'Please input the name of book!' }]">
                    <a-input v-model:value="formState.name" />
                </a-form-item>
                <a-form-item name="author" label="Author"
                    :rules="[{ required: true, message: 'Please input the author of book!' }]">
                    <a-input v-model:value="formState.author" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup>
import { reactive, ref, watch, watchEffect } from 'vue';

const emit = defineEmits(['closeModal', 'createBook', 'editBook']);
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
    name: '',
    number: null,
    copies: 1,
    author: ''
});

const validateNumber = async (_rule, value) => validateField('book number', _rule, value);
const validateCopies = async (_rule, value) => validateField('copie/s of book', _rule, value);

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
                emit('editBook')
            } else {
                emit('createBook');
            }
            formRef.value.resetFields();
            formState.name = '';
            formState.number = '';
            formState.copies = 1;
            formState.author = '';
            // console.log('reset formState: ', toRaw(formState));
        })
        .catch(info => {
            // console.log('Validate Failed:', info);
        });
};

watchEffect(() => {
    if (Object.keys(props.bookData).length > 0 && props.isEdit === true) {
        formState.name = props.bookData[0].name;
        formState.author = props.bookData[0].author;
        formState.copies = props.bookData[0].copies;
        formState.number = props.bookData[0].number;
    } else {
        formState.name = '';
        formState.author = '';
        formState.copies = 1;
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