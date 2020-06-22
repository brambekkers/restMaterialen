import router from "@/router";
import * as firebase from "firebase";

// boostrap notify
import "bootstrap-notify";
// Sweet Alert 2
import Swal from "sweetalert2";

export default {
    state: {},
    getters: {},
    mutations: {},
    actions: {
        notification({}, { style, msg }) {
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
        alert({ getters }, { type, msg }) {
            return new Promise((resolve, reject) => {
                if (type === "warning") {
                    Swal.fire({
                        titleText: msg.title,
                        text: msg.text,
                        icon: "warning",
                        confirmButtonText: "Cool",
                        confirmButtonClass: "btn btn-success"
                    });
                } else if (type === "information") {
                    Swal.fire({
                        titleText: msg.title,
                        html: msg.text,
                        width: "70%",
                        icon: "question",
                        confirmButtonText: "Ik snap het",
                        confirmButtonClass: "btn btn-default"
                    });
                } else if (type === "image") {
                    Swal.fire({
                        imageUrl: msg,
                        confirmButtonText: "Aight",
                        confirmButtonClass: "btn btn-success "
                    });
                } else if (type === "confirm") {
                    Swal.fire({
                        titleText: msg.title,
                        html: msg.text,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn btn-danger",
                        confirmButtonText: "Ja, ik weet het zeker!",
                        cancelButtonText: "Nope",
                        cancelButtonClass: "btn btn-default"
                    }).then((result) => {
                        result.value ? resolve() : reject();
                    });
                } else if (type === "notLogedIn") {
                    let interval;
                    let hasRights = false;
                    Swal.fire({
                        titleText: `Geen rechten`,
                        html: `Je moet ingelogd zijn om deze pagina te bereiken. `,
                        width: "70%",
                        icon: "error",
                        confirmButtonText: "Ik snap het",
                        confirmButtonClass: "btn btn-default",
                        onBeforeOpen: () => {
                            interval = setInterval(() => {
                                if (getters.user) {
                                    hasRights = true;
                                    Swal.close();
                                }
                            }, 100);
                        },
                        onClose: () => {
                            clearInterval(interval);
                        }
                    }).then(() => {
                        if (!hasRights) {
                            router.push("/login");
                        } else {
                            msg.onComplete();
                        }
                    });
                } else if (type === "noPermission") {
                    let interval;
                    let hasRights = false;
                    Swal.fire({
                        titleText: `Geen rechten`,
                        html: `Het lijkt erop dat je <b>niet</b> de juiste rechten voor deze pagina bezit.`,
                        width: "70%",
                        icon: "error",
                        confirmButtonText: "Ik snap het",
                        confirmButtonClass: "btn btn-default",
                        onBeforeOpen: () => {
                            interval = setInterval(() => {
                                const admin = msg.rightsNeeded === "admin" && getters.isAdmin;
                                const editor = msg.rightsNeeded === "editor" && getters.isEditor;
                                if (admin || editor) {
                                    hasRights = true;
                                    Swal.close();
                                }
                            }, 100);
                        },
                        onClose: () => {
                            clearInterval(interval);
                        }
                    }).then(() => {
                        if (!hasRights) {
                            router.push("/");
                        } else {
                            msg.onComplete();
                        }
                    });
                }
            });
        },
        reauthenticateAlert({ getters }) {
            return new Promise(async (resolve, reject) => {
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
