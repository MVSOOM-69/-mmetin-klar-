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
            "Grup etkinlikleri daha sonra eklenecek.",


        team: [

            {
                name: "Ekip Üyesi",
                role: "GÖREV",
                image: "",
                duties:
                    "Görev bilgisi daha sonra eklenecek."
            },

            {
                name: "Ekip Üyesi",
                role: "GÖREV",
                image: "",
                duties:
                    "Görev bilgisi daha sonra eklenecek."
            }

        ]

    },


    group2: {

        title: "Yeni Grup",

        icon: "✦",

        description:
            "Bu grubun gerçek bilgileri daha sonra eklenecek.",

        mission:
            "Bilgi daha sonra eklenecek.",

        work:
            "Bilgi daha sonra eklenecek.",

        events:
            "Bilgi daha sonra eklenecek.",

        team: []

    },


    group3: {

        title: "Yeni Grup",

        icon: "📄",

        description:
            "Bu grubun gerçek bilgileri daha sonra eklenecek.",

        mission:
            "Bilgi daha sonra eklenecek.",

        work:
            "Bilgi daha sonra eklenecek.",

        events:
            "Bilgi daha sonra eklenecek.",

        team: []

    }

};


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


/* ORGANISATION TEAM */

const teamGrid =
    document.getElementById(
        "teamGrid"
    );


if (group.team.length === 0) {

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

} else {

    teamGrid.innerHTML =
        group.team
            .map(member => {

                return `

                    <article class="team-card">

                        <div class="team-photo">

                            ${
                                member.image

                                ?

                                `<img
                                    src="${member.image}"
                                    alt="${member.name}"
                                >`

                                :

                                "Üİ"
                            }

                        </div>


                        <small>
                            ${member.role}
                        </small>


                        <h3>
                            ${member.name}
                        </h3>


                        <p>
                            ${member.duties}
                        </p>

                    </article>

                `;

            })
            .join("");

}