import { useConfigStore } from '@/stores/config'

const usernameValidator = () => {
  const Config = useConfigStore()
  return (rule, value, callback) => {
    const regexp = new RegExp(`${Config.data.user.username.regexp}`)
    if (!regexp.test(value)) {
      callback(new Error(Config.data.user.username.tips))
    } else {
      callback()
    }
  }
}

const passwordValidator = () => {
  const Config = useConfigStore()
  return (rule, value, callback) => {
    const regexp = new RegExp(`${Config.data.user.password.regexp}`)
    if (!regexp.test(value)) {
      callback(new Error(Config.data.user.password.tips))
    } else {
      callback()
    }
  }
}

const phoneValidator = () => {
  return (rule, value, callback) => {
    const regexp = /^[1-9][0-9]{10}$/
    if (value.length > 0 && !regexp.test(value)) {
      callback(new Error('手机号码格式不正确'))
    } else {
      callback()
    }
  }
}

const emailValidator = () => {
  return (rule, value, callback) => {
    const regexp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (value.length > 0 && !regexp.test(value)) {
      callback(new Error('电子邮箱格式不正确'))
    } else {
      callback()
    }
  }
}

const captchaValidator = () => {
  const Config = useConfigStore()
  return (rule, value, callback) => {
    const regexp = new RegExp(`^[a-zA-Z0-9]{${Config.data.captcha.length}}$`)
    if (!regexp.test(value)) {
      callback(new Error('验证码格式不正确'))
    } else {
      callback()
    }
  }
}

const emailCodeValidator = () => {
  return (rule, value, callback) => {
    const regexp = /^[a-zA-Z0-9]{6}$/
    if (!regexp.test(value)) {
      callback(new Error('邮件校验码格式不正确'))
    } else {
      callback()
    }
  }
}

export default {
  username: usernameValidator,
  password: passwordValidator,
  phone: phoneValidator,
  email: emailValidator,
  captcha: captchaValidator,
  emailCode: emailCodeValidator
}
