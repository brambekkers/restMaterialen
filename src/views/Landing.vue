<template>
    <div class="landing">
        <section class="top">
            <div class="background"></div>
            <div class="content">
                <p class="brand"><span>HMC</span> mbo vakschool</p>
                <h1 class="title">Restmaterialen</h1>
                <div class="separator">
                    <span class="line_left"></span>
                    <span class="line_right"></span>
                    <i class="fas fa-recycle"></i>
                </div>
                <h3 class="subtitle">Duurzaam hergebruik van materiaal!</h3>
                <router-link tag="button" class="btn btn-outline-default btn-lg mt-5" to="/libary">Bekijk materialen</router-link>
            </div>
        </section>
        <section class="bottom">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-sm-4">
                        <div class="info-icon">
                            <div class="icon">
                                <i class="fas fa-tree"></i>
                            </div>
                            <h3>Milieu</h3>
                            <p class="description">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates non temporibus magni debitis ad ipsa tempora eum adipisci explicabo? Error pariatur ipsam quas,
                                dolores odio est fugit officia illum consectetur!
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="info-icon">
                            <div class="icon">
                                <i class="far fa-money-bill-alt"></i>
                            </div>
                            <h3>Besparing</h3>
                            <p class="description">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid vitae velit tempore architecto molestias a ipsam dolore mollitia reprehenderit quae odit possimus,
                                assumenda porro debitis veritatis blanditiis qui molestiae saepe!
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="info-icon">
                            <div class="icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <h3>Samen</h3>
                            <p class="description">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias asperiores aperiam quia tempore velit! Sunt corporis labore, autem quisquam non sequi tempore qui
                                hic molestiae molestias et illum id quis?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "Landing"
};
</script>

<style lang="scss" scoped>
.landing {
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 1000;
    display: flex;
    flex-direction: column;

    section {
        padding: 0 50px;
    }

    .top {
        position: relative;
        height: 60vh;
        background: lightgrey;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;

        .background {
            position: absolute;
            opacity: 0.5;
            z-index: 1;
            width: 100%;
            height: 100%;
            background: url("../assets/img/background.jpg");
            background-repeat: no-repeat;
            background-size: cover;
        }
        .content {
            z-index: 2;

            .brand {
                font-size: 2vmin;
            }
            .title {
                font-weight: 400;
                font-size: 5vmin;
                text-shadow: -2px 2px 0px rgba(0, 0, 0, 0.3), -2px 4px 2px rgba(0, 0, 0, 0.1);
            }

            .subtitle {
                font-size: 3vmin;
            }

            .separator {
                position: relative;
                width: 100%;
                margin: 20px 0;
                height: 1px;
                text-align: center;

                i {
                    position: absolute;
                    font-size: 2vmin;
                    transform: translate(-50%, -50%);
                }

                .line_left:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 5%;
                    right: 54%;
                    width: 41%;
                    height: 1px;
                    background-image: linear-gradient(to left, rgb(48, 49, 51), transparent);
                }

                .line_right:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 54%;
                    right: 5%;
                    width: 41%;
                    height: 1px;
                    background-image: linear-gradient(to right, rgb(48, 49, 51), transparent);
                }
            }
        }
    }

    .bottom {
        padding-top: 20px;
        background-color: #f4f3ef;
        text-align: center;

        .icon {
            font-size: 6vmin;
            color: #ef8157;
        }
    }
}
</style>
