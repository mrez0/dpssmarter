<template>
  <div class="row bg-white q-pa-sm q-pl-md items-center" style="margin-top: -20px">
    <div class="col row">
      <div class="col-4">
        <q-input
          class="border-radius-inherit small-height"
          placeholder="Search..."
          outlined
          dense
          style="background: #F8F9FC;"
        ></q-input>
      </div>
      <q-btn
        class="q-mr-xl small-height"
        icon="search"
        color="primary"
        style="border-radius: 0 10px 10px 0;margin-left: -10px; height: 30px;"
      ></q-btn>
    </div>
    <div class="col-auto row notifications items-center" style="margin-right: 100px">
      <q-btn icon="mdi-bell" color="grey" dense round flat>
        <q-badge color="negative" floating style="top: 0">10</q-badge>
        <q-menu ref="notificationMenu">
          <div class="no-wrap q-pa-none" style="width: 500px">
            <div class="row q-pa-md bg-primary text-white text-subtitle1 text-uppercase text-bold">
              <div class="text-h6">Notifications</div>
              <q-space></q-space>
              <q-btn color="white" outline>Mark all seen</q-btn>
            </div>
            <q-list class="q-pa-none">
              <q-item
                class="q-px-md"
                clickable
                v-ripple
                v-for="(notification, index) of 10"
                :key="index"
              >
                <q-item-section avatar="avatar" top="top">
                  <img class="dept-img2" src="notificationImage(notification.userImage)" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>12-Oct-2020</q-item-label>
                  <q-item-label lines="1" class="!notification.seen ? 'text-bold' : ''">notif 1</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="q-px-md">
                <q-item-label lines="1">No new notification</q-item-label>
              </q-item>
            </q-list>
          </div>
        </q-menu>
      </q-btn>
      <q-separator class="q-ml-lg q-mr-sm" vertical="vertical"></q-separator>
      <div class="text-capitalize text-subtitle1 text-primary q-ml-md">Ahmed Sonbaty</div>
      <q-btn-dropdown class="q-ma-none q-pa-none" flat round color="primary">
        <template v-slot:label>
          <img class="dept-img2" src="userImage" />
        </template>
        <q-list>
          <q-item clickable="clickable" v-close-popup>
            <q-item-section>
              <q-item-label>Change Password</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
  </div>
</template>
