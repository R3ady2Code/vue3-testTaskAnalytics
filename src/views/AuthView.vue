<template>
  <div class="auth">
    <h1>LeadHit</h1>
    <form @submit.prevent="submitHandler" method="get">
      <div class="input-field col s6">
        <input @focus="focused = true" @blur="focused = false" id="last_name" type="text" class="validate"
          :class="{ invalid: v$.id.$error }" v-model="id">
        <label for="last_name">ID сайта</label>
        <span v-show="v$.id.$error && !this.focused" class="helper-text invalid">ID сайта должен содержать 24
          символа</span>
      </div>
      <button class="btn waves-effect waves-light auth-submit" type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, maxLength, minLength } from '@vuelidate/validators';

export default {
  setup: () => ({ v$: useVuelidate() }),
  data: () => ({ id: '', focused: false }),
  validations() {
    return {
      id: { required, minLength: minLength(24), maxLength: maxLength(24), autoDirty: true }
    }
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      await fetch('https://track-api.leadhit.io/client/test_auth', {
        headers: {
          'api-key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
          'leadhit-site-id': this.id
        }
      }).then((res) => {
        if (res.ok) {
          localStorage.setItem('leadhit-site-id', this.id)
          this.$router.push('/analytics')
        }
      }).catch(e => console.log(e.message))

    }
  }
};
</script>
