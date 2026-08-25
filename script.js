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

                <article class="group-card reveal">

                    <div class="
                        group-icon
                        ${group.accent}
                    ">
                        ${group.icon}
                    </div>

                    <span class="group-number">
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                    <h3>
                        ${escapeHTML(group.name)}
                    </h3>

                    <p>
                        ${escapeHTML(group.description)}
                    </p>

                    <a
                        class="card-link"
                        href="group.html?group=${encodeURIComponent(group.id)}"
                    >
                        Grubu Keşfet →
                    </a>

                </article>

                `;

            }
        ).join("");

}


/* =========================================
   SUPABASE SETTINGS
========================================= */

const SUPABASE_URL =
    "https://dufqdjvjszewhhakjibb.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_zdE8Z15zobFjWJ0P86B5Qg_55sAbHer";


/* =========================================
   MANAGEMENT
========================================= */

async function loadManagement() {

    const managementGrid =
        document.getElementById(
            "managementGrid"
        );

    if (!managementGrid) {
        return;
    }


    /* Loading message */

    managementGrid.innerHTML = `

        <article class="person-card reveal">

            <div class="avatar">
                ...
            </div>

            <small>
                YÖNETİM
            </small>

            <h3>
                Loading...
            </h3>

            <p>
                Management profiles are loading...
            </p>

        </article>

    `;


    try {

        /*
           Direct Supabase REST request.

           No external Supabase JavaScript
           library is required.
        */

        const response =
            await fetch(
                SUPABASE_URL +
                "/rest/v1/management?select=*",
                {
                    method: "GET",

                    headers: {
                        "apikey":
                            SUPABASE_KEY,

                        "Authorization":
                            "Bearer " +
                            SUPABASE_KEY,

                        "Content-Type":
                            "application/json"
                    }
                }
            );


        /*
           Check HTTP response.
        */

        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                "Supabase HTTP " +
                response.status +
                ": " +
                errorText
            );

        }


        /*
           Convert response to JSON.
        */

        const data =
            await response.json();


        console.log(
            "Management data:",
            data
        );


        /*
           No profiles.
        */

        if (
            !Array.isArray(data) ||
            data.length === 0
        ) {

            managementGrid.innerHTML = `

                <article class="person-card reveal">

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
           Create cards.
        */

        managementGrid.innerHTML =
            data.map(
                person => {

                    const name =
                        person.name ||
                        "İsimsiz";

                    const role =
                        person.role ||
                        "YÖNETİM";

                    const description =
                        person.description ||
                        "";

                    const image =
                        person.photo_url ||
                        "";


                    return `

                    <article
                        class="person-card reveal"
                    >

                        <div class="avatar">

                            ${
                                image
                                ?
                                `
                                <img
                                    src="${escapeHTML(image)}"
                                    alt="${escapeHTML(name)}"
                                >
                                `
                                :
                                "Üİ"
                            }

                        </div>

                        <small>
                            ${escapeHTML(role)}
                        </small>

                        <h3>
                            ${escapeHTML(name)}
                        </h3>

                        <p>
                            ${escapeHTML(description)}
                        </p>

                    </article>

                    `;

                }
            ).join("");


        /*
           Add scroll animation.
        */

        managementGrid
            .querySelectorAll(".reveal")
            .forEach(
                element => {

                    if (typeof observer !== "undefined") {

                        observer.observe(
                            element
                        );

                    }

                }
            );


    }

    catch (error) {

        console.error(
            "MANAGEMENT ERROR:",
            error
        );


        /*
           Show the real error instead of
           hiding it behind a generic message.
        */

        managementGrid.innerHTML = `

            <article
                class="person-card reveal"
            >

                <div class="avatar">
                    !
                </div>

                <small>
                    MANAGEMENT ERROR
                </small>

                <h3>
                    Management could not be loaded
                </h3>

                <p>
                    ${escapeHTML(
                        error.message ||
                        "Unknown error"
                    )}
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


if (menuButton && navigation) {

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

                    if (navigation) {

                        navigation.classList.remove(
                            "open"
                        );

                    }

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