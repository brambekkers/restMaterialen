import firebase from "firebase/app";

// Sweet Alert 2
import Swal from "sweetalert2";

export default {
    state: {
        toast: null
    },

    getters: {
        toast(state) {
            return state.toast;
        }
    },

    mutations: {
        toast(state, val) {
            state.toast = val;
        }
    },
    actions: {
        notification({ getters }, { style, msg }) {
            if (style === "success") {
                const icon = "fas fa-thumbs-up fa-2x";
                getters.toast.success(msg.text, { icon });
            }

            if (style === "error") {
                const icon = "fas fa-exclamation-triangle fa-2x";
                getters.toast.error(msg.message, { icon });
            }

            if (style === "warning") {
                const icon = "fas fa-exclamation-triangle fa-2x";
                getters.toast.warning(msg.text, { icon });
            }
        },
        kanNogWeg({ }, { style, msg }) {
            let title, message, type, icon;
            const template = `
                <div class="alert alert-{0} alert-with-icon alert-dismissible fade show col-10 col-md-8 col-lg-6 col-xl-4 col-xxl-3" data-notify="container">
                    <button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>
                    <span data-notify="icon"></span>
                    <span data-notify="title" class="font-weight-bold">{1}</span>
                    <span data-notify="message">{2}</span>
                </div>`;
            if (style === "error") {
                title = `Error - ${msg.code}`;
                message = msg.message;
                icon = "fas fa-exclamation-triangle";
                type = "danger";
            } else if (style === "success") {
                title = msg.title;
                message = msg.text;
                icon = "fas fa-thumbs-up";
                type = "success";
            } else if (style === "warning") {
                title = msg.title;
                message = msg.text;
                icon = "fas fa-exclamation-triangle";
                type = "warning";
            }

            $.notify({ title, message, icon }, { type, template });
        },
        alert({ }, { type, msg }) {
            return new Promise((resolve, reject) => {
                if (type === "warning") {
                    Swal.fire({
                        titleText: msg.title,
                        text: msg.text,
                        icon: "warning",
                        confirmButtonText: "Cool",
                        customClass: {
                            confirmButton: 'btn btn-success',
                        },
                    });
                } else if (type === "information") {
                    Swal.fire({
                        titleText: msg.title,
                        html: msg.text,
                        width: "70%",
                        icon: "question",
                        confirmButtonText: "Ik snap het",
                        customClass: {
                            confirmButton: 'btn btn-default',
                        },
                    });
                } else if (type === "image") {
                    Swal.fire({
                        imageUrl: msg,
                        confirmButtonText: "Aight",
                        customClass: {
                            confirmButton: 'btn btn-success',
                        },
                    });
                } else if (type === "confirm") {
                    Swal.fire({
                        titleText: msg.title,
                        html: msg.text,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ja, ik weet het zeker!",
                        cancelButtonText: "Nope",
                        customClass: {
                            confirmButton: 'btn btn-danger',
                            cancelButton: 'btn btn-default'
                        },
                    }).then((result) => {
                        result.value ? resolve() : reject();
                    });
                }
            });
        },
        reauthenticateAlert({ getters }) {
            return new Promise(async (resolve, reject) => {
                console.log("new function to authenticate");
                const title = `<img class="border shadow" src="https://www.deviersprong.nl/wp-content/uploads/2017/11/img-person-placeholder.jpg">`;
                const body = `
                        <h4 class="card-title mt-0">${getters.user.firstName} ${getters.user.lastName}</h4>
                        <p>Unlock je account om verder te gaan.</p>`;
                try {
                    const result = await Swal.fire({
                        title: title,
                        html: body,
                        customClass: {
                            popup: "card card-lock",
                            header: "card-header",
                            content: "card-body form-group",
                            input: "form-control",
                            confirmButton: "btn btn-success btn-round mt-n3"
                        },
                        confirmButtonText: "Unlock",
                        input: "password",
                        inputPlaceholder: "Vul password in..",
                        inputAttributes: {
                            autocapitalize: "off",
                            autocorrect: "off"
                        }
                    });
                    const credential = firebase.auth.EmailAuthProvider.credential(getters.user.email, result.value);
                    await getters.auth.currentUser.reauthenticateWithCredential(credential);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
};
