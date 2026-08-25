/* =========================================
   ÜMMETİN IŞIKLARI
   GROUP DATA
========================================= */

const groups = [

    {
        id: "yardimlasma",
        name: "Yardımlaşma",
        icon: "🤝",
        accent: "green",
        description:
            "Yardımlaşma grubunun çalışmaları ve faaliyetleri hakkında bilgi."
    },

    {
        id: "din",
        name: "Din",
        icon: "☪️",
        accent: "green",
        description:
            "Din grubunun çalışmaları ve faaliyetleri hakkında bilgi."
    },

    {
        id: "kultur",
        name: "Kültür",
        icon: "🕌",
        accent: "gold",
        description:
            "Kültür grubunun çalışmaları ve faaliyetleri hakkında bilgi."
    },

    {
        id: "spor",
        name: "Spor",
        icon: "⚽",
        accent: "orange",
        description:
            "Spor grubunun çalışmaları ve faaliyetleri hakkında bilgi."
    },

    {
        id: "it",
        name: "İT",
        icon: "🖥️",
        accent: "green",
        description:
            "İT grubunun çalışmaları ve faaliyetleri hakkında bilgi."
    },

    {
        id: "finans",
        name: "Finans",
        icon: "📊",
        accent: "gold",
        description:
            "Finans grubunun çalışmaları ve faaliyetleri hakkında bilgi."
    }

];


/* =========================================
   GROUP CARDS
========================================= */

const groupsGrid =
    document.getElementById("groupsGrid");


if (groupsGrid) {

    groupsGrid.innerHTML =

        groups.map(
            (group, index) => {

                return `

                <article
                    class="group-card reveal"
                >

                    <div
                        class="
                            group-icon
                            ${group.accent}
                        "
                    >
                        ${group.icon}
                    </div>


                    <span class="group-number">

                        ${String(
                            index + 1
                        ).padStart(2, "0")}

                    </span>


                    <h3>
                        ${group.name}
                    </h3>


                    <p>
                        ${group.description}
                    </p>


                    <a
                        class="card-link"
                        href="
                            group.html?group=${encodeURIComponent(
                                group.id
                            )}
                        "
                    >

                        Grubu Keşfet →

                    </a>

                </article>

                `;

            }
        ).join("");

}


/* =========================================
   SUPABASE
========================================= */

const SUPABASE_URL =
    "https://dufqdjvjszewhhakjibb.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_zdE8Z15zobFJWeJ0P86B5Qg_55sAbHer";


let supabaseClient = null;


/*
   Load Supabase only when the Management
   section exists.
*/

async function loadManagement() {

    const managementGrid =
        document.getElementById(
            "managementGrid"
        );


    if (!managementGrid) {
        return;
    }


    try {

        /*
           Load Supabase library dynamically.
        */

        const {
            createClient
        } =
            await import(
                "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm"
            );


        supabaseClient =
            createClient(
                SUPABASE_URL,
                SUPABASE_KEY
            );


        /*
           Get management profiles.
        */

        const result =
            await supabaseClient
                .from("management")
                .select("*")
                .order(
                    "created_at",
                    {
                        ascending: true
                    }
                );


        if (result.error) {

            throw result.error;

        }


        /*
           No profiles yet.
        */

        if (
            !result.data ||
            result.data.length === 0
        ) {

            managementGrid.innerHTML = `

                <article
                    class="person-card reveal"
                >

                    <div class="avatar">
                        Üİ
                    </div>

                    <small>
                        YÖNETİM
                    </small>

                    <h3>
                        Yönetim Profili
                    </h3>

                    <p>
                        Henüz yönetim profili eklenmedi.
                    </p>

                </article>

            `;

            return;

        }


        /*
           Create management cards.
        */

        managementGrid.innerHTML =

            result.data.map(
                person => {

                    const image =
                        person.photo_url;


                    return `

                    <article
                        class="person-card reveal"
                    >

                        <div class="avatar">

                            ${
                                image

                                ?

                                `<img
                                    src="${escapeHTML(
                                        image
                                    )}"
                                    alt="${escapeHTML(
                                        person.name
                                    )}"
                                >`

                                :

                                "Üİ"
                            }

                        </div>


                        <small>
                            ${escapeHTML(
                                person.role ||
                                "YÖNETİM"
                            )}
                        </small>


                        <h3>
                            ${escapeHTML(
                                person.name
                            )}
                        </h3>


                        <p>
                            ${escapeHTML(
                                person.description ||
                                ""
                            )}
                        </p>

                    </article>

                    `;

                }
            ).join("");


        /*
           Observe newly-created cards
           for scroll reveal.
        */

        managementGrid
            .querySelectorAll(".reveal")
            .forEach(
                element => {

                    observer.observe(
                        element
                    );

                }
            );


    }

    catch (error) {

        console.error(
            "Management loading error:",
            error
        );


        managementGrid.innerHTML = `

            <article
                class="person-card reveal"
            >

                <div class="avatar">
                    !
                </div>

                <small>
                    YÖNETİM
                </small>

                <h3>
                    Yönetim bilgileri yüklenemedi
                </h3>

                <p>
                    Lütfen sayfayı yenileyin.
                </p>

            </article>

        `;

    }

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );


const navigation =
    document.getElementById(
        "navigation"
    );


if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            navigation.classList.toggle(
                "open"
            );

        }
    );

}


document
    .querySelectorAll(
        "#navigation a"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "open"
                    );

                }
            );

        }
    );


/* =========================================
   SCROLL REVEAL
========================================= */

const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.1
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(
        element => {

            observer.observe(
                element
            );

        }
    );


/* =========================================
   START MANAGEMENT
========================================= */

loadManagement();