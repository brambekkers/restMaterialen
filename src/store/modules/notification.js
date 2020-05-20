export default {
    state: {},
    getters: {},
    mutations: {},
    actions: {
        notification({}, { style, msg }) {
            let title, message, type, icon;
            const template = `
                <div class="alert alert-{0} alert-with-icon alert-dismissible fade show col-10 col-md-8 col-lg-6 col-xl-3" data-notify="container">
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
            }
            if (style === "success") {
                title = msg.title;
                message = msg.text;
                icon = "fas fa-thumbs-up";
                type = "success";
            }
            if (style === "warning") {
                title = msg.title;
                message = msg.text;
                icon = "fas fa-exclamation-triangle";
                type = "warning";
            }

            $.notify({ title, message, icon }, { type, template });
        }
    }
};
