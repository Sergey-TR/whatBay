<template>
  <div class="main-wrapper flex-center-column">
  <div class="section-heading">
    <h3 class="h3">Вход</h3>
      <p class="section-content">
        Введите ваши учетные данные
      </p>
  </div>
  <form class="form" method="post" @submit.prevent="submitHandler">
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

    <label class="form-label" for="user_password">
      Введите пароль
      <small class="invalid err_info" v-if="$v.password.$dirty && !$v.password.required">
        Поле пароль не должно быть пустым
      </small>
      <div class="wrapper-input">
        <input class="form-input form-font-password"
             type="password"
             id="user_password"
             v-model.trim="password"
             :class="{invalid: $v.password.$dirty && !$v.password.required}"
        >
        <img class="display-password-pic"
           src="../assets/img/eye.svg" alt="display"
           @click="show_hide_password(`user_password`)">
      </div>
    </label><br>

    <button class="button btn-log" type="submit">Войти</button>
  </form>
    <div class="registerWay">
      <p class="text-center">
        <router-link to="/registration">
          <span>Зарегистрируйтесь</span>
        </router-link>
          , если нет аккаунта.
      </p>
  </div>
  </div>
</template>

<script>
import {required, email, minLength} from "vuelidate/lib/validators";

export default {
  name: "Login",

  data() {
    return {
      email: '',
      password: '',
      user_name: ''
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
    password: {
      required
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
        email: this.email,
        password: this.password,
        //username: this.email
      }
      try {
        await this.$store.dispatch('login', formData)
        await this.$router.push('/my_shop')
      }
        catch (e) {}
    },
  },
}
</script>

<style>
.section-heading {
  width: 100%;
  margin-bottom: 23px;
}
.section-content {
  color: #575F6E;
  line-height: 22px;
  font-size: 14px;
}
.form {
  border: 1px solid #E2E4E5;
  border-radius: 10px;
  padding: 32px;
  color: #242E42;
  display: flex;
  flex-wrap: wrap;
}

.form-label {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  line-height: 20px;
  width: 100%;
}

.form > .form-label:not(:first-child) {
  margin-top: 32px;
}

.wrapper-input {
  display: flex;
  margin-bottom: 16px;
}

.display-password-pic {
  border-bottom: 1px solid #E2E4E5;
}

.form-input {
  width: 100%;
  padding: 8px 16px;

  border-bottom: 1px solid #E2E4E5;
  border-top: none;
  border-left: none;
  border-right: none;

  font-size: 14px;
  /*line-height: 28px;*/
}

.form-input:focus {
  outline: none;
  border-bottom: 1px solid #2C9AB7;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}

input:focus:-moz-placeholder {
  color: transparent;
}

/* FF 4-18 */
input:focus::-moz-placeholder {
  color: transparent;
}

/* FF 19+ */
input:focus:-ms-input-placeholder {
  color: transparent;
}
.btn-log {
  width: 79px;
  height: 44px;
}
.registerWay {
  border: 1px solid #E2E4E5;
  border-radius: 10px;
  margin-top: 16px;
}
.text-center {
  text-align: center;
  padding-top: 16px;
}
.invalid {
  border-bottom: 2px solid darkred;

}

.err_info {
  color: darkred;
}

</style>