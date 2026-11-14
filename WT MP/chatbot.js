// FR-06: a small keyword-matching help chatbot. It does not use an external API.
(function () {
    const style = document.createElement("style");
    style.textContent = `
        .chat-fab { position: fixed; right: 22px; bottom: 22px; z-index: 1000; border-radius: 50%; width: 58px; height: 58px; font-size: 23px; box-shadow: 0 5px 18px #0005; }
        .chat-panel { position: fixed; right: 22px; bottom: 92px; z-index: 1000; width: min(340px, calc(100vw - 32px)); height: 420px; display: none; flex-direction: column; overflow: hidden; border: 1px solid var(--border); border-radius: 12px; background: var(--surface); box-shadow: 0 8px 30px #0005; }
        .chat-panel.open { display: flex; }
        .chat-head { display: flex; justify-content: space-between; align-items: center; padding: 13px; background: var(--surface-soft); }
        .chat-log { flex: 1; padding: 12px; overflow-y: auto; }
        .user-msg, .bot-msg { max-width: 88%; padding: 9px 11px; margin: 8px 0; border-radius: 10px; line-height: 1.4; font-size: 13px; overflow-wrap: anywhere; }
        .user-msg { margin-left: auto; background: var(--accent-strong); color: white; }
        .bot-msg { margin-right: auto; background: var(--surface-soft); color: var(--text); }
        .chat-form { display: flex; gap: 7px; padding: 10px; border-top: 1px solid var(--border); }
        .chat-form input { min-width: 0; flex: 1; padding: 9px; }
        .chat-form button { padding: 9px 12px; }
        .chat-close { padding: 5px 9px; background: transparent; color: var(--text); }
    `;
    document.head.appendChild(style);

    const fab = document.createElement("button");
    fab.className = "chat-fab";
    fab.type = "button";
    fab.textContent = "?";
    fab.setAttribute("aria-label", "Open PennyWise assistant");

    const panel = document.createElement("section");
    panel.className = "chat-panel";
    panel.innerHTML = `
        <div class="chat-head"><strong>PennyWise Assistant</strong><button class="chat-close" type="button" aria-label="Close chat">×</button></div>
        <div class="chat-log" id="chatLog" aria-live="polite"><div class="bot-msg">Hello! Ask me about budgets, expenses, saving data or exporting your records.</div></div>
        <form class="chat-form" id="chatForm"><input id="chatInput" type="text" placeholder="Type a question..." aria-label="Chat message"><button type="submit">Send</button></form>
    `;
    document.body.append(fab, panel);

    const log = panel.querySelector("#chatLog");
    const input = panel.querySelector("#chatInput");

    function addMessage(text, className) {
        const message = document.createElement("div");
        message.className = className;
        message.textContent = text;
        log.appendChild(message);
        log.scrollTop = log.scrollHeight;
    }

    function getReply(message) {
        const text = message.toLowerCase();
        if (text.includes("budget") || text.includes("limit")) return "Set your monthly spending limit in Budget Settings. PennyWise shows your remaining budget and warns you when 80% has been used.";
        if (text.includes("expense") || text.includes("add")) return "Use Add New Expense to enter a description, amount, category and date. Your expense then appears in Expense History.";
        if (text.includes("save") || text.includes("storage") || text.includes("private")) return "PennyWise saves its records in this browser using localStorage. The static demo does not send expense records to a server.";
        if (text.includes("export") || text.includes("csv")) return "Choose Export CSV in Expense History to download your transactions as a spreadsheet-friendly file.";
        if (text.includes("month") || text.includes("date")) return "Expenses are grouped by their date. Only records from the current calendar month count toward the current monthly total.";
        if (text.includes("calculator") || text.includes("calculate")) return "The calculator is on the dashboard. It supports addition, subtraction, multiplication and division.";
        if (text.includes("hello") || text.includes("hi")) return "Hello! I can explain the main PennyWise features. Try asking about budgets, expenses, privacy or CSV export.";
        return "I can help with budgets, adding expenses, monthly tracking, local storage and CSV export. Try asking about one of those topics.";
    }

    fab.addEventListener("click", function () {
        panel.classList.toggle("open");
        if (panel.classList.contains("open")) input.focus();
    });

    panel.querySelector(".chat-close").addEventListener("click", function () {
        panel.classList.remove("open");
    });

    panel.querySelector("#chatForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const message = input.value.trim();
        if (!message) return;
        addMessage(message, "user-msg");
        addMessage(getReply(message), "bot-msg");
        input.value = "";
        input.focus();
    });
})();
