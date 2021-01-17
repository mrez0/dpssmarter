<template>
  <div>
    <q-separator class="q-mx-auto bg-white" style="width: 80%;" />
    <q-list>
      <q-item
        :to="{name: 'department'}"
        exact
        style="min-height: 0"
        class="departments-link"
      >DEPARTMENTS</q-item>

      <q-item :to="{name: 'position'}" exact style="min-height: 0" class="positions-link">POSITIONS</q-item>

      <q-item
        :to="{name: 'permission'}"
        exact
        style="min-height: 0"
        class="permissions-link"
      >PERMISSIONS</q-item>
      <q-item :to="{name: 'rigs'}" exact style="min-height: 0" class="rigs-link">RIGS</q-item>
      <q-item :to="{name: 'users'}" exact style="min-height: 0" class="users-link">USERS</q-item>
    </q-list>
  </div>
</template>

<style>
.router-link-exact-active,
.router-link-active,
.q-router-link--active {
  color: white !important;
  font-weight: bold;
  text-align: center;
  cursor: default;
}
</style>
