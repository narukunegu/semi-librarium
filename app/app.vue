<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Thư Viện Đại Chủng Viện Thánh Giuse - Sài Gòn",
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/logo.png", // Path relative to the public folder
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "Thư Viện Đại Chủng Viện Thánh Giuse - Sài Gòn lưu giữ hơn 70.000 đầu sách, tài liệu nghiên cứu Kinh Thánh, Triết học và Thần học.",
    },
    {
      name: "keywords",
      content:
        "catholic, seminary, saigon, library, thu vien, dai chung vien, kinh thanh",
    },
  ],
});
</script>
