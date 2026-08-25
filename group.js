/* =========================================
   ÜMMETİN IŞIKLARI
   GROUP DATA + SUPABASE MEMBERS
========================================= */


/* =========================================
   SUPABASE
========================================= */

import {
    createClient
} from
"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


const SUPABASE_URL =
    "https://dufqdjvjszewhhakjibb.supabase.co";


const SUPABASE_KEY =
    "sb_publishable_zdE8Z15zobFjWJ0P86B5Qg_55sAbHer";


const supabase =
    createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================================
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
            "Din grubunun görevleri daha sonra açıklanacak.",

        work:
            "Din grubunun çalışmaları daha sonra eklenecek.",

        events:
            "Din grubunun etkinlikleri daha sonra eklenecek."

    },


    kultur: {

        title: "Kültür",

        icon: "🕌",

        description:
            "Kültür grubunun çalışmaları ve faaliyetleri hakkında bilgi.",

        mission:
            "Kültür grubunun görevleri daha sonra açıklanacak.",

        work:
            "Kültür çalışmalarımız daha sonra açıklanacak.",

        events:
            "Kültür etkinlikleri daha sonra eklenecek."

    },


    spor: {

        title: "Spor",

        icon: "⚽",

        description:
            "Spor grubunun çalışmaları ve faaliyetleri hakkında bilgi.",

        mission:
            "Spor grubunun görevleri daha sonra açıklanacak.",

        work:
            "Spor faaliyetleri daha sonra eklenecek.",

        events:
            "Spor etkinlikleri daha sonra eklenecek."

    },


    it: {

        title: "İT",

        icon: "🖥️",

        description:
            "İT grubunun çalışmaları ve faaliyetleri hakkında bilgi.",

        mission:
            "İT grubunun görevleri daha sonra açıklanacak.",

        work:
            "İT çalışmalarımız daha sonra açıklanacak.",

        events:
            "İT etkinlikleri daha sonra eklenecek."

    },


    finans: {

        title: "Finans",

        icon: "📊",

        description:
            "Finans grubunun çalışmaları ve faaliyetleri hakkında bilgi.",

        mission:
            "Finans grubunun görevleri daha sonra açıklanacak.",

        work:
            "Finans çalışmaları daha sonra açıklanacak.",

        events:
            "Finans etkinlikleri daha sonra eklenecek."

    }

};


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
   PAGE INFORMATION
========================================= */

document.title =
    group.title +
    " | Ümmetin Işıkları";


const groupIcon =
    document.getElementById(
        "groupIcon"
    );


const groupTitle =
    document.getElementById(
        "groupTitle"
    );


const groupDescription =
    document.getElementById(
        "groupDescription"
    );


const mission =
    document.getElementById(
        "mission"
    );


const work =
    document.getElementById(
        "work"
    );


const events =
    document.getElementById(
        "events"
    );


if (groupIcon) {

    groupIcon.textContent =
        group.icon;

}


if (groupTitle) {

    groupTitle.textContent =
        group.title;

}


if (groupDescription) {

    groupDescription.textContent =
        group.description;

}


if (mission) {

    mission.textContent =
        group.mission;

}


if (work) {

    work.textContent =
        group.work;

}


if (events) {

    events.textContent =
        group.events;

}


/* =========================================
   SECURITY
========================================= */

function escapeHTML(value) {

    return String(value || "")

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================
   ORGANISATION TEAM
========================================= */

const teamGrid =
    document.getElementById(
        "teamGrid"
    );


/* =========================================
   LOAD GROUP MEMBERS
========================================= */

async function loadGroupMembers() {

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
                Ekip üyeleri yükleniyor...
            </h3>

            <p>
                Lütfen bekleyin.
            </p>

        </article>

    `;


    try {

        const result =
            await supabase

                .from("group_members")

                .select("*")

                .eq(
                    "group_id",
                    selectedGroup
                )

                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );


        console.log(
            "GROUP MEMBERS:",
            result
        );


        if (result.error) {

            throw result.error;

        }


        const members =
            result.data || [];


        /* =====================================
           NO MEMBERS
        ===================================== */

        if (
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
                        Bu grubun ekip üyeleri
                        henüz eklenmedi.
                    </p>

                </article>

            `;

            return;

        }


        /* =====================================
           MEMBERS FOUND
        ===================================== */

        teamGrid.innerHTML =
            members
                .map(
                    member => {

                        const photo =
                            member.photo_url;


                        return `

                            <article
                                class="team-card"
                            >

                                <div
                                    class="team-photo"
                                >

                                    ${
                                        photo

                                        ?

                                        `
                                        <img
                                            src="${escapeHTML(
                                                photo
                                            )}"
                                            alt="${escapeHTML(
                                                member.name
                                            )}"
                                        >
                                        `

                                        :

                                        "Üİ"
                                    }

                                </div>


                                <small>

                                    ${escapeHTML(
                                        member.role ||
                                        "EKİP"
                                    )}

                                </small>


                                <h3>

                                    ${escapeHTML(
                                        member.name
                                    )}

                                </h3>


                                <p>

                                    ${escapeHTML(
                                        member.duties ||
                                        ""
                                    )}

                                </p>


                            </article>

                        `;

                    }
                )
                .join("");

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
                    EKİP
                </small>

                <h3>
                    Ekip bilgileri yüklenemedi
                </h3>

                <p>
                    Lütfen sayfayı yenileyin.
                </p>

            </article>

        `;

    }

}


/* =========================================
   START
========================================= */

loadGroupMembers();
