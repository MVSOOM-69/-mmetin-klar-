/* =========================================
   ÜMMETİN IŞIKLARI
   GROUP DATA
========================================= */

const groupData = {

    yardimlasma: {
        title: "Yardımlaşma",
        icon: "🤝",
        description:
            "Yardımlaşma grubunun gerçek amacı ve yaptığı çalışmalar daha sonra burada açıklanacak.",
        mission:
            "Gerçek görev bilgisi daha sonra eklenecek.",
        work:
            "Gerçek çalışma bilgileri daha sonra eklenecek.",
        events:
            "Grup etkinlikleri daha sonra eklenecek."
    },

    din: {
        title: "Din",
        icon: "☪️",
        description:
            "Din grubunun çalışmaları ve faaliyetleri hakkında bilgi.",
        mission:
            "Görev bilgisi daha sonra eklenecek.",
        work:
            "Çalışma bilgisi daha sonra eklenecek.",
        events:
            "Etkinlik bilgisi daha sonra eklenecek."
    },

    kultur: {
        title: "Kültür",
        icon: "🕌",
        description:
            "Kültür grubunun çalışmaları ve faaliyetleri hakkında bilgi.",
        mission:
            "Görev bilgisi daha sonra eklenecek.",
        work:
            "Çalışma bilgisi daha sonra eklenecek.",
        events:
            "Etkinlik bilgisi daha sonra eklenecek."
    },

    spor: {
        title: "Spor",
        icon: "⚽",
        description:
            "Spor grubunun çalışmaları ve faaliyetleri hakkında bilgi.",
        mission:
            "Spor grubunun görev bilgisi daha sonra eklenecek.",
        work:
            "Spor grubunun çalışmaları daha sonra eklenecek.",
        events:
            "Spor etkinlikleri daha sonra eklenecek."
    },

    it: {
        title: "İT",
        icon: "🖥️",
        description:
            "İT grubunun çalışmaları ve faaliyetleri hakkında bilgi.",
        mission:
            "Görev bilgisi daha sonra eklenecek.",
        work:
            "Çalışma bilgisi daha sonra eklenecek.",
        events:
            "Etkinlik bilgisi daha sonra eklenecek."
    },

    finans: {
        title: "Finans",
        icon: "📊",
        description:
            "Finans grubunun çalışmaları ve faaliyetleri hakkında bilgi.",
        mission:
            "Görev bilgisi daha sonra eklenecek.",
        work:
            "Çalışma bilgisi daha sonra eklenecek.",
        events:
            "Etkinlik bilgisi daha sonra eklenecek."
    }

};


/* =========================================
   SUPABASE
========================================= */

const SUPABASE_URL =
    "https://dufqdjvjszewhhakjibb.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_zdE8Z15zobFjWJ0P86B5Qg_55sAbHer";


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
   GET SELECTED GROUP
========================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


const selectedGroup =
    params.get("group") ||
    "yardimlasma";


const group =
    groupData[selectedGroup] ||
    groupData.yardimlasma;


/* =========================================
   GROUP INFORMATION
========================================= */

document.title =
    group.title +
    " | Ümmetin Işıkları";


document.getElementById(
    "groupIcon"
).textContent =
    group.icon;


document.getElementById(
    "groupTitle"
).textContent =
    group.title;


document.getElementById(
    "groupDescription"
).textContent =
    group.description;


document.getElementById(
    "mission"
).textContent =
    group.mission;


document.getElementById(
    "work"
).textContent =
    group.work;


document.getElementById(
    "events"
).textContent =
    group.events;


/* =========================================
   LOAD GROUP MEMBERS
========================================= */

async function loadGroupMembers() {

    const teamGrid =
        document.getElementById(
            "teamGrid"
        );

    if (!teamGrid) {
        return;
    }


    teamGrid.innerHTML = `

        <article class="team-card">

            <div class="team-photo">
                ...
            </div>

            <small>
                EKİP
            </small>

            <h3>
                Loading...
            </h3>

            <p>
                Ekip üyeleri yükleniyor...
            </p>

        </article>

    `;


    try {

        const response =
            await fetch(
                SUPABASE_URL +
                "/rest/v1/group_members?group_id=eq." +
                encodeURIComponent(selectedGroup) +
                "&select=*",
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


        const members =
            await response.json();


        console.log(
            "Group members:",
            members
        );


        /* =================================
           NO MEMBERS
        ================================= */

        if (
            !Array.isArray(members) ||
            members.length === 0
        ) {

            teamGrid.innerHTML = `

                <article class="team-card">

                    <div class="team-photo">
                        Üİ
                    </div>

                    <small>
                        EKİP
                    </small>

                    <h3>
                        Ekip bilgileri yakında
                    </h3>

                    <p>
                        Gerçek ekip üyeleri daha sonra
                        eklenecek.
                    </p>

                </article>

            `;

            return;
        }


        /* =================================
           DISPLAY MEMBERS
        ================================= */

        teamGrid.innerHTML =
            members.map(
                member => {

                    const name =
                        member.name ||
                        "İsimsiz";

                    const role =
                        member.role ||
                        "EKİP";

                    const duties =
                        member.duties ||
                        "";

                    const image =
                        member.photo_url ||
                        "";


                    return `

                        <article class="team-card">

                            <div class="team-photo">

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
                                ${escapeHTML(duties)}
                            </p>

                        </article>

                    `;

                }
            ).join("");


    }

    catch (error) {

        console.error(
            "GROUP MEMBERS ERROR:",
            error
        );


        teamGrid.innerHTML = `

            <article class="team-card">

                <div class="team-photo">
                    !
                </div>

                <small>
                    ERROR
                </small>

                <h3>
                    Ekip bilgileri yüklenemedi
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
   START
========================================= */

loadGroupMembers();
