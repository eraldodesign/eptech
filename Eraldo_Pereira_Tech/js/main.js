/* =========================================
   EP TECH — ENGINE COMPLETA E SEGURANÇA FRONT-END
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------------------
    // 0. FUNÇÃO UTILITÁRIA DE SANITIZAÇÃO (ANTI-XSS & HTML INJECTION)
    // -----------------------------------------
    function sanitizeInput(str) {
        if (typeof str !== "string") return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // -----------------------------------------
    // 1. NOTIFICAÇÃO TOAST & CÓPIA RÁPIDA DE CONTATO
    // -----------------------------------------
    const toast = document.getElementById("toast-notification");
    const toastMessage = document.getElementById("toast-message");
    const copyBtns = document.querySelectorAll(".btn-copy");

    function showToast(message) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3200);
    }

    copyBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const textToCopy = btn.getAttribute("data-copy");
            const type = btn.getAttribute("data-type") || "Informação";

            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`${type} copiado para a área de transferência!`);
                }).catch(err => {
                    console.error("Erro ao copiar:", err);
                    showToast(`Não foi possível copiar. E-mail: ${textToCopy}`);
                });
            }
        });
    });

    // -----------------------------------------
    // 2. CURSOR CIBERNÉTICO NEON SUAVE
    // -----------------------------------------
    const cursor = document.getElementById("cyber-cursor");
    const cursorDot = document.getElementById("cyber-cursor-dot");

    if (cursor && cursorDot && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = -100, mouseY = -100;
        let cursorX = -100, cursorY = -100;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.18;
            cursorY += (mouseY - cursorY) * 0.18;
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const interactiveElements = document.querySelectorAll("a, button, input, .card, .filter-btn, .theme-dot");
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
            el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
        });
    }

    // -----------------------------------------
    // 3. CONTROLE DE TEMA NEON
    // -----------------------------------------
    const themeDots = document.querySelectorAll(".theme-dot");

    if (themeDots.length > 0) {
        themeDots.forEach(dot => {
            dot.addEventListener("click", () => {
                themeDots.forEach(d => d.classList.remove("active"));
                dot.classList.add("active");

                const theme = dot.getAttribute("data-theme");
                document.body.setAttribute("data-theme", theme);
            });
        });
    }

    // -----------------------------------------
    // 4. MATRIX RAIN CODE CANVAS
    // -----------------------------------------
    function initMatrixRain(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        
        function resizeMatrix() {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }
        resizeMatrix();
        window.addEventListener("resize", resizeMatrix);

        const chars = "0101010101ABCDEFGHJKLMNPQRSTUVWXYZ<>[]{}/*=";
        const fontSize = 12;
        const columns = Math.floor(canvas.width / fontSize) + 1;
        const drops = Array(columns).fill(1);

        function drawMatrix() {
            ctx.fillStyle = "rgba(3, 10, 18, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--cyan').trim() || "#00f0ff";
            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(drawMatrix, 45);
    }

    initMatrixRain("matrix-header-canvas");
    initMatrixRain("matrix-footer-canvas");

    // -----------------------------------------
    // 5. CANVAS NEURAL DE PARTÍCULAS NO HERO
    // -----------------------------------------
    const canvas = document.getElementById("neural-canvas");

    if (canvas) {
        const ctx = canvas.getContext("2d");

        function resizeCanvas() {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const particles = [];
        const particleCount = 45;
        const maxDistance = 110;
        let mouse = { x: null, y: null, radius: 140 };

        canvas.parentElement.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.parentElement.addEventListener("mouseleave", () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 1.2;
                this.vy = (Math.random() - 0.5) * 1.2;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--cyan').trim() || "#00f0ff";
                ctx.shadowBlur = 8;
                ctx.shadowColor = ctx.fillStyle;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 240, 255, ${1 - dist / maxDistance * 0.85})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }

                if (mouse.x && mouse.y) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(0, 255, 157, ${1 - dist / mouse.radius})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    // -----------------------------------------
    // 6. ATUALIZAÇÃO AUTOMÁTICA DO ANO
    // -----------------------------------------
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    // -----------------------------------------
    // 7. RADAR TECH COM FILTRAGEM SEGURA
    // -----------------------------------------
    const radarFeed = document.getElementById("radar-feed");
    const radarSearch = document.getElementById("radar-search");
    const modal = document.getElementById("radar-modal");
    const closeModalBtn = document.getElementById("close-modal");

    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalDate = document.getElementById("modal-date");
    const modalBody = document.getElementById("modal-body");
    const modalTags = document.getElementById("modal-tags");

    const artigos = [
        {
            id: 1,
            categoria: "SEGURANÇA & LGPD",
            titulo: "Governança de TI, Segurança e LGPD nas Empresas",
            descricao: "Diretrizes essenciais para proteção de dados corporativos, gestão de acessos e conformidade com a LGPD em infraestruturas modernas.",
            conteudoCompleto: `
                <p>A conformidade com a Lei Geral de Proteção de Dados (LGPD) e a implementação de uma governança de TI eficiente deixaram de ser diferenciais para se tornarem requisitos vitais em qualquer organização.</p>
                <p>Entre as principais práticas, destacam-se a gestão de acessos baseada em papéis (RBAC), a encriptação de dados sensíveis em trânsito e em repouso, além da criação de planos de resposta a incidentes de segurança cibernética.</p>
                <p>A adoção do conceito de <em>Privacy by Design</em> garante que os sistemas de informação sejam desenvolvidos desde o início focados no respeito à privacidade e à transparência com os titulares dos dados.</p>
            `,
            data: "12/11/2026",
            tags: ["#Seguranca", "#LGPD"]
        },
        {
            id: 2,
            categoria: "BANCO DE DADOS",
            titulo: "Otimização de Consultas SQL e Modelagem de Dados",
            descricao: "Estratégias de indexação, modelagem relacional e otimização de performance para bancos de dados de alto desempenho.",
            conteudoCompleto: `
                <p>A performance de aplicações web e corporativas depende diretamente da forma como a base de dados relacional é desenhada e consultada.</p>
                <p>Práticas como o uso correto de índices (B-Tree, Hash), a prevenção de pesquisas custosas (evitando o excesso de SELECT *) e a otimização de queries com junções complexas garantem tempos de resposta inferiores a poucos milissegundos.</p>
                <p>Além da modelagem relacional bem estruturada, o monitoramento preventivo de <em>Slow Queries</em> e o ajuste fino de parâmetros do SGBD evitam gargalos em momentos de alto tráfego.</p>
            `,
            data: "10/11/2026",
            tags: ["#Database", "#SQL"]
        },
        {
            id: 3,
            categoria: "INTELIGÊNCIA ARTIFICIAL",
            titulo: "Inteligência Artificial no Desenvolvimento de Software",
            descricao: "Como modelos de linguagem e ferramentas inteligentes estão a otimizar rotinas de programação e automação de processos.",
            conteudoCompleto: `
                <p>A integração da Inteligência Artificial Generativa no fluxo de desenvolvimento de software está a transformar a rotina dos profissionais de tecnologia.</p>
                <p>Desde a geração automatizada de testes unitários até à depuração inteligente de código e análise preditiva de dados, ferramentas baseadas em IA aumentam a produtividade mantendo a qualidade técnica.</p>
                <p>No entanto, a validação humana, a segurança do código gerado e a compreensão profunda da arquitetura subjacente continuam a ser competências insubstituíveis dos desenvolvedores.</p>
            `,
            data: "08/11/2026",
            tags: ["#IA", "#Dev"]
        }
    ];

    function renderRadar(items) {
        if (!radarFeed) return;
        radarFeed.innerHTML = "";

        if (items.length === 0) {
            radarFeed.innerHTML = `
                <div class="card news-card" style="grid-column: 1 / -1; text-align: center;">
                    <p>Nenhum artigo encontrado para o termo pesquisado.</p>
                </div>
            `;
            return;
        }

        items.forEach(article => {
            const card = document.createElement("article");
            card.className = "card news-card reveal active";
            card.innerHTML = `
                <div class="news-header">
                    <span class="icon">✳</span>
                    <small>${sanitizeInput(article.data)}</small>
                </div>
                <h3><a>${sanitizeInput(article.titulo)}</a></h3>
                <p>${sanitizeInput(article.descricao)}</p>
                <div class="news-tags">
                    ${article.tags.map(tag => `<span class="tag-mini">${sanitizeInput(tag)}</span>`).join(" ")}
                </div>
            `;

            card.addEventListener("click", () => {
                modalCategory.textContent = article.categoria;
                modalDate.textContent = article.data;
                modalTitle.textContent = article.titulo;
                modalBody.innerHTML = article.conteudoCompleto;
                modalTags.innerHTML = article.tags.map(tag => `<span class="tag-mini">${sanitizeInput(tag)}</span>`).join(" ");
                modal.classList.add("active");
            });

            radarFeed.appendChild(card);
        });
    }

    renderRadar(artigos);

    if (radarSearch) {
        radarSearch.addEventListener("input", (e) => {
            const term = sanitizeInput(e.target.value.toLowerCase().trim());
            const filtered = artigos.filter(art => 
                art.titulo.toLowerCase().includes(term) ||
                art.descricao.toLowerCase().includes(term) ||
                art.categoria.toLowerCase().includes(term) ||
                art.tags.some(t => t.toLowerCase().includes(term))
            );
            renderRadar(filtered);
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => modal.classList.remove("active"));
    }
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("active");
        });
    }

    // -----------------------------------------
    // 8. MODAL DE ARQUITETURA DOS PROJETOS
    // -----------------------------------------
    const archModal = document.getElementById("arch-modal");
    const closeArchBtn = document.getElementById("close-arch-modal");
    const archBtns = document.querySelectorAll(".open-arch-modal");

    const archTitle = document.getElementById("arch-title");
    const archSub = document.getElementById("arch-subtitle");
    const archDiagram = document.getElementById("arch-diagram");
    const archBody = document.getElementById("arch-body");
    const archTechs = document.getElementById("arch-techs");
    const archRepoBtn = document.getElementById("arch-repo-btn");

    const projetosData = {
        omr: {
            titulo: "Corretor Inteligente OMR",
            subtitulo: "Processamento de Imagens e Leitura Óptica de Gabaritos",
            diagrama: `[ Mobile / App Flutter ] ──( HTTP POST / Image )──> [ FastAPI Backend ]
                                                              │
                                                  ( VISÃO COMPUTACIONAL )
                                                              ▼
[ OpenCV / Python Core ] <──( Contour Detection )── [ Adaptive Thresholding ]
         │
         ├──> [ OMR Perspective Warp ]
         └──> [ Array Grid Match & Score Calc ]
                               │
                               ▼
                    [ Output JSON / Grade Result ]`,
            detalhes: `
                <p>O Corretor Inteligente OMR foi desenvolvido para automatizar a correção de cartões-resposta de exames e simulados institucionais através de visão computacional.</p>
                <p><strong>Fluxo de Execução:</strong> A aplicação captura a imagem através da câmera do dispositivo móvel ou upload web, envia para a API FastAPI onde o algoritmo OpenCV realiza a transformação de perspectiva (Warp Perspective), isola as bolhas preenchidas por detecção de contorno e calcula a nota instantaneamente comparando com a chave gabarito.</p>
            `,
            techs: ["Python", "FastAPI", "OpenCV", "Flutter", "NumPy"],
            repoUrl: "https://github.com/eraldodesign"
        },
        elo: {
            titulo: "Projeto ELO (Conectados pela Vida)",
            subtitulo: "Rede IoT de Resposta a Emergências e Proteção Legal",
            diagrama: `[ Dispositivo Vestível BLE ] ──( Sinal SOS )──> [ Smartphone App (Client) ]
                                                                 │
                                                       ( Geolocalização GPS )
                                                                 ▼
[ Painel de Monitoramento ] <──( WebSockets )── [ Backend REST API (Python) ]
         │
         └──> [ Criptografia de Dados & Audit Logs (LGPD compliant) ]`,
            detalhes: `
                <p>O Projeto ELO integra hardware de baixo consumo, aplicativos móveis e uma arquitetura jurídica focada em LGPD para garantir resposta rápida em situações de emergência.</p>
                <p><strong>Fluxo de Execução:</strong> O acionamento do botão físico via Bluetooth LE envia comandos prioritários para o aplicativo no smartphone, que transmite a localização geográfica criptografada em tempo real para a central de monitoramento com auditoria completa de privacidade.</p>
            `,
            techs: ["IoT", "Bluetooth LE", "Python", "WebSockets", "LGPD"],
            repoUrl: "https://github.com/eraldodesign"
        },
        cyberia: {
            titulo: "CyberIA & Laboratório de Redes",
            subtitulo: "Plataforma de Simulação de Incidentes e Topologias de TI",
            diagrama: `[ Aluno / Pesquisador ] ──( Web Interface )──> [ Docker Orchestrator ]
                                                             │
                                                  ( AMBIENTE VIRTUALIZADO )
                                                             ▼
[ Cisco SD-WAN Simulator ] <──( GNS3 / EVE-NG Engine )── [ Debian / Ubuntu Nodes ]
         │
         └──> [ Cyber Attack Scenarios & AI Log Analyzer ]`,
            detalhes: `
                <p>Ambiente de laboratório imersivo projetado para treinamento técnico em cibersegurança, análise de tráfego de rede e resposta a incidentes.</p>
                <p><strong>Fluxo de Execução:</strong> Alunos interagem com topologias corporativas reais virtualizadas em Docker/GNS3, enfrentando cenários simulados de ataque e analisando métricas com suporte de algoritmos de inteligência artificial.</p>
            `,
            techs: ["Docker", "GNS3 / EVE-NG", "Debian Linux", "Cisco SD-WAN", "Python"],
            repoUrl: "https://github.com/eraldodesign"
        }
    };

    archBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const pId = btn.getAttribute("data-project");
            const p = projetosData[pId];

            if (p) {
                archTitle.textContent = p.titulo;
                archSub.textContent = p.subtitulo;
                archDiagram.textContent = p.diagrama;
                archBody.innerHTML = p.detalhes;
                archTechs.innerHTML = p.techs.map(t => `<span>${sanitizeInput(t)}</span>`).join(" ");
                archRepoBtn.href = p.repoUrl;
                archModal.classList.add("active");
            }
        });
    });

    if (closeArchBtn) {
        closeArchBtn.addEventListener("click", () => archModal.classList.remove("active"));
    }
    if (archModal) {
        archModal.addEventListener("click", (e) => {
            if (e.target === archModal) archModal.classList.remove("active");
        });
    }

    // -----------------------------------------
    // 9. TERMINAL INTERATIVO CLI COM SANITIZAÇÃO RIGOROSA DE INPUT
    // -----------------------------------------
    const termOverlay = document.getElementById("terminal-overlay");
    const openTermBtn = document.getElementById("open-terminal-btn");
    const closeTermBtn = document.getElementById("close-term-btn");
    const closeTermDot = document.getElementById("close-term-dot");
    const termInput = document.getElementById("terminal-input");
    const termOutput = document.getElementById("terminal-output");
    const termBody = document.getElementById("terminal-body");

    function toggleTerminal() {
        if (!termOverlay) return;
        termOverlay.classList.toggle("active");
        if (termOverlay.classList.contains("active")) {
            setTimeout(() => termInput.focus(), 100);
        }
    }

    if (openTermBtn) openTermBtn.addEventListener("click", toggleTerminal);
    if (closeTermBtn) closeTermBtn.addEventListener("click", toggleTerminal);
    if (closeTermDot) closeTermDot.addEventListener("click", toggleTerminal);

    if (termOverlay) {
        termOverlay.addEventListener("click", (e) => {
            if (e.target === termOverlay) toggleTerminal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "~" || e.key === "'") {
            if (document.activeElement !== termInput) {
                e.preventDefault();
                toggleTerminal();
            }
        } else if (e.key === "Escape" && termOverlay.classList.contains("active")) {
            toggleTerminal();
        }
    });

    const cliCommands = {
        help: `Comandos disponíveis:
  help       - Exibe esta lista de comandos
  about      - Resumo sobre Eraldo Pereira
  skills     - Lista de competências técnicas e atuação
  projects   - Exibe os projetos principais em destaque
  contact    - Informações de contato e canais
  clear      - Limpa o histórico do terminal
  exit       - Fecha o terminal CLI`,

        about: `ERALDO PEREIRA
--------------------------------------------------
Analista de Sistemas, Instrutor de TI e pesquisador.
Atuação em desenvolvimento de software, banco de dados, 
infraestrutura de redes, cibersegurança e ensino superior.`,

        skills: `COMPETÊNCIAS TÉCNICAS:
--------------------------------------------------
[+] Linguagens: Python, SQL, C/C++, HTML5, CSS3, JS
[+] Databases: MySQL, SQL Server, Modelagem Relacional
[+] Infra: Linux (Debian/Ubuntu), Windows Server, Docker, Cisco
[+] IA & Visão: OpenCV, FastAPI, Machine Learning aplicados
[+] Educação: Instrutor de TI (SENAI, SENAC, FASEC)`,

        projects: `PROJETOS EM DESTAQUE:
--------------------------------------------------
1. Corretor Inteligente OMR (Python / OpenCV / FastAPI)
2. Projeto ELO - Resposta a Emergências (IoT / BLE / LGPD)
3. CyberIA & Lab de Redes (Docker / GNS3 / Cisco SD-WAN)`,

        contact: `CANAIS DE CONTATO:
--------------------------------------------------
[>] WhatsApp: https://wa.me/5563984180987
[>] E-mail:   eraldodesign@gmail.com
[>] GitHub:   https://github.com/eraldodesign`
    };

    if (termInput) {
        termInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const rawCmd = termInput.value.trim();
                const sanitizedDisplayCmd = sanitizeInput(rawCmd);
                const cmd = rawCmd.toLowerCase();
                termInput.value = "";

                if (!cmd) return;

                const line = document.createElement("div");
                line.className = "term-entry";

                const cmdLine = document.createElement("div");
                // Usando o comando devidamente sanitizado para evitar injeção de HTML no terminal
                cmdLine.innerHTML = `<span class="prompt">eraldo@eptech:~$</span> <span class="term-user-cmd">${sanitizedDisplayCmd}</span>`;
                line.appendChild(cmdLine);

                const responseLine = document.createElement("div");

                if (cmd === "clear") {
                    termOutput.innerHTML = "";
                    return;
                } else if (cmd === "exit") {
                    toggleTerminal();
                    return;
                } else if (cliCommands[cmd]) {
                    responseLine.className = "term-res-text term-res-success";
                    responseLine.textContent = cliCommands[cmd];
                } else {
                    responseLine.className = "term-res-text term-res-error";
                    // Utiliza textContent (inerentemente seguro contra XSS)
                    responseLine.textContent = `bash: comando não encontrado: '${rawCmd}'. Digite 'help' para ver a lista de comandos.`;
                }

                line.appendChild(responseLine);
                termOutput.appendChild(line);
                termBody.scrollTop = termBody.scrollHeight;
            }
        });
    }

    // -----------------------------------------
    // 10. FILTRO DE PROJETOS POR CATEGORIA
    // -----------------------------------------
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project");

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const filterValue = button.getAttribute("data-filter");

                projectCards.forEach(card => {
                    const category = card.getAttribute("data-category");
                    if (filterValue === "all" || filterValue === category) {
                        card.classList.remove("hidden");
                    } else {
                        card.classList.add("hidden");
                    }
                });
            });
        });
    }

    // -----------------------------------------
    // 11. SCROLL REVEAL
    // -----------------------------------------
    const sectionsToReveal = document.querySelectorAll(".section, .card, .about-item");
    sectionsToReveal.forEach(el => el.classList.add("reveal"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.15 });

    sectionsToReveal.forEach(el => observer.observe(el));
});


// INTEGRATION: CHAT FLUTUANTE IA (COMUNICAÇÃO SEGURA COM ENDPOINT SERVERLESS)
const chatToggleBtn = document.getElementById("chat-toggle-btn");
const chatCloseBtn = document.getElementById("chat-close-btn");
const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const chatSendBtn = document.getElementById("chat-send-btn");
const chatMessages = document.getElementById("chat-messages");

// Substitua pela URL da sua função serverless na Vercel quando fizer a publicação
const SERVERLESS_API_URL = "/api/chat";

if (chatToggleBtn && chatBox) {
    chatToggleBtn.addEventListener("click", () => chatBox.classList.toggle("active"));
    chatCloseBtn.addEventListener("click", () => chatBox.classList.remove("active"));

    async function sendChatMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Limpa e sanitiza o texto de entrada do usuário
        chatInput.value = "";
        
        // Exibe a mensagem do usuário no chat
        const userDiv = document.createElement("div");
        userDiv.className = "chat-msg user";
        userDiv.textContent = text;
        chatMessages.appendChild(userDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Exibe mensagem de carregamento
        const botDiv = document.createElement("div");
        botDiv.className = "chat-msg bot";
        botDiv.textContent = "Pensando...";
        chatMessages.appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const res = await fetch(SERVERLESS_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text })
            });

            const data = await res.json();

            if (data.reply) {
                botDiv.textContent = data.reply;
            } else {
                botDiv.textContent = "Desculpe, ocorreu um problema ao processar sua pergunta.";
            }
        } catch (err) {
            botDiv.textContent = "Não foi possível conectar ao servidor de IA no momento.";
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatSendBtn.addEventListener("click", sendChatMessage);
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendChatMessage();
    });
}