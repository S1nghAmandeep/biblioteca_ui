<template>
    <div class="top-layer">
        <a-input-search class="search-bar" :allowClear="true" v-model:value="searchValue"
            placeholder="input search text" enter-button @search="onSearch">
            <template #addonBefore>
                <a-select v-model:value="selectedOption" class="dropdown-width">
                    <a-select-option v-for="item in filterOptions" :value="item.value">{{ item.type }}</a-select-option>
                </a-select>
            </template>
        </a-input-search>
        <a-button class="modal-btn" :icon="h(PlusOutlined)" type="primary" @click="openModal = true">
            Create account
        </a-button>
    </div>
    <a-table :columns="columns" :data-source="filteredData" bordered>
        <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'operation'">
                <a-dropdown :trigger="['click']">
                    <a-button type="link">
                        <MoreOutlined />
                    </a-button>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="0" @click="editBook(record.key)">
                                <a-button type="link">
                                    <EditOutlined /> Edit
                                </a-button>
                            </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item key="1" @click="showDeleteConfirm(record.key)">
                                <a-button type="link" danger>
                                    <DeleteOutlined /> Delete
                                </a-button>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </template>
        </template>
    </a-table>
    <CustomerModal :open-modal="openModal" :is-edit="isEdit"
        @account-edited="openNotificationWithIcon('success', 'Edit account', `Account ${editableData[0].name} edited successfully`)"
        @account-created="openNotificationWithIcon('success', 'Create account', 'Account created successfully')"
        @close-modal="openModal = false; isEdit = false" :book-data="editableData" />
</template>

<script setup>
import { ref, nextTick, onMounted, watchEffect, reactive, h } from 'vue';
import { MoreOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import CustomerModal from './CustomerModal.vue';
import { cloneDeep } from 'lodash-es';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import gsap from 'gsap';
import { notification } from 'ant-design-vue';

const openModal = ref(false);
const isEdit = ref(false);
const searchValue = ref('');
const filteredData = ref([]);
const editableData = reactive({});
const filterOptions = [
    {
        type: 'Name',
        value: 'name'
    },
    {
        type: 'Number',
        value: 'number'
    },
    {
        type: 'Phome numbre',
        value: 'phoneNumber'
    }
];

const selectedOption = ref(filterOptions[0].value);

const columns = [
    {
        title: 'Number',
        dataIndex: 'number',
        width: 100,
        align: 'center'

    },
    {
        title: 'Name',
        dataIndex: 'name',
        width: 250,
    },
    {
        title: 'Phone number',
        dataIndex: 'phoneNumber',
        width: 250,
        responsive: ['md']
    },
    {
        title: 'Address',
        dataIndex: 'address',
        responsive: ['md'],
        width: 250

    },
    {
        title: 'Action',
        dataIndex: 'operation',
        width: 100,
        align: 'center'
    },
];
const data = [...Array(100)].map((_, i) => ({
    key: i.toString(),
    number: parseInt(i),
    name: `Albert Jobs ${i}`,
    phoneNumber: 3212345323,
    deposit: i,
    address: `London, Park Lane no. ${i}`,
    copies: 2
}));

const showDeleteConfirm = (key) => {
    const bookDetail = cloneDeep(filteredData.value.filter(item => key === item.key));
    const bookIndex = filteredData.value.findIndex(item => item.key === key);
    Modal.confirm({
        title: 'Are you sure to delete?',
        icon: createVNode(ExclamationCircleOutlined),
        content: 'Account of: ' + bookDetail[0].name,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            filteredData.value.splice(bookIndex, 1);
            openNotificationWithIcon('success', 'Delete account', `Account ${bookDetail[0].name} deleted successfully`);
            animateRows();
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};

const openNotificationWithIcon = (type, title, description) => {
    notification[type]({
        message: title,
        description: description,
        duration: 2.5
    });
};

function editBook(key) {
    isEdit.value = true;
    editableData[0] = cloneDeep(filteredData.value.filter(item => key === item.key)[0]);
    openModal.value = true;
}

function animateRows() {
    nextTick(() => {
        const rows = document.querySelectorAll('.ant-table-row');
        rows.forEach((row, index) => {
            gsap.fromTo(
                row,
                { opacity: 0, x: 40 },
                { opacity: 1, x: 0, delay: index * 0.05, duration: 0.4 }
            );
        });
    });
}

function onSearch() {
    filteredData.value = data.filter((item) => {
        if (selectedOption.value === 'name') {
            return item.name.toLowerCase().includes(searchValue.value.trim().toLowerCase());
        } else if (selectedOption.value === 'number') {
            return item.number.toString().includes(searchValue.value.trim());
        } else if (selectedOption.value === 'phoneNumber') {
            return item.phoneNumber.toString().includes(searchValue.value.trim());
        }
        return item.name.toLowerCase().includes(searchValue.value.trim().toLowerCase());
    });
    animateRows();
}


onMounted(() => {
    onSearch();
});

watchEffect(() => {
    if (searchValue.value === '') {
        onSearch();
    }
});

</script>


<style></style>