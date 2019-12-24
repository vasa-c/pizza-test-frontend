<template>
    <div id="login-popup">
        <div id="login-popup-fade" @click="close"></div>
        <div id="login-popup-form">
            <h2 v-if="!reqLoginEmail">Sign In</h2>
            <h2 v-if="reqLoginEmail">E-mail already exist</h2>
            <div class="login-popup-close" @click="close">
                <img src="~/assets/icons/close.svg" alt="" />
            </div>
            <form @submit.prevent="submit">
                <div class="login-popup-form-field">
                    <input type="text" value="" ref="email" placeholder="E-mail, please" />
                </div>
                <div class="login-popup-form-field">
                    <input type="password" value="" ref="password" placeholder="Password" />
                </div>
                <button type="submit">Sign In</button>
                <p v-if="error" class="login-popup-error">Error. Check your data.</p>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                wait: false,
                error: false,
            };
        },
        components: {
        },
        computed: {
            reqLoginEmail() {
                return this.$store.getters["user/reqLoginEmail"];
            },
        },
        methods: {
            close() {
                this.$store.dispatch("user/closeLoginPopup");
            },
            submit() {
                if (this.wait) {
                    return;
                }
                const
                    email = this.$refs.email.value.replace(/^\s+/, "").replace(/\s+$/, ""),
                    password = this.$refs.password.value;
                if (email === "") {
                    this.$refs.email.focus();
                    return;
                }
                if (password === "") {
                    this.$refs.password.focus();
                    return;
                }
                this.wait = true;
                this.$store.dispatch("api", {
                    action: "login",
                    data: {
                        email: email,
                        password: password,
                    },
                }).then((response) => {
                    const user = response.data.user || null;
                    this.wait = false;
                    this.$store.commit("user/user", user);
                    if (user) {
                        this.error = false;
                        this.close();
                    } else {
                        this.error = true;
                    }
                }).catch((error) => {
                    this.wait = false;
                    this.error = true;
                });
            },
        },
        mounted() {
            this.error = false;
            if (this.reqLoginEmail) {
                this.$refs.email.value = this.reqLoginEmail;
                this.$refs.password.focus();
            } else {
                this.$refs.email.focus();
            }
        },
    }
</script>

<style lang="scss">
    #login-popup {
        text-align: center;
    }
    #login-popup-fade {
        position: fixed;
        z-index: 2000;
        background-color: black;
        opacity: 0.8;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
    #login-popup-form {
        position: fixed;
        @media screen and (max-width: 767px) {
            left: 5%;
            width: 90%;
        }
        @media screen and (min-width: 768px) {
            width: 750px;
            left: 50%;
            margin-left: -375px;
        }
        height: 300px;
        background-color: white;
        z-index: 3000;
        top: 50px;
        border-radius: 10px;
        button {
            background-color: #28a745;
            color: white;
            font-size: 20px;
            border: 1px solid #28a745;
            border-radius: 3px;
            padding: 10px 50px;
            cursor: pointer;
        }
    }
    .login-popup-form-field {
        margin: 20px 0;
        input {
            font-size: 24px;
            border: 1px solid black;
            border-radius: 5px;
            padding: 5px;
            @media screen and (max-width: 767px) {
                width: 85%;
            }
            @media screen and (min-width: 768px) {
                width: 500px;
            }
        }
    }
    .login-popup-close {
        position: absolute;
        right: 10px;
        top: 10px;
        img {
            width: 15px;
            cursor: pointer;
        }
    }
    .login-popup-error {
        color: red;
    }

</style>
