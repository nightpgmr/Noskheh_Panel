<template>
    <div class="flex items-center justify-between p-4 my-2 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300">
      <div class="flex items-center space-x-4">
        <img src="/assets/images/daro.jpg" alt="drug" class="w-10 h-10 object-contain" />
        <div class="flex flex-col text-right">
          <span class="text-lg font-semibold text-gray-800">
            آموکسی‌سیلین ۵۰۰ میلی‌گرم
          </span>
          <span class="text-sm text-gray-500">
            هر ۱۲ ساعت - به مدت ۷ روز
          </span>
        </div>
      </div>
      <div class="flex space-x-4">
        <div class="flex justify-center items-center space-x-2 px-6 bg-blue-400 rounded-lg">
            <Icon name="mdi:beaker-outline" mode="svg" class="h-6 w-6 text-white" />
            <span class="text-4xl text-white font-bold">55</span>
            <span class="text-lg text-white text-center text-nowrap">عدد<br/>در بسته</span>
        </div>
        <div class="flex justify-center items-center space-x-2 px-8 py-0 bg-gray-100 rounded-lg">
            <Icon name="mdi:beaker-outline" mode="svg" class="h-6 w-6 text-gray-400" />
            <span class="text-sm text-gray-600 text-center text-nowrap">شرکت سازنده</span>
        </div>
      </div>
      <div class="flex items-center">
        <button class="bg-gray-100 text-gray-400 rounded-md">
            <Icon name="mdi:delete-outline" mode="svg" class="h-12 w-12 text-gray-400 hover:text-gray-600 cursor-pointer" />
        </button>
        <button class="bg-purple-800 text-white rounded-md mr-6">
            <Icon name="mdi:pencil-outline" mode="svg" class="h-12 w-12 text-white-400 hover:text-white-600 cursor-pointer" />
        </button>
        <button class="bg-transparent text-gray-400 rounded-md mr-1">
            <Icon name="mdi:more-vert" mode="svg" class="h-12 w-12 text-white-400 hover:text-white-600 cursor-pointer" />
        </button>
      </div>
    </div>
  </template>