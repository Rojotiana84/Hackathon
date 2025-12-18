// --- Éléments du DOM ---
const textInput = document.getElementById('text');
const verifyBtn = document.getElementById('verifyBtn');
const resetBtn = document.getElementById('resetBtn');
const resultNote = document.getElementById('resultNote');
const btnText = document.getElementById('btnText');
const loader = document.getElementById('loader');
const resTitle = document.getElementById('resTitle');
const resDesc = document.getElementById('resDesc');
const resIcon = document.getElementById('resIcon');

let currentLang = 'fr';

// --- Traductions ---
const translations = {
    fr: {
        verify: "Vérifier maintenant",
        reset: "Effacer",
        analyzing: "Analyse mondiale en cours...",
        trueTitle: "OUI, C'EST VRAI",
        fakeTitle: "NON, C'EST FAUX",
        trueDesc: "Information vérifiée. Elle correspond aux rapports officiels et aux sources de presse fiables.",
        fakeDesc: "Attention ! Cette information est soit fausse, soit une tentative d'arnaque connue.",
        sourceIA: "IA InfoCheck Global",
        dateNow: "Décembre 2025"
    },
    mg: {
        verify: "Hamarino izao",
        reset: "Fafao",
        analyzing: "Andalam-panadihadiana...",
        trueTitle: "ENY, MARINA IO",
        fakeTitle: "TSY MARINA IO",
        trueDesc: "Voamarina ny vaovao. Mifanaraka amin'ny loharano ofisialy sy ny mpanao gazety azo itokisana.",
        fakeDesc: "Tandremo! Vaovao tsy marina na fisolokiana efa fantatra io vaovao io.",
        sourceIA: "InfoCheck IA",
        dateNow: "Desambra 2025"
    },
    en: {
        verify: "Check now",
        reset: "Clear",
        analyzing: "Global analysis in progress...",
        trueTitle: "YES, IT'S TRUE",
        fakeTitle: "NO, IT'S FAKE",
        trueDesc: "Information verified. It matches official reports and reliable news sources.",
        fakeDesc: "Warning! This information is either fake or a known scam attempt.",
        sourceIA: "InfoCheck Global AI",
        dateNow: "December 2025"
    }
};

// --- Fonction pour styliser le résultat ---
function setStyle(type) {
    if (type === 'success') {
        resultNote.style.background = "var(--success-bg)";
        resultNote.style.color = "var(--success-text)";
        resultNote.style.borderColor = "var(--success-text)";
    } else {
        resultNote.style.background = "var(--error-bg)";
        resultNote.style.color = "var(--error-text)";
        resultNote.style.borderColor = "var(--error-text)";
    }
}

// --- Gestion des langues ---
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.lang-btn.active').classList.remove('active');
        btn.classList.add('active');
        currentLang = btn.dataset.lang;

        // Met à jour le texte des boutons
        btnText.textContent = translations[currentLang].verify;
        document.getElementById('resetText').textContent = translations[currentLang].reset;

        // Met à jour le texte des labels si besoin
        document.getElementById('labelLink').textContent = currentLang === 'mg' ? "Rohy na teny fototra (tsy voatery)" :
            currentLang === 'en' ? "Link or keyword (optional)" : "Lien ou mot-clé (optionnel)";
        document.getElementById('labelText').textContent = currentLang === 'mg' ? "Soratra hodinihina" :
            currentLang === 'en' ? "Text to verify" : "Texte à vérifier";
        document.getElementById('leadText').textContent = currentLang === 'mg' ?
            "Prototype IA ho an'ny hackathon: fanamarinana maneran-tany amin'ny fotoana tena izy." :
            currentLang === 'en' ?
                "Hackathon AI prototype: real-time global verification." :
                "Prototype IA pour le hackathon : vérification mondiale en temps réel.";
    });
});

// --- Gestion du thème ---
document.getElementById('darkMode').onclick = () => {
    document.body.setAttribute('data-theme', 'dark');
    document.getElementById('darkMode').classList.add('active');
    document.getElementById('lightMode').classList.remove('active');
};
document.getElementById('lightMode').onclick = () => {
    document.body.setAttribute('data-theme', 'light');
    document.getElementById('lightMode').classList.add('active');
    document.getElementById('darkMode').classList.remove('active');
};

// --- Vérification via backend ---
verifyBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (text.length < 5) return;

    const t = translations[currentLang];

    loader.style.display = 'block';
    document.getElementById('btnIcon').style.display = 'none';
    btnText.textContent = t.analyzing;
    resultNote.style.display = 'none';

    fetch("/api/verify", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            link: document.getElementById("link").value,
            text: text
        })
    })
        .then(res => res.ok ? res.json() : Promise.reject("Erreur serveur"))
        .then(data => {
            resultNote.style.display = 'block';

            if (data.vrai) {
                setStyle('success');
                resTitle.textContent = t.trueTitle;
                resIcon.textContent = "✅";
                resDesc.textContent = data.message || t.trueDesc;
            } else {
                setStyle('error');
                resTitle.textContent = t.fakeTitle;
                resIcon.textContent = "❌";
                resDesc.textContent = data.message || t.fakeDesc;
            }

            document.getElementById('valOrigin').textContent = data.source || t.sourceIA;
            document.getElementById('valDate').textContent = data.date || t.dateNow;
        })
        .catch(err => {
            resultNote.style.display = 'block';
            setStyle('error');
            resTitle.textContent = "Erreur";
            resIcon.textContent = "⚠️";
            resDesc.textContent = "Impossible d’analyser l’information.";
        })
        .finally(() => {
            loader.style.display = 'none';
            document.getElementById('btnIcon').style.display = 'inline';
            btnText.textContent = t.verify;
        });
});

// --- Reset ---
resetBtn.onclick = () => {
    textInput.value = '';
    document.getElementById('link').value = '';
    resultNote.style.display = 'none';
};