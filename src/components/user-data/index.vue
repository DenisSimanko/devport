<template>
  <div class="user-data p-3">
    <div class="row mb-2">
      <div class="col-12 col-md-3 fw-bolder">Id</div>
      <div class="col-12 col-md-9">{{ user.id }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-12 col-md-3 fw-bolder">Name</div>
      <div class="col-12 col-md-9">{{ user.name }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-12 col-md-3 fw-bolder">User Name</div>
      <div class="col-12 col-md-9">{{ user.username }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-12 col-md-3 fw-bolder">Email</div>
      <div class="col-12 col-md-9">{{ user.email }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-12 col-md-3 fw-bolder">Address</div>
      <div class="col-12 col-md-9">{{ address }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-12 col-md-3 fw-bolder">Phone</div>
      <div class="col-12 col-md-9">{{ user.phone }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-12 col-md-3 fw-bolder">Website</div>
      <div class="col-12 col-md-9">{{ user.website }}</div>
    </div>
    <div class="row">
      <div class="col-12 col-md-3 fw-bolder">Company</div>
      <div class="col-12 col-md-9">{{ company }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserData",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  computed: {
    address() {
      return `${this.user.address.street}, ${this.user.address.suite}, ${this.user.address.city}, ${this.user.address.zipcode}`;
    },
    company() {
      return `${this.user.company.name}, ${this.user.company.catchPhrase}, ${this.user.company.bs}`;
    },
  },
};
</script>

<style lang="scss">
.user-data {
  color: $gray-900;
  background-color: $gray-100;
  border-radius: $border-radius;
}
</style>
