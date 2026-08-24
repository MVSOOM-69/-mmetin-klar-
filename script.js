/* =========================================
   GROUP DATA
========================================= */

const groups = [

    {
        id: "yardimlasma",
        name: "Yardımlaşma",
        icon: "🤝",
        accent: "green",
        description:
            "Bu grubun gerçek amacı, görevleri ve çalışmaları daha sonra eklenecek."
    },

    {
        id: "group2",
        name: "Yeni Grup",
        icon: "✦",
        accent: "gold",
        description:
            "Gerçek grup bilgileri hazır olduğunda burada gösterilecek."
    },

    {
        id: "group3",
        name: "Yeni Grup",
        icon: "📄",
        accent: "orange",
        description:
            "Gerçek grup bilgileri hazır olduğunda burada gösterilecek."
    }

];


/* =========================================
   MANAGEMENT
========================================= */

const management = [

    {
        name: "Yönetici Profili",
        role: "YÖNETİM",
        duties:
            "İsim, fotoğraf ve görev bilgileri daha sonra eklenecek.",
        image: ""
    },

    {
        name: "Yönetici Profili",
        role: "YÖNETİM",
        duties:
            "İsim, fotoğraf ve görev bilgileri daha sonra eklenecek.",
        image: ""
    },

    {
        name: "Yönetici Profili",
        role: "YÖNETİM",
        duties:
            "İsim, fotoğraf ve görev bilgileri daha sonra eklenecek.",
        image: ""
    }

];


/* =========================================
   MEMORIES
========================================= */

const memories = [

    {
        title: "Yeni anı",
        description:
            "Fotoğraf ve açıklama daha sonra eklenecek.",
        image: ""
    },

    {
        title: "Yeni anı",
        description:
            "Fotoğraf ve açıklama daha sonra eklenecek.",
        image: ""
    },

    {
        title: "Yeni anı",
        description:
            "Fotoğraf ve açıklama daha sonra eklenecek.",
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
        groups.map((group, index) => {

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
                        ${group.name}
                    </h3>


                    <p>
                        ${group.description}
                    </p>


                    <a
                        class="card-link"
                        href="group.html?group=${encodeURIComponent(group.id)}"
                    >
                        Gruba Git →
                    </a>

                </article>

            `;

        }).join("");

}


/* =========================================
   MANAGEMENT CARDS
========================================= */

const managementGrid =
    document.getElementById("managementGrid");


if (managementGrid) {

    managementGrid.innerHTML =
        management.map(person => {

            return `

                <article class="person-card reveal">

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

        }).join("");

}


/* =========================================
   MEMORY CARDS
========================================= */

const memoryGrid =
    document.getElementById("memoryGrid");


if (memoryGrid) {

    memoryGrid.innerHTML =
        memories.map(memory => {

            return `

                <article class="memory-card reveal">

                    <div class="memory-image">

                        ${
                            memory.image

                            ?

                            `<img
                                src="${memory.image}"
                                alt="${memory.title}"
                            >`

                            :

                            "🖼️"
                        }

                    </div>


                    <div class="memory-content">

                        <h3>
                            ${memory.title}
                        </h3>


                        <p>
                            ${memory.description}
                        </p>

                    </div>

                </article>

            `;

        }).join("");

}


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.getElementById("navigation");


if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            navigation.classList.toggle("open");

        }
    );

}


document
    .querySelectorAll("#navigation a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navigation.classList.remove("open");

            }
        );

    });


/* =========================================
   IMPORTANT BAR
========================================= */

const closeBar =
    document.getElementById("closeBar");

if (closeBar) {

    closeBar.addEventListener(
        "click",
        () => {

            document
                .getElementById("importantBar")
                .remove();

        }
    );

}


/* =========================================
   SCROLL ANIMATION
========================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .1
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        observer.observe(element);

    });