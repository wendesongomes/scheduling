<script setup lang="ts">
const props = defineProps<{
  invites: string[];
}>();
const inviteName = props.invites.map((invite) => invite.slice(0, 2));

const displayedInvites = inviteName.slice(0, 5);
const additionalInvitesCount = inviteName.length - 5;
</script>

<template>
  <div class="container-invites">
    <span
      v-if="inviteName.length <= 5"
      v-for="(invite, index) in displayedInvites"
      :key="index"
      :style="{ right: `${2 + index * 0.8}rem` }"
      class="invite"
    >
      {{ invite }}
    </span>
    <div class="more-invites" v-else>
      <span
        v-for="(invite, index) in displayedInvites"
        :key="index"
        :style="{ right: `${2 + index * 0.8}rem` }"
        class="invite"
      >
        {{ invite }}
      </span>
      <p>+{{ additionalInvitesCount }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-invites {
  display: flex;
  gap: 0.4rem;
  padding-left: 2rem;

  .more-invites {
    display: flex;
    align-items: center;

    p {
      background-color: rgb(48, 48, 48);
      border-radius: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 3rem;
      font-size: 1rem;
      font-weight: 800;
      color: white;
      border: solid 0.2rem white;
      text-transform: capitalize;
      right: 6rem;
    }
  }
}

.invite {
  background-color: rgb(48, 48, 48);
  border-radius: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  font-size: 1rem;
  font-weight: 800;
  color: white;
  border: solid 0.2rem white;
  text-transform: capitalize;
}
</style>
