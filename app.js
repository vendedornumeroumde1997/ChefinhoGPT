
// Configuração Global carregada via config.js
// constants are in config.js

// DOM Elements
const chatArea = document.getElementById('chat-area');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const micBtn = document.getElementById('mic-btn');
const themeToggle = document.getElementById('theme-toggle');
const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggle-sidebar');
const settingsTrigger = document.getElementById('settings-trigger');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings');
const setupProfileTrigger = document.getElementById('setup-profile-trigger');
const authSection = document.getElementById('auth-section');
const userProfileIcon = document.getElementById('user-profile-icon');
const historyList = document.getElementById('history-list');
const welcomeScreen = document.getElementById('welcome-screen');
const newChatBtn = document.getElementById('new-chat-btn');
const saveProfileBtn = document.getElementById('save-profile-btn');

// State
let state = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    user: JSON.parse(localStorage.getItem('user')) || null,
    theme: localStorage.getItem('theme') || 'dark',
    history: JSON.parse(localStorage.getItem('chatHistory')) || [],
    personality: localStorage.getItem('personality') || 'original',
    customPersonality: localStorage.getItem('customPersonality') || '',
    accentColor: localStorage.getItem('accentColor') || '#E5C255',
    currentModel: localStorage.getItem('currentModel') || CONFIG.MODEL_NAME,
    language: localStorage.getItem('language') || 'pt-br',
    lastCardRotation: parseInt(localStorage.getItem('lastCardRotation')) || Date.now()
};

// --- I18n Translations ---
const TRANSLATIONS = {
    'pt-br': {
        new_chat: "Novo chat",
        settings: "Configurações",
        create_profile: "Criar Perfil",
        welcome_title: "Oi pessoa aí do outro lado da tela",
        welcome_subtitle: "Como eu posso te ajudar?",
        suggestion_1: "Como ensinar um Shih Tzu a sentar?",
        suggestion_2: "Por que cachorros uivam?",
        suggestion_3: "Me conte uma piada de cachorro.",
        input_placeholder: "Digite uma mensagem para o Chefinho...",
        settings_title: "Configurações",
        nav_profile: "Perfil",
        nav_system: "Sistema",
        nav_languages: "Línguas",
        languages_title: "Idiomas & Regiões",
        languages_desc: "Em qual língua devo latir?",
        profile_section: "Seu Perfil",
        name_label: "Como devo te chamar?",
        avatar_label: "Escolha seu Avatar:",
        save_btn: "Salvar Perfil",
        persona_title: "Personalidade & IA",
        persona_label: "Personalidade do Chefinho:",
        color_label: "Cor do Tema:",
        theme_dark: "Tema Escuro",
        custom_persona_label: "Descreva como o Chefinho deve se comportar:"
    },
    'en': {
        new_chat: "New Chat",
        settings: "Settings",
        create_profile: "Create Profile",
        welcome_title: "Hey person on the other side",
        welcome_subtitle: "How can I help you?",
        suggestion_1: "How to teach a Shih Tzu to sit?",
        suggestion_2: "Why do dogs howl?",
        suggestion_3: "Tell me a dog joke.",
        input_placeholder: "Type a message for Chefinho...",
        settings_title: "Settings",
        nav_profile: "Profile",
        nav_system: "System",
        nav_languages: "Languages",
        languages_title: "Languages & Regions",
        languages_desc: "Which language should I bark in?",
        profile_section: "Your Profile",
        name_label: "What should I call you?",
        avatar_label: "Choose your Avatar:",
        save_btn: "Save Profile",
        persona_title: "Personality & AI",
        persona_label: "Chefinho's Personality:",
        color_label: "Theme Color:",
        theme_dark: "Dark Mode",
        custom_persona_label: "Describe how Chefinho should behave:"
    },
    'es': {
        new_chat: "Nuevo Chat",
        settings: "Ajustes",
        create_profile: "Crear Perfil",
        welcome_title: "Hola persona del otro lado",
        welcome_subtitle: "¿En qué puedo ayudarte?",
        suggestion_1: "¿Cómo enseñar a un Shih Tzu a sentarse?",
        suggestion_2: "¿Por qué aúllan los perros?",
        suggestion_3: "Cuéntame un chiste de perros.",
        input_placeholder: "Escribe un mensaje para Chefinho...",
        settings_title: "Ajustes",
        nav_profile: "Perfil",
        nav_system: "Sistema",
        nav_languages: "Idiomas",
        languages_title: "Idiomas y Regiones",
        languages_desc: "¿En qué idioma debo ladrar?",
        profile_section: "Tu Perfil",
        name_label: "¿Cómo debo llamarte?",
        avatar_label: "Elige tu Avatar:",
        save_btn: "Guardar Perfil",
        persona_title: "Personalidad & IA",
        persona_label: "Personalidad de Chefinho:",
        color_label: "Color del Tema:",
        theme_dark: "Modo Oscuro",
        custom_persona_label: "Describe cómo debe comportarse Chefinho:"
    },
    'ru': {
        new_chat: "Новый чат",
        settings: "Настройки",
        create_profile: "Создать профиль",
        welcome_title: "Привет, человек по ту сторону экрана",
        welcome_subtitle: "Чем я могу помочь?",
        suggestion_1: "Как научить Ши-тцу сидеть?",
        suggestion_2: "Почему собаки воют?",
        suggestion_3: "Расскажи шутку про собаку.",
        input_placeholder: "Напишите сообщение...",
        settings_title: "Настройки",
        nav_profile: "Профиль",
        nav_system: "Система",
        nav_languages: "Языки",
        languages_title: "Языки и регионы",
        languages_desc: "На каком языке мне лаять?",
        profile_section: "Твой профиль",
        name_label: "Как мне тебя называть?",
        avatar_label: "Выбери аватар:",
        save_btn: "Сохранить",
        persona_title: "Личность и ИИ",
        persona_label: "Личность Шефиньо:",
        color_label: "Цвет темы:",
        theme_dark: "Темная тема",
        custom_persona_label: "Опишите, как должен вести себя Шефиньо:"
    },
    'pl': {
        new_chat: "Nowy czat",
        settings: "Ustawienia",
        create_profile: "Utwórz profil",
        welcome_title: "Cześć człowieku po drugiej stronie",
        welcome_subtitle: "Jak mogę ci pomóc?",
        suggestion_1: "Jak nauczyć Shih Tzu siadać?",
        suggestion_2: "Dlaczego psy wyją?",
        suggestion_3: "Opowiedz mi dowcip o psie.",
        input_placeholder: "Napisz wiadomość...",
        settings_title: "Ustawienia",
        nav_profile: "Profil",
        nav_system: "System",
        nav_languages: "Języki",
        languages_title: "Języki i regiony",
        languages_desc: "W jakim języku mam szczekać?",
        profile_section: "Twój profil",
        name_label: "Jak mam cię nazywać?",
        avatar_label: "Wybierz awatar:",
        save_btn: "Zapisz",
        persona_title: "Osobowość i AI",
        persona_label: "Osobowość Chefinho:",
        color_label: "Kolor motywu:",
        theme_dark: "Ciemny motyw",
        custom_persona_label: "Opisz, jak Chefinho powinien się zachowywać:"
    },
    'pt-pt': {
        new_chat: "Novo chat",
        settings: "Configurações",
        create_profile: "Criar Perfil",
        welcome_title: "Olá pessoa do outro lado do ecrã",
        welcome_subtitle: "Como posso ajudar?",
        suggestion_1: "Como ensinar um Shih Tzu a sentar?",
        suggestion_2: "Porque é que os cães uivam?",
        suggestion_3: "Conta-me uma piada de cão.",
        input_placeholder: "Escreve uma mensagem...",
        settings_title: "Configurações",
        nav_profile: "Perfil",
        nav_system: "Sistema",
        nav_languages: "Idiomas",
        languages_title: "Idiomas e Regiões",
        languages_desc: "Em que língua devo latir?",
        profile_section: "O teu perfil",
        name_label: "Como devo chamar-te?",
        avatar_label: "Escolhe o teu Avatar:",
        save_btn: "Guardar",
        persona_title: "Personalidade e IA",
        persona_label: "Personalidade do Chefinho:",
        color_label: "Cor do tema:",
        theme_dark: "Tema escuro",
        custom_persona_label: "Descreve como o Chefinho se deve comportar:"
    },
    'ja': {
        new_chat: "新しいチャット",
        settings: "設定",
        create_profile: "プロフィール作成",
        welcome_title: "こんにちは画面の向こうの人",
        welcome_subtitle: "どうお手伝いしましょうか？",
        suggestion_1: "シーズーに座ることを教える方法は？",
        suggestion_2: "犬はなぜ遠吠えするの？",
        suggestion_3: "犬のジョークを教えて。",
        input_placeholder: "メッセージを入力...",
        settings_title: "設定",
        nav_profile: "プロフィール",
        nav_system: "システム",
        nav_languages: "言語",
        languages_title: "言語と地域",
        languages_desc: "どの言語で吠えましょうか？",
        profile_section: "あなたのプロフィール",
        name_label: "何と呼べばいいですか？",
        avatar_label: "アバターを選択：",
        save_btn: "保存",
        persona_title: "個性とAI",
        persona_label: "チェフィーニョの個性：",
        color_label: "テーマカラー：",
        theme_dark: "ダークモード",
        custom_persona_label: "チェフィーニョの振る舞いを説明："
    },
    'de': {
        new_chat: "Neuer Chat",
        settings: "Einstellungen",
        create_profile: "Profil erstellen",
        welcome_title: "Hallo Person auf der anderen Seite",
        welcome_subtitle: "Wie kann ich helfen?",
        suggestion_1: "Wie bringe ich einem Shih Tzu das Sitzen bei?",
        suggestion_2: "Warum heulen Hunde?",
        suggestion_3: "Erzähl mir einen Hundewitz.",
        input_placeholder: "Nachricht eingeben...",
        settings_title: "Einstellungen",
        nav_profile: "Profil",
        nav_system: "System",
        nav_languages: "Sprachen",
        languages_title: "Sprachen und Regionen",
        languages_desc: "In welcher Sprache soll ich bellen?",
        profile_section: "Dein Profil",
        name_label: "Wie soll ich dich nennen?",
        avatar_label: "Wähle deinen Avatar:",
        save_btn: "Speichern",
        persona_title: "Persönlichkeit & KI",
        persona_label: "Chefinhos Persönlichkeit:",
        color_label: "Theme-Farbe:",
        theme_dark: "Dunkler Modus",
        custom_persona_label: "Beschreibe, wie sich Chefinho verhalten soll:"
    }
};

// --- Rotating Suggestion Cards ---
const SUGGESTION_POOLS = {
    'pt-br': [
        ["Como ensinar um Shih Tzu a sentar?", "Por que cachorros uivam?", "Me conte uma piada de cachorro."],
        ["Qual a melhor ração para Shih Tzu?", "Cachorros sonham?", "Como cuidar de pelos longos?"],
        ["Por que cachorros giram antes de deitar?", "Cachorros veem cores?", "Como ensinar truques?"],
        ["O que significa quando o cachorro abana o rabo?", "Cachorros sentem ciúmes?", "Melhor brinquedo para cães pequenos?"]
    ],
    'en': [
        ["How to teach a Shih Tzu to sit?", "Why do dogs howl?", "Tell me a dog joke."],
        ["Best food for Shih Tzu?", "Do dogs dream?", "How to groom long fur?"],
        ["Why do dogs circle before lying down?", "Can dogs see colors?", "How to teach tricks?"],
        ["What does tail wagging mean?", "Do dogs feel jealous?", "Best toy for small dogs?"]
    ],
    'es': [
        ["¿Cómo enseñar a un Shih Tzu a sentarse?", "¿Por qué aúllan los perros?", "Cuéntame un chiste de perros."],
        ["¿Mejor comida para Shih Tzu?", "¿Los perros sueñan?", "¿Cómo cuidar pelo largo?"],
        ["¿Por qué los perros giran antes de acostarse?", "¿Los perros ven colores?", "¿Cómo enseñar trucos?"],
        ["¿Qué significa cuando mueven la cola?", "¿Los perros sienten celos?", "¿Mejor juguete para perros pequeños?"]
    ],
    'ru': [
        ["Как научить Ши-тцу сидеть?", "Почему собаки воют?", "Расскажи шутку про собаку."],
        ["Лучший корм для Ши-тцу?", "Снятся ли собакам сны?", "Как ухаживать за длинной шерстью?"],
        ["Почему собаки крутятся перед тем как лечь?", "Различают ли собаки цвета?", "Как обучить трюкам?"],
        ["Что означает виляние хвостом?", "Ревнуют ли собаки?", "Лучшая игрушка для маленьких собак?"]
    ]
};

function checkAndRotateCards() {
    const ONE_HOUR = 60 * 60 * 1000;
    const now = Date.now();

    if (now - state.lastCardRotation >= ONE_HOUR) {
        state.lastCardRotation = now;
        localStorage.setItem('lastCardRotation', now.toString());
        updateSuggestionCards();
    }
}

function updateSuggestionCards() {
    const lang = state.language;
    const pools = SUGGESTION_POOLS[lang] || SUGGESTION_POOLS['pt-br'];
    const randomIndex = Math.floor(Math.random() * pools.length);
    const cards = pools[randomIndex];

    const cardElements = document.querySelectorAll('.suggestion-cards .card p');
    cardElements.forEach((el, index) => {
        if (cards[index]) {
            el.textContent = cards[index];
            el.setAttribute('data-i18n', `suggestion_${index + 1}`);
        }
    });
}

// --- Initialization ---
function init() {
    applyTheme(state.theme);
    applyAccentColor(state.accentColor);
    updateAuthUI();
    renderHistory();
    checkEmptyState();
    setupCustomizationListeners();
    setupTabNavigation();
    setupHistoryDelegation();
    setupModelSelector();
    setupLanguageHandler();
    setupVoiceInput(); // Voice feature
    updateInterfaceLanguage(state.language);
    checkAndRotateCards(); // Check if cards need rotation
    setInterval(checkAndRotateCards, 60000); // Check every minute

    // Select avatar if user already has one
    if (state.user && state.user.avatar) {
        document.querySelectorAll('.avatar-option').forEach(opt => {
            if (opt.getAttribute('data-value') === state.user.avatar) opt.classList.add('selected');
            else opt.classList.remove('selected');
        });
        selectedAvatar = state.user.avatar;
    }

    console.log("Chefinho está pronto! Au au!");
}

// --- Voice Input (Web Speech API) ---
let recognition;
let isListening = false;

function setupVoiceInput() {
    if (!micBtn) return;

    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        console.warn('Speech Recognition not supported');
        micBtn.style.opacity = '0.5';
        micBtn.title = 'Seu navegador não suporta reconhecimento de voz';
        return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    // Set language based on current language
    const langMap = {
        'pt-br': 'pt-BR',
        'en': 'en-US',
        'es': 'es-ES',
        'ru': 'ru-RU',
        'pl': 'pl-PL',
        'pt-pt': 'pt-PT',
        'ja': 'ja-JP',
        'de': 'de-DE'
    };
    recognition.lang = langMap[state.language] || 'pt-BR';

    recognition.onstart = () => {
        isListening = true;
        micBtn.style.color = 'var(--accent-color)';
        micBtn.style.transform = 'scale(1.1)';
        userInput.placeholder = '🎤 Escutando...';
    };

    recognition.onend = () => {
        isListening = false;
        micBtn.style.color = '';
        micBtn.style.transform = '';
        const t = TRANSLATIONS[state.language] || TRANSLATIONS['pt-br'];
        userInput.placeholder = t.input_placeholder;
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        userInput.focus();
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        isListening = false;
        micBtn.style.color = '';
        micBtn.style.transform = '';
    };

    micBtn.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
        } else {
            try {
                recognition.start();
            } catch (e) {
                console.error('Failed to start recognition:', e);
            }
        }
    });
}

// --- Language Logic ---
function updateInterfaceLanguage(lang) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS['pt-br'];

    // Update Text Content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });

    // Update Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.placeholder = t[key];
    });

    // Update voice recognition language if active
    if (recognition) {
        const langMap = {
            'pt-br': 'pt-BR',
            'en': 'en-US',
            'es': 'es-ES',
            'ru': 'ru-RU',
            'pl': 'pl-PL',
            'pt-pt': 'pt-PT',
            'ja': 'ja-JP',
            'de': 'de-DE'
        };
        recognition.lang = langMap[lang] || 'pt-BR';
    }
}

function setupLanguageHandler() {
    const langOptions = document.querySelectorAll('.lang-option');

    langOptions.forEach(opt => {
        if (opt.dataset.lang === state.language) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }

        opt.addEventListener('click', () => {
            langOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');

            state.language = opt.dataset.lang;
            localStorage.setItem('language', state.language);
            updateInterfaceLanguage(state.language);
            updateSuggestionCards(); // Update cards when language changes
        });
    });
}

// --- Model Selector Logic ---
function setupModelSelector() {
    const selectorBtn = document.getElementById('model-selector-btn');
    const dropdown = document.getElementById('model-dropdown');
    const displayElement = document.getElementById('model-name-display');
    const options = document.querySelectorAll('.model-option');

    updateModelDisplay();

    if (selectorBtn) {
        selectorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
    }

    options.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const model = opt.dataset.model;
            state.currentModel = model;
            localStorage.setItem('currentModel', model);

            updateModelDisplay();
            dropdown.classList.remove('active');
        });
    });

    document.addEventListener('click', () => {
        if (dropdown) dropdown.classList.remove('active');
    });

    function updateModelDisplay() {
        const activeOpt = Array.from(options).find(o => o.dataset.model === state.currentModel);
        let displayName = "Gemini 2.0 Flash";

        options.forEach(o => o.classList.remove('selected'));

        if (activeOpt) {
            displayName = activeOpt.dataset.name;
            activeOpt.classList.add('selected');
        } else if (state.currentModel && state.currentModel.includes('nova')) {
            displayName = "Amazon Nova Lite (Melhor Opção)";
        } else if (state.currentModel && state.currentModel.includes('llama')) {
            displayName = "Llama 3.2 3B";
        }

        if (displayElement) displayElement.textContent = `Chefinho (${displayName})`;
    }
}

// --- Tab Navigation Logic ---
function setupTabNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(`tab-${tabId}`);
            if (targetPane) targetPane.classList.add('active');
        });
    });
}

// --- History Logic & Delegation ---
function setupHistoryDelegation() {
    if (!historyList) return;

    historyList.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete-chat');
        if (deleteBtn) {
            e.stopPropagation();
            const historyItem = deleteBtn.closest('.history-item');
            const index = Array.from(historyList.children).indexOf(historyItem);
            deleteChat(index);
            return;
        }

        const historyItem = e.target.closest('.history-item');
        if (historyItem) {
            const index = Array.from(historyList.children).indexOf(historyItem);
            if (index >= 0 && index < state.history.length) {
                setPrompt(state.history[index]);
            }
        }
    });
}

function deleteChat(index) {
    if (confirm('Quer mesmo apagar essa conversa? 🗑️')) {
        state.history.splice(index, 1);
        localStorage.setItem('chatHistory', JSON.stringify(state.history));
        renderHistory();
    }
}

function renderHistory() {
    if (!historyList) return;
    historyList.innerHTML = '';
    state.history.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('history-item');
        const displayText = item.length > 25 ? item.substring(0, 24) + '...' : item;
        div.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; flex:1; overflow:hidden; pointer-events: none;">
                <span class="material-symbols-outlined" style="font-size: 18px;">chat_bubble</span>
                <span style="white-space:nowrap;">${displayText}</span>
            </div>
            <div class="history-actions">
                <button class="history-btn delete-chat" title="Excluir">
                    <span class="material-symbols-outlined" style="font-size: 18px;">delete</span>
                </button>
            </div>
        `;
        historyList.appendChild(div);
    });
}

function addToHistory(prompt) {
    if (state.history.length > 0 && state.history[0] === prompt) return;
    state.history.unshift(prompt);
    if (state.history.length > 10) state.history.pop();
    localStorage.setItem('chatHistory', JSON.stringify(state.history));
    renderHistory();
}

// --- Theme & Customization ---
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
        themeToggle.checked = (theme === 'dark');
    }
}

function applyAccentColor(color) {
    document.documentElement.style.setProperty('--accent-color', color);
    document.querySelectorAll('.color-circle').forEach(c => {
        if (c.dataset.color === color) c.classList.add('selected');
        else c.classList.remove('selected');
    });
}

function setupCustomizationListeners() {
    // Personality
    const personalitySelect = document.getElementById('personality-select');
    const customPersonalityGroup = document.getElementById('custom-personality-group');
    const customPersonalityText = document.getElementById('custom-personality-text');

    if (personalitySelect) {
        personalitySelect.value = state.personality;

        // Show/hide custom textarea based on selection
        if (state.personality === 'custom') {
            customPersonalityGroup.style.display = 'block';
            if (state.customPersonality) {
                customPersonalityText.value = state.customPersonality;
            }
        }

        personalitySelect.addEventListener('change', (e) => {
            state.personality = e.target.value;
            localStorage.setItem('personality', state.personality);

            // Show/hide textarea
            if (state.personality === 'custom') {
                customPersonalityGroup.style.display = 'block';
                customPersonalityText.focus();
            } else {
                customPersonalityGroup.style.display = 'none';
            }
        });
    }

    // Save custom personality text
    if (customPersonalityText) {
        customPersonalityText.addEventListener('blur', () => {
            state.customPersonality = customPersonalityText.value.trim();
            localStorage.setItem('customPersonality', state.customPersonality);
        });
    }

    // Colors
    document.querySelectorAll('.color-circle').forEach(circle => {
        circle.addEventListener('click', () => {
            const color = circle.dataset.color;
            state.accentColor = color;
            localStorage.setItem('accentColor', color);
            applyAccentColor(color);
        });
    });

    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            state.theme = e.target.checked ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
            applyTheme(state.theme);
        });
    }
}

// --- Sidebar & Modal ---
if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
}

function openSettings() {
    if (settingsModal) settingsModal.classList.add('active');
}

function closeSettings() {
    if (settingsModal) settingsModal.classList.remove('active');
}

if (settingsTrigger) {
    settingsTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        openSettings();
    });
}

if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener('click', closeSettings);
}

if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            closeSettings();
        }
    });
}

// --- Profile Management ---
let selectedAvatar = "👤";
const avatarOptions = document.querySelectorAll('.avatar-option');
avatarOptions.forEach(opt => {
    opt.addEventListener('click', () => {
        avatarOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedAvatar = opt.getAttribute('data-value');
    });
});

function saveProfile() {
    const nameInput = document.getElementById('profile-name');
    const name = nameInput.value.trim();

    if (!name) {
        alert("Por favor, digite um nome!");
        return;
    }

    if (name.toLowerCase() === 'chefinho') {
        alert("Ô! Esse nome já é meu! 🐶\n\nArrume outro, humano!");
        return;
    }

    const userProfile = {
        name: name,
        avatar: selectedAvatar || "👤"
    };

    state.isLoggedIn = true;
    state.user = userProfile;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userProfile));

    updateAuthUI();
    closeSettings();
    alert("Perfil salvo! O Chefinho agora sabe quem você é. 🐶");
}

function updateAuthUI() {
    const profileNameInput = document.getElementById('profile-name');
    const sidebarUserCard = document.getElementById('sidebar-user-card');
    const sidebarUsername = document.getElementById('sidebar-username');
    const userProfileIcon = document.getElementById('user-profile-icon');
    const setupProfileTrigger = document.getElementById('setup-profile-trigger');

    if (state.isLoggedIn && state.user) {
        if (sidebarUserCard) {
            sidebarUserCard.classList.remove('hidden');
            sidebarUserCard.style.display = 'flex';
            sidebarUsername.textContent = state.user.name;
        }
        if (setupProfileTrigger) {
            setupProfileTrigger.classList.add('hidden');
            setupProfileTrigger.style.display = 'none';
        }

        if (userProfileIcon) {
            userProfileIcon.innerHTML = state.user.avatar || state.user.name.charAt(0).toUpperCase();
            userProfileIcon.classList.remove('hidden');
            userProfileIcon.style.fontSize = '1.5rem';
            userProfileIcon.style.display = 'flex';
            userProfileIcon.style.alignItems = 'center';
            userProfileIcon.style.justifyContent = 'center';
        }

        if (profileNameInput) {
            profileNameInput.value = state.user.name;
        }

    } else {
        if (sidebarUserCard) {
            sidebarUserCard.classList.add('hidden');
            sidebarUserCard.style.display = 'none';
        }
        if (setupProfileTrigger) {
            setupProfileTrigger.classList.remove('hidden');
            setupProfileTrigger.style.display = 'flex';
        }

        if (userProfileIcon) {
            userProfileIcon.classList.add('hidden');
        }
    }
}

if (saveProfileBtn) {
    saveProfileBtn.onclick = saveProfile;
}

if (setupProfileTrigger) {
    setupProfileTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        openSettings();
    });
}

// --- Chat Logic ---
function checkEmptyState() {
    const hasMessages = chatArea.querySelectorAll('.message').length > 0;
    if (!hasMessages) {
        welcomeScreen.style.display = 'flex';
    } else {
        welcomeScreen.style.display = 'none';
    }
}

window.setPrompt = function (text) {
    userInput.value = text;
    handleUserMessage();
}

if (userInput) {
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleUserMessage();
        }
    });
}

if (sendBtn) {
    sendBtn.addEventListener('click', handleUserMessage);
}

if (newChatBtn) {
    newChatBtn.addEventListener('click', () => {
        const messages = chatArea.querySelectorAll('.message');
        messages.forEach(msg => msg.remove());

        checkEmptyState();
        state.currentChatId = Date.now();
    });
}

async function handleUserMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    welcomeScreen.style.display = 'none';
    userInput.value = '';

    addMessage(text, 'user');

    const lowerText = text.toLowerCase();

    if (lowerText.includes('qual é meu nome') || lowerText.includes('qual o meu nome') || lowerText.includes('quem sou eu')) {
        const loadingId = addMessage('Pensando...', 'bot', true);
        await new Promise(r => setTimeout(r, 600));
        removeMessage(loadingId);

        if (state.isLoggedIn && state.user && state.user.name) {
            addMessage(`Você é o **${state.user.name}**, meu humano favorito! 🦴`, 'bot');
        } else {
            addMessage("Ué, eu ainda não sei! Clica ali em **Criar Perfil** (no menu) pra me contar! 🐶", 'bot');
        }
        addToHistory(text);
        return;
    }

    if (lowerText.includes('quem é você') || lowerText.includes('qual seu nome') || lowerText.includes('quem e voce')) {
        const loadingId = addMessage('Pensando...', 'bot', true);
        await new Promise(r => setTimeout(r, 600));
        removeMessage(loadingId);
        addMessage("Eu sou o **Chefinho**! O Shih Tzu mais inteligente (e modesto) desse mundo. 👑🐕", 'bot');
        addToHistory(text);
        return;
    }

    const loadingId = addMessage('Pensando...', 'bot', true);

    try {
        const responseText = await fetchGeminiResponse(text);
        removeMessage(loadingId);
        addMessage(responseText, 'bot');
        addToHistory(text);

    } catch (error) {
        removeMessage(loadingId);
        addMessage(`Au au! ${error.message}`, 'bot');
        console.error(error);
    }
}

function addMessage(text, sender, isLoading = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    if (isLoading) msgDiv.id = 'loading-msg';

    const avatar = document.createElement('div');
    avatar.classList.add('message-avatar');
    if (sender === 'bot') {
        avatar.classList.add('bot-avatar');
        avatar.innerHTML = '🐶';
    } else {
        avatar.innerHTML = state.isLoggedIn ? state.user.avatar : '👤';
    }

    const content = document.createElement('div');
    content.classList.add('message-content');

    let formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\n/g, '<br>');

    content.innerHTML = isLoading ? '<span class="material-symbols-outlined spin-anim">progress_activity</span>' : formattedText;

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(content);

    chatArea.appendChild(msgDiv);
    chatArea.scrollTop = chatArea.scrollHeight;

    return msgDiv.id;
}

function removeMessage(id) {
    const el = document.getElementById('loading-msg');
    if (el) el.remove();
}

async function fetchGeminiResponse(userPrompt, retries = 3) {
    const updateLoading = (text) => {
        const loadingEl = document.getElementById('loading-msg');
        if (loadingEl) {
            const content = loadingEl.querySelector('.message-content');
            if (content) content.innerHTML = `<span class="material-symbols-outlined spin-anim">progress_activity</span> ${text}`;
        }
    };

    const url = `https://openrouter.ai/api/v1/chat/completions`;
    const userContext = state.isLoggedIn && state.user ? `O nome do seu dono é ${state.user.name}.` : "";

    let apiKey = CONFIG.API_KEY;
    if (state.currentModel && state.currentModel.includes('llama')) {
        apiKey = CONFIG.LLAMA_KEY;
    }

    let personaInstruction = "";
    switch (state.personality) {
        case 'gamer':
            personaInstruction = "Você é um Gamer viciado. Use termos como 'noob', 'tankar', 'GG', 'F no chat', 'NPC'. Faça referências a Deltarune, Undertale, Minecraft e Roblox de forma engraçada.";
            break;
        case 'sarcastic':
            personaInstruction = "Você é extremamente sarcástico, debochado e tem um humor ácido. Dê respostas curtas, grossas mas engraçadas. Critique o usuário de leve.";
            break;
        case 'coach':
            personaInstruction = "Você é um Coach Motivacional Canino (Mindset de Alpha). Use termos como 'Alta Performance', 'Mindset', 'Sair da zona de conforto', 'DNA de Vencedor'.";
            break;
        case 'custom':
            personaInstruction = state.customPersonality || "Você é o Chefinho, um Shih Tzu carismático, fofo e que se acha o chefe da casa.";
            break;
        default:
            personaInstruction = "Você é o Chefinho, um Shih Tzu carismático, fofo e que se acha o chefe da casa.";
    }

    const langMap = {
        'pt-br': 'Português do Brasil',
        'en': 'Inglês (English)',
        'es': 'Espanhol (Español)',
        'ru': 'Russo (Russian)',
        'pl': 'Polonês (Polish)',
        'pt-pt': 'Português de Portugal',
        'ja': 'Japonês (Japanese)',
        'de': 'Alemão (Deutsch)',
        'other': 'a língua que o usuário falar'
    };

    const targetLang = langMap[state.language] || 'Português';

    const systemPrompt = `${personaInstruction} RESPONDA SEMPRE EM ${targetLang}. Ajude o usuário. Seja fofo.${userContext}`;

    const requestBody = {
        model: state.currentModel || CONFIG.MODEL_NAME,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ]
    };

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.href,
                    'X-Title': 'Chefinho ChatBot'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                return data.choices[0].message.content;
            }

            if (response.status === 429 && i < retries - 1) {
                updateLoading(`Calma, muita gente falando... (Tentando de novo ${i + 1}/${retries})`);
                await new Promise(r => setTimeout(r, 2500 * Math.pow(1.5, i)));
                continue;
            }

            throw new Error(response.status === 429 ? "Tô muito cansado (Erro 429). Tenta daqui a pouco!" : `Erro ${response.status}`);
        } catch (e) {
            if (i === retries - 1) throw e;
        }
    }
}

// --- Language Selection Handler ---
function setupLanguageHandler() {
    const langCards = document.querySelectorAll('.lang-card');

    langCards.forEach(card => {
        // Set initial selection
        if (card.dataset.lang === state.language) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }

        // Add click handler
        card.addEventListener('click', () => {
            // Remove selection from all
            langCards.forEach(c => c.classList.remove('selected'));

            // Add to clicked
            card.classList.add('selected');

            // Update state
            state.language = card.dataset.lang;
            localStorage.setItem('language', state.language);

            // Update UI
            updateInterfaceLanguage(state.language);
            updateSuggestionCards();

            // Update voice recognition language
            if (recognition) {
                const langMap = {
                    'pt-br': 'pt-BR',
                    'en': 'en-US',
                    'es': 'es-ES',
                    'ru': 'ru-RU',
                    'pl': 'pl-PL',
                    'pt-pt': 'pt-PT',
                    'ja': 'ja-JP',
                    'de': 'de-DE'
                };
                recognition.lang = langMap[state.language] || 'pt-BR';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', init);
