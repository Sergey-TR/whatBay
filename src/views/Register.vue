<template>
  <div>
  <div class="section-heading">
    <h3 class="h3">Регистрация</h3>
      <p class="section-content">
        Заполните регистрационные данные. Это займет совсем мало времени
      </p>
  </div>
  <form class="form" action="#" method="post" @submit.prevent="submitHandler">
    <label class="form-label" for="user_email">
      Введите ваш e-mail
    </label>
    <small class="invalid err_info" v-if="$v.email.$dirty && !$v.email.required">
      Поле e-mail не должно быть пустым
    </small>
    <small class="invalid err_info" v-else-if="$v.email.$dirty && !$v.email.email">
      e-mail должен выглядеть пример: example@gmail.com
    </small>
    <input class="form-input"
           type="email"
           placeholder="for_example@gmail.com"
           id="user_email"
           v-model.trim="email"
           :class="{invalid: ($v.email.$dirty && !$v.email.required)
             || ($v.email.$dirty && !$v.email.email)}"
    >

    <label class="form-label" for="user_name">
      Введите ваш login
    </label>
    <small class="invalid err_info" v-if="($v.user_name.$dirty && !$v.user_name.required)
        || ($v.user_name.$dirty && !$v.user_name.minLength)">
      Поле имя не должно быть пустым, и содержать не менее {{ $v.user_name.$params.minLength.min }} символов.
    </small>
    <input class="form-input"
           type="text"
           placeholder="Name"
           id="user_name"
           v-model.trim="user_name"
           :class="{invalid: ($v.user_name.$dirty && !$v.user_name.required)
          || ($v.user_name.$dirty && !$v.user_name.minLength)}">

    <label class="form-label" for="firstname">
      Введите ваше имя
    </label>
    <small class="invalid err_info" v-if="($v.firstname.$dirty && !$v.firstname.required)
        || ($v.firstname.$dirty && !$v.firstname.minLength)">
      Поле имя не должно быть пустым, и содержать не менее {{ $v.firstname.$params.minLength.min }} символов.
    </small>
    <input class="form-input"
           type="text"
           placeholder="firstname"
           id="firstname"
           v-model.trim="firstname"
           :class="{invalid: ($v.firstname.$dirty && !$v.firstname.required)
          || ($v.firstname.$dirty && !$v.firstname.minLength)}">

    <label class="form-label" for="lastname">
      Введите ваш lastname
    </label>
    <small class="invalid err_info" v-if="($v.lastname.$dirty && !$v.lastname.required)
        || ($v.lastname.$dirty && !$v.lastname.minLength)">
      Поле имя не должно быть пустым, и содержать не менее {{ $v.lastname.$params.minLength.min }} символов.
    </small>
    <input class="form-input"
           type="text"
           placeholder="lastname"
           id="lastname"
           v-model.trim="lastname"
           :class="{invalid: ($v.lastname.$dirty && !$v.lastname.required)
          || ($v.lastname.$dirty && !$v.lastname.minLength)}">

    <label class="form-label" for="user_password">
      Установите пароль
      <small class="invalid err_info" v-if="$v.password.$dirty && !$v.password.required">
        Поле пароль не должно быть пустым
      </small>
      <div class="wrapper-input">
      <input class="form-input form-font-password"
             type="password"
             id="user_password"
             v-model.trim="password"
             :class="{invalid: ($v.password.$dirty && !$v.password.required)
             || ($v.password.$dirty && !$v.password.minLength)}"
      >
      <img class="display-password-pic"
           src="../assets/img/eye.svg" alt="display"
           @click="show_hide_password(`user_password`)">
      </div>
      <small class="err_info" v-if="$v.password.$dirty && !$v.password.minLength">
        Пароль не менее {{ $v.password.$params.minLength.min }} символов, сейчас {{ password.length }}
      </small>
    </label><br>

    <label class="form-label" for="user_password_repeat">
      Повторите пароль
      <div class="wrapper-input">
      <input class="form-input form-font-password"
             type="password"
             id="user_password_repeat"
             v-model.trim="repeatPassword"
             :class="{invalid: ($v.repeatPassword.$dirty && !$v.repeatPassword.required)}">
      <img class="display-password-pic"
           src="../assets/img/eye.svg" alt="display"
           @click="show_hide_password(`user_password_repeat`)">
      </div>
      <small class="err_info" v-if="!$v.repeatPassword.sameAsPassword">
        Пароли должны совпадать
      </small>
    </label><br>

    <button class="button btn-reg" type="submit">Зарегистироваться</button>
  </form>
  </div>
</template>

<script>
import {required, minLength, sameAs, email} from "vuelidate/lib/validators";

export default {
  name: "Register",

  data() {
    return {
      email: '',
      user_name: '',
      password: '',
      repeatPassword: '',
      firstname: '',
      lastname: ''
    }
  },

  validations: {
    email: {
      email,
      required
    },
    user_name: {
      required,
      minLength: minLength(3)
    },
    firstname: {
      required,
      minLength: minLength(3)
    },
    lastname: {
      required,
      minLength: minLength(3)
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },

  methods: {
    show_hide_password(target){
      let input = document.getElementById(target);
      if (input.getAttribute('type') == 'password') {
        input.setAttribute('type', 'text');
      } else {
        input.setAttribute('type', 'password');
      }
      return false;
    },

    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        user_name: this.user_name,
        email: this.email,
        password: this.password,
        confirmPassword: this.repeatPassword,
        firstname: this.firstname,
        lastname: this.lastname
      }
      console.log(formData)
      try {
        await this.$store.dispatch('registration', formData)
        await this.$router.push('/my_shop')
      } catch (e) {}
    }
  }
}
</script>

<style>
.btn-reg {
  width: 175px;
  height: 44px;
}
</style>