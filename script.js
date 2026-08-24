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
   MANAGEMENT PLACEHOLDERS
========================================= */

const management = [

    {
        name: "Yönetim Profili",
        role: "YÖNETİM",
        duties:
            "İsim, fotoğraf ve görev bilgileri daha sonra eklenecek.",
        image: ""
    },

    {
        name: "Yönetim Profili",
        role: "YÖNETİM",
        duties:
            "İsim, fotoğraf ve görev bilgileri daha sonra eklenecek.",
        image: ""
    },

    {
        name: "Yönetim Profili",
        role: "YÖNETİM",
        duties:
            "İsim, fotoğraf ve görev bilgileri daha sonra eklenecek.",
        image: ""
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
   MANAGEMENT CARDS
========================================= */

const managementGrid =
    document.getElementById(
        "managementGrid"
    );


if (managementGrid) {

    managementGrid.innerHTML =

        management.map(
            person => {

                return `

                <article
                    class="person-card reveal"
                >

                    <div class="avatar">

                        ${
                            person.image

                            ?

                            `<img
                                src="${person.image}"
                                alt="${person.name}"
                            >`

                            :

                            "Üİ"
                        }

                    </div>


                    <small>
                        ${person.role}
                    </small>


                    <h3>
                        ${person.name}
                    </h3>


                    <p>
                        ${person.duties}
                    </p>

                </article>

                `;

            }
        ).join("");

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