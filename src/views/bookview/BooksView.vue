<template>
  <div class="top-layer">
    <a-input-search class="search-bar" v-model:value="searchValue" placeholder="input search text" enter-button
      @search="onSearch">
      <template #addonBefore>
        <a-select v-model:value="selectedOption" style="width: 120px">
          <a-select-option v-for="item in filterOptions" :value="item.value">{{ item.type }}</a-select-option>
        </a-select>
      </template>
    </a-input-search>
    <a-button type="primary" @click="openModal = true">
      Add book
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
              <a-menu-item key="0">
                <a-button type="link" @click="editBook(record.key)">
                  <EditOutlined /> Edit
                </a-button>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="1">
                <a-button type="link" danger @click="showDeleteConfirm(record.key)">
                  <DeleteOutlined /> Delete
                </a-button>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </template>
  </a-table>
  <BookModal :open-modal="openModal" @close-modal="openModal = false" :book-data="editableData" />
</template>

<script setup>
import { ref, nextTick, onMounted, watchEffect, reactive } from 'vue';
import { MoreOutlined, DeleteOutlined, EditOutlined, DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import BookModal from './BookModal.vue';
import { cloneDeep } from 'lodash-es';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import gsap from 'gsap';

const openModal = ref(false);
const searchValue = ref('');
const filteredData = ref([]);
const editableData = reactive({});
const filterOptions = [
  {
    type: 'Number',
    value: 'number'
  },
  {
    type: 'Name',
    value: 'name'
  },
  {
    type: 'Author',
    value: 'author'
  }
];

const selectedOption = ref(filterOptions[0].value);

const columns = [
  {
    title: 'Number',
    dataIndex: 'number',
    width: 25,
    align: 'center'

  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    width: 150,
    responsive: ['md']
  },
  {
    title: 'Address',
    dataIndex: 'address',
    responsive: ['md']
  },
  {
    title: 'Action',
    dataIndex: 'operation',
    width: 20,
    align: 'center'
  },
];
const data = [...Array(100)].map((_, i) => ({
  key: i.toString(),
  number: i,
  name: `Edward King ${i}`,
  author: `Some ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
  copies: 2
}));

const showDeleteConfirm = (key) => {
  const bookDetail = cloneDeep(filteredData.value.filter(item => key === item.key));
  const bookIndex = filteredData.value.findIndex(item => item.key === key);
  Modal.confirm({
    title: 'Are you sure delete this book?',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'Name: ' + bookDetail[0].name,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      filteredData.value.splice(bookIndex, 1);
      animateRows();
      // delete editableData[0];
    },
    onCancel() {
      // delete editableData[0];
      console.log('Cancel');
    },
  });
};

function editBook(key) {
  editableData[0] = cloneDeep(filteredData.value.filter(item => key === item.key)[0]);
  openModal.value = true;
}

function animateRows() {
  nextTick(() => {
    const rows = document.querySelectorAll('.ant-table-row');
    rows.forEach((row, index) => {
      gsap.fromTo(
        row,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, delay: index * 0.05, duration: 0.5 }
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
    } else if (selectedOption.value === 'author') {
      return item.author.toLowerCase().includes(searchValue.value.trim().toLowerCase());
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


<style>
.top-layer {
  display: flex;
  gap: 20px;
}
</style>
